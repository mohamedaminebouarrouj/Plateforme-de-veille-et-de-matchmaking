import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {
    Button, Form,
    FormGroup, Label,
    Input,
    Row, Col,
    Card, CardBody,
    CardTitle, CustomInput,
} from 'reactstrap';
import axios from "axios";
const animatedComponents = makeAnimated();

export default class CreateSecteur extends Component {
    constructor(props) {
        super(props);

        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeSecteur = this.onChangeSecteur.bind(this);
        this.onChangeCategorie = this.onChangeCategorie.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);


        this.state = {
            nom: '',
            description: '',
            categorie: '',
            secteurs:[],
            sect : []
        }
      //  this.classes = useStyles();
       // this.theme = useTheme();
    }

    componentDidMount() {
        axios.get('http://localhost:5000/secteurs/')
            .then(response => {
                this.setState({sect: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    secteurList() {
        const options= this.state.sect.map(currentSecteur => ({value: currentSecteur._id, label:currentSecteur.nom}))
        return (
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={options}
                onChange={this.onChangeSecteur}
            > </Select>
        )
    }

    handleChange(event) {
        this.setState({
            secteurs : Array.from(event.target.selectedOptions, item => item.value)
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

    onChangeSecteur(e) {
        if (e!=null){
            this.setState({
                secteurs: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                secteurs: []
            })
        }

        console.log(this.state.secteurs)


    }


    onChangeCategorie(e) {
        this.setState({
            categorie: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.secteurs)
        const domaine = {
            nom: this.state.nom,
            description: this.state.description,
            categorie: this.state.categorie,
            secteursId: this.state.secteurs
        }

        console.log(domaine);

        axios.post('http://localhost:5000/domaines/add', domaine)
            .then(res => console.log(res.data));

        window.location.replace('#/domaines/afficher');
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
                                        <CardTitle>Ajouter Domaine</CardTitle>
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup>
                                                <Label for="Nom"><b>Nom</b></Label>
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
                                                <Label for="exampleText"><b>Secteurs reliés</b></Label>
                                                <div>
                                                    {this.secteurList()}
                                                </div>
                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="exampleCustomSelect"><b>Catégorie</b></Label>
                                                <CustomInput type="select" id="categorie"
                                                             name="categorie"
                                                             value={this.state.categorie}
                                                             onChange={this.onChangeCategorie}
                                                             required>
                                                    <option>Selectionner une catégorie</option>
                                                    <option value="Ingenierie">Ingenierie</option>
                                                    <option value="ICT">ICT</option>
                                                </CustomInput>
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
