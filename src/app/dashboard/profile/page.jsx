import { useAuthStore } from '@/store/store'
import axios from 'axios'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function page() {

    const { role } = useAuthStore()

    const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
          toast.error("New passwords do not match")
          return
        }
    
        try {
          const res = await fetch("/api/auth/change-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              oldPassword: data.oldPassword,
              newPassword: data.newPassword,
            }),
          })
    
          if (!res.ok) throw new Error()
    
          toast.success("Password changed successfully!")
          reset()
          setIsChangingPassword(false)
        } catch {
          toast.error("Failed to change password. Please check your old password.")
        }
      }
    
}

export default page