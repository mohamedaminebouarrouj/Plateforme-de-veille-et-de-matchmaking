import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, CardBody, Table} from 'reactstrap';
import axios from 'axios';
import {counter} from "@fortawesome/fontawesome-svg-core";


const Challenge= props =>(
    <tr>
      <td width='18%'>{props.challenge.nom}</td>
      <td width='50%'>{props.challenge.description.split('.')[0]}</td>
      <td width='20%'>{props.challenge.type}</td>
      <td width='12%'>{props.challenge.domainesId.length}</td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/challenges/update/"+props.challenge._id}>Modifier</Link> </Button>
      </td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteChallenge(props.challenge._id) }}>Supprimer</Button>
      </td>
    </tr>
)

export default class challengesList extends Component {
  constructor(props) {
    super(props);

    this.deleteChallenge = this.deleteChallenge.bind(this)

    this.state = {challenges: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/challenges/')
        .then(response => {
          this.setState({challenges: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
  }

  deleteChallenge(id) {
    axios.delete('http://localhost:5000/challenges/' + id)
        .then(response => {
          console.log(response.data)
        });

    this.setState({
      challenges: this.state.challenges.filter(el => el._id !== id)
    })
  }

  challengeList() {
    return this.state.challenges.map(currentChallenge => {
      return <Challenge challenge={currentChallenge} deleteChallenge={this.deleteChallenge} key={currentChallenge._id}/>;
    })
  }

  render() {
    return (
        <Table hover className="mb-0">
          <thead>
          <tr>
            <th>Nom du Challenge</th>
            <th>Description</th>
            <th>Type</th>
            <th>Domaines Reliés</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
          </thead>
          <tbody>
          {this.challengeList()}
          </tbody>
        </Table>
    );
  }
}