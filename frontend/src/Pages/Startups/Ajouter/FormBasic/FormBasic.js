import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import "react-datepicker/dist/react-datepicker.css";

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
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDomaine = this.onChangeDomaine.bind(this);
        this.onChangeFondateurs = this.onChangeFondateurs.bind(this);
        this.onDeleteFondateur= this.onDeleteFondateur.bind(this);
        this.onAjouterFondateur= this.onAjouterFondateur.bind(this);
        this.onChangeDate= this.onChangeDate.bind(this);
        this.onChangeLogo=this.onChangeLogo.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);

        this.state = {
            nom: '',
            description: '',
            fondateurs : [],
            fond:[],
            dateCreation: new Date(),
            logo: '',
            domaines:[],
            dom : []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/domaines/')
            .then(response => {
                this.setState({dom: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    domaineList() {
            const options= this.state.dom.map(currentDomaine => ({value: currentDomaine._id, label:currentDomaine.nom}))
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

    handleChange(event) {
        this.setState({
            domaines : Array.from(event.target.selectedOptions, item => item.value)
        });

    }

    onChangeNom(e) {
        this.setState({
            nom: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onChangeFondateurs(e) {
        //console.log(e.target.value)
        if(this.state.fond.length<=0){
            this.setState({
                fondateurs: [e.target.value]
            })
        }
        else{
            this.setState({
                fondateurs: [...this.state.fondateurs,e.target.value]
            })
        }
        console.log(this.state.fondateurs)
    }

    onDeleteFondateur(e){
        if (this.state.fond.length<=0)
        {

        }
        else{

            this.state.fond.pop(e.target.value)
            this.setState({
                fond:  this.state.fond
            })
        }


    }

    onAjouterFondateur(e){
        console.log(this.state.fondateurs)
        this.setState({fond:[...this.state.fond,""]})
    }


    onChangeDate(date) {
        this.setState({
            dateCreation: date
        })
        console.log(date)
    }

    onChangeDomaine(e) {
        if (e!=null){
            this.setState({
                domaines: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                domaines: []
            })
        }
    }

    onChangeLogo(e) {
        const selectedFile = e.target.files[0] // accessing file
        const formData = new FormData()
        formData.append('multi-files', selectedFile)

        axios.post('http://localhost:5000/startups/upload', formData)
            .then(response => {
                this.setState({logo: response.data.file[0].filename})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.domaines)
        const startup = {
            nom: this.state.nom,
            description: this.state.description,
            fondateurs: this.state.fondateurs,
            dateCreation: this.state.dateCreation,
            logo: this.state.logo,
            domainesId: this.state.domaines
        }

        console.log(startup);

        axios.post('http://localhost:5000/startups/add', startup)
            .then(res => console.log(res.data));

        window.location.replace('#/startups/afficher');
        window.location.reload(false);
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
                                                <Label for="exampleText"><b>Date de création</b></Label>
                                                <DatePicker
                                                    dateFormat="MM/yyyy"
                                                    selected={this.state.dateCreation}
                                                    onChange={this.onChangeDate}
                                                />
                                            </FormGroup>

                                            <Label for="exampleText"><b>Fondateurs</b></Label>
                                            <InputGroup>
                                                <Input nom="fondateurs" onChange={this.onChangeFondateurs} />
                                                <InputGroupAddon addonType="append">
                                                    <Button color="success" onClick={(e)=>this.onAjouterFondateur(e)}>Ajouter un autre fondateur</Button>
                                                </InputGroupAddon>
                                            </InputGroup>
                                            {
                                                this.state.fond.map((key)=>{
                                                    return(<InputGroup id={key}>
                                                        <InputGroupAddon addonType="prepend">
                                                            <Button color="danger" onClick={this.onDeleteFondateur}>Supprimer</Button>
                                                        </InputGroupAddon>
                                                        <Input placeholder="and..." onChange={this.onChangeFondateurs}/>
                                                    </InputGroup>)
                                                })
                                            }
                                            <FormGroup>
                                                <Label for="exampleText"><b>Domaines reliés</b></Label>
                                                <div>
                                                    {this.domaineList()}
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
