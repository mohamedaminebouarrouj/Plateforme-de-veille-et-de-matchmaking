import React, {Fragment} from 'react'

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples

import FormsDefault from './FormBasic/FormBasic';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Card, Col, Row} from "reactstrap";
import TableHover from "../Afficher/Examples/TableHover";

const tabsContent = [
    {
        title: 'Basic',
        content: <FormsDefault/>
    },
];

const FormElementsControls = (props) => {

        return (

            <Fragment>
                <PageTitle
                    heading="Startups"
                    icon="pe-7s-star icon-gradient bg-happy-itmeo"
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
                                <FormsDefault/>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>

            </Fragment>
        )
}

export default FormElementsControls;



