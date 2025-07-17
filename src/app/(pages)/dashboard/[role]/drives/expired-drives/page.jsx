'use client'

import ExpiredDriveCard from "@/components/expiredJobs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook"
import { AlertCircle, Clock, LoaderCircle } from "lucide-react"

export default function Page() {
  const { data: expiredDrives, lastElementRef, hasMore, isLoading } = useInfiniteScroll('/api/shared/jobs/expired-jobs')

  return (
    <div className="py-6">
      <div className=" mx-auto space-y-6">
        <Card className="border-none bg-transparent rounded-none shadow-none p-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-700">Expired Drives</CardTitle>
            <p className="text-red-600">These opportunities have closed for applications</p>
          </CardHeader>
          {/* <Separator className=" bg-border h-0.5" /> */}
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
            <p className="text-gray-600">There are no Expired drives available yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}