import { promises as fs } from "fs";
import path from "path";

export type StoredReply = {
  id: string;
  name: string;
  text: string;
  accepted: boolean;
  at: string;
};

const FILE = path.join(process.cwd(), "data", "replies.json");

async function readFile(): Promise<StoredReply[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw) as StoredReply[];
  } catch {
    return [];
  }
}

async function writeFile(replies: StoredReply[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(replies, null, 2), "utf-8");
}

export async function saveReply(
  name: string,
  text: string,
  accepted: boolean,
): Promise<StoredReply> {
  const entry: StoredReply = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    text,
    accepted,
    at: new Date().toISOString(),
  };

  const replies = await readFile();
  replies.unshift(entry);
  await writeFile(replies);
  return entry;
}

export async function getReplies(): Promise<StoredReply[]> {
  return readFile();
}
