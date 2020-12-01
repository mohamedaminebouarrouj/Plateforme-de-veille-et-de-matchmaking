import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import Select from "react-select";

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';

import makeAnimated from "react-select/animated/dist/react-select.esm";

const animatedComponents = makeAnimated();

export default class UpdateChallenge extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
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
        axios.get('http://localhost:5000/challenges/findUpdate/' + this.props.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    description: response.data.description,
                    secteurs: response.data.secteursId
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/secteurs/')
            .then(response => {
                this.setState({sect: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
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


    domaineList() {
        let selected = []
        const options = this.state.sect.map(currentSecteur => ({value: currentSecteur._id, label: currentSecteur.nom}))
        this.state.sect.map(currentSecteur => {
            this.state.secteurs.map(selectedSecteur => {
                if (currentSecteur._id === selectedSecteur){
                    selected.push({value: currentSecteur._id, label: currentSecteur.nom})
                }
            })
        })
        console.log(this.state.sect)

        return (
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={selected}
                isMulti
                options={options}
                onChange={this.onChangeSecteur}
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


        axios.post('http://localhost:5000/challenges/update/' + this.props.id, challenge)
            .then(res => {
                console.log(res.data)
                window.location.replace('#/challenges/afficher');
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
                                        <CardTitle>Modifier Challenge</CardTitle>
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
