'use client'
import { useEffect } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import axios from "axios";
import { useAuthStore } from "@/store/store";


export default function RootLayout({ children }) {
  const { setUserData, setRole } = useAuthStore();
  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await axios.get('/api/auth/auto-login');
        setUserData(response.data.user);
        setRole(response.data.role);
      } catch (error) {
        console.error('Error during auto-login:', error);
      }
    }
    autoLogin();
  }, [])
  

  return (
    <html lang="en">
      <body
      >
        {children}
        <Toaster position="top-center" closeButton duration={2000}  />
      </body>
    </html>
  );
}
// GITHUBSTUDENT50-QBLK5Z