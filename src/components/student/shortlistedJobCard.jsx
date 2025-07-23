"use client"

import { Calendar, MapPin, IndianRupee, Monitor, Users, Trophy, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/utils/client/formatDate"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function ShortlistedDriveCard({ jobData }) {

    const router = useRouter()

    const getDriveTypeIcon = (type) => {
        return type === "online" ? <Monitor className="h-4 w-4" /> : <Users className="h-4 w-4" />
    }

    // here _id is the application ID, not the job ID

    return (
        <Card className="w-full transition-all duration-300 border-0 relative overflow-hidden group">
            {/* Decorative elements */}


            <CardHeader className="relative">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Badge className="bg-gradient-to-r text-xs from-green-500 to-emerald-500 text-white border-0 px-3 py-1">
                                <Trophy className="h-3 w-3 mr-1" />
                                SHORTLISTED
                            </Badge>
                            <Sparkles size={16} className=" text-yellow-500" />
                        </div>
                        <div>
                            <h2 className=" text-lg sm:text-xl font-bold text-foreground">
                                {jobData.companyName}
                            </h2>
                            <p className="text-xs  sm:text-sm font-semibold text-blue-700">{jobData.roleName}</p>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-1 relative">
                {/* Congratulatory Message */}
                <div className="bg-gradient-to-r text-center from-green-100 to-emerald-100 border border-green-200 rounded-lg p-2">
                    <p className="text-green-800 font-medium sm:text-sm text-xs text-center">
                        🎉 Congratulations! You've been shortlisted for the next round!
                    </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-1 sm:py-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="flex text-xs items-center gap-3 px-3 bg-white/60 rounded-lg border border-gray-100">
                            <div className="p-2 bg-blue-100 rounded-full">
                                <Calendar className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                                <p className=" text-gray-600">Applied On</p>
                                <p className="font-semibold text-gray-900">{formatDate(jobData.appliedOn)}</p>
                            </div>
                        </div>

                        <div className="flex text-xs items-center gap-3 px-3 bg-white/60 rounded-lg border border-gray-100">
                            <div className="p-2 bg-orange-100 rounded-full">
                                <Calendar className="h-4 w-4 text-orange-600" />
                            </div>
                            <div>
                                <p className="text-gray-600">Next Round</p>
                                <p className="font-semibold text-orange-700">Date:{formatDate(jobData.nextRoundDate)}</p>
                                <p className="text-sm text-orange-600 font-medium">{jobData.nextRoundName}</p>
                            </div>
                        </div>

                        <div className="flex text-xs items-center gap-3 px-3 bg-white/60 rounded-lg border border-gray-100">
                            <div className="p-2 bg-green-100 rounded-full">
                                <IndianRupee className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <p className=" text-gray-600">Package</p>
                                <p className="font-bold text-green-700 text-sm">{jobData.package}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="flex text-xs items-center gap-3 px-3 bg-white/60 rounded-lg border border-gray-100">
                            <div className="p-2 bg-purple-100 rounded-full">
                                <MapPin className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                                <p className=" text-gray-600">Location</p>
                                <p className="font-semibold text-gray-900">{jobData.location}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-3 bg-white/60 rounded-lg border border-gray-100">
                            <div className="p-2 bg-indigo-100 rounded-full">{getDriveTypeIcon(jobData.driveType)}</div>
                            <div>
                                <p className="text-xs  text-gray-600">Drive Type</p>
                                <div className="flex items-center gap-2">
                                    <p className="font-semibold text-xs text-gray-900 capitalize">{jobData.driveType}</p>
                                    <Badge variant="outline" className="text-xs">
                                        {jobData.driveType || "Will Update soon"}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <CardFooter className="p-0 mt-6 space-x-2">
                    <Button
                        size={'lg'}
                        onClick={() => router.push(`/job-description?jobId=${jobData.jobId}`)}
                        variant={'outline'}
                        className="ml-auto bg-blue-600 text-white font-semibold  hover:shadow-xl transition-all duration-300 group"
                    >
                        <span className="flex items-center justify-center gap-2">
                            View Description
                        </span>
                    </Button>
                    {/* take me to next round */}
                    <Button
                        size={'lg'}
                        onClick={() => {
                            if (!jobData.nextRoundLink) {
                                toast("Next round link is not available yet.", { style: { background: '#f8d7da', color: '#721c24' } });
                                return;
                            }
                            router.push(jobData.nextRoundLink);
                        }}
                        disabled={!jobData.nextRoundLink}
                        variant={'secondary'}
                        className=" bg-green-600 text-white hover:text-black font-semibold hover:shadow-xl transition-all duration-300"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Proceed to Next Round
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                    </Button>
                </CardFooter>
            </CardContent>
            <h4 className="text-sm font-medium text-gray-500 mt-2 text-center">
                If next round button is disabled / Not-working, Maybe the link is not available yet. Please check back later or check your email for latest updates.
            </h4>
        </Card>
    )
}
