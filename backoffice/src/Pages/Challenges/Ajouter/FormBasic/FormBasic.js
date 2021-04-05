import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {apiConfig} from "../../../../config/config";
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';
import axios from "axios";

const animatedComponents = makeAnimated();

export default class CreateChallenge extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSecteur = this.onChangeSecteur.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);


        this.state = {
            nom: '',
            description: '',
            type: '',
            secteurs:[],
            sect : []
        }
    }

    componentDidMount() {
        axios.get(apiConfig.baseUrl+'/secteurs/')
            .then(response => {
                this.setState({sect: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    secteurList() {
        const options= this.state.sect.map(currentDomaine => ({value: currentDomaine._id, label:currentDomaine.nom}))
        return (
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.onChangeSecteur}
            > </Select>
        )
    }

    handleChange(event) {
        this.setState({
            secteurs : Array.from(event.target.selectedOptions, item => item.value)
        });

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

    onChangeSecteur(e) {
        if (e!=null){
            this.setState({
                secteurs: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                secteurs: []
            })
        }
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
            secteursId: this.state.secteurs
        }

        axios.post(apiConfig.baseUrl+'/challenges/add', challenge)
            .then(res =>{
                console.log(res.data)
                window.location.replace('#/challenges/afficher');
            }) ;

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
                                        <CardTitle>Ajouter Challenge</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="Nom"><b>Nom</b></Label>
                                                <Input type="text" name="nom" id="Nom"
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
                                                <Label for="exampleText"><b>Secteurs reliés</b></Label>
                                                <div>
                                                    {this.secteurList()}
                                                </div>
                                            </FormGroup>
                                            <Button color="primary" className="mt-1">Submit</Button>
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
