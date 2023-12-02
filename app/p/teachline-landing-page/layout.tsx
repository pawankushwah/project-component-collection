import ThemeManager from "@/app/components/ThemeManager";
import "./page.css";
import { Cabin } from "next/font/google";

const font = Cabin({ subsets: ["latin-ext", "latin"], weight: "500" });

export const metadata = {
  title: "Teachline",
  description:
    "At TeachLine, we are on a mission to revolutionize online education. Founded with a passion for learning and a commitment to making quality education accessible to all.",
  icon: "./favicon",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="absolute -top-1 -left-1 z-10">
          <ThemeManager />
        </div>
        {children}
      </body>
    </html>
  );
}
