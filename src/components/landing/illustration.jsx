"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Zap,
  Users,
  FileText,
  BarChart3,
  MessageSquareOff,
  Mail,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Shield,
  Settings,
  Eye,
  Upload,
  Activity,
} from "lucide-react"

export default function Illustration() {
  const [animationKey, setAnimationKey] = useState(0)
  const [isResetting, setIsResetting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade-out
      setIsResetting(true)
      
      // After fade-out completes, reset the animation
      setTimeout(() => {
        setAnimationKey(prev => prev + 1)
        setIsResetting(false)
      }, 500) // 500ms fade-out duration
    }, 15000) // Reset every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-2xl h-96 md:py-0 py-4 lg:h-[500px]">
      {/* Container with fade effect */}
      <motion.div
        animate={{ opacity: isResetting ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {/* Chaos Elements - All with red theme, randomly scattered */}

        {/* Position 1 - Random scatter */}
        <motion.div
          key={`chaos-1-${animationKey}`}
          initial={{ opacity: 1 }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            opacity: [1, 1, 1, 1, 0.3, 0],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: 1,
              ease: "easeInOut",
            },
            rotate: {
              duration: 3,
              repeat: 1,
              ease: "easeInOut",
            },
            opacity: {
              duration: 1.5,
              delay: 3,
              ease: "easeOut",
            },
          }}
          className="absolute top-12 left-6 bg-red-100 border-2 border-red-400 rounded-lg p-3 shadow-lg"
        >
          <MessageSquareOff className="w-5 h-5 text-red-700 mb-1" />
          <div className="text-xs text-red-800 font-medium">WhatsApp</div>
          <div className="text-xs text-red-600">127 unread</div>
        </motion.div>

        {/* Position 2 - Random scatter */}
        <motion.div
          key={`chaos-2-${animationKey}`}
          initial={{ opacity: 1 }}
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 3, 0],
            opacity: [1, 1, 1, 1, 0.3, 0],
          }}
          transition={{
            y: {
              duration: 2.5,
              repeat: 1,
              ease: "easeInOut",
              delay: 0.5,
            },
            rotate: {
              duration: 2.5,
              repeat: 1,
              ease: "easeInOut",
              delay: 0.5,
            },
            opacity: {
              duration: 1.5,
              delay: 3.3,
              ease: "easeOut",
            },
          }}
          className="absolute top-24 right-12 bg-red-100 border-2 border-red-400 rounded-lg p-3 shadow-lg"
        >
          <Mail className="w-5 h-5 text-red-700 mb-1" />
          <div className="text-xs text-red-800 font-medium">Email Chaos</div>
          <div className="text-xs text-red-600">Mixed info</div>
        </motion.div>

        {/* Position 3 - Random scatter */}
        <motion.div
          key={`chaos-3-${animationKey}`}
          initial={{ opacity: 1 }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 4, -4, 0],
            opacity: [1, 1, 1, 1, 0.3, 0],
          }}
          transition={{
            y: {
              duration: 2.8,
              repeat: 1,
              ease: "easeInOut",
              delay: 1,
            },
            rotate: {
              duration: 2.8,
              repeat: 1,
              ease: "easeInOut",
              delay: 1,
            },
            opacity: {
              duration: 1.5,
              delay: 3.6,
              ease: "easeOut",
            },
          }}
          className="absolute sm:top-44 left-4 top-60 sm:left-16 bg-red-100 border-2 border-red-400 rounded-lg p-3 shadow-lg"
        >
          <Clock className="w-5 h-5 text-red-700 mb-1" />
          <div className="text-xs text-red-800 font-medium">Manual Work</div>
          <div className="text-xs text-red-600">Hours wasted</div>
        </motion.div>

        {/* Position 4 - Random scatter */}
        <motion.div
          key={`chaos-4-${animationKey}`}
          initial={{ opacity: 1 }}
          animate={{
            y: [0, 12, 0],
            rotate: [0, -5, 5, 0],
            opacity: [1, 1, 1, 1, 0.3, 0],
          }}
          transition={{
            y: {
              duration: 3.2,
              repeat: 1,
              ease: "easeInOut",
              delay: 1.5,
            },
            rotate: {
              duration: 3.2,
              repeat: 1,
              ease: "easeInOut",
              delay: 1.5,
            },
            opacity: {
              duration: 1.5,
              delay: 3.9,
              ease: "easeOut",
            },
          }}
          className="absolute top-64 right-8 bg-red-100 border-2 border-red-400 rounded-lg p-3 shadow-lg"
        >
          <AlertTriangle className="w-5 h-5 text-red-700 mb-1" />
          <div className="text-xs text-red-800 font-medium">Errors</div>
          <div className="text-xs text-red-600">Data loss</div>
        </motion.div>

        {/* Position 5 - Random scatter */}
        <motion.div
          key={`chaos-5-${animationKey}`}
          initial={{ opacity: 1 }}
          animate={{
            y: [0, -6, 0],
            rotate: [0, 3, -3, 0],
            opacity: [1, 1, 1, 1, 0.3, 0],
          }}
          transition={{
            y: {
              duration: 2.6,
              repeat: 1,
              ease: "easeInOut",
              delay: 0.8,
            },
            rotate: {
              duration: 2.6,
              repeat: 1,
              ease: "easeInOut",
              delay: 0.8,
            },
            opacity: {
              duration: 1.5,
              delay: 4.2,
              ease: "easeOut",
            },
          }}
          className="absolute hidden md:block bottom-24 left-8 bg-red-100 border-2 border-red-400 rounded-lg p-3 shadow-lg"
        >
          <Settings className="w-5 h-5 text-red-700 mb-1" />
          <div className="text-xs text-red-800 font-medium">Manual Setup</div>
          <div className="text-xs text-red-600">Complex</div>
        </motion.div>

        {/* Position 6 - Random scatter */}
        <motion.div
          key={`chaos-6-${animationKey}`}
          initial={{ opacity: 1 }}
          animate={{
            y: [0, 8, 0],
            rotate: [0, -4, 4, 0],
            opacity: [1, 1, 1, 1, 0.3, 0],
          }}
          transition={{
            y: {
              duration: 3.4,
              repeat: 1,
              ease: "easeInOut",
              delay: 1.2,
            },
            rotate: {
              duration: 3.4,
              repeat: 1,
              ease: "easeInOut",
              delay: 1.2,
            },
            opacity: {
              duration: 1.5,
              delay: 4.5,
              ease: "easeOut",
            },
          }}
          className="absolute bottom-32 right-32 bg-red-100 border-2 border-red-400 rounded-lg p-3 shadow-lg"
        >
          <Eye className="w-5 h-5 text-red-700 mb-1" />
          <div className="text-xs text-red-800 font-medium">No Visibility</div>
          <div className="text-xs text-red-600">Blind spots</div>
        </motion.div>

        {/* Position 7 - Random scatter */}
        <motion.div
          key={`chaos-7-${animationKey}`}
          initial={{ opacity: 1 }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 6, -6, 0],
            opacity: [1, 1, 1, 1, 0.3, 0],
          }}
          transition={{
            y: {
              duration: 2.9,
              repeat: 1,
              ease: "easeInOut",
              delay: 0.3,
            },
            rotate: {
              duration: 2.9,
              repeat: 1,
              ease: "easeInOut",
              delay: 0.3,
            },
            opacity: {
              duration: 1.5,
              delay: 4.8,
              ease: "easeOut",
            },
          }}
          className="absolute top-10 sm:top-36 left-1/2 transform -translate-x-1/2 bg-red-100 border-2 border-red-400 rounded-lg p-3 shadow-lg"
        >
          <Upload className="w-5 h-5 text-red-700 mb-1" />
          <div className="text-xs text-red-800 font-medium">File Mess</div>
          <div className="text-xs text-red-600">Scattered</div>
        </motion.div>

        {/* Clarity Elements - Randomly scattered in same positions */}

        {/* Clarity Position 1 - Random scatter */}
        <motion.div
          key={`clarity-1-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [-20, 0],
            y: [0, -5, 0],
          }}
          transition={{
            opacity: { delay: 4.5, duration: 0.8 },
            scale: { delay: 4.5, duration: 1, ease: "easeOut" },
            x: { delay: 4.5, duration: 0.8, ease: "easeOut" },
            y: { duration: 3, repeat: 1, ease: "easeInOut", delay: 5.5 },
          }}
          className="absolute top-12 left-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-3 shadow-lg"
        >
          <FileText className="w-5 h-5 text-blue-600 mb-1" />
          <div className="text-xs text-blue-700 font-medium">Smart PDF</div>
          <div className="text-xs text-blue-500">Auto-extract</div>
        </motion.div>

        {/* Clarity Position 2 - Random scatter */}
        <motion.div
          key={`clarity-2-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [20, 0],
            y: [0, -3, 0],
          }}
          transition={{
            opacity: { delay: 4.8, duration: 0.8 },
            scale: { delay: 4.8, duration: 1, ease: "easeOut" },
            x: { delay: 4.8, duration: 0.8, ease: "easeOut" },
            y: { duration: 2.5, repeat: 1, ease: "easeInOut", delay: 5.8 },
          }}
          className="absolute right-0 top-24 sm:right-12 bg-green-50 border-2 border-green-200 rounded-lg p-3 shadow-lg"
        >
          <Users className="w-5 h-5 text-green-600 mb-1" />
          <div className="text-xs text-green-700 font-medium">Bulk Import</div>
          <div className="text-xs text-green-500">450+ students</div>
        </motion.div>

        {/* Clarity Position 3 - Random scatter */}
        <motion.div
          key={`clarity-3-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [-20, 0],
            y: [0, -4, 0],
          }}
          transition={{
            opacity: { delay: 5.1, duration: 0.8 },
            scale: { delay: 5.1, duration: 1, ease: "easeOut" },
            x: { delay: 5.1, duration: 0.8, ease: "easeOut" },
            y: { duration: 2.8, repeat: 1, ease: "easeInOut", delay: 6.1 },
          }}
          className="absolute left-2 top-44 sm:left-16 bg-purple-50 border-2 border-purple-200 rounded-lg p-3 shadow-lg"
        >
          <BarChart3 className="w-5 h-5 text-purple-600 mb-1" />
          <div className="text-xs text-purple-700 font-medium">Analytics</div>
          <div className="text-xs text-purple-500">Progress</div>
        </motion.div>

        {/* Clarity Position 4 - Random scatter */}
        <motion.div
          key={`clarity-4-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [20, 0],
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { delay: 5.4, duration: 0.8 },
            scale: { delay: 5.4, duration: 1, ease: "easeOut" },
            x: { delay: 5.4, duration: 0.8, ease: "easeOut" },
            y: { duration: 3.2, repeat: 1, ease: "easeInOut", delay: 6.4 },
          }}
          className="absolute sm:top-64 top-56 right-8 bg-indigo-50 border-2 border-indigo-200 rounded-lg p-3 shadow-lg"
        >
          <CheckCircle className="w-5 h-5 text-indigo-600 mb-1" />
          <div className="text-xs text-indigo-700 font-medium">Automated</div>
          <div className="text-xs text-indigo-500">Zero errors</div>
        </motion.div>

        {/* Clarity Position 5 - Random scatter */}
        <motion.div
          key={`clarity-5-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: -20 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [-20, 0],
            y: [0, -3, 0],
          }}
          transition={{
            opacity: { delay: 5.7, duration: 0.8 },
            scale: { delay: 5.7, duration: 1, ease: "easeOut" },
            x: { delay: 5.7, duration: 0.8, ease: "easeOut" },
            y: { duration: 2.6, repeat: 1, ease: "easeInOut", delay: 6.7 },
          }}
          className="absolute hidden md:block bottom-24 left-8 bg-teal-50 border-2 border-teal-200 rounded-lg p-3 shadow-lg"
        >
          <Shield className="w-5 h-5 text-teal-600 mb-1" />
          <div className="text-xs text-teal-700 font-medium">Secure Access</div>
          <div className="text-xs text-teal-500">Role-based</div>
        </motion.div>

        {/* Clarity Position 6 - Random scatter */}
        <motion.div
          key={`clarity-6-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: 20 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [20, 0],
            y: [0, -5, 0],
          }}
          transition={{
            opacity: { delay: 6, duration: 0.8 },
            scale: { delay: 6, duration: 1, ease: "easeOut" },
            x: { delay: 6, duration: 0.8, ease: "easeOut" },
            y: { duration: 3.4, repeat: 1, ease: "easeInOut", delay: 7 },
          }}
          className="absolute bottom-10 sm:bottom-32 right-32 bg-cyan-50 border-2 border-cyan-200 rounded-lg p-3 shadow-lg"
        >
          <Activity className="w-5 h-5 text-cyan-600 mb-1" />
          <div className="text-xs text-cyan-700 font-medium">Tracking</div>
          <div className="text-xs text-cyan-500">Full visibility</div>
        </motion.div>

        {/* Clarity Position 7 - Random scatter */}
        <motion.div
          key={`clarity-7-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            y: [0, 10, 0],
          }}
          transition={{
            opacity: { delay: 6.3, duration: 0.8 },
            scale: { delay: 6.3, duration: 1, ease: "easeOut" },
            y: { duration: 2.9, repeat: 1, ease: "easeInOut", delay: 7.3 },
          }}
          className="absolute top-36 left-1/2 transform -translate-x-1/2 bg-emerald-50 border-2 border-emerald-200 rounded-lg p-3 shadow-lg"
        >
          <Zap className="w-5 h-5 text-emerald-600 mb-1" />
          <div className="text-xs text-emerald-700 font-medium">Instant Setup</div>
          <div className="text-xs text-emerald-500">One-click</div>
        </motion.div>

        {/* Additional scattered clarity elements */}
        <motion.div
          key={`clarity-8-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: -15 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [-15, 0],
            y: [0, -4, 0],
          }}
          transition={{
            opacity: { delay: 6.6, duration: 0.8 },
            scale: { delay: 6.6, duration: 1, ease: "easeOut" },
            x: { delay: 6.6, duration: 0.8, ease: "easeOut" },
            y: { duration: 2.7, repeat: 1, ease: "easeInOut", delay: 7.6 },
          }}
          className="absolute hidden sm:block top-72 left-40 bg-orange-50 border-2 border-orange-200 rounded-lg p-3 shadow-lg"
        >
          <TrendingUp className="w-5 h-5 text-orange-600 mb-1" />
          <div className="text-xs text-orange-700 font-medium">Growth</div>
          <div className="text-xs text-orange-500">Insights</div>
        </motion.div>

        <motion.div
          key={`clarity-9-${animationKey}`}
          initial={{ opacity: 0, scale: 0.5, x: 15 }}
          animate={{
            opacity: [0, 1],
            scale: [0.5, 1.1, 1],
            x: [15, 0],
            y: [0, -3, 0],
          }}
          transition={{
            opacity: { delay: 6.9, duration: 0.8 },
            scale: { delay: 6.9, duration: 1, ease: "easeOut" },
            x: { delay: 6.9, duration: 0.8, ease: "easeOut" },
            y: { duration: 3.1, repeat: 1, ease: "easeInOut", delay: 7.9 },
          }}
          className="absolute top-8 right-1/3 bg-pink-50 border-2 border-pink-200 rounded-lg p-3 shadow-lg"
        >
          <Settings className="w-5 h-5 text-pink-600 mb-1" />
          <div className="text-xs text-pink-700 font-medium">Smart Config</div>
          <div className="text-xs text-pink-500">Auto-setup</div>
        </motion.div>

        {/* Success indicators */}
        <motion.div
          key={`success-1-${animationKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 7.5, duration: 0.8 }}
          className="absolute -bottom-10 md:bottom-4 right-8 sm:right-32 flex items-center space-x-2 bg-green-100 border border-green-300 rounded-full px-4 py-2"
        >
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-xs font-medium text-green-700">90% Time Saved</span>
        </motion.div>

        <motion.div
          key={`success-2-${animationKey}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 7.8, duration: 0.8 }}
          className="absolute -bottom-10 md:bottom-4 left-8 sm:left-32 flex items-center space-x-2 bg-blue-100 border border-blue-300 rounded-full px-4 py-2"
        >
          <Shield className="w-4 h-4 text-blue-600" />
          <span className="text-xs font-medium text-blue-700">Zero Errors</span>
        </motion.div>
      </motion.div>
    </div>
  )
}