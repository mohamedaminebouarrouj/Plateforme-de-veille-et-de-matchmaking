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
export default class UpdateTendance extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitre = this.onChangeTitre.bind(this);
        this.onChangeResume = this.onChangeResume.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            titre: '',
            resume: ''
        }
    }

    componentDidMount() {
        axios.get(apiConfig.baseUrl+'/tendances/' + this.props.id)
            .then(response => {
                this.setState({
                    titre: response.data.titre,
                    resume: response.data.resume,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }



    onChangeTitre(e) {
        this.setState({
            titre: e.target.value
        })
    }

    onChangeResume(e) {
        this.setState({
            resume: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const tendance = {
            titre: this.state.titre,
            resume: this.state.resume
        }

        console.log(tendance);

        axios.post(apiConfig.baseUrl+'/tendances/update/' + this.props.id, tendance)
            .then(res => console.log(res.data));

        window.location.replace('#/tendances/afficher');
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
                                        <CardTitle>Modifier Tendance</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="Nom"><b>Titre</b></Label>
                                                <Input type="text" name="nom" id="nom"
                                                       required
                                                       value={this.state.titre}
                                                       onChange={this.onChangeTitre}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Résumé</b></Label>
                                                <Input type="textarea" name="resume" id="resume"
                                                       required
                                                       value={this.state.resume}
                                                       onChange={this.onChangeResume}/>
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
