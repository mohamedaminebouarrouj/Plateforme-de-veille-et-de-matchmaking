import React, {Component, Fragment} from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Card, Col, Row} from "reactstrap";
import UpdateChallenge from "./FormBasic/FormBasic";


export default class FormElementsControlsUpdate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <Fragment>
                <PageTitle
                    heading="Challenges"
                    icon="pe-7s-arc  icon-gradient bg-happy-itmeo"
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
                                <UpdateChallenge id={this.props.match.params.id}/>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>

            </Fragment>
        )
    }


}




