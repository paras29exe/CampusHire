'use client'
import { useEffect } from "react";
import "./globals.css";


export default function RootLayout({ children }) {
  // fetch from api>jobs/pdf in this project

  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
// GITHUBSTUDENT50-QBLK5Z