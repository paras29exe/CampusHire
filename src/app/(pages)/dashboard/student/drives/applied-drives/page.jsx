'use client'
import AppliedJobCard from '@/components/student/appliedJobCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInfiniteScroll } from '@/hooks/infiniteScrollHook'

function page() {
  const { data: appliedJobs, lastElementRef, hasMore, isLoading } = useInfiniteScroll('/api/student/jobs/applied-jobs')

  return (
    <div className="w-full p-4">
      <div className="w-full max-w-none space-y-4 sm:space-y-6">
        <Card className="w-full p-0 shadow-none border-none bg-background">
          <CardHeader >
            <CardTitle className="text-3xl font-bold text-gray-900 text-center">Applied Drives</CardTitle>
            <CardDescription className="text-sm text-center sm:text-base text-gray-700">Track your job applications and Start Preparing</CardDescription>
          </CardHeader>
          <CardContent className="w-full space-y-2 sm:space-y-4 p-0">
            {appliedJobs.map((job, index) => (
                <AppliedJobCard key={job._id} jobData={job} />
            ))}
          </CardContent>
          {hasMore && (
            <div ref={lastElementRef} className="text-center p-4">
              {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default page