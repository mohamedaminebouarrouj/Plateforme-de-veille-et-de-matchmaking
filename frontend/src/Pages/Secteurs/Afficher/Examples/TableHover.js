import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, CardBody, Table} from 'reactstrap';
import axios from 'axios';


const Secteur= props =>(
    <tr>
      <td width='20%'>{props.secteur.nom}</td>
      <td width='60%'>{props.secteur.description}</td>
      <td width='20%'>{props.secteur.categorie}</td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/secteurs/update/"+props.secteur._id}>Modifier</Link> </Button>
      </td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteSecteur(props.secteur._id) }}>Supprimer</Button>
      </td>
        </tr>
)

export default class secteursList extends Component {
  constructor(props) {
    super(props);

    this.deleteSecteur = this.deleteSecteur.bind(this)

    this.state = {secteurs: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/secteurs/')
        .then(response => {
          this.setState({secteurs: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
  }

  deleteSecteur(id) {
    axios.delete('http://localhost:5000/secteurs/' + id)
        .then(response => {
          console.log(response.data)
        });

    this.setState({
      secteurs: this.state.secteurs.filter(el => el._id !== id)
    })
  }

  secteurList() {
    return this.state.secteurs.map(currentSecteur => {
      return <Secteur secteur={currentSecteur} deleteSecteur={this.deleteSecteur} key={currentSecteur._id}/>;
    })
  }

  render() {
    return (
        <Table hover className="mb-0">
          <thead>
          <tr>
            <th>Nom du Secteur</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
          </thead>
          <tbody>
          {this.secteurList()}
          </tbody>
        </Table>
    );
  }
}