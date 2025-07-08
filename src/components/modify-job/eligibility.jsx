"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { X, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
// import { useToast } from "@/hooks/use-toast"

const COURSE_OPTIONS = [
  "B.tech-CSE", "B.tech-IT", "B.tech-ECE", "B.tech-EEE", "B.tech-MECH", "B.tech-CIVIL",
  "B.tech-AIDS", "B.tech-DS", "B.tech-CYBER", "M.tech-CSE", "M.tech-IT", "M.tech-ECE",
  "M.tech-SE", "M.tech-DS", "MCA", "BCA", "B.sc-CS", "B.sc-IT", "M.sc-CS", "M.sc-IT",
  "MBA", "MBA-TECH"
]

export default function EligibilityCriteriaSection({ jobId, onValidationChange, initialData }) {
  const [newBatch, setNewBatch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  // const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      batch: initialData?.batch || [],
      cgpa: initialData?.cgpa || 0,
      courses: initialData?.courses || [],
    },
    mode: "onChange",
  })

  const watched = watch()

  useEffect(() => {
    const valid = watched.batch.length > 0 && watched.cgpa > 0 && watched.courses.length > 0
    onValidationChange?.(valid)
  }, [watched, onValidationChange])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/jobs/${jobId}/eligibility`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      // toast({ title: "Success", description: "Eligibility criteria updated" })
    } catch {
      // toast({ title: "Error", description: "Failed to update", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const addBatch = () => {
    if (newBatch && !watched.batch.includes(newBatch)) {
      setValue("batch", [...watched.batch, newBatch], { shouldValidate: true })
      setNewBatch("")
    }
  }

  const toggleCourse = (course) => {
    const updated = watched.courses.includes(course)
      ? watched.courses.filter((c) => c !== course)
      : [...watched.courses, course]
    setValue("courses", updated, { shouldValidate: true })
  }

  return (
    <Card>
      <CardHeader><CardTitle>Eligibility Criteria</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <Label>Eligible Batches *</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter batch year (e.g., 2024)"
                value={newBatch}
                onChange={(e) => setNewBatch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBatch())}
              />
              <Button type="button" onClick={addBatch} size="sm">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {watched.batch.map((b) => (
                <Badge key={b} variant="secondary" className="flex items-center gap-1">
                  {b}
                  <button
                    type="button"
                    onClick={() => setValue("batch", watched.batch.filter((batch) => batch !== b), { shouldValidate: true })}
                    className="p-0 m-0 cursor-pointer"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            {!watched.batch.length && <p className="text-sm text-red-600">Please add at least one batch</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cgpa">Minimum CGPA *</Label>
            <Input
              {...register("cgpa", {
                required: "CGPA is required",
                min: { value: 0.1, message: "CGPA must be greater than 0" },
                max: { value: 10, message: "CGPA cannot exceed 10" },
              })}
              id="cgpa"
              type="number"
              step="0.1"
            />
            {errors.cgpa && <p className="text-sm text-red-600">{errors.cgpa.message}</p>}
          </div>

          <div className="space-y-4">
            <Label>Eligible Courses *</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between bg-transparent"
                >
                  {watched.courses.length > 0
                    ? `${watched.courses.length} selected`
                    : "Select courses..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search courses..." />
                  <CommandList>
                    <CommandEmpty>No courses found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {COURSE_OPTIONS.map((course) => (
                        <CommandItem key={course} onSelect={() => toggleCourse(course)}>
                          <Check
                            className={`mr-2 h-4 w-4 ${watched.courses.includes(course) ? "opacity-100" : "opacity-0"}`}
                          />
                          {course}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {watched.courses.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {watched.courses.map((course) => (
                  <Badge key={course} variant="secondary" className="flex items-center gap-1">
                    {course}
                    <button
                      type="button"
                      onClick={() => setValue("courses", watched.courses.filter(c => c !== course), { shouldValidate: true })}
                      className="p-0 m-0 cursor-pointer"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            {!watched.courses.length && <p className="text-sm text-red-600">Please select at least one course</p>}
          </div>

          <Button type="submit" disabled={isLoading || !isValid} className="w-full">
            {isLoading ? "Saving..." : "Save Eligibility Criteria"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
