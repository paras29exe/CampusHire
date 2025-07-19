'use client';

import ActiveJobCard from "@/components/activeJobCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook";
import { AlertCircle, LoaderCircle } from "lucide-react";

export default function Page() {
    const { data, hasMore, isLoading, lastElementRef } = useInfiniteScroll('/api/shared/jobs/active-jobs');

    return (
        <div className="w-full p-4">
            <div className=" max-w-7xl mx-auto">
                <Card className="w-full p-0 shadow-none border-none bg-background">
                    <CardHeader >
                        <CardTitle className="text-3xl font-bold text-gray-900 text-center">Active Drives</CardTitle>
                        <CardDescription className="text-sm text-center sm:text-base text-gray-600">Monitor and manage currently active job drives across the platform</CardDescription>
                    </CardHeader>

                    {/* Responsive grid layout */}
                    <CardContent className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-0 gap-6">
                        {data?.map((job) => (
                            <ActiveJobCard key={job._id} jobData={job} />
                        ))}
                    </CardContent>
                    {hasMore && (
                        <div ref={lastElementRef} className="text-center p-4">
                            {isLoading && <LoaderCircle className="inline-block animate-spin h-6 w-6" />}
                        </div>
                    )}
                </Card>
                {data.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                        <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active/Ongoing Drives Found</h3>
                        <p className="text-gray-600">Dear Administration, Please bring some new drives.</p>
                    </div>
                )}
            </div>
        </div>
    )
}