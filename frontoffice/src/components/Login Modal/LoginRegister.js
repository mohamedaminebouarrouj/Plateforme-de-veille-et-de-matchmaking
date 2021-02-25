import React from "react";
import {Link} from "react-router-dom";
import axios from 'axios';
// core components
import {
    NavItem,
    Modal,
    Form,
    FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Label, NavLink
} from 'reactstrap';
import {Button} from "@material-ui/core";

import Select from "react-select";
import GoogleBtn from "../GoogleBtn";
import classnames from "classnames";

const customStyles = {

    control: (base, state) => ({
        ...base,
        background: "transparent",
        color: 'white',
        // match with the menu
        borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#344675" : "#344675",
        // Removes weird border around container
        boxShadow: state.isFocused ? "#344675" : "#344675",
        "&:hover": {
            // Overwrittes the different states of border
            borderColor: state.isFocused ? "#344675" : "#344675"
        }
    }),
    singleValue: (base) => ({
        ...base,
        color: 'white'
    }),
    menu: base => ({
        ...base,
        // override border radius to match the box
        borderRadius: 0,
        // kill the gap
        marginTop: 0,
        color: '#ffe600'
    }),
    menuList: base => ({
        ...base,
        // kill the white space on first and last option
        padding: 0,
        color: '#344675'
    })
};


export default class LoginRegister extends React.Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeOrganisation = this.onChangeOrganisation.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this)
        this.onSubmitRegister = this.onSubmitRegister.bind(this)
        this.onSubmitLogout = this.onSubmitLogout.bind(this)
        this.onChangeRole = this.onChangeRole.bind(this)
        this.onChangeSecteur = this.onChangeSecteur.bind(this)

        this.state = {
            nom: '',
            prenom: '',
            role: '',
            sect: '',
            secteur: [],
            organisation: '',
            email: '',
            password: '',
            user: null,
            allData: [],
            search: '',
            modified: false,

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

    onRegister = () => {
        this.toggleModal("registerModal")
        this.setState({
            formModal: !this.state.formModal
        })

        axios.get('http://localhost:5000/secteurs').then(response => this.setState({secteur: response.data}))
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

    onChangeRole(e) {
        this.setState({
            role: e.target.value
        })

        if (e.target.value === "Corporate") {
            document.getElementById('organisation').hidden = false
            document.getElementById('secteur').hidden = false
        } else {
            document.getElementById('organisation').hidden = true
            document.getElementById('secteur').hidden = true

        }

    }

    onChangeOrganisation(e) {
        this.setState({
            organisation: e.target.value
        })
        console.log(this.state.sect)
    }

    onChangeSecteur(e) {
        this.setState({
            sect: e.value
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
                    localStorage.setItem('loggedUser', JSON.stringify(res.data.user))
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
        localStorage.setItem('loggedUser', '')
        window.location.reload(false);
    }

    onSubmitRegister(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
            nom: this.state.nom,
            prenom: this.state.prenom,
            role: this.state.role,
            organisation: this.state.organisation,
            secteurId: this.state.sect
        }

        axios.post('http://localhost:5000/users/register', user)
            .then(res => {
                window.location.replace('/');
            }).catch(() => {
            console.log("le")

        });

    }

    render() {
        return (
            <NavItem>
                <NavItem className="active"
                >
                    <NavLink tag={Link} onClick={() => this.toggleModal("formModal")} style={{top: '10px'}}>
                        <i className="tim-icons icon-single-02"/>
                        Se Connecter/S'inscrire

                    </NavLink>
                </NavItem>

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
                                <a href="#" rel="noopener noreferrer">
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
                                rel="noopener noreferrer"
                                className="btn btn-default btn-round"
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

                            <FormGroup check inline required className="form-check-radio mb-3">
                                <Label className="form-check-label">
                                    <Input type="radio" name="radio" id="radio" value="Corporate"
                                           checked={this.state.role === "Corporate"}
                                           onChange={this.onChangeRole} required/>
                                    Corporate
                                    <span className="form-check-sign"></span>
                                </Label>
                            </FormGroup>
                            <FormGroup check inline className="form-check-radio mb-3">
                                <Label className="form-check-label">
                                    <Input type="radio" name="radio" id="radio" value="Startup"
                                           checked={this.state.role === "Startup"}
                                           onChange={this.onChangeRole}/>
                                    Startup
                                    <span className="form-check-sign"></span>
                                </Label>
                            </FormGroup>

                            <FormGroup check inline className="form-check-radio mb-3">
                                <Label className="form-check-label">
                                    <Input type="radio" name="radio" id="radio" value="Autre"
                                           checked={this.state.role === "Autre"}
                                           onChange={this.onChangeRole}/>
                                    Autre
                                    <span className="form-check-sign"></span>
                                </Label>
                            </FormGroup>

                            <FormGroup className="mb-3" id="organisation" hidden>
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
                                        placeholder="Organisation"
                                        type="text"
                                        value={this.state.organisation}
                                        onChange={this.onChangeOrganisation}
                                        onFocus={e => this.setState({organisationFocus: true})}
                                        onBlur={e => this.setState({organisationFocus: false})}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className="mb-3" id="secteur" hidden>
                                <Select
                                    styles={customStyles}
                                    options={this.state.secteur.map(s => ({value: s._id, label: s.nom}))}
                                    placeholder="Selectionner votre secteur d'activité"
                                    onChange={this.onChangeSecteur}
                                    isSearchable={false}
                                    required
                                > </Select>
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

            </NavItem>
        );
    }
}
