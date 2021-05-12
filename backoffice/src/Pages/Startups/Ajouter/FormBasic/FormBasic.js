import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import "react-datepicker/dist/react-datepicker.css";
import {apiConfig} from "../../../../config/config";
import {
    Button, Form,
    FormGroup, Label,
    Input,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput, InputGroupAddon, InputGroup,
} from 'reactstrap';
import axios from "axios";

const animatedComponents = makeAnimated();

export default class CreateStartup extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeSiteWeb = this.onChangeSiteWeb.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePays=this.onChangePays.bind(this);
        this.onChangeDomaine = this.onChangeDomaine.bind(this);
        this.onChangeChallenge=this.onChangeChallenge.bind(this);
        this.onChangeFondateurs = this.onChangeFondateurs.bind(this);
        this.onDeleteFondateur = this.onDeleteFondateur.bind(this);
        this.onAjouterFondateur = this.onAjouterFondateur.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLogo = this.onChangeLogo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            nom: '',
            description: '',
            fondateurs: [],
            fond: [],
            dateCreation: new Date(),
            logo: '',
            domaines: [],
            challenges:[],
            startups:[],
            dom: [],
            chall:[],
            pays:'',
            nomfond: '',
            siteWeb: 'http://www.'
        }
    }

    componentDidMount() {
        axios.get(apiConfig.baseUrl + '/domaines/')
            .then(response => {
                this.setState({dom: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get(apiConfig.baseUrl + '/challenges/')
            .then(response => {
                this.setState({chall: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
        axios.get(apiConfig.baseUrl+'/startups/')
            .then(r => {
                this.setState({
                    startups:r.data
                })
            })
        this.state.dateCreation.setDate(1)
    }

    domaineList() {
        const options = this.state.dom.map(currentDomaine => ({value: currentDomaine._id, label: currentDomaine.nom}))
        return (
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.onChangeDomaine}
            > </Select>
        )
    }

    challengeList() {
        const options = this.state.chall.map(currentChallenge => ({value: currentChallenge._id, label: currentChallenge.nom}))
        return (
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.onChangeChallenge}
            > </Select>
        )
    }

    handleChange(event) {
        this.setState({
            domaines: Array.from(event.target.selectedOptions, item => item.value)
        });

    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangeSiteWeb(e) {
        this.setState({
            siteWeb: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    PaysList() {
        var options = []
        this.state.startups.map(s => {
            options.push(s.pays)
        })

        let op = [...new Set(options)].map(e => ({value: e, label: e}))
        return (
            <Select
                isClearable={false}
                isSearchable={false}
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={op}
                onChange={this.onChangePays}
            > </Select>
        )
    }

    onChangePays(e) {
        this.setState({
            pays: e.value
        })

        console.log(this.state.pays)
    }

    onChangeFondateurs(e) {
        this.setState({
            nomfond: e.target.value
        })
        console.log(this.state.nomfond)
    }

    onDeleteFondateur(e) {

        this.state.fond.pop(e.target.value)
        this.setState({
            fond: this.state.fond
        })
    }

    onAjouterFondateur(e) {

        this.setState({fond: [...this.state.fond, this.state.nomfond]})
        this.setState({
            nomfond: ''
        })
    }


    onChangeDate(date) {
        date.setDate(1)
        this.setState({
            dateCreation: date
        })
        console.log(this.state.dateCreation)
    }

    onChangeDomaine(e) {
        if (e != null) {
            this.setState({
                domaines: e.map((o) => o.value)
            })
        } else {
            this.setState({
                domaines: []
            })
        }
    }

    onChangeChallenge(e) {
        if (e != null) {
            this.setState({
                challenges: e.map((o) => o.value)
            })
        } else {
            this.setState({
                challenges: []
            })
        }
    }

    onChangeLogo(e) {
        const selectedFile = e.target.files[0] // accessing file
        const formData = new FormData()
        formData.append('multi-files', selectedFile)

        axios.post(apiConfig.baseUrl + '/startups/upload', formData)
            .then(response => {
                this.setState({logo: response.data.file[0].filename})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.fond.length === 0) {
            this.state.fond.push(this.state.nomfond)
        }

        const startup = {
            nom: this.state.nom,
            description: this.state.description,
            fondateurs: this.state.fond,
            dateCreation: this.state.dateCreation,
            pays:this.state.pays,
            logo: this.state.logo,
            domainesId: this.state.domaines,
            challengesId:this.state.challenges,
            siteWeb:this.state.siteWeb
        }

        console.log(startup);

        axios.post(apiConfig.baseUrl + '/startups/add', startup)
            .then(res => console.log(res.data));

        window.location.replace('#/startups/afficher');
        //  window.location.reload(false);
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
                            <Col>
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>Ajouter Startup</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="Nom"><b>Nom de la startup</b></Label>
                                                <Input type="text" name="nom" id="Nom"
                                                       required
                                                       value={this.state.nom}
                                                       onChange={this.onChangeNom}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText"><b>Description</b></Label>
                                                <Input type="textarea" name="description" id="description"
                                                       required
                                                       value={this.state.description}
                                                       onChange={this.onChangeDescription}/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Pays</b></Label>
                                                {this.PaysList()}
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Site Web</b></Label>
                                                <Input type="url" name="siteweb" id="siteweb"
                                                       required
                                                       value={this.state.siteWeb}
                                                       onChange={this.onChangeSiteWeb}/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText"><b>Date de création</b></Label>
                                                <DatePicker
                                                    dateFormat="MM/yyyy"
                                                    selected={this.state.dateCreation}
                                                    onChange={this.onChangeDate}
                                                />
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Fondateurs</b></Label>
                                                <InputGroup>
                                                    <Input nom="fondateurs" value={this.state.nomfond}
                                                           onChange={this.onChangeFondateurs}/>
                                                    <InputGroupAddon addonType="append">
                                                        <Button color="success"
                                                                onClick={(e) => this.onAjouterFondateur(e)}>Ajouter</Button>
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                {
                                                    this.state.fond.map((key, value) => {
                                                        return (<InputGroup id={key}>
                                                            <InputGroupAddon addonType="prepend">
                                                                <Button color="danger"
                                                                        onClick={this.onDeleteFondateur}>Supprimer</Button>
                                                            </InputGroupAddon>
                                                            <Input disabled value={this.state.fond[value]}
                                                                   placeholder="and..."
                                                                   onChange={this.onChangeFondateurs}/>
                                                        </InputGroup>)
                                                    })
                                                }
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="exampleText"><b>Domaines reliés</b></Label>
                                                <div>
                                                    {this.domaineList()}
                                                </div>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleText"><b>Challenges reliés</b></Label>
                                                <div>
                                                    {this.challengeList()}
                                                </div>
                                            </FormGroup>


                                            <FormGroup>
                                                <Label><b>Logo</b></Label>
                                                <Input type="file" name="multi-files" id="logo"
                                                       onChange={this.onChangeLogo}>Parcourir</Input>
                                            </FormGroup>
                                            <Button color="primary" className="mt-1">Submit</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
