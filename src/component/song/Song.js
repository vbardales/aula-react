import React from 'react';
import axios from 'axios';
import SongContext from '../../context/song';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PlayIcon from '@material-ui/icons/PlayArrow';
import BackIcon from '@material-ui/icons/ArrowBack';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Song extends React.PureComponent {
  static contextType = SongContext;
  state = {
    data: null,
    error: null,
  };

  componentDidMount() {
    const propId = get(this.props.match, 'params.id');
    if (!propId && this.context.song) {
      this.setState({
        data: this.context.song,
      });
      return Promise.resolve();
    }

    return axios.get(`http://localhost:2000/song/${propId}`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      })
    ;
  }

  render() {
    const { data, error } = this.state;

    if (error) {
      return <div>An unexpected error occured. Contact your admin sys.</div>
    }

    if (!data) {
      return <div>Loading...</div>
    }

    return (
      <SongContext.Consumer>
        {({playSong}) => (
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {data.name}
              </Typography>
              <Typography color="textSecondary">
                Author: {data.author.crew || `${data.author.firstname} ${data.author.lastname}`}
              </Typography>
              <Typography variant="body2" component="p">
                Year: {data.year}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" variant="contained" aria-label="Play" onClick={() => playSong(data)}>
                <PlayIcon /> Play
              </Button>
              <Link to="/">
                <Button aria-label="Back" variant="contained" >
                  <BackIcon /> Back
                </Button>
              </Link>
            </CardActions>
          </Card>
        )}
      </SongContext.Consumer>
    );
  }
}

export default Song;
