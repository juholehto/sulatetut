import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Search from './components/layout/Search';
import Jobs from './components/Jobs';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Weather from './components/Weather'

function App() {

  const initJobs = []
  const [jobs, setJobs] = useState(initJobs);

  const [filterText, setFilterText] = useState('');
  const [showAll, setShowAll] = useState(true)

  const handleFilter = (filteringText) => {
    setFilterText(filteringText);
    if (filteringText === '') {
      console.log('true')
    }
    else {
      setShowAll(false);
      console.log('tuli app.js:n filteriin: ' + filteringText)
    }
  }
  const handleComplete = (job) =>{
    jobs.map((checkJob) => {
      if (checkJob === job.id){
        checkJob.completed = !checkJob.completed
      }
      console.log(checkJob.id + "" - "" + job.id)
    });
    setJobs ([...jobs]);
  }
  const jobsToShow = showAll
    ? jobs
    : jobs.filter(job => job.tyotehtava.toUpperCase().iclude(filterText.toUpperCase()))

  useEffect(() => {
    fetch('http://gis.vantaa.fi/rest/tyopaikat/v1/kaikki')
      .then(response => response.json())
      .then(json => setJobs([...json]));
  }, []);


  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/weather">
            <Weather />
          </Route>
          <Route path="/">
            <Search onFilter={handleFilter} />
            <Jobs onCompleted={handleComplete} jobs={jobsToShow} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
