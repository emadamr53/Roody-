"use client";

import Lottie from "lottie-react";
import { cn } from "@/lib/utils";

const loaderAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 120,
  w: 200,
  h: 200,
  nm: "Loader",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            { i: { x: [0.667], y: [1] }, o: { x: [0.333], y: [0] }, t: 0, s: [0] },
            { t: 120, s: [360] },
          ],
        },
        p: { a: 0, k: [100, 100, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100, 100] },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [80, 80] },
            },
            {
              ty: "st",
              c: { a: 0, k: [0.545, 0.361, 0.965, 1] },
              o: { a: 0, k: 100 },
              w: { a: 0, k: 6 },
              lc: 2,
              lj: 1,
              d: [
                { n: "d", nm: "dash", v: { a: 0, k: 40 } },
                { n: "g", nm: "gap", v: { a: 0, k: 120 } },
                { n: "o", nm: "offset", v: { a: 0, k: 0 } },
              ],
            },
            {
              ty: "tr",
              p: { a: 0, k: [0, 0] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
            },
          ],
        },
      ],
      ip: 0,
      op: 120,
      st: 0,
    },
  ],
};

export function LottieLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div
        className="absolute inset-0 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.4) 0%, transparent 70%)",
        }}
      />
      <Lottie
        animationData={loaderAnimation}
        loop
        className="relative h-full w-full"
      />
    </div>
  );
}
