import { getMyJobs } from '@/api/apiJobs'
import useFetch from '@/Hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners'
import { useEffect } from 'react'
import JobCard from './JobCard'
const CreatedJobs = () => {
    const {user}=useUser()
    const {
        loading:loadingCreatedJobs,
        data:createdJobs,
        fn:fnCreatedJobs,
    }=useFetch(getMyJobs,{
        recruiter_id:user.id,
    });
    useEffect(() => {
      fnCreatedJobs()
    }, [])
    if(loadingCreatedJobs){
        return <BarLoader width={"100%"} color='#36d7b7' className='mb-4'/>
    }
    
  return (
    <div>
        
              <div className='mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4'>
                
                {createdJobs?.length ? (
                  createdJobs.map((job, index) => {
  
                    return( <JobCard key={job.id} job={job} onJobSaved={fnCreatedJobs} isMyJob />) 
                  }
                )
                ) : (
                  <div>No jobs found 🥹</div>
                )}
              </div>
            
          
        
        </div>
  )
}

export default CreatedJobs