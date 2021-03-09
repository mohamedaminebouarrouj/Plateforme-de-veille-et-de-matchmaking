import React from "react";
import {Button, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, NavItem} from "reactstrap";
import GoogleBtn from "../GoogleBtn";
import classnames from "classnames";
import axios from "axios";

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmitChange = this.onSubmitChange.bind(this)
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangeNewPasswordVerif = this.onChangeNewPasswordVerif.bind(this)

        this.state = {
            email: JSON.parse(localStorage.getItem('loggedUser')).email,
            password: '',
            newPassword: '',
            newPasswordVerif: '',
            validationModal: false,
            formModal:props.isShowModal,
        };
    }

    toggleModal = modalState => {
        this.setState({
            [modalState]: !this.state[modalState]
        });
    };

    onChangePassword(e) {
        this.setState({
            password: e.target.value
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
            email: this.state.email,
            password: this.state.password,
            newPassword: this.state.newPassword
        }
        axios.post('http://localhost:5000/users/changePass', user)
            .then(res => {
                if (res) {
                    return (
                        <Modal
                            isOpen={this.state.validationModal}
                            toggle={() => this.toggleModal('validationModal')}
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
                                        this.toggleModal("validationModal")
                                        window.parent.location = window.parent.location.href
                                    }}
                                >
                                    OK
                                </Button>
                            </div>
                        </Modal>
                    )
                } else {

                }

            })
    }

    render() {

        return (
            <Modal
                modalClassName="modal-black"
                isOpen={this.state.modifierModal}
                toggle={() => this.toggleModal("modifierModal")}
            >
                <div className="modal-header justify-content-center">
                    <button
                        className="close"
                        onClick={() => this.toggleModal("formModal")}
                    >
                        <i className="tim-icons icon-simple-remove text-white"/>
                    </button>
                    <div className="text-muted text-center ml-auto mr-auto">
                        <h3 className="mb-0">Réinisialiser votre Mot de passe</h3>
                    </div>
                </div>
                <div className="modal-body">
                    <Form onSubmit={this.onSubmitChange}>

                        <FormGroup className="mb-3">
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
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
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
                                        this.toggleModal("formModal")
                                        this.toggleModal("validationModal")
                                    }}>
                                Modifier le mot de passe
                            </Button>

                        </div>
                    </Form>
                </div>
            </Modal>
        )
    }
}
