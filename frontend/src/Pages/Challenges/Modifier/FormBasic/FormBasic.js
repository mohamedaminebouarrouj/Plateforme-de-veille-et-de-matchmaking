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
        this.onChangeDomaine=this.onChangeDomaine.bind(this);

        this.state = {
            nom: '',
            description: '',
            type: '',
            domaines: [],
            dom: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/challenges/' + this.props.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    description: response.data.description,
                    type: response.data.type,
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

        axios.post('http://localhost:5000/challenges/update/' + this.props.id, challenge)
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
                                            <Label for="exampleText"><b>Domaines reliés</b></Label>
                                            <div>
                                                {this.domaineList()}
                                            </div>
                                        </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleCustomSelect"><b>Type</b></Label>
                                                <CustomInput type="select" id="type"
                                                             name="type"
                                                             value={this.state.type}
                                                             onChange={this.onChangeType}
                                                required>
                                                    <option>Selectionner un Type</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Général">Général</option>
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
