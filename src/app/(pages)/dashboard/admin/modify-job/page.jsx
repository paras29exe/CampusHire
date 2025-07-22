'use client';

import EditBasicDetails from "@/components/modify-job/basicDetailsPage";
import RoundDetailsSection from "@/components/modify-job/roundDetails";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios";
import { Briefcase, CheckCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const params = useSearchParams()
  const jobId = params.get("jobId")
  const router = useRouter()
  const [jobData, setJobData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [eligibilityValid, setEligibilityValid] = useState(false)
  const [linksDateValid, setLinksDateValid] = useState(false)

  const [roundDetailsValid, setRoundDetailsValid] = useState(false);
  const isAllSectionsValid = useMemo(() => eligibilityValid && linksDateValid, [eligibilityValid, linksDateValid])

  const [isJobPublished, setIsJobPublished] = useState(false)
  const [selectedTab, setSelectedTab] = useState('basic');
  
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axios.get(`/api/views/job-description?jobId=${jobId}`);
        setJobData(response.data.data);
        setIsJobPublished(response.data.data.status === "active");
        setSelectedTab(response.data.data.status === "active" ? "rounds" : "basic");
      } catch (error) {
        console.error("Error fetching job data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJobData();
    }
  }, [jobId])

  const handlePublish = async () => {
    if (!isAllSectionsValid || !roundDetailsValid) {
      toast("Please complete all sections before publishing", { style: { backgroundColor: 'red', color: 'white' } });
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.put(`/api/admin/jobs/${jobId}/publish`, {}, { params: { jobId } });
      toast("Job published successfully!", { style: { backgroundColor: 'green', color: 'white' } });
      setJobData(res.data.data);
      router.push(`/dashboard/admin/drives/active-drives`);
    } catch (error) {
      console.error("Error publishing job:", error);
      toast(error.response?.data?.message || "Failed to publish job", { style: { backgroundColor: 'red', color: 'white' } });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    )
  }

  if (!jobData) {
    return <div className="p-6">Job not found. Give a valid JobId</div>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Briefcase />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Job Details</h1>
                <p className="text-gray-600">{jobData.company.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isJobPublished && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Published</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className={"w-fit mx-auto mt-4 flex gap-4"}>
          <TabsTrigger className={"outline-1"} value="basic">Basic Details</TabsTrigger>
          <TabsTrigger className={"outline-1"} value="rounds">Interview Rounds</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <EditBasicDetails
            jobData={jobData}
            setSelectedTab={setSelectedTab}
            eligibilityValid={eligibilityValid}
            linksDateValid={linksDateValid}
            setEligibilityValid={setEligibilityValid}
            setLinksDateValid={setLinksDateValid}
            isJobPublished={isJobPublished}
            isAllSectionsValid={isAllSectionsValid}
          />
        </TabsContent>
        
        <TabsContent value="rounds">
          <RoundDetailsSection
            jobId={jobData._id}
            roles={jobData.job_roles}
            setRoundDetailsValid={setRoundDetailsValid}
            isPublished={isJobPublished}
          />

          {!isJobPublished && <Button
            onClick={handlePublish}
            className="mt-4 ml-auto w-full disabled:cursor-not-allowed bg-green-600 hover:bg-green-700"
            disabled={!isAllSectionsValid || !roundDetailsValid}
          >
            {isSubmitting ? "Publishing..." : "Publish Job"}
          </Button>
          }
        </TabsContent>
      </Tabs>
    </div>

  )
}