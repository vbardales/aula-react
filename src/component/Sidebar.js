import React from 'react';
import SongContext from '../context/song';
import './Sidebar.css';

class Sidebar extends React.PureComponent {
  static contextType = SongContext;

  render() {
    const { song } = this.context;
    if (!song) {
      return (
        <div className="sidebar">
          Please select a song
        </div>
      );
    }

    return (
      <div className="sidebar">
        {song && <p className="title">{song.name}</p>}
        <audio
          controls
          src={`http://localhost:2000/soundfile/${song.id}`}
          autoPlay
        >
              Your browser does not support the
              <code>audio</code> element.
        </audio>
      </div>
    );
  }
}

export default Sidebar;
