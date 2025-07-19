'use client';

import AuthorityProfilePage from '@/components/profiles/authorityProfile';
import StudentProfilePage from '@/components/profiles/studentProfile';
import { useAuthStore } from '@/store/store'

export default function Page() {
    const { userData } = useAuthStore()
    const { role } = useAuthStore()

    return (
        <>
            {
                role == 'student' ? (
                    <StudentProfilePage userData={userData}  />
                ) : (
                    <AuthorityProfilePage userData={userData} />
                )
            }
        </>
    )
}