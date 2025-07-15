"use client"

import { Users, UserCheck, UserX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AnalyticsTable({ data, showApplicants, selectedCourse, selectedBatch, selectedRole }) {
  
  const filteredData = showApplicants ? data.applicants : data.non_applicants;

  const hasFilters = selectedCourse !== 'all' || selectedBatch !== 'all' || selectedRole !== 'all';

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {showApplicants ? (
              <UserCheck className="h-5 w-5 text-green-600" />
            ) : (
              <UserX className="h-5 w-5 text-red-600" />
            )}
            {showApplicants ? "Applicants" : "Non-Applicants"} Data ({filteredData.length})
          </span>
          {hasFilters && <Badge variant="secondary">Filtered Results</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Backlogs</TableHead>
                <TableHead>10th %</TableHead>
                <TableHead>12th %</TableHead>
                <TableHead>Graduation %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((student, index) => (
                <TableRow key={student._id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.roll_number}</Badge>
                  </TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell className="uppercase">{student.branch || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{student.batch}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{student.role || "N/A"}</Badge>
                  </TableCell>
                  <TableCell className="max-w-48 truncate" title={student.email}>
                    {student.email}
                  </TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>
                    {student.backlogs > 0 ? (
                      <Badge variant="destructive">{student.backlogs}</Badge>
                    ) : (
                      <Badge variant="default">0</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.tenth_percentage}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.twelfth_percentage}%</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.graduation_percentage}%</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {showApplicants ? "Applicants" : "Non-Applicants"} Found
            </h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
