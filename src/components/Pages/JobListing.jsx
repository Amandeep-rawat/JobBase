import React, { useEffect, useState } from 'react';
import { getJobs } from '@/api/apiJobs';
import { useUser } from '@clerk/clerk-react';
import useFetch from '@/Hooks/useFetch';
import { BarLoader } from 'react-spinners';
import JobCard from '../JobCard';
import { getCompanies } from '@/api/apiCompanies';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,SelectGroup
} from "@/components/ui/select"

import { State } from 'country-state-city';
const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const { fn: fetchJobs, data: jobs, loading: loadingJobs, error } = useFetch(getJobs, { location, company_id, searchQuery });
  const { fn: fnCompanies, data: companies,} = useFetch(getCompanies);

  
  useEffect(() => {
    if (isLoaded) {
      fnCompanies()
    }
  }, [isLoaded]);



  useEffect(() => {
    if (isLoaded) {
      fetchJobs()
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if (error) {
    return <div>Error fetching jobs: {error.message}</div>;
  }
  //  old code without custom hook 
  //  const fetchjob=async()=.[
//   const supabaseacessotoken=await ssession.gettoke({
//     template:"supabse"
//   })
//   const dataa=await getJobs(supabaseacessotoken)
//   console.log(data)

// }
// useEffect(() => {
//   fetchJobs()

// }, [])

const handleSearch=(e)=>{
e.preventDefault();
let formData=new FormData(e.target);
const query=formData.get("search-query");
if(query){
  setSearchQuery(query)
}
}

const clearFilters=()=>{
  setSearchQuery("")
  setCompany_id("")
  setLocation("")
}

  return (
    <>
      <div>
        <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center max-sm:text-4xl pb-8'>Latest Jobs</h1>
        {/* Filter controls can be added here */}
        <form className='h-14 flex w-full gap-2 items-center mb-3' onSubmit={handleSearch}>
          <Input type="text" placeholder="search jobs by title" name="search-query" className="h-full flex01 px-4 text-md"/>
          <Button variant="blue" className="h-full sm:w-28" type="submit">Submit</Button>
        </form>
        <div className='flex flex-col sm:flex-row gap-2'>


        <Select value={location} onValueChange={(value)=>setLocation(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            State.getStatesOfCountry("IN").map(({name})=>{
              return (
                <SelectItem key={name} value={name} >{name}</SelectItem>
              )
            })
          }
          
        </SelectGroup>
      </SelectContent>
    </Select>

        <Select value={company_id} onValueChange={(value)=>setCompany_id(value)}>
      <SelectTrigger className="">
        <SelectValue placeholder="Filter by company" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {
            companies?.map(({name,id})=>{
              
              return (
                <SelectItem key={name} value={id} >{name}</SelectItem>
              )
            })
          }
          
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button variant="destructive" className="sm:w-1/2" onClick={clearFilters} >Clear filters</Button>
        </div>





        {
          loadingJobs ? (
            <BarLoader className='mt-4' width={"100%"} color='#36d7b7' />
          ) : (
            <div className='mt-8 grid grid-cols-2 max-sm:grid-cols-1 lg:grid-cols-3 gap-4'>
              
              {jobs?.length ? (
                jobs.map((job, index) => {

                  return( <JobCard key={job.id} job={job} onJobSaved={fetchJobs} savedInit={job?.saved?.length>0}/>) 
                }
              )
              ) : (
                <div>No jobs found 🥹</div>
              )}
            </div>
          )
        }
      </div>
    </>
  );
}

export default JobListing;
