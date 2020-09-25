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

export default class CreateChallenge extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDomaine = this.onChangeDomaine.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: '',
            description: '',
            type: '',
            domaines:[],
            dom : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/domaines/')
            .then(response => {
                this.setState({dom: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    domaineList() {
        return this.state.dom.map(currentDomaine => {
            return <CustomInput type="checkbox" label={currentDomaine.nom} value={currentDomaine._id} id={currentDomaine._id} key={currentDomaine._id} onChange={this.onChangeDomaine}/>;
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

    onChangeDomaine(e) {
        //let value = Array.of(e.target.value);
        //console.log(e.target.value)
        if(e.target.checked == true){

            this.setState({
                domaines: [...this.state.domaines, e.target.value]
            })

        }
        else{
            this.state.domaines.pop(e.target.value)
            this.setState({
                domaines:  this.state.domaines
            })
        }


        //console.log(value)
    }

    onChangeType(e) {
        this.setState({
            type: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.domaines)
        const challenge = {
            nom: this.state.nom,
            description: this.state.description,
            type: this.state.type,
            domainesId: this.state.domaines
        }

        console.log(challenge);

        axios.post('http://localhost:5000/challenges/add', challenge)
            .then(res => console.log(res.data));

        window.location.replace('#/challenges/afficher');
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
                                                <Label for="exampleText"><b>Domaines reliés</b></Label>
                                                <div>
                                                    {this.domaineList()}
                                                </div>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleCustomSelect"><b>Type</b></Label>
                                                <CustomInput type="select" id="Type"
                                                             name="type"
                                                             value={this.state.type}
                                                             onChange={this.onChangeType}
                                                             required>
                                                    <option>Selectionner un Type</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Général">Général</option>
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
