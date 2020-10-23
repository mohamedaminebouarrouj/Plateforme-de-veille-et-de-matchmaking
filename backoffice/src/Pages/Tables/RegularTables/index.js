import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import TableExample from './Examples/Table';
import TableBordered from './Examples/TableBordered';
import TableBorderless from './Examples/TableBorderless';
import TableDark from './Examples/TableDark';
import TableHover from './Examples/TableHover';
import TableResponsive from './Examples/TableResponsive';
import TableSizing from './Examples/TableSizing';
import TableStriped from './Examples/TableStriped';


const RegularTables = (props) => {
    return (
        <Fragment>
            <PageTitle
                heading="Regular Tables"
                subheading="Tables are the backbone of almost all web applications."
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
                            <CardBody>
                                <CardTitle>Table with hover</CardTitle>
                                <TableHover/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
};

export default RegularTables;
