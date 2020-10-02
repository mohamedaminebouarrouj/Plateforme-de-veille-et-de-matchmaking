import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, CardBody} from 'reactstrap';
import axios from 'axios';
import {counter} from "@fortawesome/fontawesome-svg-core";
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

function Row(props){
    const [open,setOpen]=React.useState(false)
    const classes= useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row" width='18%'>
                    {props.startup.nom}
                </TableCell>
                <TableCell width='45%'>{props.startup.description.split('.')[0]}</TableCell>
                <TableCell width='20%'>{props.startup.dateCreation.split('T')[0]}</TableCell>
                <TableCell width='15%'>{props.startup.domainesId.length}
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/startups/update/"+props.startup._id}>Modifier</Link> </Button>
                </TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteStartup(props.startup._id) }}>Supprimer</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                <b>Domaines Reliés</b>
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
                                    {props.startup.domainesId.map((currentDom)=>
                                        <TableRow>
                                            <TableCell>
                                                {currentDom.nom}
                                            </TableCell>
                                            <TableCell>
                                                {currentDom.description.split('.')[0]}
                                            </TableCell>
                                            <TableCell>
                                                {currentDom.categorie}
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
      return <Row startup={currentStartup} deleteStartup={this.deleteStartup} key={currentStartup._id}/>;
    })
  }

  render() {
    return (
        <Table hover className="mb-0">
          <TableHead>
          <TableRow>
            <TableCell><b>Nom de la Startup</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Date de création</b></TableCell>
            <TableCell><b>Domaines Reliés</b></TableCell>
            <TableCell><b>Modifier</b></TableCell>
              <TableCell><b>Supprimer</b></TableCell>
          </TableRow>
          </TableHead>
          <tbody>
          {this.startupList()}
          </tbody>
        </Table>
    );
  }
}