import { getSavedJobs } from '@/api/apiJobs'
import useFetch from '@/Hooks/useFetch'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { BarLoader } from 'react-spinners'
import { useEffect } from 'react'
import JobCard from '../JobCard'

const SavedJob = () => {
  const {isLoaded}=useUser()
  const {
    loading:loadingSavedJobs,
    data:savedJobs,
    fn:fnSavedJobs,
 }=useFetch(getSavedJobs)

useEffect(() => {
  if(isLoaded){
    fnSavedJobs()
  }
}, [isLoaded])


 if(!isLoaded || loadingSavedJobs){
  return <BarLoader width={"100%"} color='#36d7b7' className='mb-4'/>


 }


  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl pb-8">Saved Jobs</h1>
      {
           !loadingSavedJobs && (
            
            <div className='mt-8 grid grid-cols-2 lg:grid-cols-3 gap-4'>
              
              {savedJobs?.length ? (
                savedJobs.map((saved, index) => {

                  return( <JobCard key={saved.id} job={saved.job} savedInit={true} onJobSaved={fnSavedJobs}/>) 
                }
              )
              ) : (
                <div>No Saved jobs found 🥹</div>
              )}
            </div>
          )
        }
    </div>
  )
}

export default SavedJob