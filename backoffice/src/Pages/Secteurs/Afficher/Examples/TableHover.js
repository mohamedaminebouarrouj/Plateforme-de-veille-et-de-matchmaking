import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, CardBody} from 'reactstrap';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const Secteur= props =>(

    <TableRow>

        <TableCell component="th" scope="row" width="30%">
            {props.secteur.nom}
        </TableCell>
        <TableCell>{props.secteur.description}</TableCell>
        <TableCell>{props.secteur.categorie}</TableCell>
        <TableCell>
            <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/secteurs/update/"+props.secteur._id}>Modifier</Link> </Button>
        </TableCell>
        <TableCell>
            <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteSecteur(props.secteur._id) }}>Supprimer</Button>
        </TableCell>
    </TableRow>

)

export default class secteursList extends Component {
  constructor(props) {
    super(props);

    this.deleteSecteur = this.deleteSecteur.bind(this)
    this.onChangeOpen = this.onChangeOpen.bind(this)

    this.state = {
        secteurs: [],
        open : false};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/secteurs/')
        .then(response => {
          this.setState({secteurs: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
      console.log("open melowel",this.state.open)
  }

  onChangeOpen(e){
      this.setState({
          open: e
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
      return <Secteur secteur={currentSecteur} deleteSecteur={this.deleteSecteur} open={this.state.open} onChangeOpen={this.onChangeOpen} key={currentSecteur._id}/>;
    })
  }

  render() {
    return (
        <TableContainer>
        <Table hover className="mb-0">
            <TableHead>
                <TableRow>
                    <TableCell><b>Nom du Secteur</b></TableCell>
                    <TableCell><b>Description</b></TableCell>
                    <TableCell><b>Catégorie</b></TableCell>
                    <TableCell><b>Modifier</b></TableCell>
                    <TableCell><b>Supprimer</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.secteurList()}
            </TableBody>
        </Table>
        </TableContainer>
    );
  }
}