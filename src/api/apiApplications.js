import supabaseClient from "@/utils/supabase";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function applyToJob(token,_,jobData) {
    const supabase=await supabaseClient(token);

    const random=Math.floor(Math.random()*90000);
    const fileName=`resume-${random}-${jobData.candidate_id}`
   const {error:storageError}= await supabase.storage.from('resumes').upload(fileName,jobData.resume)
    if(storageError){
    console.error("Errror uploading Resume",storageError)
    return null;

    }
    const resume=`${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`


    
        const {data,error}= await supabase.from("applications").insert([
            {
            ...jobData,
            resume,
        }
    ]).select()
        if(error){
            console.error("error submitting application",error)
            return null;
        }
        return data;
            
    
}

export async function updateApplicationStatus(token,{job_id},status) {
    const supabase=await supabaseClient(token);


    
        const {data,error}= await supabase.from("applications").update({status}).eq("job_id",job_id).select();
        if(error ||data.length===0){
            console.error("error updating application status",error)
            return null;
        }
        return data;
            
    
}

export async function addNewCompany(token,_,companyData) {
    const supabase=await supabaseClient(token);

    const random=Math.floor(Math.random()*90000);
    const fileName=`logo-${random}-${companyData.name}`
   const {error:storageError}= await supabase.storage.from('company-logo').upload(fileName,companyData.logo)
    if(storageError){
    console.error("Errror uploading companyLogo",storageError)
    return null;

    }
    const logo_url=`${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`


    
        const {data,error}= await supabase.from("companies").insert([
            {
            name:companyData.name,
            logo_url,
        }
    ]).select()
        if(error){
            console.error("error submitting company",error)
            return null;
        }
        return data;
            
            
    
}


export async function getApplication(token,{user_id}) {
    const supabase=await supabaseClient(token);


    
        const {data,error}= await supabase.from("applications").select("*,job:jobs(title,company:companies(name))").eq("candidate_id",user_id);
        if(error){
            console.error("error fetching applications",error)
            return null;
        }
        return data;
            
    
}