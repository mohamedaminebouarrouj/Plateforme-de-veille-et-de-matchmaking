import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, CardBody, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
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
import {apiConfig} from "../../../../config/config";

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
                {console.log(props.challenge)}
                <TableCell component="th" scope="row" width='25%'>
                    <div style={{
                        backgroundImage: `url(${props.challenge.img})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: '100px'
                    }}>

                        <h1 style={{
                            position: 'relative',
                            top: 5,
                            width: 'auto',
                            fontSize: '18px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}>
                            {props.challenge.nom}
                        </h1>

                    </div>
                </TableCell>
                <TableCell width='45%'>{props.challenge.description.split('.')[0]}</TableCell>
                <TableCell width='20%'>{props.challenge.categorie}</TableCell>
                <TableCell width='10%'>{props.challenge.secteursId.length}
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link
                        to={"/challenges/update/" + props.challenge._id}>Modifier</Link> </Button>
                </TableCell>
                <TableCell>
                    <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => {
                        props.deleteChallenge(props.challenge._id)
                    }}>Supprimer</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.challenge.secteursId.map((currentSect) =>
                                        <TableRow>
                                            <TableCell>
                                                {currentSect.nom}
                                            </TableCell>
                                            <TableCell>
                                                {currentSect.description.split('.')[0]}
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
        this.onNext = this.onNext.bind(this)
        this.onPrevious = this.onPrevious.bind(this)
        this.onFirst = this.onFirst.bind(this)
        this.onLast = this.onLast.bind(this)

        this.state = {
            challenges: [],
            page: 1,
        };
    }

    componentDidMount() {
        axios.post(apiConfig.baseUrl + '/challenges/find', {
            pagination: 10,
            page: this.state.page
        })
            .then(response => {
                this.setState({challenges: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.page !== this.state.page) {
            axios.post(apiConfig.baseUrl + '/challenges/find', {
                pagination: 10,
                page: this.state.page
            })
                .then(response => {
                    this.setState({challenges: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    deleteChallenge(id) {
        axios.delete(apiConfig.baseUrl + '/challenges/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            challenges: this.state.challenges.filter(el => el._id !== id)
        })
    }

    challengeList() {
        return this.state.challenges.map(currentChallenge => {
            return <Row challenge={currentChallenge} deleteChallenge={this.deleteChallenge}
                        key={currentChallenge._id}/>;
        })
    }

    onNext() {
        this.setState({
            page: this.state.page + 1
        })
        document.getElementById('prev').hidden = false
        document.getElementById('first').hidden = false
        if (this.state.page === 6) {
            document.getElementById('next').hidden = true
            document.getElementById('last').hidden = true
        }

    }

    onPrevious() {
        this.setState({
            page: this.state.page - 1
        })

        if (this.state.page === 2) {
            document.getElementById('first').hidden = true
            document.getElementById('prev').hidden = true
        }
        if (this.state.page === 7) {
            document.getElementById('next').hidden = false
            document.getElementById('last').hidden = false
        }
    }

    onFirst() {
        this.setState({
                page: 1
            }
        )
        document.getElementById('prev').hidden = true
        document.getElementById('first').hidden = true

        document.getElementById('next').hidden = false
        document.getElementById('last').hidden = false
    }

    onLast() {
        this.setState({
                page: 7
            }
        )
        document.getElementById('prev').hidden = false
        document.getElementById('first').hidden = false


        document.getElementById('next').hidden = true
        document.getElementById('last').hidden = true

    }

    render() {
        return (
            <div>
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
                <div
                    style={{
                        position: 'relative', left: '50%', top: '50%',
                    }}>
                    <Pagination className="pagination-rounded" aria-label="Page navigation example">

                        <PaginationItem>
                            <PaginationLink hidden previous id="first" onClick={this.onFirst} style={{position:'absolute',left:'-10%'}}/>
                        </PaginationItem>
                        <PaginationItem hidden id="prev" style={{position:'absolute',left:'-7.25%'}}>
                            <PaginationLink onClick={this.onPrevious}>
                                Précedent
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem disabled>
                            <PaginationLink>
                                {this.state.page}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem id="next">
                            <PaginationLink onClick={this.onNext}>
                                Suivant
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink next id='last' onClick={this.onLast}/>
                        </PaginationItem>
                    </Pagination>
                </div>
            </div>
        );
    }
}