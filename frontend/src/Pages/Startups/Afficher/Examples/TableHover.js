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
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                    {props.startup.nom}
                </TableCell>
                <TableCell width='45%'>{props.startup.description.split('.')[0]}</TableCell>
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

function LoadingSpinner () {
    const [open, setOpen] = React.useState(true);


    const handleClose = () => {
        setOpen(false);
    };

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Scraping des startups en cours"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                            <CircularProgress /> Loading...
                    </DialogContentText>

                </DialogContent>
            </Dialog>
    )
}



export default class startupsList extends Component {
  constructor(props) {
      super(props);
      this.deleteStartup = this.deleteStartup.bind(this)
      this.ajouterButton=this.ajouterButton.bind(this)

      this.state = {
        startups: [],
        loading:false,
    };
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

  ajouterButton(){
      this.setState({loading:true},()=>{
          console.log(this.state.loading)
          axios.get('http://localhost:5000/startups/scraping/')
              .then(res =>{
                  console.log(res.data)
                  loading:false
                  window.location.replace('#/startups/afficher');
                  window.location.reload(false);
              });
      })

    }

  render() {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <Table hover className="mb-0">

                        <TableHead>
                            <TableRow>
                                <TableCell width="18%"/>
                                <TableCell width="45%"/>
                                <TableCell width="15%"/>
                                <TableCell/>
                                <TableCell/>
                                <TableCell>
                                    <Button onClick={this.ajouterButton} variant="outlined" className="mb-2 mr-2" color="success">+</Button>
                                    {this.state.loading? <LoadingSpinner/>: null}
                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell><b>Nom de la Startup</b></TableCell>
                                <TableCell><b>Description</b></TableCell>
                                <TableCell><b>Domaines Reliés</b></TableCell>
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
    );
  }
}