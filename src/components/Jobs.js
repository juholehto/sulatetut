import React from 'react'
import Job from './Job';


function Jobs({ jobs, onCompleted }) {

    const handleCompleted = (job) => {
        onCompleted(job);
        console.log("käsittelensaamaanitietoa");
    }

    const rows = () => jobs.map(job => {
        return <Job onCompleted={handleCompleted} job={job} key={job.id}/>
    })

    return (
        <div>
            {rows()}
        </div>
    )
}

export default Jobs;