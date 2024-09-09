import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from '../ui/button'
import data from '../data/companies.json';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card,CardHeader,CardContent,CardTitle } from '../ui/card';
import faqs from "../data/faq.json"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../components/ui/accordion'


const LandingPage = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-15'>
      <section className='text-center'>
        <h1 className='flex flex-col items-center justify-center gradient-title text-4xl sm:text-5xl lg:text-7xl max-[380px]:text-3xl   font-bold'>Find Your Dream job <span className='pb-2'>and get Hired</span></h1>
        <p className="text-gray-300  sm:mt-4 max-sm:mt-4 text-xs sm:text-xl">Explore thousands of job listing  or find the perfect candidate</p>
      </section>
      <div className='flex gap-6 justify-center'>
        {/* buttons */}
        <NavLink to="/jobs">
          <Button variant="blue" size="xl" >Find Jobs</Button>
        </NavLink>
        <NavLink to="/post-job">
          {/* add a varient first in button .jsx check there i added blue and xl  */}
          <Button variant="destructive" size="xl"  >Post a Jobs</Button>
        </NavLink>

      </div>
      {/* crousers */}
      <Carousel plugins={[  Autoplay({delay:2000})]} loop={true}

        className="w-full max-sm:w-[90%] max-sm:m-auto py-10 relative z-10 " >
        <CarouselContent className="flex justify-between gap-3 md:gap-20  items-center">
          {data.map(({name,id,path})=>{
            return (
              <CarouselItem key={id} className="basis-1/4 max-sm:basis-1/3  lg:basis-1/6 flex justify-center items-center">
                <img className= 'md:h-14 max-sm:h-8 max-md:h-10 max-[441px]:h-6 ' src={path} alt={name} />
                </CarouselItem>

            )
          })

          }
      </CarouselContent>

    </Carousel>

      {/* bannner */ }
     


      <img className='w-1/2 m-auto' src="/assets/slider2.png" alt="slider2" />
      

  <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
    {/* cards */}
    <Card>
  <CardHeader>
    <CardTitle>For job seekers</CardTitle>
    {/* <CardDescription>Card Description</CardDescription> */}
  </CardHeader>
  <CardContent>
    <p>Search and apply for jobs,track applications,and more</p>
  </CardContent>
</Card>


    <Card>
  <CardHeader>
    <CardTitle>For employers</CardTitle>
    {/* <CardDescription>Card Description</CardDescription> */}
  </CardHeader>
  <CardContent>
    <p>Post jobs,manage applications,and find the best candidates</p>
  </CardContent>
</Card>

  </section>
  {/* accrodion */ }
  <Accordion  type="single" collapsible>
  {
    faqs.map((faq,index)=>{
      return (

  <AccordionItem key={index} value={`item-${index+1}`}>
    <AccordionTrigger>{faq.question}</AccordionTrigger>
    <AccordionContent>
      {
        faq.answer
      }
    </AccordionContent>
  </AccordionItem>
  )     
})
    }
</Accordion>
  



    </main >
  )
}

export default LandingPage