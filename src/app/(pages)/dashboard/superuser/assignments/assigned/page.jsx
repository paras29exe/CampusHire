"use client"

import AssignedDriveCard from "@/components/assignedDriveCard"
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook"
import { AlertCircle, LoaderCircle } from "lucide-react"

export default function SuperuserAssignedDrivesPage() {

  const { data: assignedDrives, isLoading, hasMore, lastElementRef } = useInfiniteScroll('/api/shared/assignments?type=active')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Superuser: Assigned Drives</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignedDrives.map((drive) => (
          <AssignedDriveCard key={drive._id} driveData={drive} userRole="superuser" />
        ))}
      </div>
      {hasMore && (
        <div ref={lastElementRef} className="text-center p-4">
          {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
        </div>
      )}
      {assignedDrives.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assigned Drives Found</h3>
          <p className="text-gray-600">Keep up the great work, more drives will come soon!</p>
        </div>
      )}
    </div>
  )
}
