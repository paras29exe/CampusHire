"use client"

import { motion } from "framer-motion"
import { Upload, Zap, CheckCircle, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload PDF",
    description: "Upload company job description PDFs to the platform.",
  },
  {
    icon: Zap,
    title: "AI Processing",
    description: "AI automatically extracts and structures job information.",
  },
  {
    icon: CheckCircle,
    title: "Review & Publish",
    description: "Review extracted data and publish drives to students.",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    description: "Monitor applications and analyze drive performance.",
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Simple 4-step process to streamline your campus recruitment.
          </p>
        </motion.div>

        <div className="relative">
         
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full mb-4 relative z-10">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-4">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
