'use client';

import ActiveJobCard from "@/components/activeJobCard";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useJobsStore } from "@/store/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function page() {
    const { activeJobs, setActiveJobs } = useJobsStore()

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);

    const observerRef = useRef(null);

    const fetchJobs = async () => {
        if (loading || (totalPages && page > totalPages)) return;

        setLoading(true);
        try {
            const response = await axios.get(`/api/shared/jobs/active-jobs?page=${page}`);
            const jobs = response.data.data;

            if (page === 1) {
                setActiveJobs(jobs);
            } else {
                setActiveJobs(prev => [...prev, ...jobs]);
            }

            setTotalPages(response.data.pagination.totalPages);
            setPage(prev => prev + 1);
        } catch (err) {
            console.error('Error fetching Active jobs:', err);
        } finally {
            setLoading(false);
        }
    };
    
    // Infinite scroll logic
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                fetchJobs();
            }
        });

        const element = observerRef.current;
        if (element) observer.observe(element);

        return () => element && observer.unobserve(element);
    }, [page, totalPages]);

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
                        {activeJobs?.map((job, index) => (
                            <ActiveJobCard key={index} jobData={job} />
                        ))}
                    </CardContent>
                    <div ref={observerRef} className="h-14 flex justify-center items-center">
                        {loading && <span className="text-sm text-gray-500">Loading more...</span>}
                        {!loading && totalPages && page > totalPages && (
                            <span className="text-sm text-gray-400">No more drives to load</span>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )
}