"use client"

import React from "react"

import { useState } from "react"
import { X, Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandList, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { toast } from "sonner"
import { COURSE_OPTIONS } from "@/constants/course-options" // Assuming you have a constants file for course options

export default function EligibilityCriteriaSection({
  jobId,
  onValidationChange,
  initialData,
}) {
  const [batch, setBatch] = useState(initialData?.batch || [])
  const [cgpa, setCgpa] = useState(initialData?.cgpa || 0)
  const [selectedCourses, setSelectedCourses] = useState(initialData?.courses || [])

  const [newBatch, setNewBatch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // Validation function
  const validateSection = () => {
    return batch.length > 0 && cgpa > 0 && selectedCourses.length > 0
  }

  // Call validation callback whenever form changes
  React.useEffect(() => {
    if (onValidationChange) {
      onValidationChange(validateSection())
    }
  }, [batch, cgpa, selectedCourses, onValidationChange])

  const addBatch = () => {
    if (newBatch && !batch.includes(newBatch)) {
      setBatch([...batch, newBatch])
      setNewBatch("")
    }
  }

  const removeBatch = (batchToRemove) => {
    setBatch(batch.filter((b) => b !== batchToRemove))
  }

  const toggleCourse = (course) => {
    setSelectedCourses((prev) => (prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]))
  }

  const removeCourse = (courseToRemove) => {
    setSelectedCourses((prev) => prev.filter((c) => c !== courseToRemove))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/jobs/${jobId}/eligibility`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batch,
          cgpa,
          courses: selectedCourses, // Direct array of strings
        }),
      })

      if (!response.ok) throw new Error("Failed to update eligibility criteria")

      toast("Changes have been saved", {
        description: "Eligibility criteria updated successfully",
        action: {
          label: "OK",
          onClick: () => console.log("Undo"),
        },
      })

    } catch (error) {
      toast("Error", {
        description: "Failed to update eligibility criteria",
        action: {
          label: "Retry",
          onClick: handleSave,
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eligibility Criteria</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Batch Section */}
        <div className="space-y-3">
          <Label>Eligible Batches *</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter batch year (e.g., 2024)"
              value={newBatch}
              onChange={(e) => setNewBatch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addBatch()}
            />
            <Button onClick={addBatch} size="sm">
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {batch.map((b) => (
              <Badge key={b} variant="secondary" className="flex items-center gap-1">
                {b}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeBatch(b)} />
              </Badge>
            ))}
          </div>
          {batch.length === 0 && <p className="text-sm text-red-600">Please add at least one batch</p>}
        </div>

        {/* CGPA Section */}
        <div className="space-y-2">
          <Label htmlFor="cgpa">Minimum CGPA *</Label>
          <Input
            id="cgpa"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={cgpa}
            onChange={(e) => setCgpa(Number.parseFloat(e.target.value) || 0)}
            required
          />
          {cgpa <= 0 && <p className="text-sm text-red-600">Please enter a valid CGPA</p>}
        </div>

        {/* Courses Section */}
        <div className="space-y-4">
          <Label>Eligible Courses *</Label>

          {/* Multi-select Dropdown */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-transparent"
              >
                {selectedCourses.length > 0
                  ? `${selectedCourses.length} course${selectedCourses.length > 1 ? "s" : ""} selected`
                  : "Select courses..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
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
                          className={`mr-2 h-4 w-4 ${selectedCourses.includes(course) ? "opacity-100" : "opacity-0"}`}
                        />
                        {course}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Selected Courses Display */}
          {selectedCourses.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Selected Courses:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedCourses.map((course) => (
                  <Badge key={course} variant="secondary" className="flex items-center gap-1">
                    {course}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeCourse(course)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {selectedCourses.length === 0 && <p className="text-sm text-red-600">Please select at least one course</p>}
        </div>

        <Button onClick={handleSave} disabled={isLoading || !validateSection()} className="w-full">
          {isLoading ? "Saving..." : "Save Eligibility Criteria"}
        </Button>
      </CardContent>
    </Card>
  )
}
