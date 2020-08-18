import React, { useState } from 'react';
import './App.css';
import Header from './Components/layout/Header';


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
    const [jobs, setjobs] = useState(initJobs);

const rows = () => jobs.map(job => {
return <p> {job.työtehtävä}</p> 
})
  return (
    <div className="App">
      <Header />
      {rows()}
    </div>
  );
}

export default App;
