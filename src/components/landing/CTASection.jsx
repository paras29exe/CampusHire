"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CTASection() {
  const router = useRouter()
  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-30"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Ready to Simplify Your Campus Hiring?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
              Be among the first to modernize placements with instant job uploads, student tracking, and analytics — all in one place.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/auth/login")}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors group shadow-lg"
            >
              Try CampusHire Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="mailto:paras.webdev404@gmail.com?subject=Demo%20credentials%20request%20for%20CampusHire&body=Hi%20Paras,%0A%0AI%20came%20across%20your%20project%20CampusHire%20and%20I%E2%80%99m%20really%20impressed%20with%20its%20features%20and%20workflow.%0A%0AI%20would%20like%20to%20request%20demo%20credentials%20to%20explore%20the%20platform%20further.%0A%0APlease%20let%20me%20know%20if%20you%20need%20any%20additional%20information%20from%20my%20side.%0A%0ALooking%20forward%20to%20your%20response.%0A%0AThanks%20%26%20Regards,%0A[Your%20Name]%0A[Your%20Organization%20/%20College]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-sm font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Request a Demo
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-blue-200"
          >
            No setup hassle • Early access • Be placement‑ready in minutes
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
