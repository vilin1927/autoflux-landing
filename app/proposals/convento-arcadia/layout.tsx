import type { ReactNode } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export default function ConventoArcadiaLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={playfair.variable}>{children}</div>;
}
