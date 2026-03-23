import "./globals.css";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  fallback: ["system-ui", "sans-serif"],
});

export const metadata = {
  title: "Omnigence | AI Automation for Finance & HR",
  description: "Agentic workflows for Finance automation and HR automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.className} antialiased bg-[#fafafa] text-gray-900`}>{children}</body>
    </html>
  );
}
