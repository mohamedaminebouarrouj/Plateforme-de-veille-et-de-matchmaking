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
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeDomaine=this.onChangeDomaine.bind(this);

        this.state = {
            nom: '',
            description: '',
            fondateurs: [],
            fond:[],
            nomfond : '',
            domaines: [],
            dom: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/startups/' + this.props.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    description: response.data.description,
                    fondateurs: response.data.fondateurs,
                    domaines: response.data.domainesId
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
        console.log(this.state.domaines)
    }


    domaineList() {
        const selected= []
        const options= this.state.dom.map(currentDomaine => ({value: currentDomaine._id, label:currentDomaine.nom}))
        this.state.dom.map(currentDomaine =>{
            if (this.state.domaines.includes(currentDomaine._id)){
                selected.push({value:currentDomaine._id, label:currentDomaine.nom})
            }
        })
        console.log("selected:",selected)
        console.log([options[0],options[1]])
        return (
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={selected}
                isMulti
                options={options}
                onChange={this.onChangeDomaine}
            > </Select>
        )

      /*  return this.state.dom.map(currentDomaine => {
            return <CustomInput type="checkbox" checked= {this.state.domaines.includes(currentDomaine._id)} label={currentDomaine.nom} value={currentDomaine._id} id={currentDomaine._id} key={currentDomaine._id} onChange={this.onChangeDomaine}/>;
        }) */
    }

    onDeleteFondateur(e){

        this.state.fond.pop(e.target.value)
        this.setState({
            fond: this.state.fond
        })
    }

    onAjouterFondateur(e){

        this.setState({fond:[...this.state.fond, this.state.nomfond]})
        console.log(this.state.fond)
        this.setState({
            nomfond: ''
        })
    }

    onChangeFondateurs(e) {
        this.setState({
            nomfond: e.target.value
        })
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

    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const challenge = {
            nom: this.state.nom,
            description: this.state.description,
            type: this.state.type,
            domainesId : this.state.domaines
        }

        console.log(challenge);

        axios.post('http://localhost:5000/startups/update/' + this.props.id, challenge)
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
                                            <Label for="exampleText"><b>Domaines reliés</b></Label>
                                            <div>
                                                {this.domaineList()}
                                            </div>
                                        </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Fondateurs</b></Label>

                                                    {this.state.fondateurs.map((currentFon)=>
                                                        <InputGroup>
                                                        <Input nom="fondateurs" value={currentFon} onChange={this.onChangeFondateurs} />
                                                        <InputGroupAddon addonType="append">
                                                        <Button color="success" onClick={(e)=>this.onAjouterFondateur(e)}>Ajouter un autre fondateur</Button>
                                                        </InputGroupAddon>
                                                        </InputGroup>
                                                    )}

                                                {
                                                    this.state.fond.map((key, value)=>{
                                                        return(<InputGroup id={key}>
                                                            <InputGroupAddon addonType="prepend">
                                                                <Button color="danger" onClick={this.onDeleteFondateur}>Supprimer</Button>
                                                            </InputGroupAddon>
                                                            <Input disabled value={this.state.fond[value]} placeholder="and..." onChange={this.onChangeFondateurs}/>
                                                        </InputGroup>)
                                                    })
                                                }

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
