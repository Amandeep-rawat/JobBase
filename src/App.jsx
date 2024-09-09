import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import LandingPage from './components/Pages/LandingPage'
import AppLayout from './components/Layouts/AppLayout'
import OnBoarding from './components/Pages/OnBoarding'
import JobListing from './components/Pages/JobListing'
import MyJobs from './components/Pages/MyJobs'
import Postjob from './components/Pages/Postjob'
import SavedJob from './components/Pages/SavedJob'
import Job from './components/Pages/Job'
import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from './components/ProtectedRoute'
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element:


          <LandingPage />

      },

      {
        path: '/onboarding',
        element: (<ProtectedRoute><OnBoarding /></ProtectedRoute>)
      },
      {
        path: '/jobs',
        element: (<ProtectedRoute><JobListing /></ProtectedRoute>)
      },
      {
        path: '/job/:id',
        element: (<ProtectedRoute><Job /></ProtectedRoute>)
      },
      {
        path: '/post-job',
        element: (<ProtectedRoute><Postjob /></ProtectedRoute>)
      },
      {
        path: '/saved-jobs',
        element: (<ProtectedRoute><SavedJob /></ProtectedRoute>)
      },
      {
        path: '/my-jobs',
        element: (<ProtectedRoute><MyJobs /></ProtectedRoute>)
      },
    ]
  }
])
function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

      <RouterProvider router={router} />
    </ThemeProvider>




  )
}

export default App
