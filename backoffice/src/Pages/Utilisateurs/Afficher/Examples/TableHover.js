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

const User= props =>(

    <TableRow>

      <TableCell component="th" scope="row" width="30%">
        {props.user.email}
      </TableCell>
      <TableCell>{props.user.nom} {props.user.prenom}</TableCell>
      <TableCell>{props.user.organisation}</TableCell>
      <TableCell>
        <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/users/update/"+props.user._id}>Modifier</Link> </Button>
      </TableCell>
    </TableRow>

)

export default class TableHover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      open : false};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
        .then(response => {
          this.setState({users: response.data})
        })
        .catch((error) => {
          console.log(error);
        })
  }


  userList() {
    return this.state.users.map(currentUser => {
      return <User user={currentUser} key={currentUser._id}/>;
    })
  }

  render() {
    return (
        <TableContainer>
          <Table hover className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell><b>E-mail de l'utilisateur</b></TableCell>
                <TableCell><b>Nom & Prénom</b></TableCell>
                <TableCell><b>Organisation</b></TableCell>
                <TableCell><b>Modifier</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.userList()}
            </TableBody>
          </Table>
        </TableContainer>
    );
  }
}