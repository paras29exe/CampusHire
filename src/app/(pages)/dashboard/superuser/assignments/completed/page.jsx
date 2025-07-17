"use client"

import CompletedDriveCard from "@/components/completedDriveCard"
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook"
import { AlertCircle, LoaderCircle } from "lucide-react"

export default function SuperuserCompletedDrivesPage() {
  // Mock data for superuser completed drives
  const {data: completedDrives, isLoading, hasMore, lastElementRef} = useInfiniteScroll('/api/shared/assignments?type=completed')

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Superuser: Completed Drives</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {completedDrives.map((drive) => (
          <CompletedDriveCard key={drive.id} driveData={drive} userRole="superuser" />
        ))}
      </div>
      {hasMore && (
        <div ref={lastElementRef} className="text-center p-4">
          {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
        </div>
      )}
      {completedDrives.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Completed Drives Found</h3>
          <p className="text-gray-600">Keep up the great work, more drives will come soon!</p>
        </div>
      )}
    </div>
  )
}
