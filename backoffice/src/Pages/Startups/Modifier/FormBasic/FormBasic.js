import React, { Component , Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import Select from "react-select";

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput, InputGroup, InputGroupAddon,
} from 'reactstrap';

import makeAnimated from "react-select/animated/dist/react-select.esm";
const animatedComponents = makeAnimated();

export default class UpdateStartup extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDomaine=this.onChangeDomaine.bind(this);
        this.onChangeChallenge=this.onChangeChallenge.bind(this);

        this.state = {
            nom: '',
            description: '',
            fondateurs: [],
            fond:[],
            nomfond : '',
            domaines: [],
            challenges:[],
            dom: [],
            chall:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/startups/' + this.props.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    description: response.data.description,
                    fondateurs: response.data.fondateurs,
                    domaines: response.data.domainesId.map(e=>e._id),
                    challenges: response.data.challengesId.map(e=>e._id)
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/domaines/')
            .then(response => {
                this.setState({dom: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

        axios.get('http://localhost:5000/challenges/')
            .then(response => {
                this.setState({chall: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    onChangeDomaine(e) {
        if (e!=null){
            this.setState({
                domaines: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                domaines: []
            })
        }
    }

    onChangeChallenge(e) {
        if (e!=null){
            this.setState({
                challenges: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                challenges: []
            })
        }
    }


    domaineList() {
        let selected= []
        const options= this.state.dom.map(currentDomaine => ({value: currentDomaine._id, label:currentDomaine.nom}))
        this.state.dom.map(currentDomaine =>{
            this.state.domaines.map(selectedDomaine=>{
                if (currentDomaine._id===selectedDomaine)
                    selected.push({value:currentDomaine._id, label:currentDomaine.nom})
            })
        })
        return (
            <Select
                value={selected}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.onChangeDomaine}
                className="basic-multi-select"
                classNamePrefix="select"
            > </Select>
        )
    }

    challengeList() {
        let selected= []
        const options= this.state.chall.map(currentChallenge => ({value: currentChallenge._id, label:currentChallenge.nom}))
        this.state.chall.map(currentChallenge =>{
            this.state.challenges.map(selectedChallenge=>{
                if (currentChallenge._id===selectedChallenge)
                    selected.push({value:currentChallenge._id, label:currentChallenge.nom})
            })
        })
        return (
            <Select
                value={selected}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.onChangeChallenge}
                className="basic-multi-select"
                classNamePrefix="select"
            > </Select>
        )
    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const startup = {
            nom: this.state.nom,
            description: this.state.description,
            domainesId : this.state.domaines,
            challengesId: this.state.challenges
        }

        console.log(startup);

        axios.post('http://localhost:5000/startups/update/' + this.props.id, startup)
            .then(res => console.log(res.data));

        window.location.replace('#/startups/afficher');
        window.location.reload(false);
    }

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <Row>
                            <Col>
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Modifier Startup</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="Nom"><b>Nom</b></Label>
                                                <Input type="text" name="nom" id="nom"
                                                       required
                                                       value={this.state.nom}
                                                       onChange={this.onChangeNom}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Description</b></Label>
                                                <Input type="textarea" name="description" id="description"
                                                       required
                                                       value={this.state.description}
                                                       onChange={this.onChangeDescription}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Challenges reliés</b></Label>
                                                <div>
                                                    {this.challengeList()}
                                                </div>
                                            </FormGroup>

                                            <FormGroup>
                                            <Label for="exampleText"><b>Domaines reliés</b></Label>
                                            <div>
                                                {this.domaineList()}
                                            </div>
                                        </FormGroup>

                                            <Button color="primary" className="mt-1" type="submit">Submit</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
