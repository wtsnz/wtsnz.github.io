import "./globals.css";
import Link from "next/link";
// import { useRouter } from 'next/navigation';
import { Providers } from "./providers";
import ActiveLink from "@/components/ActiveLink";
import ThemeSwitch from "@/components/ThemeSwitch";

export const metadata = {
  title: "Will Townsend | Blog",
  description: "Just some thoughts",
};

const links = [
  { path: "/blog", label: "Blog" },
  { path: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <header className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
            <div className="flex justify-between items-center">
              {/* <Link href="/">Will Townsend</Link> */}
              <ActiveLink href="/">
              Will Townsend
                </ActiveLink>

              <div className="flex items-center">
                {links.map(({ path, label }) => (
                  <ActiveLink key={path} href={path}>
                    {label}
                  </ActiveLink>
                ))}

                <ThemeSwitch />
              </div>
            </div>
          </header>
          {children}
          <footer className="container mx-auto px-4 py-8 lg:max-w-2xl max-w-2xl">
            <p>
              © 2023 Will Townsend —{" "}
              <Link href="https://twitter.com/wtsnz">@wtsnz</Link>
            </p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
