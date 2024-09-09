import { useUser } from '@clerk/clerk-react'
import { User } from 'lucide-react'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { BarLoader } from 'react-spinners'
const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded, user } = useUser()

    const location = useLocation()
    // console.log("location",location)
    const {pathname}=useLocation()
    // console.log("pathname",pathname)

    // Ensure that we only check isSignedIn when isLoaded is true
    if (!isLoaded) {
        // Optionally return a loading spinner or nothing while data is loading
        return (<BarLoader width={"100%"} color="#36d7b7" className="mb-4" />)
    }

    if (!isSignedIn) {
        // Redirect to the sign-in page with a query parameter
        return <Navigate to="/?sign-in=true" state={{ from: location }} />
    }
    // onboarding conditioin lateer
    // means agar ham log in ho gye or kisine onboarding wala page fill nhi kiya "i am requirter or candidate wala" or sidha jobs ya another page ko acess karne ki sochega to hamne usse bachne ke liye ye condition lgaay he
    if (user != undefined && !user.unsafeMetadata.role && pathname !== "/onboarding") {
        return <Navigate to="/onboarding" />
    }
    return children
}

export default ProtectedRoute
