import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classnames from 'classnames';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress,
    TabContent,
    TabPane, NavLink,
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import {Link} from "react-router-dom";

export default class AnalyticsDashboard1 extends Component {
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
                        <PageTitle
                            heading="Dashboard de l'application"
                            icon="pe-7s-car icon-gradient bg-ey-yellow"
                        />
                        <Row>
                            <Col md="2">
                                <iframe
                                    style={{
                                        background: "#FF9400",
                                        border: "none",
                                        borderRadius: "2px",
                                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                    }}
                                    width="200" height="200"
                                    src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=51f02637-64e1-4158-9790-92c45cf3d47e&theme=light&attribution=false"/>
                            </Col>
                            <Col md="2">
                                <iframe
                                    style={{
                                        background: "#FFAD00",
                                        border: "none",
                                        borderRadius: "2px",
                                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                    }}
                                    width="200" height="200"
                                    src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=606fb4b9-d37d-45a3-8ce7-e0e0390f85ef&theme=light&attribution=false"/>
                            </Col>
                            <Col md="2">
                                <iframe
                                    style={{
                                        background: "#FFBC00",
                                        border: "none",
                                        borderRadius: "2px",
                                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                    }}
                                    width="200" height="200"
                                    src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=ccbc0c28-b748-401d-88f5-9dc1ce285165&theme=light&attribution=false"/>
                            </Col>
                            <Col md="2">
                                <iframe
                                    style={{
                                        background: "#FFD300",
                                        border: "none",
                                        borderRadius: "2px",
                                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                    }}
                                    width="200" height="200"
                                    src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=f0d7e273-abe4-4f96-b81d-ba23c3321217&theme=light&attribution=false"/>
                            </Col>
                            <Col md="2">
                                <iframe
                                    style={{
                                        background: "#FFE800",
                                        border: "none",
                                        borderRadius: "2px",
                                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                    }}
                                    width="200" height="200"
                                    src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=8cd26812-07d2-4d2a-bd25-a445e74e2f75&theme=light&attribution=false"/>
                            </Col>
                            <Col md="2">
                                <iframe
                                    style={{
                                        background: "#FFFD00",
                                        border: "none",
                                        borderRadius: "2px",
                                        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                    }}
                                    width="200" height="200"
                                    src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=1e0fa84a-b350-4cec-8701-107bc6a099c1&theme=light&attribution=false"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" lg="12">
                                <Row>
                                    <Col md="6">
                                        <iframe
                                            style={{
                                                background: "#fff",
                                                border: "none",
                                                borderRadius: "2px",
                                                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                            }}
                                            width="600" height="480"
                                            src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=1a43f478-7de3-45b3-8d45-664aa91be431&theme=light&attribution=false"/>

                                    </Col>
                                    <Col md="6">
                                        <iframe
                                            style={{
                                                background: "#fff",
                                                border: "none",
                                                borderRadius: "2px",
                                                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                            }}
                                            width="600" height="480"
                                            src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=0bd6c091-07a0-4faf-bb74-10920e44d2ab&theme=light&attribution=false"/>



                                    </Col>

                                    <Col md="6">
                                        <iframe
                                            style={{
                                                background: "#fff",
                                                border: "none",
                                                borderRadius: "2px",
                                                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                            }}
                                            width="600" height="480"
                                            src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=a6393df5-7189-44ec-89c3-29d01410a4c1&theme=light&attribution=false"/>

                                    </Col>

                                    <Col md="6">
                                        <iframe
                                            style={{
                                                background: "#fff",
                                                border: "none",
                                                borderRadius: "2px",
                                                boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)'
                                            }}
                                            width="600" height="480"
                                            src="https://charts.mongodb.com/charts-project-0-asjwq/embed/charts?id=2efba5bb-615a-44fb-a7b9-ef5d8037ee13&theme=light&attribution=false"/>

                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
