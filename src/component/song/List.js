import React from 'react';
import MaterialTable from 'material-table';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { withRouter } from 'react-router';
import axios from 'axios';
import SongContext from '../../context/song';

class List extends React.PureComponent {
  static contextType = SongContext;

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    return axios.get('http://localhost:2000/song')
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
    const { history } = this.props;
    const { data, error } = this.state;
    const columns = [
      { title: 'Name', field: 'name' },
    ];

    if (error) {
      return <div>An unexpected error occured. Contact your admin sys.</div>
    }

    if (!data) {
      return <div>Loading...</div>
    }

    return (
      <SongContext.Consumer>
        {({playSong}) => (
          <MaterialTable
            title="Songs"
            columns={columns}
            data={data}
            actions={[
              {
                icon: () => <PlayIcon />,
                tooltip: 'Play',
                onClick: (event, rowData) => {
                  playSong(rowData);
                }
              },
              {
                icon: () => <MoreIcon />,
                tooltip: 'More',
                onClick: (event, rowData) => {
                  history.push(`/song/${rowData.id}`);
                }
              }
            ]}
          />
        )}
      </SongContext.Consumer>
    );
  }
}

export default withRouter(List);
