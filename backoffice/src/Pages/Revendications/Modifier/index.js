import React, {Component, Fragment} from 'react'
import PageTitle from '../../../Layout/AppMain/PageTitle';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {Card, Col, Row} from "reactstrap";
import UpdateRevendication from "./FormBasic/FormBasic";


export default class FormElementsControlsUpdate extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <Fragment>
                <PageTitle
                    heading="Revendication"
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
                                <UpdateRevendication id={this.props.match.params.id}/>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>

            </Fragment>
        )
    }


}




