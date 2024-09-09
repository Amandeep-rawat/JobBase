import React, { useEffect } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import { Button } from './ui/button'

import { useState } from 'react'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Briefcase, BriefcaseBusiness, Heart, PenBox } from 'lucide-react';
import { useSearchParams } from 'react-router-dom'
import { BarLoader } from 'react-spinners'



const Header = () => {
  const [showSignIn, setshowSignIn] = useState(false)
  const [search, setsearch] = useSearchParams();
  const { user,isLoaded } = useUser()
  // console.log(user)
  // search.get('sign-in'): Yeh check karta hai ki kya sign-in query(means ? ke baad wali chize) parameter URL me present hai.
  // setshowSignIn(true): Agar sign-in query parameter hai, toh yeh showSignIn state ko true set karta hai, jisse sign-in overlay visible ho jata hai.
  // [search]: Dependency array, jo batata hai ki effect tab execute hoga jab search object change hoga.

  useEffect(() => {
    if (search.get('sign-in') === "true") {
      setshowSignIn(true);
    }

  }, [search])


  const handleOverlayClick = (e) => {
    // e.target means jaha maine click kiya he . ab kahi vi kar sakta hun wo e.target me aayega
    // note:inset 0 use hua he niche ab wo div puri screen ki width le rha he . bas content width same rahegi
    // means jab vi cotnent div ke bahar kahi vi mai click karuga to wo mai div pe vi click kar rha hun to e.target===e.curretntarget hi rhega. isliliye onclick wala func call ho jaega. or agar mai div ke andr vi kisi blank jagah pe click karta hun tab vi e.target===e.curenttarget hi rahega and agar mai div ke andr kisi element par click karu to e.target vo speicfic element ho jaega jis insisde element pe maine click kiya he to if condition ke andr nhi jaega.
    // e.currenttraget means jispe evernlistener lagaya he means jispe onclick function lga he 
    if (e.target === e.currentTarget) {
      setshowSignIn(false);
      setsearch({});
    }
  }
 
  return (
    
    <>
      <nav className='py-4 flex justify-between items-center'>
        <NavLink>
          <h2 className='max-sm:w-36'><img src="/assets/mylogo.svg" alt="" /></h2>
        </NavLink>

        <div className='flex gap-8'>

          <SignedOut>
            <Button onClick={() => {
              setshowSignIn(true);
            }} variant="outline">Login</Button>
            {/* <SignInButton /> */}
          </SignedOut>




          {/* // add a condition here */}
          <SignedIn>
            {/* {
              user?.unsafeMetadata?.role === "recruiter" &&
              <NavLink to="/post-job" >
                <Button variant="destructive" className="rounded-full" >
                  <PenBox size={20} className='mr-2' />
                  Post a job</Button>

              </NavLink>
            } */}
              <NavLink to="/" className={({isActive})=>(
                  isActive?"text-blue-200":""
  )}>
              <Button variant="ghost" className="rounded-sm text-base font-semibold" > Home </Button>
              </NavLink>

            <UserButton appearance={{
              elements: { avatarBox: "w-10 h-10" }
            }}>
              <UserButton.MenuItems>
                <UserButton.Link
                  label='My jobs'
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href='/my-jobs'
                />
                <UserButton.Link
                  label='Saved jobs'
                  labelIcon={<Heart size={15} />}
                  href='/saved-jobs'
                />
              </UserButton.MenuItems>
            </UserButton >
          </SignedIn>
        </div>
      </nav>
      {
        showSignIn && <div onClick={handleOverlayClick} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" >
          <SignIn signUpForceRedirectUrl='/onboarding' fallbackRedirectUrl='/onboarding'></SignIn>
        </div>
      }

    </>
  )
}

export default Header