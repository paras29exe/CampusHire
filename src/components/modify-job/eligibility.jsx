"use client"

import { useState } from "react"
import { X, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { COURSE_OPTIONS } from "@/constants/courses"
import { toast } from "sonner"
import axios from "axios"

export default function EligibilityCriteriaSection({ jobId, onValidationChange, initialData }) {
  const [batch, setBatch] = useState(initialData?.batches || [])
  const [cgpa, setCgpa] = useState(initialData?.cgpa || 0)
  const [courses, setCourses] = useState(initialData?.courses || [])
  const [newBatch, setNewBatch] = useState("")
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const addBatch = () => {
    if (newBatch && !batch.includes(newBatch)) {
      setBatch([...batch, newBatch])
    }
    setNewBatch("")
  }

  const removeBatch = (b) => {
    setBatch(batch.filter((item) => item !== b))
  }

  const toggleCourse = (course) => {
    if (courses.includes(course)) {
      setCourses(courses.filter((c) => c !== course))
    } else {
      setCourses([...courses, course])
    }
  }

  const removeCourse = (c) => {
    setCourses(courses.filter((item) => item !== c))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (cgpa === null || !batch.length || !courses.length) {
      toast("Please fill all fields", { action: { label: "OK" }, style: { background: "red", color: "white" } })
      return
    }
    // only validation: cgpa between 0 and 10
    if (!(cgpa >= 0 && cgpa <= 10)) {
      toast("CGPA must be greater than 0 and less than 10", { action: { label: "OK" }, style: { background: "red", color: "white" } })
      return
    }
    if (batch.length === 0) {
      toast("Add at least one batch", { action: { label: "OK" }, style: { background: "red", color: "white" } })
      return
    }
    if (courses.length === 0) {
      toast("Select at least one course", { action: { label: "OK" }, style: { background: "red", color: "white" } })
      return
    }

    setIsLoading(true)
    try {
      const res = await axios.put(`/api/admin/jobs/${jobId}/modify-eligibility`, {
        batches: batch,
        cgpa: parseFloat(cgpa),
        courses,
      })

      toast("Eligibility criteria updated successfully", { action: { label: "OK" }, style: { background: "#f0f4f8", color: "#333" } })
      onValidationChange(true)
    } catch (error) {
      toast("Error updating eligibility criteria", { action: { label: "OK" } })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eligibility Criteria</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Eligible Batches *</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter passing batch year (e.g., 2027)"
                value={newBatch}
                onChange={(e) => setNewBatch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addBatch()
                  }
                }}
              />
              <Button type="button" onClick={addBatch} size="sm">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {batch.map((b) => (
                <Badge key={b} variant="secondary" className="flex items-center gap-1">
                  {b}
                  <button type="button" onClick={() => removeBatch(b)} className="p-0 m-0 cursor-pointer">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cgpa">Minimum CGPA *</Label>
            <Input
              id="cgpa"
              type="number"
              required
              step="0.1"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
            />
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
                  {courses.length > 0 ? `${courses.length} selected` : "Select courses..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command >
                  <CommandInput placeholder="Search courses..." />
                  <CommandList>
                    <CommandEmpty>No courses found.</CommandEmpty>
                    <CommandGroup className="max-h-64 overflow-auto">
                      {COURSE_OPTIONS.map((course) => (
                        <CommandItem key={course} onSelect={() => toggleCourse(course)}>
                          <Check
                            className={`mr-2 h-4 w-4 ${courses.includes(course) ? "opacity-100" : "opacity-0"
                              }`}
                          />
                          {course}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {courses.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {courses.map((c) => (
                  <Badge key={c} variant="secondary" className="flex items-center gap-1">
                    {c}
                    <button type="button" onClick={() => removeCourse(c)} className="p-0 m-0 cursor-pointer">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Saving..." : "Save Eligibility Criteria"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
