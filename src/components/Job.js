import React, { useState } from 'react'

function Job({ job, onCompleted }) {

    const [checked] = useState(false);

    const handleCompleted = () => {
        onCompleted(job);
    }

    const getStyle = (complete) => ({
        backround: '#f4f4f4',
        textDecoration: complete ? 'line-trough' : 'none'
    })

    return (
        <table> key={job.id} style= {getStyle(job.completed)}>
            <tbody>
                <tr>
                    <td width="1%">
                        <input type="checkbox" defaultChecked={checked} onChange={handleCompleted}></input>
                    </td>
                    <td width="59%">
                        {job.tyotehtava}
                    </td>
                    <td width="20%">
                        {job.osoite}
                    </td>
                    <td width="20%">
                        <a href={job.linkki}>LISÄTIETOA</a>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Job;