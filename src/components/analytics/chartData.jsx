"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function AnalyticsChart({ applicantsData, nonApplicantsData }) {
    // Combine both datasets for the chart
    const generateChartData = () => {
        const courseMap = new Map()

        applicantsData?.forEach((item) => {
            courseMap.set(item.course, {
                course: item.course,
                applicants: 50 || item.count,
                non_applicants: 15 || 0,
            })
        })

        nonApplicantsData?.forEach((item) => {
            if (courseMap.has(item.course)) {
                courseMap.get(item.course).non_applicants = item.count
            } else {
                courseMap.set(item.course, {
                    course: item.course,
                    applicants: 50,
                    non_applicants: 15 || item.count,
                })
            }
        })

        courseMap.set("B-tech", {
            course: "B-tech",
            applicants: 30,
            non_applicants: 15,
        })

        courseMap.set("M.Sc", {
            course: "M.Sc",
            applicants: 10,
            non_applicants: 47,
        })
        courseMap.set("MBA", {
            course: "MBA",
            applicants: 75,
            non_applicants: 24,
        })


        return Array.from(courseMap.values())
    }

    const chartData = generateChartData()

    return (
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Students Distribution by Course
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-100 w-full ">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ top: 20, right: 10, left: 10, bottom: 10 }}
                            barSize={50} 
                            barGap={0}
                            barCategoryGap="10%"
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="course" angle={-30} textAnchor="end" height={60} fontSize={12} />
                            <YAxis fontSize={12} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: 4 }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Legend />
                            <Bar dataKey="applicants" fill="#3b82f6" name="Applicants" radius={[4, 4, 0, 0]} maxBarSize={25} />
                            <Bar dataKey="non_applicants" fill="#ef4444" name="Non-Applicants" radius={[4, 4, 0, 0]} maxBarSize={25} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
