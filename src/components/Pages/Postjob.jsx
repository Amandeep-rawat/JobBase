
import React, { useEffect } from 'react'
import useFetch from '@/Hooks/useFetch'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import { Input } from '../ui/input'
import { State } from 'country-state-city'
import { Textarea } from '../ui/textarea'
import { getCompanies } from '@/api/apiCompanies'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select"
import { useUser } from '@clerk/clerk-react'
import { BarLoader } from 'react-spinners'
import {useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { Button } from '../ui/button'
import MDEditor from '@uiw/react-md-editor'
import { addNewJob } from '@/api/apiJobs'
import AddCompanyDrawer from '../AddCompanyDrawer.jsx'
const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  company_id: z.string().min(1, { message: "Company_id is required" }),
  requirements: z.string().min(1, { message: "Requirements arerequired" }),

})



const Postjob = () => {
  const { isLoaded, user } = useUser()
  const navigate=useNavigate()
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  })
  const { fn: fnCompanies, data: companies, loading: loadingCompanies } = useFetch(getCompanies);


  useEffect(() => {
    if (isLoaded) {
      fnCompanies()
    }
  }, [isLoaded]);

  const{
    loading:loadingCreateJob,
    error:errorCreateJob,
    data:dataCreateJob,
    fn:fnCreateJob,
  }=useFetch(addNewJob)


  const onSubmit=(data)=>{
    fnCreateJob({
      ...data,
      recruiter_id:user.id,
      isOpen:true,
    })
  }

  useEffect(() => {
    if(dataCreateJob?.length>0){
     navigate('/jobs')
    }
    
  }, [loadingCreateJob])
  

  if (!isLoaded || loadingCompanies) {


    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />

  }
  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />
  }

  return (

    <>
      <div>
        <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl  text-center pb-8'>Post a job</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 p-4 pb-0' action="">

          <Input placeholder="Job Title" {...register("title")} />
          {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
          <Textarea placeholder='Job Description' {...register("description")} />
          {
            errors.description &&
            <p className='text-red-500'>{errors.description.message}</p>
          }
          <div className='flex gap-4 items-center'>
            <Controller name='location' control={control} render={({ field }) => (

              <Select
              value={field.value} onValueChange={field.onChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {
                      State.getStatesOfCountry("IN").map(({ name }) => {
                        return (
                          <SelectItem key={name} value={name} >{name}</SelectItem>
                        )
                      })
                    }

                  </SelectGroup>
                </SelectContent>
              </Select>

            )} />

            {/* rendreeing  */}
            <Controller name='company_id' control={control} render={({ field }) => (

            <Select
            
             value={field.value} onValueChange={field.onChange}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Filter by company" >
                  {field.value ?companies?.find((com)=>com.id === Number(field.value))?.name:"Companies"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    companies?.map(({ name, id }) => {

                      return (
                        <SelectItem key={name} value={id} >{name}</SelectItem>
                      )
                    })
                  }

                </SelectGroup>
              </SelectContent>
            </Select>
            )}/>

          <AddCompanyDrawer fetchCompanies={fnCompanies}/>
          </div>
            

          {/* Add companies drawer */}
            {
              errors.location &&(
                <p className='text-red-500'>{errors.location.message}</p>
              )
            }
            {
              errors.company_id &&(
                <p className='text-red-500'>{errors.company_id.message}</p>
              )
            }
            <Controller  name='requirements' control={control} render={({field})=><MDEditor value={field.value} onChange={field.onChange}  textareaProps={{
        placeholder: "You can add requirements here. It is an MDEditor. You can customize by bullets points.", // Adding the placeholder
      }}/>}/>
            {
              errors.requirements &&(
                <p className='text-red-500'>{errors.requirements.message}</p>
              )
            }
            {
              errorCreateJob?.message &&(
                <p className='text-red-500'>{errorCreateJob?.message}</p>
              )
            }
            {
              loadingCreateJob &&<BarLoader width={"100%"} color='#36d7b7' className='mt-2'/>
            }
<Button type="submit"  variant="blue" size="lg">Submit</Button>
        </form>

      </div>
    </>
  )
}

export default Postjob