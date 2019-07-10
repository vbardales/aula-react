import React from 'react';
import MaterialTable from 'material-table';
// import MoreIcon from '@material-ui/icons/MoreHoriz';
// import PlayIcon from '@material-ui/icons/PlayArrow';
import { withRouter } from 'react-router';
import axios from 'axios';

class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
    };
  }
  /*: [
    { id: 101, name: 'All I Want For Chrismas Is You!', author: { lastname: 'Carey', firstname: 'Mariah' }, year: 1987 },
  ]*/

  componentDidMount() {
    return axios.get('http://localhost:2000/song')
      .then((response) => {
        this.setState({
          data: response.body,
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
      <MaterialTable
        title="Songs"
        columns={columns}
        data={data}
        actions={[
          {
            icon: 'PlayIcon',
            tooltip: 'Play',
            onClick: (event, rowData) => {
              // Do play operation
            }
          },
          {
            icon: 'MoreIcon',
            tooltip: 'More',
            onClick: (event, rowData) => {
              history.push(`/song/${rowData.id}`);
            }
          }
        ]}
      />
    );
  }
}

export default withRouter(List);
