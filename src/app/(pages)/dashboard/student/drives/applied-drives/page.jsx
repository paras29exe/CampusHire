'use client'
import AppliedJobCard from '@/components/student/appliedJobCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInfiniteScroll } from '@/hooks/infiniteScrollHook'
import { AlertCircle, LoaderCircle } from 'lucide-react'

function Page() {
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
            {appliedJobs.map((job) => (
              <AppliedJobCard key={job._id} jobData={job} />
            ))}
          </CardContent>
          {hasMore && (
            <div ref={lastElementRef} className="text-center p-4">
              {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
            </div>
          )}
        </Card>
        {appliedJobs.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applied Data</h3>
            <p className="text-gray-600">Seems like you haven't applied yet or maybe you got shortlisted.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page()