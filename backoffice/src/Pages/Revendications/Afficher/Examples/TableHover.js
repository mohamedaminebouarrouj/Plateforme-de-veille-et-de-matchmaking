import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const [open, setOpen] = React.useState(false)
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell><b>{props.revendication.traited?"✓":"x"}</b></TableCell>
                <TableCell component="th" scope="row">{props.revendication.startupId.nom}</TableCell>
                <TableCell>{props.revendication.verified ? "Oui" : "Non"}</TableCell>
                <TableCell>{props.revendication.date.split('T')[0]} {props.revendication.date.split('T')[1].split('.')[0]}</TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="light"><Link
                        to={"/revendications/update/" + props.revendication._id}>Consulter</Link> </Button>
                </TableCell>
            </TableRow>
            <TableRow>
            </TableRow>
        </React.Fragment>
    );
}

export default class domainesList extends Component {
    constructor(props) {
        super(props);

        this.deleteRevendication = this.deleteRevendication.bind(this)
        this.state = {
            revendications: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/revendications/')
            .then(response => {
                this.setState({revendications: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteRevendication(id) {
        axios.delete('http://localhost:5000/revendications/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            revendications: this.state.revendications.filter(el => el._id !== id)
        })
    }

    revendicationList() {
        return this.state.revendications.map(currentRevendication => {
            return <Row revendication={currentRevendication} deleteRevendication={this.deleteRevendication}
                        key={currentRevendication._id}/>;
        })
    }

    render() {
        return (
            <Table hover className="mb-0">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Traité?</b></TableCell>
                        <TableCell><b>Nom de la startup</b></TableCell>
                        <TableCell><b>Compte verifié</b></TableCell>
                        <TableCell><b>Date de la demande</b></TableCell>
                        <TableCell><b>Consulter la demande</b></TableCell>
                    </TableRow>
                </TableHead>
                <tbody>
                {this.revendicationList()}
                </tbody>
            </Table>
        );
    }
}