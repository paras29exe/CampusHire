import "./globals.css";
import { Toaster } from "sonner";
import Main from "./Main";

export const metadata = {
  title: "CampusHire",
  description: "AI-powered campus recruitment platform",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-background "
      >
        <Main>
          {children}
        </Main>
        <Toaster position="top-center" visibleToasts={1} limit={1} closeButton duration={4000} />
      </body>
    </html >
  );
}
// GITHUBSTUDENT50-QBLK5Z