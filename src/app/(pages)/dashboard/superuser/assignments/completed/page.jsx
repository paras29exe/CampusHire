"use client"

import CompletedDriveCard from "@/components/completedDriveCard"

export default function SuperuserCompletedDrivesPage() {
  // Mock data for superuser completed drives
  const mockCompletedDrives = [
    {
      id: "drive-su-003",
      company: {
        name: "Quantum Solutions Ltd.",
        website: "https://quantumsolutions.com",
      },
      status: "completed",
      assignedDate: "2024-06-01T09:00:00Z",
      completedDate: "2024-06-20T17:00:00Z",
      assignedAdmins: [
        { name: "Frank White", employee_id: "EMP006", email: "frank@quantum.com" },
        { name: "Grace Lee", employee_id: "EMP007", email: "grace@quantum.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
    {
      id: "drive-su-004",
      company: {
        name: "Synergy Innovations",
        website: "https://synergyinnovations.com",
      },
      status: "completed",
      assignedDate: "2024-05-10T11:00:00Z",
      completedDate: "2024-05-25T16:00:00Z",
      assignedAdmins: [
        { name: "Henry Kim", employee_id: "EMP008", email: "henry@synergy.com" },
        { name: "Ivy Chen", employee_id: "EMP009", email: "ivy@synergy.com" },
        { name: "Jack Davis", employee_id: "EMP010", email: "jack@synergy.com" },
      ],
      assignedBy: { name: "Super Admin", employee_id: "SUP001", email: "super@example.com" },
    },
  ]

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">Superuser: Completed Drives</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCompletedDrives.map((drive) => (
          <CompletedDriveCard key={drive.id} driveData={drive} userRole="superuser" />
        ))}
      </div>
    </div>
  )
}
