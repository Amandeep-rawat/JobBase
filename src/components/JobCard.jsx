import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { saveJob } from '@/api/apiJobs';
import useFetch from '@/Hooks/useFetch';
import { BarLoader } from 'react-spinners';
import { deleteJobs } from '@/api/apiJobs';
const JobCard = ({ job, isMyjob = false, savedInit = false, onJobSaved = () => { },
}) => {

    const [saved, setsaved] = useState(savedInit)
    const {
        fn: fnSavedJob,
        data: savedJob,
        loading: loadingSavedJob,
        error } = useFetch(saveJob, {
            alreadySaved: saved,
        });

    const { user } = useUser();
    const handleSaveJob = async () => {
        await fnSavedJob({
            user_id: user.id,
            job_id: job.id,
        })
        onJobSaved();
    };

    const {
        loading: loadingDeleteJob, fn: fnDeleteJob
    } = useFetch(deleteJobs, {
        job_id: job.id,
    })
    const handleDeleteJob = async () => {
        await fnDeleteJob()
        onJobSaved()
    }

    useEffect(() => {
        if (savedJob !== undefined) {
            setsaved(savedJob?.length > 0);
        }
    }, [savedJob])


    return (
        <Card className="flex flex-col " >
            {
                loadingDeleteJob && (
                    <BarLoader width={"100%"} color='#36d7b7' className='mb-4' />
                )
            }
            <CardHeader >
                <CardTitle className="flex justify-between max-sm:text-lg font-medium">
                    {job.title}
                    {/* Only show delete button if the current user is the recruiter who created the job */}
                    {!isMyjob && job.recruiter_id === user.id && (
                        <Trash2Icon
                            onClick={handleDeleteJob}
                            fill='red'
                            size={18}
                            className='text-red-300 cursor-pointer'
                        />
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 flex-1">
                <div className='flex justify-between'>
                    {job.company && <img src={job.company.logo_url} className=' h-5  ' />}
                    <div className='flex  gap-2 items-center'>
                        <MapPinIcon size={15} />{job.location}
                    </div>
                </div>
                <hr />
                {job.description && job.description.length > 100
                    ? `${job.description.substring(0, 100)}...`
                    : job.description}
            </CardContent>
            <CardFooter className="flex gap-2">
                <Link to={`/job/${job.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">More details</Button></Link>


                {
                    !isMyjob &&
                    <Button variant="outline" className="w-15" onClick={handleSaveJob} disabled={loadingSavedJob}>
                        {saved ?
                            <Heart size={20} stroke='red' fill='red' />
                            : <Heart size={20} />

                        }
                    </Button>
                }
            </CardFooter>
        </Card>
    )
}

export default JobCard