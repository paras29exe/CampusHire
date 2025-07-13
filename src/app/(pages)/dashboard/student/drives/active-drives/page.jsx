'use client'

import ActiveJobCard from "@/components/activeJobCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook"

function page() {
  const { data: activeJobs, lastElementRef, hasMore, isLoading } = useInfiniteScroll('/api/student/jobs/active-jobs')

  return (
    <div className=" w-full p-4">
      <div className=" mx-auto">
        <Card className="w-full p-0 shadow-none border-none bg-background">
          <CardHeader >
            <CardTitle className="text-3xl font-bold text-gray-900 text-center">Job Opportunities</CardTitle>
            <CardDescription className="text-sm text-center sm:text-base text-gray-600">Discover your next career opportunity</CardDescription>
          </CardHeader>

          {/* Responsive grid layout */}
          <CardContent className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-0 gap-6">
            {activeJobs?.map((job, index) => (
               <ActiveJobCard key={job._id} jobData={job} />
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