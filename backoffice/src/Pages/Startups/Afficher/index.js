import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, Input, Label, FormGroup
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import TableHover from './Examples/TableHover';
import SearchBox from "../../../Layout/AppHeader/Components/SearchBox";


const AffichageTable = (props) => {
    return (
        <Fragment>
            <PageTitle
                heading="Startups"
                icon="pe-7s-star icon-gradient bg-happy-itmeo"
            />
            <Row>
                <Col>
                    <SearchBox/>
                </Col>
            </Row>
            <br/>
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
