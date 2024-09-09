import { getApplication } from '@/api/apiApplications'
import useFetch from '@/Hooks/useFetch'
import React, { useEffect } from 'react'
import ApplicationCard from './ApplicationCard'
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'

const CreatedApplications = () => {
  const { user } = useUser()
  
  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplication, {
    user_id: user?.id,
  })

  useEffect(() => {
    if (user?.id) { // Ensure user is loaded before calling fnApplications
      fnApplications()
    }
  }, [user?.id])

  // Handle loading state
  if (loadingApplications) {
    return <BarLoader width={"100%"} color='#36d7b7' className='mb-4' />
  }

  // Guard against undefined applications
  if (!applications || applications.length === 0) {
    return <div>No applications found 🥹</div>
  }

  return (
    <div className='flex flex-col gap-2'>
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} isCandidate />
      ))}
    </div>
  )
}

export default CreatedApplications
