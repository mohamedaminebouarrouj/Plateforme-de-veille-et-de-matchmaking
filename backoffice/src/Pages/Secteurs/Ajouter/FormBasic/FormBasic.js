import React, { Component , Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';

export default class CreateSecteur extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategorie = this.onChangeCategorie.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: '',
            description: '',
            categorie: ''
        }
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

    onChangeCategorie(e) {
        this.setState({
            categorie: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const secteur = {
            nom: this.state.nom,
            description: this.state.description,
            categorie: this.state.categorie
        }


        axios.post('http://localhost:5000/secteurs/add', secteur)
            .then(res => {
                console.log(res.data)
                window.location.replace('#/secteurs/afficher')});


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
                                        <CardTitle>Ajouter Secteur</CardTitle>
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
                                                <Label for="exampleCustomSelect"><b>Catégorie</b></Label>
                                                <CustomInput type="select" id="categorie"
                                                             name="categorie"
                                                             value={this.state.categorie}
                                                             onChange={this.onChangeCategorie}
                                                required>
                                                    <option>Selectionner une catégorie</option>
                                                    <option value="Agriculture et pêche">Agriculture et pêche</option>
                                                    <option value="Industrie">Industrie</option>
                                                    <option value="Commerce">Commerce</option>
                                                    <option value="Services">Services</option>
                                                </CustomInput>
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
