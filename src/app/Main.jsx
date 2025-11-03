'use client'

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/store';
import { usePathname, useRouter } from 'next/navigation';

export default function Main({ children }) {
    const { setUserData, setRole } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname()
    const isHome = useMemo(() => pathname === '/' || pathname === '/auth/login', [pathname]);
    const [loading, setLoading] = useState(!isHome);

    useEffect(() => {
        const autoLogin = async () => {
            try {
                const response = await axios.get('/api/auth/auto-login');
                setUserData(response.data.user);
                setRole(response.data.role);

                if (pathname === '/auth/login') {
                    router.replace(`/dashboard/${response.data.role}/drives/active-drives`);
                }
            } catch (error) {
                console.error('Error during auto-login:', error);
                router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };
        !isHome && autoLogin();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex flex-col gap-y-3 items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600"></div>
            <p>Please wait....</p>
        </div>
    );

    return children;
}
