'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';

export default function Main({ children }) {
    const { setUserData, setRole } = useAuthStore();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        const autoLogin = async () => {
            const isLoginPage = pathname === '/auth/login';
            try {
                const response = await axios.get('/api/auth/auto-login');
                setUserData(response.data.user);
                setRole(response.data.role);

                if (isLoginPage) {
                    router.replace(`/dashboard/${response.data.role}/drives/active-drives`);
                }
            } catch (error) {
                console.error('Error during auto-login:', error);
                router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };
        if(pathname === '/' ) setLoading(false);
        pathname !== '/' && autoLogin();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex flex-col gap-y-3 items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600"></div>
            <p>Please wait....</p>
        </div>
    );

    return children;
}
