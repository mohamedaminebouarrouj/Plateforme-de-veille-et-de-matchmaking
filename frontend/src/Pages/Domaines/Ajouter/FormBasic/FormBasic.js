import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';
import axios from "axios";

export default class CreateSecteur extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSecteur = this.onChangeSecteur.bind(this);
        this.onChangeCategorie = this.onChangeCategorie.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: '',
            description: '',
            categorie: '',
            secteurs:[],
            sect : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/secteurs/')
            .then(response => {
                this.setState({sect: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    secteurList() {
        return this.state.sect.map(currentSecteur => {
            return <CustomInput type="checkbox" label={currentSecteur.nom} value={currentSecteur._id} id={currentSecteur._id} key={currentSecteur._id} onChange={this.onChangeSecteur}/>;
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

    onChangeSecteur(e) {
        //let value = Array.of(e.target.value);
        //console.log(e.target.value)
        if(e.target.checked == true){

            this.setState({
                secteurs: [...this.state.secteurs, e.target.value]
            })

        }
        else{
            this.state.secteurs.pop(e.target.value)
            this.setState({
                secteurs:  this.state.secteurs
            })
        }


        //console.log(value)
    }

    onChangeCategorie(e) {
        this.setState({
            categorie: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.secteurs)
        const domaine = {
            nom: this.state.nom,
            description: this.state.description,
            categorie: this.state.categorie,
            secteursId: this.state.secteurs
        }

        console.log(domaine);

        axios.post('http://localhost:5000/domaines/add', domaine)
            .then(res => console.log(res.data));

        window.location.replace('#/domaines/afficher');
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
                                        <CardTitle>Ajouter Domaine</CardTitle>
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

                                            <FormGroup>
                                                <Label for="exampleCustomSelect"><b>Catégorie</b></Label>
                                                <CustomInput type="select" id="categorie"
                                                             name="categorie"
                                                             value={this.state.categorie}
                                                             onChange={this.onChangeCategorie}
                                                             required>
                                                    <option>Selectionner une catégorie</option>
                                                    <option value="Ingenierie">Ingenierie</option>
                                                    <option value="ICT">ICT</option>
                                                </CustomInput>
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
