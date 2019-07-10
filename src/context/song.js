import React from 'react';

const SongContext = React.createContext({
  song: null,
  playSong: () => {},
});

export default SongContext;
