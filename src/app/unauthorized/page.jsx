"use client"

import { Shield, Home, ArrowLeft, Lock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function UnauthorizedPage() {
  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleGoBack = () => {
    window.history.back()
  }

  const handleLogin = () => {
    window.location.href = "/login"
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 403 Illustration */}
        <div className="space-y-4">
          <div className="w-32 h-32 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto">
            <Shield className="h-16 w-16 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-8xl font-bold text-gray-300">403</h1>
            <h2 className="text-3xl font-bold text-gray-900">Access Denied</h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              You don't have permission to access this page. This area is restricted to authorized users only.
            </p>
          </div>
        </div>

        {/* Warning Card */}
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">Unauthorized Access Attempt</h3>
            </div>
            <p className="text-red-700 mb-4">
              This page requires special permissions that your current account doesn't have.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="destructive">Restricted Area</Badge>
              <Badge variant="outline" className="border-red-300 text-red-700">
                Role mismatch
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Possible Reasons */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Possible Reasons</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">You're not logged in to your account</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">Your account doesn't have the required role or permissions</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">This page is restricted to specific user types (Admin, Teacher, etc.)</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p className="text-gray-600">Your session may have expired</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="">
          <Button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700">
            <Lock className="h-4 w-4 mr-2" />
            Login to Account
          </Button>
          {/* <Button onClick={handleContactAdmin} variant="outline" className="bg-transparent">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Request Access
          </Button> */}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleGoBack} variant="outline" className="bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button onClick={handleGoHome} variant="outline" className="bg-transparent">
            <Home className="h-4 w-4 mr-2" />
            Go to Homepage
          </Button>
        </div>

        {/* Help Section */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Students</h4>
                <p className="text-sm text-gray-600 mb-3">Contact your placement coordinator</p>
                {/* <Button size="sm" variant="outline" onClick={() => (window.location.href = "/contact/student")}>
                  Get Help
                </Button> */}
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Faculty</h4>
                <p className="text-sm text-gray-600 mb-3">Contact the IT administrator</p>
                {/* <Button size="sm" variant="outline" onClick={() => (window.location.href = "/contact/faculty")}>
                  Get Help
                </Button> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>If you believe you should have access to this page, please contact the system administrator.</p>
        </div>
      </div>
    </div>
  )
}
