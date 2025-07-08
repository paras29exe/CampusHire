"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
// import { useToast } from "@/hooks/use-toast"

export default function LinksDateSection({ jobId, onValidationChange, initialData }) {
//   const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      companyLink: initialData?.companyLink || "",
      collegeLink: initialData?.collegeLink || "",
      lastDateToApply: initialData?.lastDateToApply ? new Date(initialData.lastDateToApply) : null,
    },
    mode: "onChange",
  })

  const watchedValues = watch()

  useEffect(() => {
    const isFormValid =
      watchedValues.companyLink?.trim() &&
      watchedValues.collegeLink?.trim() &&
      watchedValues.lastDateToApply !== null
    onValidationChange?.(isFormValid)
  }, [watchedValues, onValidationChange])

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}/links-date`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          lastDateToApply: data.lastDateToApply?.toISOString(),
        }),
      })
      if (!res.ok) throw new Error()
    //   toast({ title: "Success", description: "Links and date updated" })
    } catch {
    //   toast({ title: "Error", description: "Failed to update", variant: "destructive" })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Links and Application Deadline</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Company Link *</Label>
            <Input
              type="url"
              placeholder="https://company.com/careers"
              {...register("companyLink", {
                required: "Company link is required",
                pattern: { value: /^https?:\/\/.+/, message: "Enter a valid URL" },
              })}
            />
            {errors.companyLink && <p className="text-sm text-red-600">{errors.companyLink.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>College Link *</Label>
            <Input
              type="url"
              placeholder="https://college.edu/job"
              {...register("collegeLink", {
                required: "College link is required",
                pattern: { value: /^https?:\/\/.+/, message: "Enter a valid URL" },
              })}
            />
            {errors.collegeLink && <p className="text-sm text-red-600">{errors.collegeLink.message}</p>}
          </div>

          <div className="space-y-2">
            <Label>Last Date to Apply *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {watchedValues.lastDateToApply ? format(watchedValues.lastDateToApply, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={watchedValues.lastDateToApply}
                  onSelect={(date) => setValue("lastDateToApply", date, { shouldValidate: true })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.lastDateToApply && <p className="text-sm text-red-600">{errors.lastDateToApply.message}</p>}
          </div>

          <Button type="submit" disabled={!isValid} className="w-full">
            Save Links and Date
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
