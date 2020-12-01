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
                    {props.challenge.nom}
                </TableCell>
                <TableCell width='45%'>{props.challenge.description.split('.')[0]}</TableCell>
                <TableCell width='20%'>{props.challenge.categorie}</TableCell>
                <TableCell width='15%'>{props.challenge.secteursId.length}
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/challenges/update/"+props.challenge._id}>Modifier</Link> </Button>
                </TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteChallenge(props.challenge._id) }}>Supprimer</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                <b>Secteurs Reliés</b>
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Nom</b></TableCell>
                                        <TableCell><b>Description</b></TableCell>
                                        <TableCell><b>Categorie</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.challenge.secteursId.map((currentSect)=>
                                        <TableRow>
                                            <TableCell>
                                                {currentSect.nom}
                                            </TableCell>
                                            <TableCell>
                                                {currentSect.description.split('.')[0]}
                                            </TableCell>
                                            <TableCell>
                                                {currentSect.categorie}
                                            </TableCell>
                                        </TableRow>)}
                                </TableBody>

                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default class challengesList extends Component {
  constructor(props) {
    super(props);

    this.deleteChallenge = this.deleteChallenge.bind(this)

    this.state = {challenges: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/challenges/',{headers: {
        Authorization: localStorage.getItem('auth-token')
        }})
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
      return <Row challenge={currentChallenge} deleteChallenge={this.deleteChallenge} key={currentChallenge._id}/>;
    })
  }

  render() {
    return (
        <Table hover className="mb-0">
          <TableHead>
          <TableRow>
            <TableCell><b>Nom du Challenge</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Catégorie</b></TableCell>
            <TableCell><b>Secteurs Reliés</b></TableCell>
            <TableCell><b>Modifier</b></TableCell>
              <TableCell><b>Supprimer</b></TableCell>
          </TableRow>
          </TableHead>
          <tbody>
          {this.challengeList()}
          </tbody>
        </Table>
    );
  }
}