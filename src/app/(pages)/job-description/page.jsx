'use client'

import JobDescriptionPage from "@/components/JobDescriptionPage"
import { useApi, useAuthStore } from "@/store/store";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    // This page is currently not implemented, but it can be used to display job descriptions
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');

    const [jobData, setJobData] = useState(null);
    const { role } = useAuthStore()


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobDescription = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/views/job-description`, {
                    params: { jobId }
                });
                setJobData(response.data.data);
            } catch (error) {
                console.error('Error fetching job description:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDescription();
    }, [jobId])

    if (!jobId) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">Job ID is required to view the job description.</h1>
            </div>
        );
    }

    if(jobData) return (
        <JobDescriptionPage jobData={jobData} role={role} />
    )
}