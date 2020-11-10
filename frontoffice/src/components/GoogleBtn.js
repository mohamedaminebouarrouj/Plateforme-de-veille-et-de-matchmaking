import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {Button} from "reactstrap";


const CLIENT_ID = '765418587715-1tuhirtc03dg0ohqjamnt53jh7i57lk0.apps.googleusercontent.com';


class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login (response) {
        if(response.accessToken){
            this.setState(state => ({
                isLogined: true,
                accessToken: response.accessToken
            }));
        }
        console.log(response.profileObj)
    }

    logout (response) {
        this.setState(state => ({
            isLogined: false,
            accessToken: ''
        }));
    }

    handleLoginFailure (response) {
    }

    handleLogoutFailure (response) {
    }

    render() {
        return (
            <div>
                { this.state.isLogined ?
                    <GoogleLogout
                        clientId={ CLIENT_ID }
                        buttonText='Logout'
                        className="btn-neutral btn-icon"
                        onLogoutSuccess={ this.logout }
                        onFailure={ this.handleLogoutFailure }
                    >
                    </GoogleLogout>: <GoogleLogin
                        clientId={ CLIENT_ID }
                        render={renderProps => (
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                onClick={renderProps.onClick}
                            >
                                <img alt="..." src={require("assets/img/google.svg")}/>
                            </Button>
                        )}
                        onSuccess={ this.login }
                        onFailure={ this.handleLoginFailure }
                        cookiePolicy={ 'single_host_origin' }
                        responseType='code,token'
                    />
                }

            </div>
        )
    }
}

export default GoogleBtn;