import React, { useState } from 'react';
import './App.css';
import Header from './Components/layout/Header';
import Search from './Components/layout/Search';


function App() {

  const initJobs = [
    {
      "id": 1,
      "työtehtävä": "Kuvaaja"
    },              
    {
      "id":2,
      "työtehtävä": "Myyjä"
    },
    {
      "id": 3,
      "työtehtävä": "Malli"
    },
  ]
    const [jobs, setJobs] = useState(initJobs);

    fetch('https://gis.vantaa.fi/rest/tyopaikat/v1/kaikki')
    .then(response => response.json())
    .then(json=>setJobs([...json]));


const rows = () => jobs.map(job => {
return <p><input type="checkbox"></input>{job.tyotehtava}, {job.osioite}, <a href={job.linkki}>LISÄTIETOA</a></p> 
})
  return (
    <div className="App">
      <Header />
      <Search /> 
      {rows()}
    </div>
  );
}

export default App;
