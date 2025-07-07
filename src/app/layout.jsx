'use client'
import { useEffect } from "react";
import "./globals.css";
import { Toaster } from "sonner";


export default function RootLayout({ children }) {
  // fetch from api>jobs/pdf in this project

  return (
    <html lang="en">
      <body
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
// GITHUBSTUDENT50-QBLK5Z