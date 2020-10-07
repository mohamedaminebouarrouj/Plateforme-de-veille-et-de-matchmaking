import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'reactstrap';
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
import {Tabs, Tab} from 'react-bootstrap-tabs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from "react-select";
import styled from "styled-components";

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
                <TableCell component="th" scope="row">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  {props.val.nom}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                <b>Tendances autour de {props.val.nom}</b>
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Titre</b></TableCell>
                                        <TableCell><b>Resumé</b></TableCell>
                                        <TableCell><b>Source</b></TableCell>
                                        <TableCell><b>Date de publication</b></TableCell>
                                        <TableCell><b>Langue</b></TableCell>
                                        <TableCell><b>Modifier</b></TableCell>
                                        <TableCell><b>Supprimer</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {props.val.tendancesId.map((currentTendance)=>
                                        <TableRow>
                                            <TableCell>
                                                {currentTendance.titre}
                                            </TableCell>
                                            <TableCell>
                                                {currentTendance.resume}
                                            </TableCell>
                                            <TableCell>
                                                {currentTendance.source}
                                            </TableCell>
                                            <TableCell>
                                                {currentTendance.datePublication.split('T')[0]}
                                            </TableCell>
                                            <TableCell>
                                                {currentTendance.langage}
                                            </TableCell>
                                            <TableCell>
                                                <Button outline className="mb-2 mr-2 btn-transition" color="info"><Link to={"/tendances/update/"+currentTendance._id}>Modifier</Link> </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button outline className="mb-2 mr-2 btn-transition" color="danger" onClick={() => { props.deleteTendance(currentTendance._id) }}>Supprimer</Button>
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

function FormDialog(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const options= props.domaines.map(currentDomaine =>  ({value: currentDomaine._id, label:currentDomaine.nom}))
    const optionsLan = [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'عربية' }
    ]
    return (
        <div>
            <Button variant="outlined" className="mb-2 mr-2" color="success" onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
            maxWidth="sm"
            fullWidth={true}>
                <DialogTitle id="form-dialog-title">Ajouter Tendances autour des domaines</DialogTitle>
                <DialogContent>
                        <div>
                            Selectionnez le(s) domaine(s)
                            <br/> <br/>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                key="1"
                                options={options}
                                onChange={props.onChangeDomaine}
                            > </Select>
                        </div>
                    <br/><br/>
                    <div>
                        Selectionnez la(les) langue(s)
                        <br/> <br/>
                        <Select
                            isMulti
                            name="langage"
                            id="langage"
                            options={optionsLan}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={props.onChangeLangue}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="danger">
                        Annuler
                    </Button>
                    <Button onClick={props.onSubmit} color="success">
                        Ajouter
                    </Button>

                </DialogActions>

            </Dialog>
        </div>
    );
}

function FormDialogChall(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const options= props.challenges.map(currentDomaine =>  ({value: currentDomaine._id, label:currentDomaine.nom}))
    const optionsLan = [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'عربية' }
    ]
    return (
        <div>
            <Button variant="outlined" className="mb-2 mr-2" color="success" onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth={true}>
                <DialogTitle id="form-dialog-title">Ajouter Tendances autour des challanges</DialogTitle>
                <DialogContent>
                    <div>
                        Selectionnez le(s) challange(s)
                        <br/> <br/>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            key="1"
                            options={options}
                            onChange={props.onChangeChallenge}
                        > </Select>
                    </div>
                    <br/><br/>
                    <div>
                        Selectionnez la(les) langue(s)
                        <br/> <br/>
                        <Select
                            isMulti
                            name="langage"
                            id="langage"
                            options={optionsLan}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={props.onChangeLangue}
                        />
                    </div>
                    <br/><br/><br/><br/><br/><br/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="danger">
                        Annuler
                    </Button>
                    <Button onClick={props.onSubmit} color="success">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function FormDialogSect(props){
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const options= props.secteurs.map(currentDomaine =>  ({value: currentDomaine._id, label:currentDomaine.nom}))
    const optionsLan = [
        { value: 'fr', label: 'Français' },
        { value: 'en', label: 'English' },
        { value: 'ar', label: 'عربية' }
    ]
    return (
        <div>
            <Button variant="outlined" className="mb-2 mr-2" color="success" onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                    fullWidth={true}>
                <DialogTitle id="form-dialog-title">Ajouter Tendances autour des secteurs</DialogTitle>
                <DialogContent>
                    <div>
                        Selectionnez le(s) secteur(s)
                        <br/> <br/>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            key="1"
                            options={options}
                            onChange={props.onChangeSecteur}
                        > </Select>
                    </div>
                    <br/><br/>
                    <div>
                        Selectionnez la(les) langue(s)
                        <br/> <br/>
                        <Select
                            isMulti
                            name="langage"
                            id="langage"
                            options={optionsLan}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={props.onChangeLangue}
                        />
                    </div>
                    <br/><br/><br/><br/><br/><br/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="danger">
                        Annuler
                    </Button>
                    <Button onClick={props.onSubmit} color="success">
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default class tendancesList extends Component {
    constructor(props) {
        super(props);

        this.deleteTendance = this.deleteTendance.bind(this)

        this.showDomaine =this.showDomaine.bind(this)
        this.showChallenge=this.showChallenge.bind(this)
        this.showSecteur=this.showSecteur.bind(this)

        this.onChangeLangue=this.onChangeLangue.bind(this)

        this.onChangeDomaine=this.onChangeDomaine.bind(this)
        this.onSubmitDomaine=this.onSubmitDomaine.bind(this)

        this.onSubmitSecteur=this.onSubmitSecteur.bind(this)
        this.onChangeSecteur=this.onChangeSecteur.bind(this)

        this.onSubmitChallenge=this.onSubmitChallenge.bind(this)
        this.onChangeChallenge=this.onChangeChallenge.bind(this)


        this.state = {
            domaines: [],
            dom:[],
            challenges:[],
            chal:[],
            secteurs:[],
            sect:[],
            langages:[]
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

        axios.get('http://localhost:5000/challenges/')
            .then(response => {
                this.setState({challenges: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/secteurs')
            .then(response => {
                this.setState({secteurs: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTendance(id) {
        axios.delete('http://localhost:5000/tendances/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            domaines: this.state.domaines.filter(el => el._id !== id)
        })
    }

    domaineList() {
        return this.state.domaines.map(currentDomaine => {
            return <Row val={currentDomaine} deleteTendance={this.deleteTendance} key={currentDomaine._id}/>;
        })
    }

    challengeList() {
        return this.state.challenges.map(currentChallenge => {
            return <Row val={currentChallenge} deleteTendance={this.deleteTendance} key={currentChallenge._id}/>;
        })
    }

    secteurList() {
        return this.state.secteurs.map(currentSecteur => {
            return <Row val={currentSecteur} deleteTendance={this.deleteTendance} key={currentSecteur._id}/>;
        })
    }
    onChangeDomaine(e) {
        if (e!=null){
            this.setState({
                dom: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                dom: []
            })
        }
        console.log(this.state.dom)
    }

    onChangeLangue(e) {
        if (e!=null){
            this.setState({
                langages: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                langages: []
            })
        }

        console.log(this.state.langages)


    }


    onSubmitDomaine()
    {
        this.state.dom.map((currentD)=>{
            this.state.langages.map((currentL)=>{
                axios.get('http://localhost:5000/tendances/news_domaine/'+currentD+'/'+currentL)
                    .then(res =>
                         console.log(res.data))
            })
        })

        window.location.replace('#/tendances/afficher');
        window.location.reload(false);
    }

    showDomaine(){

        return(
            <Table hover className="mb-0">
                        <TableHead>
                                <TableCell width="95%"><b>Nom du Domaine</b></TableCell>
                            <TableCell>
                                <FormDialog domaines={this.state.domaines} onSubmit={this.onSubmitDomaine} onChangeLangue={this.onChangeLangue} onChangeDomaine={this.onChangeDomaine}/>
                            </TableCell>
                        </TableHead>
                        <tbody>
                        {this.domaineList()}
                        </tbody>
                    </Table>
        )
    }


    onChangeChallenge(e) {
        if (e!=null){
            this.setState({
                chal: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                chal: []
            })
        }
        console.log(this.state.chal)
    }
    onSubmitChallenge(){
        this.state.chal.map((currentD)=>{
            this.state.langages.map((currentL)=>{
                axios.get('http://localhost:5000/tendances/news_challenge/'+currentD+'/'+currentL)
                    .then(res =>
                        console.log(res.data))
            })
        })

        window.location.replace('#/tendances/afficher');
        window.location.reload(false);

    }


    showChallenge(){
        return <Table hover className="mb-0">
            <TableHead>
                <TableCell width="95%"><b>Nom du Challenge</b></TableCell>
                <TableCell>
                    <FormDialogChall challenges={this.state.challenges} onSubmit={this.onSubmitChallenge} onChangeLangue={this.onChangeLangue} onChangeChallenge={this.onChangeChallenge}/>

                </TableCell>
            </TableHead>
            <tbody>
            {this.challengeList()}
            </tbody>
        </Table>


    }

    onChangeSecteur(e){
        if (e!=null){
            this.setState({
                sect: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                sect: []
            })
        }
        console.log(this.state.sect)

    }
    onSubmitSecteur()
    {
        this.state.sect.map((currentD)=>{
            console.log(currentD)
            this.state.langages.map((currentL)=>{
                console.log(currentL)
                axios.get('http://localhost:5000/tendances/news_secteur/'+currentD+'/'+currentL)
                    .then(res =>{
                        console.log(res.data)
                        window.location.replace('#/tendances/afficher');
                        window.location.reload(false);
                        })
            })
        })

        window.location.replace('#/tendances/afficher');
        window.location.reload(false);

    }

    showSecteur(){
        return <Table hover className="mb-0">
            <TableHead>
                <TableCell width="95%"><b>Nom du Secteur</b></TableCell>
                <TableCell>
                    <FormDialogSect secteurs={this.state.secteurs} onSubmit={this.onSubmitSecteur} onChangeLangue={this.onChangeLangue} onChangeSecteur={this.onChangeSecteur}/>
                </TableCell>
            </TableHead>
            <tbody>
            {this.secteurList()}
            </tbody>
        </Table>

    }


  render() {
    return (
            <Tabs>
                <Tab key="dom" label={<span><i  className="nav-link-icon pe-7s-box2" /> Tendances par domaine</span>}>

                    {this.showDomaine()}
                </Tab>
                <Tab key="chal" label={<span><i  className="nav-link-icon pe-7s-target" /> Tendances par challenge</span>}>
                    {this.showChallenge()}
                </Tab>
                <Tab key="sect"  label={<span><i  className="nav-link-icon pe-7s-helm" /> Tendances par secteur</span>}>
                    {this.showSecteur()}
                </Tab>
            </Tabs>

    );
  }
}
