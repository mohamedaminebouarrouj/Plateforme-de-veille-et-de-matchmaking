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
import {apiConfig} from "../../../../config/config";
export default class UpdateUtilisteur extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeOrganisation = this.onChangeOrganisation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: '',
            prenom: '',
            organisation: '',
        }
    }

    componentDidMount() {
        axios.get(apiConfig.baseUrl+'/users/' + this.props.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    prenom:response.data.prenom,
                    organisation:response.data.organisation
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangePrenom(e) {
        this.setState({
            prenom: e.target.value
        })
    }

    onChangeOrganisation(e) {
        this.setState({
            organisation: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            organisation: this.state.organisation
        }

        axios.post(apiConfig.baseUrl+'/users/admin/update/' + this.props.id, user)
            .then(res => {
                console.log(res.data)
                window.location.replace('#/utilisateurs/afficher');
                window.location.reload(false);});

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
                                        <CardTitle>Modifier Secteur</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="Nom"><b>Nom</b></Label>
                                                <Input type="text" name="nom" id="nom"
                                                       required
                                                       value={this.state.nom}
                                                       onChange={this.onChangeNom}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="Nom"><b>Prénom</b></Label>
                                                <Input type="text" name="prenom" id="prenom"
                                                       required
                                                       value={this.state.prenom}
                                                       onChange={this.onChangePrenom}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="Nom"><b>Organisation</b></Label>
                                                <Input type="text" name="organisation" id="organisation"
                                                       required
                                                       value={this.state.organisation}
                                                       onChange={this.onChangeOrganisation}/>
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
