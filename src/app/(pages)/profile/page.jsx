import { useAuthStore } from '@/store/store'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function page() {
    const { userData, setUserData } = useAuthStore()
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    const { role } = useAuthStore()
    const { reset } = useForm()

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            toast.error("New passwords do not match")
            return
        }

        try {
            const response = await axios.put("/api/auth/change-password", {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            })
            toast.success("Password changed successfully!")
            reset()
            setIsChangingPassword(false)
        } catch (err) {
            toast.error("Failed to change password:" + err.response.data.message || err.message)
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
                        onSubmit={onSubmit}
                        handleCancel={handleCancel}
                    />
                ) : (
                    <AuthorityProfilePage
                        userData={userData}
                        onSubmit={onSubmit}
                        handleCancel={handleCancel}
                    />
                )
            }
        </>
    )
}