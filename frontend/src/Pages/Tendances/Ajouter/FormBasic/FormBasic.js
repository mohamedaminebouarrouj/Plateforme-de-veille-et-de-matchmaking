import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Button, Form,
    FormGroup, Label,
    Input, FormText,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';

export default class FormsDefault extends React.Component {
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
                                        <Form>
                                            <FormGroup>
                                                <Label for="Nom"><b>Nom</b></Label>
                                                <Input type="text" name="nom" id="Nom"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText"><b>Description</b></Label>
                                                <Input type="textarea" name="description" id="description"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText"><b>Secteurs reliés</b></Label>
                                                <div>
                                                    <CustomInput type="checkbox" id="exampleCustomCheckbox"
                                                                 label="Secteur Agro"/>
                                                    <CustomInput type="checkbox" id="exampleCustomCheckbox2"
                                                                 label="Or this one"/>
                                                    <CustomInput type="checkbox" id="exampleCustomCheckbox3"
                                                                 label="Or this one"
                                                                 />
                                                </div>
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
