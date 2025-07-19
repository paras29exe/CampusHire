"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "How it Works", href: "#process" },
    { name: "Analytics", href: "#analytics" },
    { name: "Pricing", href: "#pricing" },
  ],
}

const socialLinks = [
  { icon: Github, href: "https://github.com/paras29exe", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/paras29exe", label: "LinkedIn" },
  { icon: Mail, href: "mailto:portal.campushire@gmail.com", label: "Email" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CH</span>
              </div>
              <span className="text-xl font-bold">CampusHire</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md">
              Transforming campus recruitment from chaos to clarity with AI-powered automation and intelligent workflows.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a
                  href="mailto:portal.campushire@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  📧 CampusHire: portal.campushire@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:paras.webdev404@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  📩 Paras: paras.webdev404@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/paras29exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  🔗 LinkedIn: Paras
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-sm text-gray-400">© 2024 CampusHire. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2 sm:mt-0">
            Crafted with ❤️ by <span className="text-blue-400 font-medium">Paras</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
