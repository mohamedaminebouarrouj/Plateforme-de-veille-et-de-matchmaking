import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, CardBody, Table} from 'reactstrap';
import axios from 'axios';
import {counter} from "@fortawesome/fontawesome-svg-core";


const Startup= props =>(
    <tr>
      <td width='18%'>{props.startup.nom}</td>
      <td width='50%'>{props.startup.description.split('.')[0]}</td>
      <td width='20%'>{props.startup.type}</td>
      <td width='12%'>{props.startup.domainesId.length}</td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/startups/update/"+props.startup._id}>Modifier</Link> </Button>
      </td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteStartup(props.startup._id) }}>Supprimer</Button>
      </td>
    </tr>
)

export default class startupsList extends Component {
  constructor(props) {
    super(props);

    this.deleteStartup = this.deleteStartup.bind(this)

    this.state = {startups: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/startups/')
        .then(response => {
          this.setState({startups: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
  }

  deleteStartup(id) {
    axios.delete('http://localhost:5000/startups/' + id)
        .then(response => {
          console.log(response.data)
        });

    this.setState({
      startups: this.state.startups.filter(el => el._id !== id)
    })
  }

  startupList() {
    return this.state.startups.map(currentStartup => {
      return <Startup startup={currentStartup} deleteStartup={this.deleteStartup} key={currentStartup._id}/>;
    })
  }

  render() {
    return (
        <Table hover className="mb-0">
          <thead>
          <tr>
            <th>Nom de la Startup</th>
            <th>Description</th>
            <th>Type</th>
            <th>Domaines Reliés</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
          </thead>
          <tbody>
          {this.startupList()}
          </tbody>
        </Table>
    );
  }
}