import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Clock3 } from "lucide-react"

export default function EligibilityCriteriaSection({ eligibilityCriteria, isUnassigned, isUnpublished }) {
    if (!eligibilityCriteria || isUnassigned) return null

    return (
        <Card className="rounded-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Eligibility Criteria
                    {isUnpublished && (
                        <Badge variant="outline" className="text-xs">
                            <Clock3 className="h-3 w-3 mr-1" />
                            Being Updated
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-900">Eligible Batches</h4>
                        <div className="flex flex-wrap gap-2">
                            {eligibilityCriteria.batches?.map((batch, index) => (
                                <Badge key={batch + index} variant="outline" className="text-sm">
                                    {batch}
                                </Badge>
                            )) || <span className="text-sm text-gray-500">To be announced</span>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-gray-900">Minimum CGPA</h4>
                        <Badge variant="outline" className="text-sm">
                            {eligibilityCriteria.cgpa || 0}
                        </Badge>
                    </div>
                </div>

                {eligibilityCriteria.courses && (
                    <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-gray-900">Eligible Courses </h4>
                        <div className="space-x-3 space-y-3">
                            {eligibilityCriteria.courses.length ? (
                                eligibilityCriteria.courses.map((course) => (
                                    <Badge key={course} variant="secondary" className="text-xs">
                                        {course}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">To be announced</span>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}