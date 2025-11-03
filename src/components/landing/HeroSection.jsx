"use client"
import { motion } from "framer-motion"
import { ArrowRight, Laptop } from "lucide-react"
import Illustration from "@/components/landing/illustration"
import { useRouter } from "next/navigation"

const heroContent = {
  headline: "From Chaos to Clarity",
  subheadline: "Smarter hiring. Powered by AI.",
  description:
    "Say goodbye to WhatsApp chaos - streamline every step of campus hiring with automation and insights.",
  primaryCTA: "Get started",
  secondaryCTA: "Request Demo",
}

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden pt-32 lg:pt-0">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-blue-100/25 bg-[size:20px_20px] opacity-30"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8  text-center lg:text-left"
          >
            {/* Tagline */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl  sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
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
              <button
              onClick={() => router.push('/auth/login')}
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group">
                {heroContent.primaryCTA}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
              onClick={() => {
                window.location.href = "mailto:paras.webdev404@gmail.com?subject=Demo%20credentials%20request%20for%20CampusHire&body=Hi%20Paras,%0A%0AI%20came%20across%20your%20project%20CampusHire%20and%20I%E2%80%99m%20really%20impressed%20with%20its%20features%20and%20workflow.%0A%0AI%20would%20like%20to%20request%20demo%20credentials%20to%20explore%20the%20platform%20further.%0A%0APlease%20let%20me%20know%20if%20you%20need%20any%20additional%20information%20from%20my%20side.%0A%0ALooking%20forward%20to%20your%20response.%0A%0AThanks%20%26%20Regards,%0A[Your%20Name]%0A[Your%20Organization%20/%20College]"
              }}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                <Laptop className="mr-2 h-5 w-5" />
                {heroContent.secondaryCTA}
              </button>
            </motion.div>
          </motion.div>

          {/* Right Visual - Dynamic Transformation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center mt-0 lg:justify-end"
          >
            <Illustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
