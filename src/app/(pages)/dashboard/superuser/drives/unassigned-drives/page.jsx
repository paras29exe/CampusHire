"use client"

import UnassignedJobCard from "@/components/unAssignedJobCard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, LoaderCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook"

export default function UnassignedJobsDemo() {
    const { data: unassignedJobs, isLoading, hasMore, lastElementRef } = useInfiniteScroll('/api/superuser/jobs/unassigned-jobs');

    const handleAddNewJob = () => {
        window.location.href = "/superuser/jobs/add"
    }

    const urgentJobs = unassignedJobs.filter((job) => {
        const now = new Date()
        const created = new Date(job.createdAt)
        const diffTime = Math.abs(now - created)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays > 3
    })

    return (
        <div className="min-h-screen ">
            <Card className="border-red-200 rounded-none bg-red-50">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                                <CardTitle className="text-xl sm:text-2xl font-bold text-red-800 flex items-center gap-2">
                                    Unassigned Jobs
                                    {urgentJobs.length > 0 && (
                                        <Badge variant="destructive" className="text-xs">
                                            {urgentJobs.length} Urgent
                                        </Badge>
                                    )}
                                </CardTitle>
                                <p className="text-sm text-red-700">
                                    Jobs waiting to be assigned to admins for processing
                                </p>
                            </div>
                        </div>

                        <Button onClick={handleAddNewJob} className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Job
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    {unassignedJobs.length > 0 ? (
                        unassignedJobs.map((job) => (
                            <UnassignedJobCard key={job._id} jobData={job} />
                        ))
                    ) : (
                        <div className="text-center py-8 space-y-2">
                            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto" />
                            <p className="text-gray-700 font-medium">No unassigned jobs found</p>
                            <p className="text-sm text-gray-500">
                                All jobs have been assigned to admins for processing
                            </p>
                            <Button onClick={handleAddNewJob} className="bg-blue-600 hover:bg-blue-700 mt-2">
                                <Plus className="h-4 w-4 mr-2" />
                                Add New Job
                            </Button>
                        </div>
                    )}
                </CardContent>
                {hasMore && (
                    <div ref={lastElementRef} className="text-center py-6">
                        {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6 text-gray-500" />}
                    </div>
                )}
            </Card>

        </div>

    )
}
