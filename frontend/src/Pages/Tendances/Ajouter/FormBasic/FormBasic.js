import React, {Component, Fragment} from 'react';
import {
    Button, Card, CardBody, CardTitle, Col, Form, Row,
} from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from "axios";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
const animatedComponents = makeAnimated();

const options = [
    { value: 'fr', label: 'Français' },
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'عربية' }
]

export default class tendanceAjouter extends Component {
    constructor(props) {
        super(props);

        this.onChangeDomaine =this.onChangeDomaine.bind(this)
        this.onChangeLangue=this.onChangeLangue.bind(this)
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            domaines: [],
            dom:[],
            challenges:[],
            chall:[],
            chalchal: [],
            secteurs:[],
            sec:[],
            secsec:[],
            langages : []
        };
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

    onChangeLangue(e) {
        if (e!=null){
            this.setState({
                langages: e.map((o)=>o.value)
            })
        }
        else{
            this.setState({
                langages: []
            })
        }

        console.log(this.state.langages)


    }

    domaineList() {
        const options= this.state.dom.map(currentDomaine => ({value: currentDomaine._id, label:currentDomaine.nom}))

        return (
            <div>
                Selectionnez le(s) domaine(s)
                <br/> <br/>
            <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                key="1"
                options={options}
                onChange={this.onChangeDomaine}
            > </Select>
            </div>
        )
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
        console.log(this.state.domaines)
    }



    onSubmit(e) {
        e.preventDefault();

        this.state.domaines.map((currentD)=>{
            this.state.langages.map((currentL)=>{
                axios.get('http://localhost:5000/tendances/news_domaine/'+currentD+'/'+currentL)
                    .then(res => console.log(res.data));
            })
        })

        window.location.replace('#/tendances/afficher');
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
                                        <CardTitle>Ajouter Tendances</CardTitle>
                                        <Form onSubmit={this.onSubmit}>

                                                    {this.domaineList()}

                                            <br/><br/>
                                            <p>
                                                Selectionnez la(les) langue(s)
                                            </p>
                                            <Select
                                                isMulti
                                                name="langage"
                                                id="langage"
                                                options={options}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                onChange={this.onChangeLangue}
                                            />

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
