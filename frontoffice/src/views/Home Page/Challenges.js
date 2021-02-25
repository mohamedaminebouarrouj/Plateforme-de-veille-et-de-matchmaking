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
import axios from 'axios';


// core components
import {Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col} from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {NavLink} from "react-router-dom";
import {Button} from "@material-ui/core";

import CircularProgress from "@material-ui/core/CircularProgress";
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

import HoverCard from "../../components/Hover Card/hoverCard";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));


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
                    <Grid item xs={12} sm={6} md={3} key={elem.nom}>
                        <Card style={{height: "520px"}}>
                            <CardMedia
                                component="img"
                                height="140"
                                className={classes.media}
                                image={elem.img}
                                title={elem.nom}
                            />
                            <CardContent>
                                <Typography gutterBottom style={{color: '#344675'}} variant="h5" component="h2">
                                    {elem.nom}
                                </Typography>
                                <p style={{color: 'rgb(0,0,0,0.5)'}}>
                                    {elem.description.slice(0, 100) + '...'}
                                </p>
                                <a>
                                    <b style={{color: '#344675'}}>Catégorie</b> : {elem.categorie}
                                </a>
                            </CardContent>
                            <CardActions style={{float: 'right'}}>
                                <Button size="large" color="primary" href={'/challenges/' + elem._id}>
                                    Consulter
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
            {props.val.length > 0 ?
                <GridList cols={5} cellHeight={180}>
                    {props.val.map((tile) => (
                        <GridListTile key={tile.nom}>
                            <NavLink tag={Link} to={'/challenges/' + tile._id}>
                                <img src={tile.img}
                                     alt={tile.nom}/>
                            </NavLink>

                            <GridListTileBar
                                title={tile.nom}
                                subtitle={<span>Catégorie : <a href='#'>{tile.categorie}</a></span>}
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

    const bandA = a.startupsId.length;
    const bandB = b.startupsId.length;
    let comparison = 0;
    if (bandA > bandB) {
        comparison = 1;
    } else if (bandA < bandB) {
        comparison = -1;
    }
    return comparison * -1;
}


export default class Challenges extends React.Component {
    constructor(props) {
        super(props);
        this.challengesList = this.challengesList.bind(this)
        this.hoverCardShow = this.hoverCardShow.bind(this)
        this.state = {
            challenges: [],
            dropdownOpen: false
        };
    }

    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get('http://localhost:5000/challenges/')
            .then(response => {
                this.setState({challenges: response.data})
            })
            .catch((error) => {
                console.log(error);
            })

    }

    componentWillUnmount() {
        document.body.classList.toggle("landing-page");
    }


    challengesList() {

        this.state.challenges.sort(compare)
        return <TitlebarGridList2 val={this.state.challenges.slice(0, 8)}/>
    }

    hoverCardShow() {
        this.state.challenges.sort(compare)
        return <HoverCard val={this.state.challenges.slice(0, 8)}/>
    }

    render() {
        return (
            <>
                <section className="section content-center" style={{top: '-50px', left: '10px'}}>
                    <h1 className="text-center">Les challenges à la une</h1>
                    {this.hoverCardShow()}
                </section>

            </>
        );
    }
}
