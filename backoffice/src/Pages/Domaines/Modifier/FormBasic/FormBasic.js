import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import {apiConfig} from "../../../../config/config";
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";

const animatedComponents = makeAnimated();

export default class UpdateDomaine extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCategorie = this.onChangeCategorie.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeSecteur = this.onChangeSecteur.bind(this);

        this.state = {
            nom: '',
            description: '',
            categorie: '',
            secteurs: [],
            sect: []
        }
    }

    componentDidMount() {
        axios.get(apiConfig.baseUrl+'/domaines/findUpdate/' + this.props.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    description: response.data.description,
                    categorie: response.data.categorie,
                    secteurs: response.data.secteursId
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(apiConfig.baseUrl+'/secteurs/')
            .then(response => {
                this.setState({sect: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        console.log("sect", this.state.secteurs)
    }

    onChangeSecteur(e) {
        if (e != null) {
            this.setState({
                secteurs: e.map((o) => o.value)
            })
        } else {
            this.setState({
                secteurs: []
            })
        }
    }


    secteurList() {

        let selected = []
        const options = this.state.sect.map(currentSecteur => ({value: currentSecteur._id, label: currentSecteur.nom}))
        this.state.sect.map(currentSecteur => {
            this.state.secteurs.map(selectedSecteur => {
                if (currentSecteur._id === selectedSecteur)
                    selected.push({value: currentSecteur._id, label: currentSecteur.nom})
            })
        })
        console.log('selec', selected)
        return (
            <Select
                value={selected}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.onChangeSecteur}
                className="basic-multi-select"
                classNamePrefix="select"
            > </Select>
        )

        // return this.state.sect.map(currentSecteur => {
        //     return (
        //             <CustomInput type="checkbox"
        //                          checked= {this.state.secteurs.includes(currentSecteur._id)}
        //                          label={currentSecteur.nom}
        //                          value={currentSecteur._id}
        //                          id={currentSecteur._id}
        //                          key={currentSecteur._id}
        //                          onChange={this.onChangeSecteur}/>
        //                         )
        // })
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

        const domaine = {
            nom: this.state.nom,
            description: this.state.description,
            categorie: this.state.categorie,
            secteursId: this.state.secteurs
        }

        axios.post(apiConfig.baseUrl+'/domaines/update/' + this.props.id, domaine)
            .then(res => {
                console.log(res)
                window.location.replace('#/domaines/afficher');
            });


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
                                        <CardTitle>Modifier Domaine</CardTitle>
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
                                                >
                                                    <option value="">Selectionner une catégorie</option>
                                                    <option value="Ingénierie">Ingénierie</option>
                                                    <option value="ICT">ICT</option>
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
