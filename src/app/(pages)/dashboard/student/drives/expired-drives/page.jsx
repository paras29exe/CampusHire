'use client'

import ExpiredDriveCard from "@/components/expiredJobs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook"
import { AlertCircle, LoaderCircle } from "lucide-react"

export default function Page() {
  const {data: expiredDrives, lastElementRef, hasMore, isLoading} = useInfiniteScroll('/api/student/jobs/expired-jobs')

  console.log(expiredDrives)
  return (
    <div className="min-h-screen p-4">
      <div className=" mx-auto space-y-6">
        <Card className="border-none bg-transparent rounded-none shadow-none p-0">
          <CardHeader >
            <CardTitle className="text-3xl font-bold text-gray-900 text-center">Expired Drives</CardTitle>
            <CardDescription className="text-sm text-center sm:text-base text-gray-700">These opportunities are closed for application</CardDescription>
          </CardHeader>
          <CardContent className={"max-sm:p-0"}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expiredDrives.map((job) => (
                  <ExpiredDriveCard key={job._id} jobData={job} />
              ))}
            </div>
          </CardContent>
          {hasMore && (
            <div ref={lastElementRef} className="text-center p-4">
              {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
            </div>
          )}
        </Card>
        {expiredDrives.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Expired Drives Found</h3>
          </div>
        )}
      </div>
    </div>
  )
}