import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle,Button
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';
import TableHover from './Examples/TableHover';
import axios from 'axios';


function ajouterButton(){

    axios.get('http://localhost:5000/startups/scraping/')
        .then(res => console.log(res.data));

    window.location.replace('#/startups/afficher');
    window.location.reload(false);
}

const AffichageTable = (props) => {
    return (
        <Fragment>
            <PageTitle
                heading="Startups"
                icon="pe-7s-star icon-gradient bg-happy-itmeo"
            />

            <Button onClick={ajouterButton}>Ajouter les startups</Button>
            <br></br>
            <br></br>

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
