'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useJobsStore } from "@/store/store";
import UnpublishedJobCard from "@/components/unpublishedJobCard";

export default function page() {
    const { unpublishedJobs, setUnpublishedJobs } = useJobsStore()

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);

    const observerRef = useRef(null);

    const fetchJobs = async () => {
        if (loading || (totalPages && page > totalPages)) return;

        setLoading(true);
        try {
            const response = await axios.get(`/api/shared/jobs/unpublished-jobs?page=${page}`);
            const jobs = response.data.data;

            if (page === 1) {
                setUnpublishedJobs(jobs);
            } else {
                setUnpublishedJobs(prev => [...prev, ...jobs]);
            }

            setTotalPages(response.data.pagination.totalPages);
            setPage(prev => prev + 1);
        } catch (err) {
            console.error('Error fetching unpublished jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial load only if Zustand has no data
    useEffect(() => {
        if (unpublishedJobs.length === 0) {
            fetchJobs();
        }
    }, []);

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
    }, [page, totalPages, loading]);

    return (
        <>
            <div className="min-h-screen p-4">
                <div className="max-w-6xl mx-auto space-y-4">
                    <Card className="border-orange-200 bg-orange-50">
                        <CardHeader className="flex items-center space-x-4">
                            <div>
                                <AlertCircle className="h-6 w-6 text-orange-600" />
                                <div>
                                    <CardTitle className="text-2xl font-bold text-orange-800">Unpublished Jobs</CardTitle>
                                    <p className="text-orange-700">Jobs that are created but not yet published for students</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {
                                unpublishedJobs?.map((job, index) => (
                                    <div key={index}>
                                        <UnpublishedJobCard />
                                        {index < unpublishedJobs.length - 1 && <div className="h-4" />}
                                    </div>
                                ))
                            }
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
        </>
    )
}