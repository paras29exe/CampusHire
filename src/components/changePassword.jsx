'use client'
import { useAuthStore } from "@/store/store"
import axios from "axios"
import { Lock, Eye, X, Save } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import DialogBox from "./DialogBox"

export default function ChangePassword() {
    const [showPasswords, setShowPasswords] = useState({ old: false, new: false })
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const { role } = useAuthStore();
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`/api/auth/${role}/change-password`, {
                oldPassword: data.oldPassword,
                newPassword: data.newPassword
            })
            toast(response.data.message, { style: { background: 'green', color: 'white' } })
            setIsChangingPassword(false)
            reset()
        } catch (error) {
            toast(error.response?.data?.message || error.message || "Failed to change password", {
                style: { background: 'red', color: 'white' }
            })
            console.error("Error changing password:", error)
        }
    }

    return (
    <div className="max-w-4xl mx-auto rounded-2xl shadow-lg border bg-white/80 backdrop-blur-sm">
      <DialogBox 
        title="Change Password"
        description="Ensure your account remains secure by changing your password regularly."
        open={open}
        setOpen={setOpen}
        onSuccess={() => {handleSubmit(onSubmit), setOpen(false)}}
        onCancel={() => { setOpen(false) }} 
        confirmText="Continue"
        cancelText="Cancel"
      />
      {/* Card Header */}
      <div className="border-b px-6 py-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Lock className="h-5 w-5" />
          Security Settings
        </h2>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {!isChangingPassword ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-600 mb-6">
              Keep your account secure by changing your password regularly
            </p>
            <button
              onClick={() => setIsChangingPassword(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
            >
              <Lock className="h-4 w-4" />
              Change Password
            </button>
          </div>
        ) : (
          <form onSubmit={() => setOpen(true)} className="space-y-6">
            {/* Current Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Current Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPasswords.old ? "text" : "password"}
                {...register("oldPassword", { required: "Current password is required" })}
                placeholder="Enter current password"
                className="w-full border rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, old: !prev.old }))}
                className="absolute right-0 top-8 px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                {showPasswords.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {errors.oldPassword && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPasswords.new ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
                placeholder="Enter new password"
                className="w-full border rounded-md px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-0 top-8 px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              {errors.newPassword && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", { required: "Please confirm your new password" })}
                placeholder="Confirm new password"
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
                  <X className="h-3 w-3" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="border-t my-4"></div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Changing..." : "Change Password"}
              </button>
              <button
                type="button"
                onClick={() => {
                    setIsChangingPassword(false)
                    reset()
                }}
                className="flex-1 shadow-sm outline inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
