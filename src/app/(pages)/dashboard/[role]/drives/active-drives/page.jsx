'use client';

import ActiveJobCard from "@/components/activeJobCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useInfiniteScroll } from "@/hooks/infiniteScrollHook";
import { LoaderCircle } from "lucide-react";

export default function page() {
    const { data, hasMore, isLoading, lastElementRef } = useInfiniteScroll('/api/shared/jobs/active-jobs');

    return (
        <div className=" w-full p-4">
            <div className=" mx-auto">
                <Card className="w-full p-0 shadow-none border-none bg-background">
                    <CardHeader >
                        <CardTitle className="text-3xl font-bold text-gray-900 text-center">Active Drives</CardTitle>
                        <CardDescription className="text-sm text-center sm:text-base text-gray-600">Monitor and manage currently active job drives across the platform</CardDescription>
                    </CardHeader>

                    {/* Responsive grid layout */}
                    <CardContent className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-0 gap-6">
                        {data?.map((job, index) => (
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