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
import axios from 'axios';
import {Col, Row} from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from "@material-ui/core/CircularProgress";
import AppComponent from "../../components/Graph/AppComponent";
import InfoIcon from '@material-ui/icons/Info';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader,
    CardActions,
    CardActionArea,
    CardMedia,
} from '@material-ui/core/'

import {Button} from "@material-ui/core";
import {apiConfig} from "../../config";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "-webkit-inline-flex",
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden'
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        fontSize: theme.typography.pxToRem(10),
        fontWeight: "bold",
        animation: "backwards"
    },
    subtitle: {
        fontSize: theme.typography.pxToRem(10),
        lineHeight: 1,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));


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

function TitlebarGridList2(props) {
    const classes = useStyles();
    return (
        <>
            <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {props.val.map(elem => (
                    <Grid item xs={12} sm={6} md={3} key={elem.titre}>
                        <Card style={{height: "430px"}}>
                            <CardMedia
                                component="img"
                                height="140"
                                className={classes.media}
                                image={elem.urlToImage}
                                title={elem.titre}
                                alt={elem.titre}
                            />
                            <CardContent>
                                <Typography gutterBottom style={{color: '#344675'}} variant="h5" component="h2">
                                    {elem.titre.slice(0,30)+'...'}
                                </Typography>
                                <p style={{color: 'rgb(0,0,0,0.5)'}}>
                                    {elem.resume.slice(0, 100) + '...'}
                                </p>
                                <a>
                                    <b style={{color: '#344675'}}>Source</b> : {elem.source}
                                </a>
                                <br/>
                                <a>
                                    {elem.datePublication.split('T')[0]}
                                </a>
                            </CardContent>
                            <CardActions style={{float: 'right'}}>
                                <Button size="large" className="btn btn-simple btn-round" color="default"
                                        href={elem.url} target="_blank" rel="noreferrer">
                                    Lire sur le site
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}


function TitlebarGridList(props) {
    const classes = useStyles();
    return (
        <>
            {props.val.length > 0 ? <GridList cols={5} cellHeight={180}
                                              classes={{
                                                  root: classes.root
                                              }}>
                {props.val.map((tile) => (
                    <GridListTile key={tile.titre} classes={{root: classes.gridList}}>
                        <a target='_blank' rel="noopener noreferrer" href={tile.url}>
                            <img src={tile.urlToImage}
                                 alt='•'/>
                        </a>

                        <GridListTileBar
                            title={tile.titre}
                            classes={{
                                title: classes.title,
                                subtitle: classes.subtitle
                            }}
                            subtitle={<p>{tile.source}</p>}
                            actionIcon={
                                <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}
                                            onClick={() => console.log(tile.resume)}>
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />

                    </GridListTile>
                ))}
            </GridList> : <div style={{
                position: 'absolute', left: '50%', top: '100%',
                transform: 'translate(-50%, -50%)'
            }}><CircularProgress/> Loading...</div>}

        </>
    );
}

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.nom.toUpperCase().trim();
    // const bandB = b.nom.toUpperCase().trim();

    const bandA = a.datePublication;
    const bandB = b.datePublication;

    const tendA = a.langage;
    const tendB = b.langage;

    let comparison = 0;
    let comparaison2 = 0;

    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }

    return comparison * -1;
}

function compare2(a, b) {
    // Use toUpperCase() to ignore character casing
    // const bandA = a.nom.toUpperCase().trim();
    // const bandB = b.nom.toUpperCase().trim();

    const bandA = a.langage;
    const bandB = b.langage;


    let comparison = 0;

    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }

    return comparison * -1;
}


export default class Secteur extends React.Component {
    constructor(props) {
        super(props);
        this.tendancesList = this.tendancesList.bind(this)

        this.state = {
            loggedUserSecteur: '',
            tendances: [],
            dropdownOpen: false
        };
    }

    componentDidMount() {
        document.body.classList.toggle("landing-page");
        this.setState({
            loggedUserSecteur: JSON.parse(localStorage.getItem('loggedUser')).secteurId
        })
        axios.get(apiConfig.baseUrl+'/secteurs/' + JSON.parse(localStorage.getItem('loggedUser')).secteurId)
            .then(response => {
                this.setState({
                    nom: response.data.nom,
                    img: response.data.img,
                    tendances: response.data.tendancesId
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }


    tendancesList() {

        let t = this.state.tendances.sort(compare)
        let tendances = []
        t.map(ten => {
            if (ten.langage === "Français") {
                tendances.push(ten)
            }
        })

        return (
            <TitlebarGridList2 val={tendances.slice(0, 4)}/>
        )
    }

    render() {
        return (
            <>


                <section className="section">
                    <h1 className="text-center">À la une</h1>
                    <Row>
                        <Col lg="1"></Col>
                        <Col>{this.tendancesList()}</Col>
                        <Col lg="1"></Col>
                    </Row>
                    <br/><br/><br/>
                    <h1 className="text-center">Map des challenges</h1>
                </section>
                <section className="section" style={{position: 'relative', height: '680px'}}>
                    <AppComponent id={this.state.loggedUserSecteur} history={this.props.history}/>

                </section>
            </>
        );
    }
}
