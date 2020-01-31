import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Administration from './components/Administration';


const App = () => {

  const [authenticated, setAuthenticated] = useState(localStorage['circus-token']);

  return (
    <Switch>
      {
        <Route exact path="/">
          <div className="App">
            <NavBar auth={authenticated}></NavBar>
            {authenticated&&<Administration></Administration>}
          </div>
        </Route>
        }
      <Route path="/login">
        <Login setAuthenticated={setAuthenticated}></Login>
      </Route>

    </Switch>
  );
}

export default App;
