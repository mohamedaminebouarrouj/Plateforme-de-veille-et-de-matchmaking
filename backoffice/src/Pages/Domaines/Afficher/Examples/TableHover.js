import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, CardBody, CustomInput} from 'reactstrap';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props){
    const [open,setOpen]=React.useState(false)
    const classes= useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row" width='18%'>
                    {props.domaine.nom}
                </TableCell>
                <TableCell width='50%'>{props.domaine.description.split('.')[0]+"."}</TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/domaines/update/"+props.domaine._id}>Modifier</Link> </Button>
                </TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteDomaine(props.domaine._id) }}>Supprimer</Button>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default class domainesList extends Component {
  constructor(props) {
    super(props);

    this.deleteDomaine = this.deleteDomaine.bind(this)
    this.state = {
        domaines: []
    };
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
      return <Row domaine={currentDomaine} deleteDomaine={this.deleteDomaine} key={currentDomaine._id}/>;
    })
  }

  render() {
    return (
        <Table hover className="mb-0">
          <TableHead>
          <TableRow>
            <TableCell><b>Nom du Domaine</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Modifier</b></TableCell>
            <TableCell><b>Supprimer</b></TableCell>
          </TableRow>
          </TableHead>
          <tbody>
          {this.domaineList()}
          </tbody>
        </Table>
    );
  }
}