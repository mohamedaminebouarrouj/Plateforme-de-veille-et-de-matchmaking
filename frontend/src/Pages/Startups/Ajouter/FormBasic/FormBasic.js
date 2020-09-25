import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import {
    Button, Form,
    FormGroup, Label,
    Input,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';
import axios from "axios";

export default class CreateStartup extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDomaine = this.onChangeDomaine.bind(this);
        this.onChangeFondateurs = this.onChangeFondateurs.bind(this);
        this.onChangeDate= this.onChangeDate.bind(this);
        this.onChangeLogo=this.onChangeLogo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nom: '',
            description: '',
            fondateurs : [],
            dateCreation: new Date(),
            logo: '',
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

    onChangeFondateurs(e) {
        this.setState({
            fondateurs: e.target.value
        })
    }


    onChangeDate(date) {
        this.setState({
            dateCreation: date
        })
        console.log(date)
    }

    onChangeDomaine(e) {
        if(e.target.checked){

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

    onChangeLogo(e) {
        this.setState({
            logo: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.domaines)
        const startup = {
            nom: this.state.nom,
            description: this.state.description,
            fondateurs: this.state.fondateurs,
            dateCreation: this.state.dateCreation,
            logo: this.state.logo,
            domainesId: this.state.domaines
        }

        console.log(startup);

        axios.post('http://localhost:5000/startups/add', startup)
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
                                        <CardTitle>Ajouter Startup</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="Nom"><b>Nom de la startup</b></Label>
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
                                                <Label for="exampleText"><b>Date de création</b></Label>
                                                <DatePicker
                                                    dateFormat="MM/yyyy"
                                                    selected={this.state.dateCreation}
                                                    onChange={this.onChangeDate}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Fondateurs</b></Label>
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
                                                <Label><b>Logo</b></Label>
                                                <Input type="file" name="logo" id="logo"
                                                onChange={this.onChangeLogo}>Parcourir</Input>
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
