import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import axios from 'axios';
import Select from "react-select";
import {apiConfig} from "../../../../config/config";
import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput, CardHeader, CardFooter,
} from 'reactstrap';

export default class UpdateRevendication extends Component {
    constructor(props) {
        super(props);
        this.onChangeVerified = this.onChangeVerified.bind(this);
        this.onChangeTraited = this.onChangeTraited.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            contenu: '',
            verified: null,
            startupNom: '',
            startupFondateur:[],
            traited: null
        }
    }

    componentDidMount() {
        axios.get(apiConfig.baseUrl+'/revendications/' + this.props.id)
            .then(response => {
                this.setState({
                    email: response.data.email,
                    contenu: response.data.contenu,
                    traited: response.data.traited,
                    verified: response.data.verified,
                    startupNom: response.data.startupId.nom,
                    startupFondateur: response.data.startupId.fondateurs
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTraited() {
        this.setState({
            traited: !this.state.traited
        })
    }

    onChangeVerified(e) {
        this.setState({
            verified: !this.state.verified,
            traited: true
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const revendication = {
            verified: this.state.verified,
            traited: this.state.traited
        }

        axios.post(apiConfig.baseUrl+'/revendications/update/' + this.props.id, revendication)
            .then(res => {
                console.log(res.data)
                window.location.replace('#/revendications/afficher');
                window.location.reload(false);
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
                                        <Card className="main-card mb-3">
                                            <CardHeader>Fiche de la Startup</CardHeader>
                                            <CardBody>
                                                <h6> <a style={{fontWeight:"bold"}}>Nom:</a> {this.state.startupNom}</h6>
                                            </CardBody>
                                            <CardFooter>
                                                <h6 style={{fontWeight:"bold"}}>Fondateur(s): </h6>
                                                &nbsp; &nbsp;
                                                <a>{this.state.startupFondateur.map(fond=>{
                                                    return(<div>{fond}</div>)
                                                })}</a>
                                            </CardFooter>
                                        </Card>

                                        <Card className="mb-3"  style={{backgroundColor: '#cccccc', borderColor: '#333'}}>
                                            <CardHeader>Email:
                                                &nbsp;
                                                <a style={{fontStyle:"italic",fontWeight:"normal", textTransform:'lowercase'}}>{this.state.email}</a>
                                            </CardHeader>
                                            <CardBody>
                                                {this.state.contenu}
                                            </CardBody>
                                        </Card>

                                            <CardBody>
                                                <CardTitle>Compte verifié</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="oui" value="oui"
                                                               checked={this.state.verified === true}
                                                               onChange={this.onChangeVerified}/>{' '}
                                                        Oui
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="non" value="non"
                                                               checked={this.state.verified === false}
                                                               onChange={this.onChangeVerified}/>{' '}
                                                        Non
                                                    </Label>
                                                </FormGroup>
                                            </FormGroup>

                                            <CardTitle>Demande traité</CardTitle>
                                            <FormGroup>
                                                <FormGroup check>
                                                    {console.log(this.state.traited)}
                                                    <Label check>
                                                        <Input type="radio" name="oui1" value="oui1"
                                                               checked={this.state.traited === true}
                                                               onChange={this.onChangeTraited}/>{' '}
                                                        Oui
                                                    </Label>
                                                </FormGroup>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input type="radio" name="non1" value="non1"
                                                               checked={this.state.traited === false}
                                                               onChange={this.onChangeTraited}/>{' '}
                                                        Non
                                                    </Label>
                                                </FormGroup>
                                            </FormGroup>

                                            <Button color="primary" className="mt-1" type="submit">Submit</Button>
                                        </Form>

                                            </CardBody>
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
