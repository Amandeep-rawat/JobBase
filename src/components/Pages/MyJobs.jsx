import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners'
import CreatedApplications from '../CreatedApplications'
import CreatedJobs from '../CreatedJobs'
const MyJobs = () => {
  const {user,isLoaded}=useUser()
  if(!isLoaded){
    return <BarLoader width={"100%"} color='#36d7b7' className='mb-4'/>
  }

  return (
    <div>
      <h1 className="gradient-title font-bold text-5xl text-center sm:text-7xl pb-8">{user?.unsafeMetadata?.role=== "candidate"?"My Applications":"My Jobs"}</h1>
      {user?.unsafeMetadata?.role === "candidate"? <CreatedApplications/> : <CreatedJobs/> }
    </div>
  )
}

export default MyJobs