"use client"

import { Mail, Phone, Building, Calendar, BadgeIcon as IdCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "./ui/button"
import DialogBox from "./DialogBox"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useAuthStore } from "@/store/store"

export default function ViewAuthorityPage({ authority, loading }) {

  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const {role: loggedInUserRole} = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!authority) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">{authority?.role?.toUpperCase()} not found</p>
      </div>
    )
  }

  const handleDelete = () => {
    setDeleting(true)

    axios.delete(`/api/superuser/manage/delete-user/${authority.role}?userId=${authority._id}`)
      .then(response => {
        toast.success(response.data.message)
        window.history.back() // Go back to the previous page after deletion
        // Optionally redirect or update state after deletion
      })
      .catch(error => {
        toast.error(error.response?.data?.message || "Failed to delete user")
      })
      .finally(() => {
        setDeleting(false)
        setDialogOpen(false)
      })
  }

  const getInitials = (name) => name?.split(" ").map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <DialogBox
        title="Delete User ?"
        description={`Are you sure you want to delete ${authority.name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onSuccess={handleDelete}
        onCancel={() => setDialogOpen(false)}
        open={dialogOpen}
        setOpen={setDialogOpen}
        loading={deleting}
      />
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            {
              authority?.role !== 'superuser' && loggedInUserRole === 'superuser' && (
                <Button variant={'destructive'} onClick={() => setDialogOpen(true)} className={'w-fit ml-auto'}>
                  Delete User
                </Button>
              )
            }
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarFallback className="text-2xl bg-blue-600 text-white">{getInitials(authority.name) || 'N/A'}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl">{authority.name || 'N/A'}</CardTitle>
            <Badge className="w-fit mx-auto">{authority.role.toUpperCase()}</Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <IdCard className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Employee ID</p>
                  <p className="font-medium">{authority.employee_id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Building className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium">{authority.department || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{authority.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{authority.phone || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
                <Calendar className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Joined</p>
                  <p className="font-medium">
                    {new Date(authority.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
