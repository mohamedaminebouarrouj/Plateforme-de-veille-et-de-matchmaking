import React, {Fragment} from 'react'

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples

import FormsDefault from './FormBasic/FormBasic';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Card, Col, Row} from "reactstrap";
import CreateSecteur from "./FormBasic/FormBasic";


const FormElementsControls = (props) => {

        return (

            <Fragment>
                <PageTitle
                    heading="Secteurs"
                    icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
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
                                <CreateSecteur/>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>

            </Fragment>
        )
}

export default FormElementsControls;



