import React, {Component, Fragment} from 'react'

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples

import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Card, Col, Row} from "reactstrap";
import UpdateTendance from "./FormBasic/FormBasic";


export default class FormElementsControlsUpdateTendance extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <Fragment>
                <PageTitle
                    heading="Tendances"
                    icon="pe-7s-box2 icon-gradient bg-happy-itmeo"
                />
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col>
                            <Card className="main-card mb-3">
                                <UpdateTendance id={this.props.match.params.id}/>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>

            </Fragment>
        )
    }


}




