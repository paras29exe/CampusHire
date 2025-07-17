"use client"

import { Home, ArrowLeft, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/store"

export default function NotFoundPage() {
  const router = useRouter()
  const { role } = useAuthStore()

  const handleGoHome = () => {
    role ? router.push(`/dashboard/${role}/drives/active-drives`) : router.push("/auth/login")
  }

  const handleGoBack = () => {
    window.history.back()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Illustration */}
        <div className="space-y-4">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto">
            <FileQuestion className="h-16 w-16 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-gray-300">404</h1>
            <h2 className="text-3xl font-bold text-gray-900">Page Not Found</h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
              wrong URL.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleGoBack} variant="outline" className="bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={handleGoHome} className="bg-blue-600 hover:bg-blue-700">
            <Home className="h-4 w-4 mr-2" />
            Go to Homepage
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>If you believe this is an error, please contact our support team.</p>
        </div>
      </div>
    </div>
  )
}
