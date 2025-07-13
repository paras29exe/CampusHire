"use client"

import { useCallback, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Upload, FileText, Check, Users, Plus, X, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function PostJobPage() {
  const { control, handleSubmit, watch, setValue, formState: { isSubmitting }, reset } = useForm({
    defaultValues: {
      pdfFile: null,
      selectedAdmins: [],
      assignLater: false,
    },
    mode: "onChange",
  })

  const { pdfFile, selectedAdmins, assignLater } = watch()
  const [jobId, setJobId] = useState(null)
  const [isParsing, setIsParsing] = useState(false)
  const [isParsed, setIsParsed] = useState(false)
  const [adminsList, setAdminsList] = useState([])

  const router = useRouter()

  const handleFileSelect = (file) => {
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a PDF file")
      return
    }
    setValue("pdfFile", file)
    setIsParsed(false)
    setIsParsing(false)
  }

  const handleRemoveFile = () => {
    setValue("pdfFile", null)
    setValue("selectedAdmins", [])
    setValue("assignLater", false)
    setJobId(null)
    setIsParsed(false)
    setIsParsing(false)
  }

  // Function to handle PDF parsing
  const handleParsePDF = async () => {
    if (!pdfFile) {
      toast("Please upload a PDF file first", { variant: "destructive" })
      return
    }
    if (isParsing) {
      toast("PDF is already being parsed", { variant: "info" })
      return
    }

    const formdata = new FormData()
    formdata.append("file", pdfFile)
    setIsParsing(true)
    try {
      // Simulate PDF parsing
      const response = await axios.post('/api/superuser/jobs/parse-pdf', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (adminsList.length === 0) {
        const adminsResponse = await axios.get('/api/superuser/get-admins-list')
        setAdminsList(() => adminsResponse.data.data || [])
      }

      setJobId(response.data.jobId)
      setIsParsed(true)
      toast("PDF parsed successfully", { variant: "success", description: 'You can now assign this job to admins.', action: { label: 'ok' } })
    } catch (error) {
      setJobId(null)
      setIsParsed(false)
      toast("Failed to parse PDF", { variant: "destructive", action: { label: 'Close' } })
    } finally {
      setIsParsing(false)
    }
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files[0])
  }, [])

  const handleDragOver = useCallback((e) => e.preventDefault(), [])

  const toggleAdmin = (admin) => {
    const current = selectedAdmins || []
    const exists = current.find((a) => a._id === admin._id)
    setValue("selectedAdmins", exists ? current.filter((a) => a._id !== admin._id) : [...current, admin])
    setValue("assignLater", false)
  }

  const handleAssignLater = () => {
    setValue("assignLater", true)
    setValue("selectedAdmins", [])
  }

  // final onSubmit function to post the job
  const onSubmit = async (data) => {
    try {
      if (assignLater) {
        toast("Job posted without admin assignment", { variant: "info" })
        router.push('/dashboard/superuser/drives/unassigned-drives')
        return
      }
      if (!jobId) {
        toast("Please parse the PDF file first", { variant: "destructive" })
        return
      }
      if (isSubmitting) {
        toast("Pdf is being Parsed", { variant: "info" })
        return
      }


      const response = await axios.post('/api/superuser/jobs/assign-job-to-admin', {
        adminIds: selectedAdmins?.map(admin => admin._id) || [],
      },
        {
          params: { jobId }
        }
      )
      const { message } = response.data
      toast(`${message}`, { variant: "success" })
      router.push('/dashboard/superuser/drives/unpublished-drives')
    } catch (error) {
      console.error('Error posting job:', error)
      toast(error?.response?.data?.message || "Failed to post job", { variant: "destructive" })
    } finally {
      reset();
      setJobId(null);
      setValue("pdfFile", null);
      setValue("selectedAdmins", []);
      setValue("assignLater", false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Post New Job</h1>
          <p className="text-gray-600 mt-2">Upload job description PDF and assign to admins</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Job Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Job Description PDF *</Label>

                {!pdfFile ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        Drag and drop your PDF here, or{" "}
                        <label className="text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                          click to upload
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={(e) => handleFileSelect(e.target.files?.[0])}
                          />
                        </label>
                      </p>
                      <p className="text-xs text-gray-500">PDF files only, max 10MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="font-medium text-blue-900">{pdfFile.name}</p>
                        <p className="text-sm text-blue-600">
                          {isParsing ? "Parsing PDF..." : isParsed ? "✓ Parsed successfully" : "Ready to parse"}
                        </p>
                      </div>
                      {isParsing && (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      )}
                      {isParsed && <Check className="h-5 w-5 text-green-600" />}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={handleParsePDF}
                        disabled={isParsing || isParsed}
                        className="flex-1"
                      >
                        {isParsing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Parsing PDF...
                          </>
                        ) : isParsed ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Parsed Successfully
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Parse PDF
                          </>
                        )}
                      </Button>

                      <label className="cursor-pointer">
                        <Button type="button" variant="outline">
                          Change File
                        </Button>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={(e) => handleFileSelect(e.target.files?.[0])}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assign to Admins
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Admins</Label>
                <div className="flex flex-wrap gap-2">
                  <Controller
                    name="selectedAdmins"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            disabled={!isParsed}
                            className="flex-1 justify-start bg-transparent"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            {selectedAdmins?.length > 0
                              ? `${selectedAdmins.length} admin${selectedAdmins.length > 1 ? "s" : ""} selected`
                              : "Select admins..."}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search admins..." />
                            <CommandList>
                              <CommandEmpty>No admins found.</CommandEmpty>
                              <CommandGroup className="max-h-64 overflow-auto">
                                {adminsList.map((admin) => (
                                  <CommandItem key={admin._id} onSelect={() => toggleAdmin(admin)}>
                                    <Check
                                      className={`mr-2 h-4 w-4 ${selectedAdmins?.find((a) => a._id === admin._id) ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                    <div>
                                      <div className="font-medium">{admin.name}</div>
                                      <div className="text-xs text-gray-500">{admin.email}</div>
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    )}
                  />

                  <Button type="button" variant={assignLater ? "" : 'outline'} disabled={!isParsed} onClick={handleAssignLater}>
                    Assign Later {assignLater && <Check className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {selectedAdmins?.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm text-gray-600">Selected Admins:</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedAdmins.map((admin) => (
                      <Badge key={admin.id} variant="secondary" className="flex items-center gap-2 pr-1">
                        <div>
                          <div className="font-medium">{admin.name}</div>
                          <div className="text-xs">{admin.email}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setValue("selectedAdmins", selectedAdmins.filter((a) => a.id !== admin.id))}
                          className="ml-1 hover:text-red-600 p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {assignLater && (
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">✓ Job will be posted without admin assignment</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <Button
                type="submit"
                disabled={
                  !isParsed || isSubmitting || (!assignLater && (!selectedAdmins || selectedAdmins.length === 0))
                }
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
                size="lg"
              >
                {isSubmitting ? "Posting Job..." : "Post Job"}
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}