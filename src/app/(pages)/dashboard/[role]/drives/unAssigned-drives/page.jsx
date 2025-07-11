"use client"

import UnassignedJobCard from "./unassigned-job-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Plus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function UnassignedJobsDemo() {
    const { unassignedJobs, setUnassignedJobs } = useJobsStore()

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
                setUnassignedJobs(jobs);
            } else {
                setUnassignedJobs(prev => [...prev, ...jobs]);
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
        if (unassignedJobs.length === 0) {
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
        <div className="p-4">
            <div className="max-w-6xl mx-auto space-y-6">
                <Card className="border-red-200 bg-red-50">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-6 w-6 text-red-600" />
                                <div>
                                    <CardTitle className="text-2xl font-bold text-red-800 flex items-center gap-2">
                                        Unassigned Jobs
                                        {urgentJobs.length > 0 && (
                                            <Badge variant="destructive" className="text-xs">
                                                {urgentJobs.length} Urgent
                                            </Badge>
                                        )}
                                    </CardTitle>
                                    <p className="text-red-700">Jobs waiting to be assigned to admins for processing</p>
                                </div>
                            </div>

                            <Button onClick={handleAddNewJob} className="bg-blue-600 hover:bg-blue-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Add New Job
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {unassignedJobs.length > 0 ? (
                            unassignedJobs.map((job, index) => (
                                <div key={index}>
                                    <UnassignedJobCard />
                                    {index < unassignedJobs.length - 1 && <div className="h-4" />}
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 mb-4">No unassigned jobs found</p>
                                <p className="text-sm text-gray-500 mb-4">All jobs have been assigned to admins for processing</p>
                                <Button onClick={handleAddNewJob} className="bg-blue-600 hover:bg-blue-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New Job
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
