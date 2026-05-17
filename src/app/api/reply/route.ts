import { NextResponse } from "next/server";
import { inviteContent } from "@/lib/invite-content";
import { saveReply } from "@/lib/reply-store";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const text = String(body.reply ?? body.text ?? "").trim();
    const name = String(body.name ?? inviteContent.herName).trim();
    const accepted =
      body.accepted === true ||
      text.toLowerCase() === inviteContent.accept.word;

    if (!text) {
      return NextResponse.json({ error: "Empty reply" }, { status: 400 });
    }

    const saved = await saveReply(name, text, accepted);

    const timestamp = saved.at;
    const message = [
      `${name} ${accepted ? "accepted" : "replied"} on your invite.`,
      "",
      `She wrote: ${text}`,
      `Time (UTC): ${timestamp}`,
    ].join("\n");

    if (process.env.WEB3FORMS_ACCESS_KEY) {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject: accepted
            ? `${name} accepted — meeting today`
            : `New reply from ${name}`,
          name,
          message,
          from_name: "Meeting Invite",
        }),
      });
    }

    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: accepted
            ? `💐 **${name} said yes!**\n\nShe wrote: \`${text}\`\nTime: ${timestamp}`
            : `📝 **${name} wrote:** \`${text}\`\nTime: ${timestamp}`,
        }),
      });
    }

    return NextResponse.json({ ok: true, saved, accepted });
  } catch (error) {
    console.error("Reply API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
