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
import {apiConfig} from "../../../config";



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


        axios.post(apiConfig.baseUrl+'/users/login', user)
            .then(res => {
                if(res.data.user) {
                    localStorage.setItem('auth-tokenAdmin', res.data.token)
                    localStorage.setItem('loggedAdmin', JSON.stringify(res.data.user))
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
                        <Row>
                            <Col md="2"/>
                            <Col md="6" style={{backgroundColor:'#344675',color:'#fff',top:'100px'}}>
                                <h1>Admin <span style={{color: '#ffe600'}}>I</span>nno<span
                                    style={{color: '#ffe600'}}>S</span>eer•</h1>
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
                                            <button type="submit" color="primary" className="btn btn-primary btn-block">Submit</button>

                                    </Form>
                                <br/>
                            </Col>
                        </Row>
                </ReactCSSTransitionGroup>

            </Fragment>
        )
    }
}
