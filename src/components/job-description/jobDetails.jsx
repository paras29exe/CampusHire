import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Calendar, Award, Clock3 } from "lucide-react"

export default function JobDetailsSection({ jobDetails, isUnpublished }) {
    if (!jobDetails) return null

    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Job Details
                    {isUnpublished && (
                        <Badge variant="outline" className="text-xs">
                            <Clock3 className="h-3 w-3 mr-1" />
                            Being Updated
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                        <MapPin className="h-5 w-5 text-gray-600" />
                        <div>
                            <p className="text-gray-600">Location</p>
                            <p className="font-medium">{jobDetails.job_location || 'To be announced'}</p>
                        </div>
                    </div>

                    <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                        <Clock className="h-5 w-5 text-gray-600" />
                        <div>
                            <p className="text-gray-600">Shift Timing</p>
                            <p className="font-medium">{jobDetails.shift_timing || 'Will be initimated By the Company'}</p>
                        </div>
                    </div>

                    <div className="flex text-xs sm:text-sm items-center gap-3 sm:p-3 p-2 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <div>
                            <p className="text-gray-600">Joining Date</p>
                            <p className="font-medium">{jobDetails.date_of_joining || 'Will be initimated By the Company'}</p>
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Placement Process</h4>
                    {jobDetails.placement_process && jobDetails.placement_process.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {jobDetails.placement_process.map((step, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="w-8 aspect-square bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </div>
                                    <span className="text-sm font-medium text-blue-900">{step}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">Placement process details will be updated soon.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}