import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, CardBody, Table} from 'reactstrap';
import axios from 'axios';


const Domaine= props =>(
    <tr>
      <td width='18%'>{props.domaine.nom}</td>
      <td width='50%'>{props.domaine.description.split('.')[0]}</td>
      <td width='20%'>{props.domaine.categorie}</td>
      <td width='12%'>{props.domaine.secteursId.length}</td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/domaines/update/"+props.domaine._id}>Modifier</Link> </Button>
      </td>
      <td>
        <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteDomaine(props.domaine._id) }}>Supprimer</Button>
      </td>
    </tr>
)

export default class domainesList extends Component {
  constructor(props) {
    super(props);

    this.deleteDomaine = this.deleteDomaine.bind(this)

    this.state = {domaines: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/domaines/')
        .then(response => {
          this.setState({domaines: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
  }

  deleteDomaine(id) {
    axios.delete('http://localhost:5000/domaines/' + id)
        .then(response => {
          console.log(response.data)
        });

    this.setState({
      domaines: this.state.domaines.filter(el => el._id !== id)
    })
  }

  domaineList() {
    return this.state.domaines.map(currentDomaine => {
      return <Domaine domaine={currentDomaine} deleteDomaine={this.deleteDomaine} key={currentDomaine._id}/>;
    })
  }

  render() {
    return (
        <Table hover className="mb-0">
          <thead>
          <tr>
            <th>Nom du Domaine</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Secteurs reliés</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
          </thead>
          <tbody>
          {this.domaineList()}
          </tbody>
        </Table>
    );
  }
}