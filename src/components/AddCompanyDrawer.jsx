
import { z } from "zod"
import { Button } from "./ui/button"
import { useForm } from "react-hook-form"
import React from 'react'
import { useEffect } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "./ui/input"
import useFetch from "@/Hooks/useFetch"
import { addNewCompany } from "@/api/apiApplications"
import { BarLoader } from "react-spinners"

const schema = z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    logo: z
  .any()
  .refine((file) => file?.[0] && 
    (file[0].type === "image/png" || 
     file[0].type === "image/jpeg" || 
     file[0].type === "image/svg+xml"),  {
        message: "Only images are allowed"
    })
})
const AddCompanyDrawer = ({fetchCompanies}) => {
    const {
        register, handleSubmit, formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });
    const {
        loading:loadingAddCompany,
        error:errorAddCompany,
        data:dataAddCompany,
        fn:fnAddCompany,
    }=useFetch(addNewCompany);

    const onSubmit=(data)=>{
        fnAddCompany({
            ...data,
            logo:data.logo[0],
        })

    }

    useEffect(() => {
      if(dataAddCompany?.length>0){
        fetchCompanies();
      }
    }, [loadingAddCompany])
    
    return (
        <Drawer>
            <DrawerTrigger><Button type="button" variant="secondary" size="sm">Add Company</Button></DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add a new company</DrawerTitle>
                </DrawerHeader>
                <form className="flex gap-2 p-4 pb-0" action="">
                    <Input placeholder="Company name" {...register("name")}/>
                    <Input
                    type="file"  accept="image/*" className="file:text-gray-500" {...register("logo")} />
                    <Button type="button" onClick={handleSubmit(onSubmit)} variant="destructive" className="w-40"> Add </Button>
                </form>
                {
                    errors.name && <p className="text-red-500">{errors.name.message}</p>
                }
                 {
                
                     errors.logo && <p className="text-red-500">{errors.logo.message}</p>
                    }  
                    {
                        errorAddCompany?.message &&(
                            <p className="text-red-500">{errorAddCompany?.message}</p>
                        )
                    }
    {
        loadingAddCompany && <BarLoader width={"100%"} color="#36d7b7" className="mt-2"/>
    }
                     <DrawerFooter>
                    <DrawerClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

    )
}

export default AddCompanyDrawer