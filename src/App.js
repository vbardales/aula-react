import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './component/NavBar.js';
import Sidebar from './component/Sidebar.js';
import List from './component/song/List.js';
import Song from './component/song/Song.js';
import SongContext from './context/song';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.playSong = (song) => {
      this.setState(state => ({
        song,
      }));
    };

    this.state = {
      song: null,
      playSong: this.playSong,
    };
  }

  render() {
    return (
      <Router>
        <div>
          <SongContext.Provider value={this.state}>
            <NavBar />

            <div className="container">
              <div className="main">
                <Route path="/" exact component={List} />

                <Switch>
                  <Route path="/song/:id" component={Song} exact />
                  <Route path="/song" render={() => {
                    if (!this.state.song) {
                      return <Redirect to="/" />
                    }

                    return <Song />
                  }} />
                </Switch>
              </div>

              <Sidebar />
            </div>
          </SongContext.Provider>
        </div>
      </Router>
    );
  }
}

export default App;
