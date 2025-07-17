'use client';

import UnpublishedJobCard from "@/components/unpublishedJobCard";
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useAuthStore } from "@/store/store";

export default function Page() {
    const {userData } = useAuthStore()
    const { data: unpublishedJobs, isLoading, hasMore, lastElementRef } = useInfiniteScroll('/api/shared/jobs/unpublished-jobs');

    return (
        <>
            <div className="min-h-screen">
                <div className=" space-y-4">
                    <Card className="border-orange-200 rounded-none bg-orange-50">
                        <CardHeader className="flex items-center justify-center space-x-4">
                            <div className="text-center flex flex-col items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-orange-600" />
                                <div>
                                    <CardTitle className="text-2xl font-bold text-orange-800">Unpublished Jobs</CardTitle>
                                    <p className="text-orange-700">Jobs that are created but not yet published for students</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {unpublishedJobs?.length !== 0 && !isLoading ? (
                                unpublishedJobs?.map((job) => (
                                    <UnpublishedJobCard key={job._id} userData={userData} jobData={job} />
                                ))
                            ) : (
                                <div className="text-center text-gray-500">
                                    {!isLoading && <p> No unpublished jobs available at the moment. </p>}
                                </div>
                            )
                            }
                        </CardContent>
                    </Card>
                    {hasMore && (
                        <div ref={lastElementRef} className="text-center p-4">
                            {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}