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
    TabPane, Form, Input, FormGroup, Label,
} from 'reactstrap';

import axios from "axios";



export default class LogComponent extends Component {
    constructor(props) {
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit=this.onSubmit.bind(this);


        this.state = {
            email: '',
            password: '',
        }
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(user);

        axios.post(apiConfig.baseUrl+'/users/login', user)
            .then(res => {
                if(res.data.user) {
                    localStorage.setItem('auth-token', res.data.token)
                    console.log(res.data)
                    window.location.replace('#/dashboards/basic');
                } else{
                    window.location.replace('#/login');
                }

            }).catch(error => {
                console.log(error)
        });



    }


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
                        <Row>
                            <Col md="12" lg="12">
                                <Row>
                                    <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Label for="email"><b>Email</b></Label>
                                            <Input type="email" name="email" id="email"
                                                   required
                                                   value={this.state.email}
                                                   onChange={this.onChangeEmail}/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="password"><b>Password</b></Label>
                                            <Input type="password" name="password" id="password"
                                                   required
                                                   value={this.state.password}
                                                   onChange={this.onChangePassword}/>
                                        </FormGroup>
                                        <Button color="primary" className="mt-1">Submit</Button>

                                    </Form>

                                </Row>
                            </Col>
                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
