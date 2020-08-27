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
            <Search />
            <Jobs jobs={jobs} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
