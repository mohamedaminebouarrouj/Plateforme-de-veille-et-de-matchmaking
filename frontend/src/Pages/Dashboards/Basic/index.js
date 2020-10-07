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
    TabPane,
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

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
                            <Col md="12" lg="12">
                                <Row>
                                    <Col md="6">

                                            <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">

                                                <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-10"/>
                                                <i className="lnr-cog icon-gradient bg-arielle-smile"/>
                                            </div>
                                            <div className="widget-numbers">
                                                2
                                            </div>
                                            <div className="widget-subheading">
                                                Domaines
                                            </div>
                                        </div>

                                    </Col>
                                    <Col md="6">
                                        <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-white opacity-10"/>
                                                <i className="lnr-screen icon-gradient bg-warm-flame"/>
                                            </div>
                                            <div className="widget-numbers">
                                                2
                                            </div>
                                            <div className="widget-subheading">
                                                Challenges
                                            </div>
                                        </div>

                                    </Col>
                                    <Col md="6">
                                        <div className="card mb-3 bg-grow-early widget-chart text-white card-border">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-dark opacity-9"/>
                                                <i className="lnr-graduation-hat text-white"/>
                                            </div>
                                            <div className="widget-numbers">
                                                0
                                            </div>
                                            <div className="widget-subheading">
                                                Startups
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md="6">
                                        <div className="card mb-3 bg-love-kiss widget-chart card-border">
                                            <div className="widget-chart-content text-white">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-white opacity-4"/>
                                                    <i className="lnr-cog"/>
                                                </div>
                                                <div className="widget-numbers">
                                                    0
                                                </div>
                                                <div className="widget-subheading">
                                                    Articles
                                                </div>
                                            </div>
                                        </div>

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
