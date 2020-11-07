/*!

=========================================================
* BLK Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {Link} from "react-router-dom";
// reactstrap components
import {
    Button,
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container, Modal, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input,
} from "reactstrap";

import classnames from "classnames";


import axios from "axios";
import GoogleBtn from '../GoogleBtn';

class ComponentsNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeOrganisation = this.onChangeOrganisation.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this)
        this.onSubmitRegister = this.onSubmitRegister.bind(this)
        this.onSubmitLogout=this.onSubmitLogout.bind(this)

        this.state = {
            nom: '',
            prenom: '',
            organisation: '',
            email: '',
            password: '',
            user: null,

            registerModal: false,
            formModal: false,
            collapseOpen: false,
            color: "navbar-transparent"
        };
    }

    toggleModal = modalState => {
        this.setState({
            [modalState]: !this.state[modalState]
        });
    };

    componentDidMount() {
        axios.get('http://localhost:5000/users/user', {
            headers: {
                Authorization: localStorage.getItem('auth-token')
            }
        })
            .then(response => {
                this.setState({user: response.data.user})
            })
            .catch((error) => {
                console.log(error);
            })
        window.addEventListener("scroll", this.changeColor);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.changeColor);
    }

    changeColor = () => {
        if (
            document.documentElement.scrollTop > 29 ||
            document.body.scrollTop > 29
        ) {
            this.setState({
                color: "bg-default"
            });
        } else if (
            document.documentElement.scrollTop < 30 ||
            document.body.scrollTop < 30
        ) {
            this.setState({
                color: "navbar-transparent"
            });
        }
    };
    toggleCollapse = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({
            collapseOpen: !this.state.collapseOpen
        });
    };
    onCollapseExiting = () => {
        this.setState({
            collapseOut: "collapsing-out"
        });
    };
    onCollapseExited = () => {
        this.setState({
            collapseOut: ""
        });
    };
    scrollToDownload = () => {
        document
            .getElementById("download-section")
            .scrollIntoView({behavior: "smooth"});
    };

    onRegister = () => {
        this.toggleModal("registerModal")
        this.setState({
            formModal: !this.state.formModal
        })
    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangePrenom(e) {
        this.setState({
            prenom: e.target.value
        })
    }

    onChangeOrganisation(e) {
        this.setState({
            organisation: e.target.value
        })
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

    onSubmitLogin(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:5000/users/login', user)
            .then(res => {
                if (res.data.user) {
                    localStorage.setItem('auth-token', res.data.token)
                    console.log(res.data)
                    window.location.replace('/');
                } else {
                    window.location.replace('/');
                }

            }).catch(error => {
            console.log(error)
        });
    }

    onSubmitLogout() {
        localStorage.setItem('auth-token', '')
        window.location.replace('/');
    }

    onSubmitRegister(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            nom: this.state.nom,
            prenom: this.state.prenom,
            organisation: this.state.organisation
        }

        axios.post('http://localhost:5000/users/register', user)
            .then(res => {
                console.log(res.data);
                window.location.replace('/');
            }).catch(() => {
            console.log("le")

        });

    }

    render() {
        const isLoggedIn = this.state.user;
        let navitem;
        if (isLoggedIn) {
            navitem =
                <Nav>
                    <NavItem className="active">
                        <NavLink tag={Link} to="/profile-page">
                            <i className="tim-icons icon-single-02"/>
                            {this.state.user.nom}
                        </NavLink>

                    </NavItem>
                    <NavItem>
                            <NavLink tag={Link} onClick={this.onSubmitLogout} to='/logout'>
                                Se déconnecter
                            </NavLink>
                    </NavItem>
                </Nav>
                ;
        } else {
            navitem = <NavItem>
                <Button
                    className="btn-neutral"
                    color="link"
                    isOpen={this.state.formModal}
                    onClick={() => this.toggleModal("formModal")}>
                    <i className="tim-icons icon-single-02"/>
                    Se Connecter/S'inscrire
                </Button>

                {/* Start Form Modal */}
                <Modal
                    modalClassName="modal-black"
                    isOpen={this.state.formModal}
                    toggle={() => this.toggleModal("formModal")}
                >
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            onClick={() => this.toggleModal("formModal")}
                        >
                            <i className="tim-icons icon-simple-remove text-white"/>
                        </button>
                        <div className="text-muted text-center ml-auto mr-auto">
                            <h3 className="mb-0">Se connecter avec</h3>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="btn-wrapper text-center">
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <img alt="..." src={require("assets/img/github.svg")}/>
                            </Button>
                            <GoogleBtn/>
                        </div>
                        <div className="text-center text-muted mb-4 mt-3">
                            <small>Ou</small>
                        </div>
                        <Form onSubmit={this.onSubmitLogin}>

                            <FormGroup className="mb-3">
                                <InputGroup
                                    className={classnames("input-group-alternative", {
                                        "input-group-focus": this.state.emailFocus
                                    })}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-email-85"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        onFocus={e => this.setState({emailFocus: true})}
                                        onBlur={e => this.setState({emailFocus: false})}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup
                                    className={classnames("input-group-alternative", {
                                        "input-group-focus": this.state.passwordFocus
                                    })}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-key-25"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        onFocus={e => this.setState({passwordFocus: true})}
                                        onBlur={e => this.setState({passwordFocus: false})}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mt-3">
                                <a href="#">
                                    Mot de passe oublié
                                </a>
                            </FormGroup>

                            <div className="text-center">
                                <Button onClick={this.onSubmitLogin}
                                        className="btn btn-simple btn-round" color="primary"
                                        type="submit">
                                    Se connecter
                                </Button>

                            </div>
                        </Form>
                        <div className="text-center mb-4 mt-4">
                            <span> Pas de compte? </span>
                            <a
                                className="btn btn-default btn-round"
                                isOpen={this.state.registerModal}
                                onClick={() => this.onRegister()}>S'inscrire</a>
                        </div>
                    </div>

                </Modal>
                {/* End Form Modal */}


                <Modal
                    modalClassName="modal-black"
                    isOpen={this.state.registerModal}
                    toggle={() => this.toggleModal("registerModal")}
                >

                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            onClick={() => this.toggleModal("registerModal")}
                        >
                            <i className="tim-icons icon-simple-remove text-white"/>
                        </button>
                        <div className="text-muted text-center ml-auto mr-auto">
                            <h3 className="mb-0">Créer un compte</h3>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="btn-wrapper text-center">
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <img alt="..." src={require("assets/img/github.svg")}/>
                            </Button>
                            <Button
                                className="btn-neutral btn-icon"
                                color="default"
                                href="#pablo"
                                onClick={e => e.preventDefault()}
                            >
                                <img alt="..." src={require("assets/img/google.svg")}/>
                            </Button>
                        </div>
                        <div className="text-center text-muted mb-4 mt-3">
                            <small>Ou</small>
                        </div>

                        <Form onSubmit={this.onSubmitRegister}>

                            <FormGroup className="mb-3">
                                <InputGroup
                                    className={classnames("input-group-alternative", {
                                        "input-group-focus": this.state.nomFocus
                                    })}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-single-02"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Nom"
                                        type="text"
                                        required
                                        value={this.state.nom}
                                        onChange={this.onChangeNom}
                                        onFocus={e => this.setState({nomFocus: true})}
                                        onBlur={e => this.setState({nomFocus: false})}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <InputGroup
                                    className={classnames("input-group-alternative", {
                                        "input-group-focus": this.state.prenomFocus
                                    })}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-single-02"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Prénom"
                                        type="text"
                                        required
                                        value={this.state.prenom}
                                        onChange={this.onChangePrenom}
                                        onFocus={e => this.setState({prenomFocus: true})}
                                        onBlur={e => this.setState({prenomFocus: false})}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <FormGroup className="mb-3">
                                <InputGroup
                                    className={classnames("input-group-alternative", {
                                        "input-group-focus": this.state.organisationFocus
                                    })}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-badge"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Organisation (facultatif)"
                                        type="text"
                                        value={this.state.organisation}
                                        onChange={this.onChangeOrganisation}
                                        onFocus={e => this.setState({organisationFocus: true})}
                                        onBlur={e => this.setState({organisationFocus: false})}
                                    />
                                </InputGroup>
                            </FormGroup>


                            <FormGroup className="mb-3">
                                <InputGroup
                                    className={classnames("input-group-alternative", {
                                        "input-group-focus": this.state.emailFocus
                                    })}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-email-85"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Email"
                                        type="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                        onFocus={e => this.setState({emailFocus: true})}
                                        onBlur={e => this.setState({emailFocus: false})}
                                    />
                                </InputGroup>

                            </FormGroup>


                            <FormGroup>
                                <InputGroup
                                    className={classnames("input-group-alternative", {
                                        "input-group-focus": this.state.passwordFocus
                                    })}
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-key-25"/>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        onFocus={e => this.setState({passwordFocus: true})}
                                        onBlur={e => this.setState({passwordFocus: false})}
                                    />
                                </InputGroup>
                            </FormGroup>

                            <div className="text-center">
                                <Button className="btn btn-simple btn-round" color="primary"
                                        type="submit">
                                    S'inscrire
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Modal>

            </NavItem>;
        }
        return (
            <Navbar
                className={"fixed-top " + this.state.color}
                color-on-scroll="100"
                expand="lg"
            >
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            to="/"
                            tag={Link}
                            id="navbar-brand"
                        >
                            <span style={{fontSize:'20px'}}><span style={{color: '#ffe600'}}>I</span>nno<span style={{color: '#ffe600'}}>S</span>eer• </span>
                        </NavbarBrand>
                    </div>
                    <Collapse
                        className={"justify-content-end " + this.state.collapseOut}
                        navbar
                        isOpen={this.state.collapseOpen}
                        onExiting={this.onCollapseExiting}
                        onExited={this.onCollapseExited}
                    >

                        <Nav navbar>

                            <NavItem className="active">
                                <NavLink tag={Link} to="/discover">
                                    <i className="tim-icons icon-world"/>
                                    Découvrir
                                </NavLink>
                            </NavItem>
                            {navitem}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default ComponentsNavbar;
