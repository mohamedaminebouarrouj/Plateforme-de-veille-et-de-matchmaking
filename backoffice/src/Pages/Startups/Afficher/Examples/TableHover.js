import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button, Col, Row, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
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
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import UnfoldLessIcon from '@material-ui/icons/UnfoldLess';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {apiConfig} from "../../../../config/config";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function RowTab(props) {
    const [open, setOpen] = React.useState(false)
    const classes = useRowStyles();
    const dateCreation = new Date(props.startup.dateCreation)

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    {
                        props.startup.siteWeb === "" ? props.startup.nom :
                            <a href={props.startup.siteWeb} target='_blank'>{props.startup.nom}</a>
                    }

                </TableCell>
                <TableCell>{props.startup.description}</TableCell>
                <TableCell>{props.startup.domainesId.map(d => d.nom)}
                </TableCell>
                <TableCell>{props.startup.challengesId.length}
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell width="30%">
                    {props.startup.pays}
                </TableCell>
                <TableCell width="30%">
                    {dateCreation.toISOString().split('-01T')[0]}
                </TableCell>
                <TableCell width="5%">
                    <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link
                        to={"/startups/update/" + props.startup._id}>Modifier</Link> </Button>
                </TableCell>
                <TableCell width="5%">
                    <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => {
                        props.deleteStartup(props.startup._id)
                    }}>Supprimer</Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                <b>Challenges Reliés</b>
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
                                    {props.startup.challengesId.map((currentChall) =>
                                        <TableRow>
                                            <TableCell>
                                                {currentChall.nom}
                                            </TableCell>
                                            <TableCell width="50%">
                                                {currentChall.description.split('.')[0]}
                                            </TableCell>
                                            <TableCell width="40%">
                                                {currentChall.categorie}
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

function LoadingSpinner() {
    const [open, setOpen] = React.useState(true);


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            disableBackdropClick
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Scraping des startups en cours"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <CircularProgress/> Loading...
                </DialogContentText>

            </DialogContent>
        </Dialog>
    )
}

function compare_name(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.nom.toUpperCase().trim();
    const bandB = b.nom.toUpperCase().trim();
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return -comparison;
}

function compare_name2(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.nom.toUpperCase().trim();
    const bandB = b.nom.toUpperCase().trim();
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison;
}

function compare_date(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.dateCreation;
    const bandB = b.dateCreation;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return -comparison;
}

function compare_date2(a, b) {
    // Use toUpperCase() to ignore character casing
    const bandA = a.dateCreation;
    const bandB = b.dateCreation;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison;
}


export default class startupsList extends Component {
    constructor(props) {
        super(props);
        this.deleteStartup = this.deleteStartup.bind(this)
        this.ajouterButton = this.ajouterButton.bind(this)
        this.onOrderName = this.onOrderName.bind(this)
        this.onOrderDate = this.onOrderDate.bind(this)

        this.onNext = this.onNext.bind(this)
        this.onPrevious = this.onPrevious.bind(this)
        this.onFirst = this.onFirst.bind(this)
        this.onLast = this.onLast.bind(this)

        this.state = {
            startups: [],
            loading: false,
            ordredName: false,
            ordredDate: false,
            page: 1,
        };
    }

    componentDidMount() {
        axios.post(apiConfig.baseUrl + '/startups/find', {
            pagination: 10,
            page: this.state.page
        })
            .then(response => {
                this.setState({startups: response.data})
            })
            .catch((error) => {
                console.log(error);
            })


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.page !== this.state.page) {
            axios.post(apiConfig.baseUrl + '/startups/find', {
                pagination: 10,
                page: this.state.page
            })
                .then(response => {
                    this.setState({startups: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    deleteStartup(id) {
        axios.delete(apiConfig.baseUrl + '/startups/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            startups: this.state.startups.filter(el => el._id !== id)
        })
    }

    startupList() {
        return this.state.startups.map(currentStartup => {
            return <RowTab startup={currentStartup} deleteStartup={this.deleteStartup} key={currentStartup._id}/>;
        })
    }

    ajouterButton() {
        this.setState({loading: true}, () => {
            axios.get(apiConfig.baseUrl + '/startups/scraping/')
                .then(res => {
                    console.log(res.data)
                    window.location.replace('#/startups/afficher');
                    window.location.reload(false);
                });
        })

    }

    onOrderName() {
        this.setState({
            ordredName: !this.state.ordredName,
        })

        if (this.state.ordredName) {
            this.setState({
                startups: this.state.startups.sort(compare_name2)
            })
        } else {
            this.setState({
                startups: this.state.startups.sort(compare_name)
            })
        }
    }

    onOrderDate() {
        this.setState({
                ordredDate: !this.state.ordredDate
            }
        )

        if (this.state.ordredDate) {
            this.setState({
                startups: this.state.startups.sort(compare_date2)
            })
        } else {
            this.setState({
                startups: this.state.startups.sort(compare_date)
            })
        }
    }

    onNext() {
        this.setState({
            page: this.state.page + 1
        })
        document.getElementById('prev').hidden = false
        document.getElementById('first').hidden = false
        if (this.state.page === 52) {
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
        if (this.state.page === 53) {
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
                page: 53
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
                <Fragment>
                    <Row>
                        <Col>
                            <Button onClick={this.ajouterButton}
                                    color="success" style={{float: 'right'}}>+ Scraper les startups</Button>
                            {this.state.loading ? <LoadingSpinner/> : null}
                        </Col>
                    </Row>
                    <br/>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <Table hover className="mb-0">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <b>Nom de la Startup</b>
                                                <IconButton aria-label="expand row" size="small"
                                                            onClick={this.onOrderName}>
                                                    {this.state.ordredName ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>
                                                <b>Description</b>

                                            </TableCell>
                                            <TableCell><b>Domaines Reliés</b></TableCell>
                                            <TableCell><b>Challenges Reliés</b></TableCell>
                                            <TableCell>
                                                <b>Pays</b>
                                            </TableCell>
                                            <TableCell>
                                                <b>Création</b>
                                                <IconButton aria-label="expand row" size="small"
                                                            onClick={this.onOrderDate}>
                                                    {this.state.ordredDate ? <UnfoldLessIcon/> : <UnfoldMoreIcon/>}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell><b>Modifier</b></TableCell>
                                            <TableCell><b>Supprimer</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <tbody>
                                    {this.startupList()}
                                    </tbody>
                                </Table>
                            </TableRow>
                        </TableHead>

                    </Table>

                    <div
                        style={{
                            position: 'relative', left: '50%', top: '50%',
                        }}>
                        <Pagination className="pagination-rounded" aria-label="Page navigation example">

                            <PaginationItem>
                                <PaginationLink hidden previous id="first" onClick={this.onFirst}
                                                style={{position: 'absolute', left: '-10%'}}/>
                            </PaginationItem>
                            <PaginationItem hidden id="prev" style={{position: 'absolute', left: '-7.25%'}}>
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
                </Fragment>

            </div>
        );
    }
}