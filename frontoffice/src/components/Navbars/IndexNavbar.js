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
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    Button,
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    Nav,
    Container,
    Modal,
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, UncontrolledDropdown,
    Label
} from "reactstrap";

import classnames from "classnames";


import axios from "axios";
import GoogleBtn from '../GoogleBtn';

import ShowRecherche from "../../views/Recherche/Afficher/showRecherche";
import Select from "react-select";
import Hamburger from 'hamburger-react';
import {apiConfig} from "../../config";

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

function MenuButton() {
    const [isOpen, setOpen] = useState(false)
    return (
        <div className="text-center">

            <Hamburger toggled={isOpen} toggle={setOpen} label="Menu"/>
            <h6>Menu</h6>
        </div>
    )
}

class ComponentsNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangePrenom = this.onChangePrenom.bind(this);
        this.onChangeOrganisation = this.onChangeOrganisation.bind(this);
        this.onChangeSecteur = this.onChangeSecteur.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this)
        this.onSubmitRegister = this.onSubmitRegister.bind(this)
        this.onSubmitLogout = this.onSubmitLogout.bind(this)
        this.onChangeRole = this.onChangeRole.bind(this)

        this.onSearch = this.onSearch.bind(this)
        this.showRecherche = this.showRecherche.bind(this)


        this.onSubmitChange = this.onSubmitChange.bind(this)
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
        this.onChangePasswordChange = this.onChangePasswordChange.bind(this)
        this.onChangeNewPasswordVerif = this.onChangeNewPasswordVerif.bind(this)


        this.onChangeNomProfil = this.onChangeNomProfil.bind(this);
        this.onChangePrenomProfil = this.onChangePrenomProfil.bind(this);
        this.onChangeOrganisationProfil = this.onChangeOrganisationProfil.bind(this);
        this.onChangeSecteurProfil = this.onChangeSecteurProfil.bind(this)
        this.onSubmitChangeProfil = this.onSubmitChangeProfil.bind(this)

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
            color: "navbar-transparent",

            passwordChange: '',
            newPassword: '',
            newPasswordVerif: '',
            modifierModal: false,
            valModModal: false,
            wrongPass: false,

            nomProfil: localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')).nom : '',
            prenomProfil: localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')).prenom : '',
            secteurId: localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')).secteurId : '',
            currentSec: null,
            organisationProfil: localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser')).organisation : '',
            modifierCompteModal: false,
            valModProfilModal: false,
        };
    }

    toggleModal = modalState => {
        this.setState({
            [modalState]: !this.state[modalState]
        });
    };

    componentDidMount() {
        axios.get(apiConfig.baseUrl+'/users/user', {
            headers: {
                Authorization: localStorage.getItem('auth-token')
            }
        })
            .then(response => {
                this.setState({user: response.data.user})
                localStorage.setItem('loggedUser', JSON.stringify(response.data.user))
            })
            .catch((error) => {
                console.log(error);
            })
        if (localStorage.getItem('loggedUser')) {
            if (JSON.parse(localStorage.getItem('loggedUser')).role === "Corporate") {
                axios.get(apiConfig.baseUrl+'/secteurs').then(response => this.setState({secteur: response.data}))
            }
        }

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

        axios.get(apiConfig.baseUrl+'/secteurs').then(response => this.setState({secteur: response.data}))
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
            document.getElementById('secteur').hidden = false
        } else {
            document.getElementById('secteur').hidden = true

        }

    }

    onChangeOrganisation(e) {
        this.setState({
            organisation: e.target.value
        })
    }

    onChangeSecteur(e) {
        this.setState({
            sect: e.value
        })
    }

    onSearch(e) {
        this.setState({
            search: e.target.value,
            modified: true
        })

    }

    showRecherche() {
        if (this.state.search.length > 0) {
            document.getElementById("main").style.display = "none";
            if (document.getElementById("particles"))
                document.getElementById("particles").style.display = "none";


            return (<ShowRecherche query={this.state.search}/>)


        }

        if (this.state.search.length === 0 && this.state.modified === true) {
            document.getElementById("main").style.display = "initial";
            if (document.getElementById("particles"))
                document.getElementById("particles").style.display = "initial";

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

    onSubmitLogin(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(apiConfig.baseUrl+'/users/login', user)
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

        axios.post(apiConfig.baseUrl+'/users/register', user)
            .then(res => {
                window.location.replace('/');
            }).catch(() => {
            console.log("le")

        });

    }


    onChangePasswordChange(e) {
        this.setState({
            passwordChange: e.target.value
        })

    }

    onChangeNewPassword(e) {
        this.setState({
            newPassword: e.target.value
        })
    }

    onChangeNewPasswordVerif(e) {
        this.setState({
            newPasswordVerif: e.target.value
        })
    }

    onSubmitChange(e) {
        e.preventDefault();
        const user = {
            email: this.state.user.email,
            password: this.state.passwordChange,
            newPassword: this.state.newPassword
        }

        axios.post(apiConfig.baseUrl+'/users/changePass', user)
            .then(res => {
                this.setState({
                    valModModal: true,
                    passwordChange: "",
                    newPassword: "",
                    newPasswordVerif: ""
                })

            })
            .catch(error => {
                this.setState({
                    modifierModal: true
                })
                document.getElementById('formPass').className = "mb-3 has-danger"
            })
    }


    onChangeNomProfil(e) {
        this.setState({
            nomProfil: e.target.value
        })
    }

    onChangePrenomProfil(e) {
        this.setState({
            prenomProfil: e.target.value
        })
    }

    onChangeOrganisationProfil(e) {
        this.setState({
            organisationProfil: e.target.value
        })
    }

    onChangeSecteurProfil(e) {
        this.setState({
            currentSec: {value: e.value, label: e.label}
        })
    }

    onSubmitChangeProfil(e) {
        e.preventDefault();
        let user = {}
        if (JSON.parse(localStorage.getItem('loggedUser')).role === "Corporate") {
            user = {
                nom: this.state.nomProfil,
                prenom: this.state.prenomProfil,
                organisation: this.state.organisationProfil,
                secteurId: this.state.currentSec.value
            }
        } else {
            user = {
                nom: this.state.nomProfil,
                prenom: this.state.prenomProfil,
                organisation: this.state.organisationProfil,
            }
        }
        axios.post(apiConfig.baseUrl+'/users/update/' + JSON.parse(localStorage.getItem('loggedUser'))._id, user)
            .then(res => {
                this.setState({
                    valModProfilModal: true
                })

            })
            .catch(error => {
                this.setState({
                    modifierCompteModal: true
                })
                window.location.reload(false)
            })

    }

    render() {
        const isLoggedIn = this.state.user;
        let navitem;
        if (isLoggedIn) {
            navitem =
                <Nav>
                    <UncontrolledDropdown nav style={{top: '10px'}}>
                        <DropdownToggle
                            caret
                            color="default"
                            data-toggle="dropdown"
                            href="#pablo"
                            id="navbarDropdownMenuLink"
                            nav
                            onClick={e => e.preventDefault()}
                        >
                            <i className="tim-icons icon-single-02"/> {this.state.user.nom} &nbsp;
                        </DropdownToggle>
                        <DropdownMenu
                            aria-labelledby="navbarDropdownMenuLink"
                            right
                        >
                            <DropdownItem
                                style={{color: "#000"}}
                                onClick={() => {
                                    this.toggleModal("modifierCompteModal")
                                    this.state.secteur.map(currentSecteur => {
                                        if (currentSecteur._id === this.state.secteurId)
                                            this.setState({
                                                currentSec: {value: currentSecteur._id, label: currentSecteur.nom}
                                            })
                                    })
                                }
                                }
                            >
                                <i className="tim-icons icon-single-02"/> Modifier mon compte
                            </DropdownItem>
                            <Modal
                                modalClassName="modal-black"
                                isOpen={this.state.modifierCompteModal}
                                toggle={() => this.toggleModal("modifierCompteModal")}
                            >
                                <div className="modal-header justify-content-center">
                                    <button
                                        className="close"
                                        onClick={() => this.toggleModal("modifierCompteModal")}
                                    >
                                        <i className="tim-icons icon-simple-remove text-white"/>
                                    </button>
                                    <div className="text-muted text-center ml-auto mr-auto">
                                        <h3 className="mb-0">Modifier votre compte</h3>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <Form onSubmit={this.onSubmitChangeProfil}>
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
                                                    value={this.state.nomProfil}
                                                    onChange={this.onChangeNomProfil}
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
                                                    value={this.state.prenomProfil}
                                                    onChange={this.onChangePrenomProfil}
                                                    onFocus={e => this.setState({prenomFocus: true})}
                                                    onBlur={e => this.setState({prenomFocus: false})}
                                                />
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup className="mb-3" id="organisation">
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
                                                    value={this.state.organisationProfil}
                                                    onChange={this.onChangeOrganisationProfil}
                                                    onFocus={e => this.setState({organisationFocus: true})}
                                                    onBlur={e => this.setState({organisationFocus: false})}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        {localStorage.getItem('loggedUser') ?
                                            JSON.parse(localStorage.getItem('loggedUser')).role === "Corporate" ?
                                                <FormGroup className="mb-3" id="secteur">
                                                    <Select
                                                        styles={customStyles}
                                                        value={this.state.currentSec}
                                                        options={this.state.secteur.map(s => ({
                                                            value: s._id,
                                                            label: s.nom
                                                        }))}
                                                        placeholder="Selectionner votre secteur d'activité"
                                                        onChange={this.onChangeSecteurProfil}
                                                        isSearchable={false}
                                                        required
                                                    > </Select>
                                                </FormGroup> : <div/> : <div/>}
                                        <div className="text-center">
                                            <Button className="btn btn-simple btn-round" color="primary"
                                                    type="submit"
                                                    onClick={() => {
                                                        this.toggleModal("modifierCompteModal")
                                                    }}>
                                                Modifier votre profil
                                            </Button>

                                        </div>
                                    </Form>
                                </div>
                            </Modal>

                            <Modal
                                isOpen={this.state.valModProfilModal}
                                toggle={() => this.toggleModal('valModProfilModal')}
                                modalClassName="modal-black"
                            >
                                <div className="modal-header justify-content-center">
                                    <button
                                        className="close"
                                        onClick={() => this.toggleModal("validationModal")}
                                    >
                                        <i className="tim-icons icon-simple-remove"/>
                                    </button>
                                    <h3 className="title title-up">Modifier votre profil</h3>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Votre Profil a était modifié avec succès.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Button
                                        className="btn btn-default btn-round"
                                        type="button"
                                        onClick={() => {
                                            this.toggleModal("valModProfilModal")
                                            window.location.reload(false);
                                        }}
                                    >
                                        OK
                                    </Button>
                                    <br/><br/>
                                </div>
                            </Modal>


                            <DropdownItem
                                style={{color: "#000"}}
                                onClick={() => this.toggleModal("modifierModal")}
                            >
                                <i className="tim-icons icon-key-25"/> Réinisialiser le mot de passe
                            </DropdownItem>
                            <Modal
                                modalClassName="modal-black"
                                isOpen={this.state.modifierModal}
                                toggle={() => this.toggleModal("modifierModal")}
                            >
                                <div className="modal-header justify-content-center">
                                    <button
                                        className="close"
                                        onClick={() => this.toggleModal("modifierModal")}
                                    >
                                        <i className="tim-icons icon-simple-remove text-white"/>
                                    </button>
                                    <div className="text-muted text-center ml-auto mr-auto">
                                        <h3 className="mb-0">Réinisialiser votre Mot de passe</h3>
                                    </div>
                                </div>
                                <div className="modal-body">
                                    <Form onSubmit={this.onSubmitChange}>

                                        <FormGroup id="formPass" className="mb-3">
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
                                                    placeholder="Mot de passe actuel"
                                                    type="password"
                                                    required
                                                    value={this.state.passwordChange}
                                                    onChange={this.onChangePasswordChange}
                                                    onFocus={e => this.setState({passwordFocus: true})}
                                                    onBlur={e => this.setState({passwordFocus: false})}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup
                                                className={classnames("input-group-alternative", {
                                                    "input-group-focus": this.state.newPasswordFocus
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-key-25"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Nouveau mot de passe"
                                                    type="password"
                                                    required
                                                    value={this.state.newPassword}
                                                    onChange={this.onChangeNewPassword}
                                                    onFocus={e => this.setState({newPasswordFocus: true})}
                                                    onBlur={e => this.setState({newPasswordFocus: false})}
                                                />
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup>
                                            <InputGroup
                                                className={classnames("input-group-alternative", {
                                                    "input-group-focus": this.state.newPasswordVerifFocus
                                                })}
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="tim-icons icon-key-25"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Confirmer nouveau mot de passe"
                                                    type="password"
                                                    required
                                                    value={this.state.newPasswordVerif}
                                                    onChange={this.onChangeNewPasswordVerif}
                                                    onFocus={e => this.setState({newPasswordVerifFocus: true})}
                                                    onBlur={e => this.setState({newPasswordVerifFocus: false})}
                                                />
                                            </InputGroup>
                                        </FormGroup>

                                        <div className="text-center">
                                            <Button className="btn btn-simple btn-round" color="primary"
                                                    type="submit"
                                                    onClick={() => {
                                                        this.toggleModal("modifierModal")
                                                    }}>
                                                Modifier le mot de passe
                                            </Button>

                                        </div>
                                    </Form>
                                </div>
                            </Modal>

                            <Modal
                                isOpen={this.state.valModModal}
                                toggle={() => this.toggleModal('valModModal')}
                                modalClassName="modal-black"
                            >
                                <div className="modal-header justify-content-center">
                                    <button
                                        className="close"
                                        onClick={() => this.toggleModal("validationModal")}
                                    >
                                        <i className="tim-icons icon-simple-remove"/>
                                    </button>
                                    <h3 className="title title-up">Réinisialiser votre Mot de passe</h3>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Votre Mot de passe a était réinisialiser avec succès.
                                    </p>
                                </div>
                                <div className="text-center">
                                    <Button
                                        className="btn btn-default btn-round"
                                        type="button"
                                        onClick={() => {
                                            this.toggleModal("valModModal")
                                        }}
                                    >
                                        OK
                                    </Button>
                                    <br/><br/>
                                </div>
                            </Modal>

                            <DropdownItem
                                style={{color: "#000"}}
                                onClick={this.onSubmitLogout}
                                to='/logout'
                            >
                                <i className="tim-icons icon-button-power"/> <b>Se déconnecter</b>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            ;
        } else {
            navitem = <NavItem>
                <Button style={{top: '10px'}}
                        className="btn-neutral"
                        color="link"
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
                            <FormGroup className="mb-3" id="organisation">
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
                            <div className="text-center mb-4 mt-4">
                                <span> Vous avez déjà un compte? </span>
                                <a
                                    rel="noopener noreferrer"
                                    className="btn btn-default btn-round"
                                    onClick={() => {
                                        this.toggleModal("registerModal")
                                        this.toggleModal("formModal")
                                    }}> Se Connecter
                                </a>
                            </div>
                        </Form>
                    </div>
                </Modal>

            </NavItem>;
        }
        return (

            <>
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
                            <span style={{fontSize: '25px'}}><span style={{color: '#FFDB00'}}>I</span>nno<span
                                style={{color: '#FFDB00'}}>S</span>eer• </span>
                            </NavbarBrand>
                        </div>
                        <Collapse
                            className={"justify-content-end " + this.state.collapseOut}
                            navbar
                            isOpen={this.state.collapseOpen}
                            onExiting={this.onCollapseExiting}
                            onExited={this.onCollapseExited}
                        >
                            {/*<Autocomplete*/}
                            {/*    freeSolo*/}
                            {/*    fullWidth*/}
                            {/*    options={this.state.allData.map((option) => option.nom)}*/}
                            {/*    renderInput={(params) => (*/}
                            {/*        <TextField {...params}  margin="normal" variant="outlined"*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*    onChange={(e)=>console.log(e.target)}*/}
                            {/*/>*/}

                            <Nav navbar>
                                <NavItem>
                                    <div className="form-control-lg input-group">
                                        <input placeholder="Recherche..." type="text" className="form-control"
                                               onChange={this.onSearch}/>
                                        <div className="input-group-append">
                                <span className="input-group-text">
                                <i className="tim-icons icon-zoom-split"></i>
                                </span>
                                        </div>
                                    </div>
                                </NavItem>

                                {navitem}
                                <NavItem className="active">
                                    <Nav>
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle
                                                nav
                                                onClick={e => e.preventDefault()}
                                                style={{top: '-6px'}}
                                            >

                                                <MenuButton/>
                                            </DropdownToggle>
                                            <DropdownMenu
                                                aria-labelledby="navbarDropdownMenuLink"
                                                style={{width: "250px", height: '270px', left: '25px'}}
                                            >
                                                <DropdownItem
                                                    href="/secteurs"
                                                    style={{color: "#000"}}
                                                >
                                                    <i className="tim-icons icon-chart-pie-36"/> Secteurs
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                                <DropdownItem
                                                    href="/challenges"
                                                    style={{color: "#000"}}
                                                >
                                                    <i className="tim-icons icon-bulb-63"/> Challenges
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                                <DropdownItem
                                                    href="/startups"
                                                    style={{color: "#000"}}
                                                >
                                                    <i className="tim-icons icon-spaceship"/> Startups
                                                </DropdownItem>
                                                <DropdownItem divider/>
                                                <div className="text-center mb-4 mt-4">
                                                    <Button
                                                        className="btn btn-simple btn-round" color="secondary"
                                                        type="submit">
                                                        Devenir Membre
                                                    </Button>
                                                </div>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

                {this.showRecherche()}
            </>
        );
    }
}

export default ComponentsNavbar;
