# Full Stack Job Application Platform

## Overview

This project is a full-stack  job application named "JobBase"  platform built using React with Clerk for authentication and Supabase for backend services. It provides features for job listing, application management, and company management.

## Key Technologies

- **Frontend:**
  - **React**: The main library used for building the user interface.
  - **@clerk/clerk-react**: For user authentication and management.
  - **Supabase**: Backend service for database and storage.
  - **React Hook Form**: For form handling and validation.
  - **Zod**: For schema validation.
  - **Tailwind CSS**: For styling.
  - **Lucide Icons**: For icons.

- **Backend:**
  - **Supabase**: Provides the database and storage solutions.

## Features

### User Authentication

- Users can sign in and manage their accounts using Clerk.
- Users can done onBoarding precess to know they are candidate or recruiter
- Protected routes ensure that only authenticated users can access certain parts of the application.

### Job Management

- Recruiters can create, delete job listings and selected weather the job is open or closed ,iterviewing,selected or rejected.
- Recruiter can see the applications and resume directly on that job page 
- Users can search for jobs by location, company, or title and apply for that job .
- Jobs can be saved or unsaved by users.

### Application Management

- Candidates can apply for jobs and upload their resumes.
- Candidates can save their Favorite Jobs ❤️.
- Applications can be tracked and managed by recruiters.
- Application statuses can be updated (e.g., applied, interviewing, hired, rejected).

### Company Management

- Recruiters can add new companies to the system.
- Company logos are uploaded and stored using Supabase storage.

### Page Management 
- Recruiter can see their posted jobs in My-job page .
- Candidate can see their applied jobs in My-jobs page.
-Both can find option of Myjob page in their profile icon .

