import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
const OnBoarding = () => {

  // use npm install react-spinners
  const { user, isLoaded } = useUser()
  // console.log(user);
  // console.log("isLoaded:", isLoaded);
  // console.log("user:", user);
  const navigate = useNavigate()

  const handleRoleSelection = async (role) => {

    await user.update({ unsafeMetadata:{role}, }).then(() => {
      navigate(role === "recruiter" ? "/post-job" : "/jobs")
    })
      .catch((err) => {
        console.error("error is ", err)
      });
      // we can check the users in dashboard of my clerk 
      // 1 or kaam karna he agar 1 baar set kar diya ki reqcuiter he ya candidate to uske baad wo dobbara onboarding route me na aa sakte .iske liye useeffect use kiya he niche
  };

  useEffect(() => {
    // ye condition mount hone ke baad check hogi
    if (user?.unsafeMetadata?.role) {
      navigate(user.unsafeMetadata.role === "recruiter" ? "/post-job" : "/jobs");
    }
  }, [user, navigate]); // navigate ko bhi dependency mein include karo
  

  return (
    <>
      <div className='flex flex-col items-center justify-center mt-32' >
        <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl' >I am a... </h2>
        <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
          <Button onClick={() => {
            handleRoleSelection("candidate")
          }} variant="blue" className="h-32 max-sm:h-20 text-xl">CANDIDATE</Button>
          <Button onClick={() => {
            handleRoleSelection("recruiter")
          }} variant="destructive" className="h-32 max-sm:h-20  text-xl">RECRUITER</Button>
        </div>
      </div>
      {/* <BarLoader width={"100%"} color="#36d7b7" className="mb-4" /> */}
    </>

  )
}

export default OnBoarding;