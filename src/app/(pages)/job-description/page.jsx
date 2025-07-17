'use client'

import JobDescriptionPage from "@/components/JobDescriptionPage"
import { useAuthStore } from "@/store/store";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
    // This page is currently not implemented, but it can be used to display job descriptions
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');

    const [jobData, setJobData] = useState(null);
    const [info, setInfo] = useState(null);
    const { role } = useAuthStore()

    const apiEndpoint = useMemo(() => role === 'student' ? `/api/student/job-info` : `/api/views/job-description`, [jobId, role])

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchJobDescription = async () => {
            try {
                setLoading(true);
                const response = await axios.get(apiEndpoint, {
                    params: { jobId }
                });
                setJobData(response.data.data);
                if (role === 'student') {
                    setInfo(response.data.info);
                }
            } catch (error) {
                console.error('Error fetching job description:', error.response?.data.message || error.message);
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
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">Loading job description...</p>
            </div>
        );
    }
    if (!jobData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg">No job description found for the provided Job ID.</p>
            </div>
        );
    }

    return (
        <>
            {
                role === 'student' && info && (
                    // make a strip that show up applied to info.applied, info.shortlisted, info.rejected
                    <div className="bg-blue-100 text-blue-800 p-2 rounded-md mb-4">
                        <div className="text-sm font-medium flex items-center justify-center">
                            <p className="font-bold flex items-center p-0">  You <ArrowRight className="w-4 h-fit my-auto mx-2" /> </p>
                            Applied : {info.applied || 0} |
                            Shortlisted : {info.shortlisted || 0} |
                            Rejected : {info.rejected || 0}
                        </div>
                    </div>
                )
            }
            <JobDescriptionPage jobData={jobData} role={role} />
        </>
    )
}