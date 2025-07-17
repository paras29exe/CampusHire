"use client"

import CompletedDriveCard from "@/components/completedDriveCard"
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook"
import { LoaderCircle } from "lucide-react"

export default function AdminCompletedDrivesPage() {

  const {data: completedDrives, isLoading, hasMore, lastElementRef} = useInfiniteScroll('/api/shared/assignments?type=completed')

  return (
    <div className="container max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Admin: Completed Drives</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {completedDrives.map((drive) => (
          <CompletedDriveCard key={drive._id} driveData={drive} userRole="admin" />
        ))}
      </div>
      {hasMore && (
        <div ref={lastElementRef} className="text-center p-4">
          {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
        </div>
      )}
      {completedDrives.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Completed Drives Found</h3>
          <p className="text-gray-600">Keep up the great work, more drives will come soon!</p>
        </div>
      )}
    </div>
  )
}
