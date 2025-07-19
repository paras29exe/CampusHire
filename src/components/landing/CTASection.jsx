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
      {/* Background decoration */}
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
              Ready to Experience the Future of Campus Recruitment?
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto">
              Join the beta program and be among the first to transform your campus placement process.
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
              onClick={() => router .push("/auth/login")}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors group shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
            href="mailto:paras.webdev404@gmail.com?subject=Demo%20credentials%20request%20for%20CampusHire&body=Hi%20Paras,%0AI%20need%20help%20with..."
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-sm font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Request Demo
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-sm text-blue-200"
          >
            Early access • No commitment • Setup in minutes
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
