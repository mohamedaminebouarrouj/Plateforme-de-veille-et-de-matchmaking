import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import TableHover from './Examples/TableHover';


const AffichageTable = (props) => {
    return (
        <Fragment>
            <PageTitle
                heading="Challenges"
                icon="pe-7s-target  icon-gradient bg-happy-itmeo"
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
                                <TableHover/>
                        </Card>
                    </Col>
                </Row>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
};

export default AffichageTable;
