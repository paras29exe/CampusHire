import "./globals.css";
import { Toaster } from "sonner";
import Main from "./Main";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-background"
      >
        <Main>
          {children}
        </Main>
        <Toaster position="top-center" limit={1} closeButton duration={2000} />

      </body>
    </html >
  );
}
// GITHUBSTUDENT50-QBLK5Z