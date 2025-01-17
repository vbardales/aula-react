import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import SongContext from '../context/song';

const NavBar = () => {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <SongContext.Consumer>
      {({ song }) => console.log('song', song) || (
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="List" component={Link} to="/" />
            <Tab label="Song" component={Link} to="/song" disabled={!song} />
          </Tabs>
        </AppBar>
      )}
    </SongContext.Consumer>
  );
};

export default NavBar;
