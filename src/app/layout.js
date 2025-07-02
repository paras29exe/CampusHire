'use client'
import { useEffect } from "react";
import "./globals.css";
import extractPdf from "@/utils/server/extractPdf";


export default function RootLayout({ children }) {
  // fetch from api>jobs/pdf in this project

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/jobs/pdf', {
          method: 'POST',
          body: new FormData(),
        });
        
        const data = await response.json();
        console.log('Data fetched from API:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [])
  

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