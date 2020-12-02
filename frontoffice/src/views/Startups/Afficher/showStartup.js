import React, {Component} from "react";
import axios from 'axios';
import IndexNavbar from "../../../components/Navbars/IndexNavbar";
import Footer from "../../../components/Footer/Footer";

import {
    Button, Card, CardBody,
    Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Modal, Nav, NavItem, NavLink,
    Row, TabContent, TabPane,
} from "reactstrap";
import TextField from '@material-ui/core/TextField';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {DialogContentText} from "@material-ui/core";


export default class ShowStartup extends Component {

    constructor(props) {
        super(props);
        this.onSubmitRevendiquer = this.onSubmitRevendiquer.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeContenu = this.onChangeContenu.bind(this)
        this.onChangeNom=this.onChangeNom.bind(this)
        this.onChangeDescription=this.onChangeDescription.bind(this)
        this.onChangeAdresse=this.onChangeAdresse.bind(this)
        this.onChangeEmailStartup=this.onChangeEmailStartup.bind(this)
        this.onChangeSiteWeb=this.onChangeSiteWeb.bind(this)
        this.onChangeFacebook=this.onChangeFacebook.bind(this)
        this.onChangeLinkedin=this.onChangeLinkedin.bind(this)
        this.onChangeTwitter=this.onChangeTwitter.bind(this)
        this.onSubmitModifier=this.onSubmitModifier.bind(this)

        this.state = {
            nom: '',
            dateCreation: '',
            description: '',
            logo: '',
            domainesId: [],
            challengesId:[],
            fondateurs: [],
            siteWeb: '',
            adresse: '',
            pays: '',
            email: '',
            facebook: '',
            twitter: '',
            linkedin: '',
            tabs: 1,
            emailRevendication: '',
            contenu: '',
            formModal: false,
            validationModal: false,
            verifiedStartup: false,
            userStartup: false,
        }
    }

    toggleModal = modalState => {
        this.setState({
            [modalState]: !this.state[modalState]
        });
    };

    componentDidMount() {

        if (localStorage.getItem('auth-token')) {
            this.setState({
                emailRevendication: JSON.parse(localStorage.getItem("loggedUser")).email
            })

            JSON.parse(localStorage.getItem("loggedUser")).revendicationsId.map(r => {
                console.log(r)
                if (r.startupId === this.props.match.params.id) {
                    if (r.verified === true) {
                        this.setState({
                            verifiedStartup: true,
                            userStartup: true
                        })
                    } else {
                        this.setState({
                            userStartup: true
                        })
                    }

                }
            })
        }
        document.body.classList.toggle("landing-page");
        axios.get('http://localhost:5000/startups/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    fondateurs: response.data.fondateurs,
                    dateCreation: response.data.dateCreation,
                    description: response.data.description,
                    domainesId: response.data.domainesId,
                    challengesId:response.data.challengesId,
                    logo: response.data.logo,
                    siteWeb: response.data.siteWeb,
                    email: response.data.email,
                    facebook: response.data.facebook,
                    linkedin: response.data.linkedin,
                    twitter: response.data.twitter,
                    adresse: response.data.adresse,
                    pays: response.data.pays

                })
            })
            .catch(function (error) {
                console.log(error);
            })


    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }

    onChangeEmail(e) {
        this.setState({
            emailRevendication: e.target.value
        })
    }

    onChangeContenu(e) {
        this.setState({
            contenu: e.target.value
        })
    }

    onChangeNom(e)
    {
        this.setState({
            nom: e.target.value
        })
    }

    onChangeDescription(e)
    {
        this.setState({
            description: e.target.value
        })
    }

    onChangeAdresse(e)
    {
        this.setState({
            adresse: e.target.value
        })
    }

    onChangeSiteWeb(e)
    {
        this.setState({
            siteWeb: e.target.value
        })
    }

    onChangeEmailStartup(e)
    {
        this.setState({
            email: e.target.value
        })
    }

    onChangeFacebook(e)
    {
        this.setState({
            facebook: e.target.value
        })
    }

    onChangeLinkedin(e)
    {
        this.setState({
            linkedin: e.target.value
        })
    }

    onChangeTwitter(e)
    {
        this.setState({
            twitter: e.target.value
        })
    }

    onSubmitModifier(e)
    {
        e.preventDefault();

        const startup = {
            nom: this.state.nom,
            description: this.state.description,
            adresse : this.state.adresse,
            email: this.state.email,
            siteWeb:this.state.siteWeb,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            twitter: this.state.twitter
        }


        axios.post('http://localhost:5000/startups/updateUser/' + this.props.match.params.id, startup)
            .then(res => {
                console.log(res.data)
                window.location.reload(false)
            });

    }

    onSubmitRevendiquer(e) {
        e.preventDefault();

        const revendication = {
            email: this.state.emailRevendication,
            contenu: this.state.contenu,
            traited: false,
            verified: false,
            startupId: this.props.match.params.id,
            userId: JSON.parse(localStorage.getItem("loggedUser"))._id
        }

        console.log(revendication);

        axios.post('http://localhost:5000/revendications/add', revendication)
            .then(res => {
                console.log(res.data)
            });

    }


    render() {

        if (this.state.siteWeb !== "") {
            if (!this.state.siteWeb.split('//')[1]) {
                this.setState({
                    siteWeb: "https://" + this.state.siteWeb
                })
            }
        }

        return (
            <>
                <IndexNavbar/>
                <div className="wrapper">
                    <div className="page-header">
                        <img
                            alt="..."
                            className="dots"
                            src={require("../../../assets/img/dots.png")}
                        />
                        <img
                            alt="..."
                            className="path"
                            src={require("../../../assets/img/path1.png")}
                        />
                    </div>
                    <br/><br/><br/>
                    <section className="section">
                        <Row>
                            <Col lg="1">

                            </Col>
                            <Col md="6">
                                <Row>
                                    <Col md="3">
                                        <img
                                            src={require("../../../assets/logos/Startups/default.png")}
                                        />
                                    </Col>
                                    <Col>
                                        <p className="font-weight-bold font-size-35">{this.state.nom}
                                            {localStorage.getItem('auth-token')!==""?(this.state.userStartup? (this.state.verifiedStartup?<CheckCircleIcon
                                                style={{color: "#FFDB00", fontSize: "40px"}}/>:<div></div>):<div></div>):<div></div>}</p>
                                        <a>
                                            Depuis
                                            : {this.state.dateCreation?this.state.dateCreation.split('-')[1] + "/" + this.state.dateCreation.split('-')[0]:''}</a>
                                        <p>{this.state.pays}</p>
                                        <br/>
                                        {/*<Button className="btn btn-default btn-round">*/}
                                        {/*    <i className="tim-icons icon-heart-2"/>*/}
                                        {/*    <a> Ajouter au favoris</a>*/}
                                        {/*</Button>*/}

                                        {localStorage.getItem('auth-token') !== "" ? (this.state.userStartup ? (this.state.verifiedStartup ?
                                            <Button className="btn btn-simple btn-round" color="primary"
                                                    onClick={() => this.toggleModal("modificationModal")}>
                                                <i className="tim-icons icon-spaceship"/>
                                                <a> Modifier Startup</a>
                                            </Button> : <Button className="btn btn-simple btn-round" color="primary" disabled>
                                                <i className="tim-icons icon-spaceship"/>
                                                <a> Revendiquer cette start-up</a>
                                            </Button>) : <Button className="btn btn-simple btn-round" color="primary"
                                                                     onClick={() => this.toggleModal("demoModal")}>
                                                <i className="tim-icons icon-spaceship"/>
                                                <a> Revendiquer cette start-up</a>
                                            </Button>)
                                            :
                                            <Button className="btn btn-simple btn-round" color="primary" disabled>
                                                <i className="tim-icons icon-spaceship"/>
                                                <a> Revendiquer cette start-up</a>
                                            </Button>
                                        }


                                        <Modal
                                            isOpen={this.state.demoModal}
                                            toggle={() => this.toggleModal("demoModal")}
                                            modalClassName="modal-black"
                                        >
                                            <div className="modal-header justify-content-center">
                                                <button
                                                    className="close"
                                                    onClick={() => this.toggleModal("demoModal")}
                                                >
                                                    <i className="tim-icons icon-simple-remove"/>
                                                </button>
                                                <h4 className="title title-up">Revendiquer le profil de cette
                                                    start-up</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>
                                                    Vous pouvez désormais réclamer votre profil d'entreprise. <br/>
                                                    Nous marquerons ce profil avec un badge vérifié (<CheckCircleIcon
                                                    style={{color: "#FFDB00", fontSize: "40px"}}/>) et vous pourrez
                                                    modifier votre profil d'entreprise.
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <Button
                                                    className="btn btn-default btn-round"
                                                    type="button"
                                                    onClick={() => {
                                                        this.toggleModal("demoModal")
                                                        this.toggleModal("formModal")
                                                    }}
                                                >
                                                    OK
                                                </Button>
                                            </div>
                                        </Modal>

                                        {/* Start Form Modal */}

                                        <Modal
                                            isOpen={this.state.formModal}
                                            toggle={() => this.toggleModal("formModal")}
                                            size={"lg"}
                                        >
                                            <div className="modal-header justify-content-center">
                                                <div className="modal-header justify-content-center">
                                                    <button
                                                        className="close"
                                                        onClick={() => this.toggleModal("formModal")}
                                                    >
                                                        <i className="tim-icons icon-simple-remove"/>
                                                    </button>
                                                    <h4 className="title title-up">Revendiquer le profil de cette
                                                        start-up</h4>
                                                </div>
                                            </div>
                                            <div className="modal-body">

                                                <Form onSubmit={this.onSubmitRevendiquer}>

                                                    <FormGroup className="mb-3">
                                                        <InputGroup>
                                                            <TextField
                                                                id="filled-email"
                                                                label="Votre adresse E-mail"
                                                                type="email"
                                                                required
                                                                fullWidth
                                                                value={this.state.emailRevendication}
                                                                onChange={this.onChangeEmail}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                label="Objet"
                                                                type="text"
                                                                fullWidth
                                                                defaultValue={"Revendication du profil de " + this.state.nom}
                                                                disabled
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                id="outlined-multiline-static"
                                                                label="Contenu"
                                                                multiline
                                                                rows={5}
                                                                fullWidth
                                                                required
                                                                variant="outlined"
                                                                value={this.state.contenu}
                                                                onChange={this.onChangeContenu}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>

                                                    <div className="text-center">
                                                        <Button
                                                            className="btn btn-default btn-round"
                                                            type="submit"
                                                            onClick={() => {
                                                                this.toggleModal("formModal")
                                                                this.toggleModal("validationModal")
                                                            }}>
                                                            Revendiquez
                                                        </Button>

                                                    </div>
                                                </Form>
                                            </div>

                                        </Modal>
                                        {/* End Form Modal */}

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
                                                <h4 className="title title-up">Revendiquer le profil de cette
                                                    start-up</h4>
                                            </div>
                                            <div className="modal-body">
                                                <p>
                                                    Votre demande a était prise en considération.
                                                    Un E-mail de validation vient d'être envoyer à l'adresse : <a
                                                    style={{fontStyle: 'italic'}}>{this.state.emailRevendication}</a>.
                                                    Nous vous contacterons une fois votre demande traitée.
                                                </p>
                                            </div>
                                            <div className="text-center">
                                                <Button
                                                    className="btn btn-default btn-round"
                                                    type="button"
                                                    onClick={() => {
                                                        this.toggleModal("validationModal")
                                                        window.location.reload(false)
                                                    }}
                                                >
                                                    OK
                                                </Button>
                                            </div>
                                        </Modal>

                                        {/* Modification Modal */}

                                        <Modal
                                            isOpen={this.state.modificationModal}
                                            toggle={() => this.toggleModal('modificationModal')}
                                            backdrop={false}
                                            keyboard={false}
                                            size={"lg"}
                                            centered={false}
                                        >
                                            <div className="modal-header justify-content-center">
                                                <button
                                                    className="close"
                                                    onClick={() => this.toggleModal("modificationModal")}
                                                >
                                                    <i className="tim-icons icon-simple-remove"/>
                                                </button>
                                                <h4 className="title title-up">Modifier le profil de votre
                                                    start-up</h4>
                                            </div>
                                            <div className="modal-body">

                                                <Form onSubmit={this.onSubmitModifier}>

                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                id="filled-email"
                                                                label="Nom de la startup"
                                                                type="text"
                                                                required
                                                                fullWidth
                                                                value={this.state.nom}
                                                                onChange={this.onChangeNom}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                label="Description"
                                                                multiline
                                                                row={5}
                                                                type="text"
                                                                required
                                                                fullWidth
                                                                value={this.state.description}
                                                                onChange={this.onChangeDescription}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                label="Adresse"
                                                                type="text"
                                                                fullWidth
                                                                value={this.state.adresse}
                                                                onChange={this.onChangeAdresse}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                label="Site Web"
                                                                type="text"
                                                                fullWidth
                                                                value={this.state.siteWeb}
                                                                onChange={this.onChangeSiteWeb}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                id="filled-email"
                                                                label="Adresse E-mail"
                                                                type="email"
                                                                fullWidth
                                                                value={this.state.email}
                                                                onChange={this.onChangeEmailStartup}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <br/>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                id="filled-email"
                                                                label="Profil Facebook de la startup"
                                                                type="text"
                                                                fullWidth
                                                                value={this.state.facebook}
                                                                onChange={this.onChangeFacebook}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                id="filled-email"
                                                                label="Profil Linkedin de la startup"
                                                                type="text"
                                                                fullWidth
                                                                value={this.state.linkedin}
                                                                onChange={this.onChangeLinkedin}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <InputGroup>
                                                            <TextField
                                                                id="filled-email"
                                                                label="Profil Facebook de la startup"
                                                                type="text"
                                                                fullWidth
                                                                value={this.state.twitter}
                                                                onChange={this.onChangeTwitter}

                                                            />
                                                        </InputGroup>
                                                    </FormGroup>

                                                    <div className="text-center">
                                                        <Button
                                                            className="btn btn-default btn-round"
                                                            type="submit"
                                                            onClick={() => {
                                                                this.toggleModal("modificationModal")
                                                            }}>
                                                            Modifier
                                                        </Button>

                                                    </div>
                                                </Form>
                                            </div>
                                        </Modal>


                                    </Col>

                                </Row>
                                <h4 className="font-weight-bold">Description:</h4>
                                <p>{this.state.description}</p>
                                <h4 className="font-weight-bold">Fondateurs: </h4>
                                {this.state.fondateurs.map(fon => {
                                    return (<Col><p className="font-italic">• {fon} </p></Col>)
                                })}

                                <h4 className="font-weight-bold">Domaines d'activité :</h4>
                                {this.state.domainesId.map(d => {
                                    return (<a href={"/domaines/" + d._id}>  &nbsp;{d.nom}</a>)
                                })}

                                <h4 className="font-weight-bold">Challenges :</h4>
                                {this.state.challengesId.map(d => {
                                    return (<a href={"/challenges/" + d._id}>  &nbsp;{d.nom}</a>)
                                })}
                            </Col>
                            <Col lg="1"></Col>
                            <Col>
                                <h2 className="font-weight-bold">Contact</h2>
                                <h4 className="font-weight-bold">Adresse:</h4>
                                <p>{this.state.adresse}</p>
                                <br/>
                                <h4 className="font-weight-bold">Site web:</h4>
                                <a href={this.state.siteWeb} target="_blank">{this.state.siteWeb.split('//')[1]}</a>
                                <br/>
                                <h4 className="font-weight-bold">Adresse e-mail:</h4>
                                <p>{this.state.email}</p>
                                <br/>
                                <h4 className="font-weight-bold">Réseaux sociaux:</h4>
                                <Button className="btn-icon btn-neutral btn-round btn-simple"
                                        color="default"
                                        href={this.state.linkedin}
                                        target="_blank">
                                    <i className="fab fa-linkedin"/>
                                </Button>

                                <Button className="btn-icon btn-neutral btn-round btn-simple"
                                        color="default"
                                        href={this.state.facebook}
                                        target="_blank">
                                    <i className="fab fa-facebook-square"/>
                                </Button>

                                <Button className="btn-icon btn-neutral btn-round btn-simple"
                                        color="default"
                                        href={this.state.twitter}
                                        target="_blank">
                                    <i className="fab fa-twitter"/>
                                </Button>

                            </Col>
                        </Row>
                    </section>


                    <Footer/>
                </div>
            </>
        )
    }
}