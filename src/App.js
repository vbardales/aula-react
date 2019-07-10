import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './component/NavBar.js';
import Sidebar from './component/Sidebar.js';
import List from './song/List.js';
import Song from './song/Song.js';

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Route path="/" exact component={List} />
        <Switch>
          <Route path="/song" component={Song} />
          <Route path="/song/:id" component={Song} />
        </Switch>
        <Sidebar />
      </div>
    </Router>
  );
}

export default App;
