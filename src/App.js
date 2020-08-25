import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/layout/Header';
import Search from './Components/layout/Search';
import Jobs from './Components/layout/Jobs';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Weather from './Components/Weather';

function App() {

  const initJobs = [
    {
      "id": 1,
      "työtehtävä": "Kuvaaja"
    },
    {
      "id": 2,
      "työtehtävä": "Myyjä"
    },
    {
      "id": 3,
      "työtehtävä": "Malli"
    },
  ]
  const [jobs, setJobs] = useState(initJobs);

  useEffect(() => {
    fetch('https://gis.vantaa.fi/rest/tyopaikat/v1/kaikki')
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
