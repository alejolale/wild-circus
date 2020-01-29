import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';


const App = () => {
  const [authenticted, setAuthenticated] = useState(localStorage['circus-token']);
  return (
    <Switch>
      <Route exact path="/">
        <div className="App">
          <NavBar></NavBar>
        </div>
      </Route>
      <Route path="/login">
        <Login setAuthenticated={setAuthenticated}></Login>
      </Route>

    </Switch>
  );
}

export default App;
