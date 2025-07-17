'use client';

import AuthorityProfilePage from '@/components/profiles/authorityProfile';
import StudentProfilePage from '@/components/profiles/studentProfile';
import { useAuthStore } from '@/store/store'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Page() {
    const { userData } = useAuthStore()
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    const { role } = useAuthStore()
    const { reset } = useForm()

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast("New passwords do not match")
            return
        }

        try {
            const response = await axios.put("/api/auth/change-password", {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            })
            toast("Password changed successfully!")
            reset()
            setIsChangingPassword(false)
        } catch (err) {
            toast("Failed to change password:" + err.response.data.message || err.message)
        }
    }

    const handleCancel = () => {
        reset()
        setIsChangingPassword(false)
    }

    return (
        <>
            {
                role == 'student' ? (
                    <StudentProfilePage
                        userData={userData}
                        isChangingPassword={isChangingPassword}
                        setIsChangingPassword={setIsChangingPassword}
                    />
                ) : (
                    <AuthorityProfilePage
                        userData={userData}
                        onSubmit={onSubmit}
                        handleCancel={handleCancel}
                        isChangingPassword={isChangingPassword}
                        setIsChangingPassword={setIsChangingPassword}
                    />
                )
            }
        </>
    )
}