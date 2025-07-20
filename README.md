# 📌 🌟 CampusHire – Revolutionizing Campus Recruitment with AI

CampusHire is an AI-powered campus recruitment management platform designed to streamline the entire hiring process for colleges. It offers secure role-based dashboards for students, teachers, admins, and superusers, with powerful features like bulk onboarding, drive management, and automated analytics.

#### ✅ Tested with 20+ email PDFs with over 95% extraction accuracy.
#### ⚡ Reduced job listing creation time from ~15 minutes to just ~10 seconds.
#### 👽 Can onboard/register 400+ students in less than 5 seconds.
#### 📚 Track performance of Each student across multiple rounds of Drive.
#### 📚 Can track the Non-applicants but eligible students to take action.
---

## ✨ Key Features

### 🔑 Role-Based Access with Protected Routes

* Secure route protection ensures every user only accesses what they are authorized for.
* Dynamic dashboards and sidebars for **Students, Teachers, Admins, and Superusers**, each with unique workflows.

### 🤖 AI-Powered Job Description Extraction (Directly from Gmail PDFs)

* Upload a PDF generated directly by Gmail's **"Print as PDF"** option—no extra effort or formatting required.
* AI automatically extracts, structures, and organizes all job details for easy publishing.

### 📥 Bulk Student Onboarding with Smart Validation

* Upload student data in PDF or Excel format.
* Automatic duplicate detection and validation for clean data.

### 🔐 Automatic Password Generation & Secure Credential Handling

* System auto-generates strong passwords for new students.
* Credentials are compiled into an Excel sheet and **emailed directly to the teacher** who performed the onboarding.

### 📊 Admin Drive Management & Round Updates

* Create and edit drive details anytime.
* Update and manage each hiring round's status.
* Generate Excel sheets of shortlisted students (with roll numbers).
* Automatically mark all other applicants as rejected for that round.

### 👩‍🏫 Teacher-Focused Management Tools

* Add and manage students within a department.
* Bulk onboard students with credential handling.
* Access directories of Admins and Teachers.
* View drive analytics relevant to their students.

### 🎓 Student Dashboard

* View active, applied, shortlisted, and expired drives.
* See live status updates for each round.
* Connect with assigned mentors.

### 👑 Superuser Oversight & Assignments

* Assign drives to Admins for further management.
* View status of all drives, including unassigned ones.
* Manage all Admins, Teachers, Students, and Superusers.
* Access system-wide analytics and insights.

### 📌 Conditional Job Detail Pages

* **Published drives:** fully visible with apply option.
* **Unpublished drives:** limited details until ready.
* **Unassigned drives:** visible only to higher roles for assignment.

### 📈 Analytics & Insights

* Real-time dashboards with placement statistics, drive performance, and participation insights.

### 🚀 Optimized Large Data Handling

* Infinite scrolling for large student and drive lists.

### 🛡 Robust Security & Authentication

* Built with **Next.js, Node.js, and MongoDB with JWT**.
* Role-based route protection and secure session management.
* Scalable backend architecture.

---

## 🏗️ Tech Stack

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JWT with custom logic
* **Icons:** lucide-react

---

## 🚀 Deployment Guide

Follow these steps to deploy CampusHire:

### 📦 Prerequisites

* Node.js (v18 or above)
* MongoDB instance (local or cloud)
* A `.env` file with all required environment variables:

  * `MONGODB_URI` = your MongoDB connection string
  * `JWT_SECRET` = your JWT secret key
  * `EMAIL_SERVICE_CONFIG` = SMTP or email service credentials (for sending Excel sheets)

### ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd campushire
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Set up your `.env` file with all required variables.

### ▶️ Running Locally

```bash
npm run dev
```

The app will start at `http://localhost:3000`.

### 🌐 Deploying on a Server or Platform

* **Vercel** (Recommended for Next.js):

  1. Push your project to GitHub.
  2. Connect GitHub repo to Vercel.
  3. Add environment variables in Vercel dashboard.
  4. Deploy.
* **Render / Railway / AWS / Azure:**

  * Ensure environment variables are added in the platform settings.
  * Build and deploy following the platform's Next.js guide.

### ✅ Post-Deployment Checklist

* Ensure MongoDB connection is live.
* Test user logins for all roles (Student, Teacher, Admin, Superuser).
* Test email service for Excel sheet delivery.
* Validate AI job description extraction with a sample PDF.

---

## 📧 Contact

If you have any questions or suggestions, feel free to reach out!

**Developer:** Paras

**Role:** Full Stack Developer & MCA Student

**College:** Chandigarh Group of Colleges, Jhanjeri

---

**CampusHire – Simplifying Campus Recruitment with AI**
