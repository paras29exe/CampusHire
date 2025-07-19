"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle, Users, BookOpen } from "lucide-react"
import { toast } from "sonner"
import { COURSE_OPTIONS as courses } from "@/constants/courses"
import axios from "axios"

const requiredFields = [
  "name",
  "roll_number",
  "email",
  "college_email",
  "phone",
  'department',
  "batch",
  "backlogs",
  "tenth_percentage",
  "twelfth_percentage",
]

export default function BulkStudentOnboardingPage() {
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const [apiError, setApiError] = useState(null)

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId)
    setSelectedFile(null)
    setUploadStatus(null)
  }

  const handleFileSelect = (file) => {
    if (!selectedCourse) {
      toast.error("Please select a course first")
      return
    }

    const allowedTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ]

    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload only Excel (.xlsx, .xls) or CSV files")
      return
    }

    setSelectedFile(file)
    setUploadStatus(null)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !selectedCourse) {
      toast.error("Please select both course and file")
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("course_and_branch", selectedCourse)
      formData.append("file", selectedFile)
      const res = await axios.post("/api/teacher/manage/add-students-from-file", formData)

      toast.success("New Students onboarded successfully. Check your email for credentials.")
      setUploadStatus({
        type: "success",
        message: res.data.message || "Students added successfully",
        count: res.data.insertedCount || 0,
      })
      resetForm()

    } catch (error) {
      console.error("Upload error:", error)

      if (error.response && error.response.data?.data) {
        setApiError(error.response.data.data || "An error occurred while uploading students")
      }

      const errorMessage = error.response?.data?.message || "An error occurred while uploading students"
      setUploadStatus({
        type: "error",
        message: errorMessage,
      })
      toast.error(errorMessage, { action: { label: "Retry", onClick: resetForm }, duration: 5000 })
    } finally {
      setIsUploading(false)

    }
  }

  const resetForm = () => {
    setSelectedCourse("")
    setSelectedFile(null)
    setUploadStatus(null)
    document.querySelector('input[type="file"]').value = null
    setApiError(null)
  }


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Student Onboarding</h1>
          <p className="text-gray-600">Upload multiple students at once using Excel or CSV files</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Step 1: Select Course
                </CardTitle>
                <CardDescription>Choose the course for which you want to upload students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="course">Course</Label>
                  <Select value={selectedCourse} onValueChange={handleCourseSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCourse && (
                    <div className="mt-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Selected: {selectedCourse}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {/* Upload Status */}
            {uploadStatus && (
              <Alert
                className={
                  uploadStatus.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                }
              >
                {uploadStatus.type === "success" ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={uploadStatus.type === "success" ? "text-green-800" : "text-red-800"}>
                  {uploadStatus.message}
                  {uploadStatus.count && (
                    <span className="block mt-1 font-medium">{uploadStatus.count} students added successfully</span>
                  )}
                </AlertDescription>
                {
                  apiError && (
                    <p className="text-red-600 mt-2">{apiError}</p>
                  )
                }
              </Alert>
            )}

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Step 2: Upload File
                </CardTitle>
                <CardDescription>Upload an Excel (.xlsx, .xls) or CSV file containing student data</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Drag and Drop Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${!selectedCourse
                      ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                      : isDragOver
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                      }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragOver(true)
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault()
                      setIsDragOver(false)
                    }}
                  >
                    <FileSpreadsheet
                      className={`mx-auto h-12 w-12 mb-4 ${!selectedCourse ? "text-gray-300" : "text-gray-400"}`}
                    />
                    {!selectedCourse ? (
                      <div>
                        <p className="text-gray-400 mb-2">Please select a course first</p>
                        <p className="text-sm text-gray-300">Course selection is required before file upload</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 mb-2">
                          Drag and drop your file here, or{" "}
                          <label className="text-blue-600 hover:text-blue-700 cursor-pointer underline">
                            browse
                            <input
                              type="file"
                              className="hidden"
                              accept=".xlsx,.xls,.csv"
                              onChange={(e) => {
                                const file = e.target.files[0]
                                if (file) {
                                  handleFileSelect(file)
                                }
                              }}
                              disabled={!selectedCourse}
                            />
                          </label>
                        </p>
                        <p className="text-sm text-gray-500">Supports Excel (.xlsx, .xls) and CSV files</p>
                      </div>
                    )}
                  </div>

                  {/* Selected File Display */}
                  {selectedFile && (
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3">
                        <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-blue-900">{selectedFile.name}</p>
                          <p className="text-sm text-blue-600">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setUploadStatus(null)
                          setSelectedFile(null)
                          document.querySelector('input[type="file"]').value = null
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Remove
                      </Button>
                    </div>
                  )}

                  {/* Upload Button */}
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || !selectedCourse || isUploading}
                    className="w-full"
                    size="lg"
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Users className="h-4 w-4 mr-2" />
                        Upload Students
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>



            {/* Reset Button */}
            {(selectedCourse || selectedFile || uploadStatus) && (
              <Button variant="outline" onClick={resetForm} className="w-full bg-transparent">
                Start Over
              </Button>
            )}
          </div>

          {/* Right Column - Instructions */}
          <div className="space-y-6">
            {/* Required Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Required Fields</CardTitle>
                <CardDescription>Your Excel/CSV file must contain these exact column names:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {requiredFields.map((field, index) => (
                    <div key={field} className="flex items-center gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {index + 1}
                      </Badge>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{field}</code>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <Badge className="bg-blue-100 text-blue-800 shrink-0">1</Badge>
                  <p className="text-sm">Select the course from the dropdown menu</p>
                </div>
                <div className="flex gap-3">
                  <Badge className="bg-blue-100 text-blue-800 shrink-0">2</Badge>
                  <p className="text-sm">Prepare your Excel/CSV file with the exact field names listed</p>
                </div>
                <div className="flex gap-3">
                  <Badge className="bg-blue-100 text-blue-800 shrink-0">3</Badge>
                  <p className="text-sm">Upload the file using drag & drop or file browser</p>
                </div>
                <div className="flex gap-3">
                  <Badge className="bg-blue-100 text-blue-800 shrink-0">4</Badge>
                  <p className="text-sm">Click "Upload Students" to process the file</p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Ensure all required fields are present in your file</p>
                <p>• Use exact field names (case-sensitive)</p>
                <p>• Remove any empty rows or columns</p>
                <p>• Maximum file size: 10MB</p>
                <p>• Supported formats: .xlsx, .xls, .csv</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
