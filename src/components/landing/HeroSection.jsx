"use client"

import { motion } from "framer-motion"
import { ArrowRight, Play, Zap, Users, FileText, BarChart3, MessageSquareOff } from "lucide-react"

const heroContent = {
  headline: "From Chaos to Clarity",
  subheadline: "Transform Campus Recruitment with AI-Powered Intelligence",
  description:
    "Move beyond WhatsApp groups and emails. CampusHire streamlines campus recruitment with automation and actionable insights.",
  primaryCTA: "Get started",
  secondaryCTA: "Watch Demo",
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden max-sm:pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 bg-[size:20px_20px] opacity-30"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Tagline */}

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                  From <span className="text-red-600">Chaos</span> to Clarity
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-600 leading-tight"
              >
                {heroContent.subheadline}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                {heroContent.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                {heroContent.primaryCTA}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                <Play className="mr-2 h-5 w-5" />
                {heroContent.secondaryCTA}
              </button>
            </motion.div>


          </motion.div>

          {/* Right Visual - Smaller and centered on mobile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center mt-20 sm:mt-0 lg:justify-end"
          >
            {/* Main transformation card - Made smaller */}
            <div className="relative bg-white outline-2 rounded-xl shadow-xl p-4 sm:p-6 border border-gray-100 transform hover:scale-105 transition-transform duration-500 w-full max-w-sm lg:max-w-md">
              {/* Before: Chaos */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <MessageSquareOff className="w-4 h-4 text-red-500 mr-2" />
                  <h3 className="text-xs font-semibold text-red-600">Before: Recruitment Chaos</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-md border-l-3 border-red-400">
                    <span className="text-xs text-red-700">WhatsApp Group #1</span>
                    <span className="text-xs text-red-500">127 unread</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-orange-50 rounded-md border-l-3 border-orange-400">
                    <span className="text-xs text-orange-700">Email Forwards</span>
                    <span className="text-xs text-orange-500">Mixed up info</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-md border-l-3 border-yellow-400">
                    <span className="text-xs text-yellow-700">Manual Tracking</span>
                    <span className="text-xs text-yellow-500">Error prone</span>
                  </div>
                </div>
              </div>

              {/* Transformation arrow */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* After: Clarity */}
              <div>
                <div className="flex items-center mb-3">
                  <Zap className="w-4 h-4 text-blue-500 mr-2" />
                  <h3 className="text-xs font-semibold text-blue-600">After: CampusHire</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-blue-50 rounded-md border border-blue-200 text-center"
                  >
                    <FileText className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-blue-700">Smart PDF Processing</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-green-50 rounded-md border border-green-200 text-center"
                  >
                    <Users className="w-4 h-4 text-green-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-green-700">Automated Onboarding</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-purple-50 rounded-md border border-purple-200 text-center"
                  >
                    <BarChart3 className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-purple-700">Real-time Analytics</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-3 bg-indigo-50 rounded-md border border-indigo-200 text-center"
                  >
                    <Zap className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-indigo-700">Workflow Automation</p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}