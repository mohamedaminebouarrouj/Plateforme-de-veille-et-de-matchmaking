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
import styled from "@emotion/styled/macro";
import {apiConfig} from "../../config";


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

const DisplayOver = styled.div({
    height: "100%",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100%",
    zIndex: 2,
    transition: "background-color 350ms ease",
    backgroundColor: "transparent",
    padding: "20px 20px 0 20px",
    boxSizing: "border-box",
});

const BigTitle = styled.h2({
    textTransform: "uppercase",
    fontSize: '24px',
});

const Hover = styled.div({
    opacity: 0,
    transition: "opacity 350ms ease",
});

const SubTitle = styled.h4({
    fontFamily: "Helvetica",
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
});

const Paragraph = styled.p({
    transform: "translate3d(0,50px,0)",
    transition: "transform 350ms ease",
});

const CTA = styled.a({
    position: "absolute",
    bottom: "20px",
    left: "20px",
});
const Background = styled.div({
    // Other background code
    [`:hover ${DisplayOver}`]: {
        backgroundColor: "rgba(38,49,72,.8)",
    },
    [`:hover ${SubTitle}, :hover ${Paragraph}`]: {
        transform: "translate3d(0,0,0)",
    },
    [`:hover ${Hover}`]: {
        opacity: 1,
    },
});

function HoverCardLocal(props) {
    return (
        <>
            <Grid
                container
                spacing={0.5}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >
                {props.val.length > 0 ? props.val.map(v =>
                        (
                            <Grid item xs={12} sm={6} md={3} key={v.nom}>
                                <Background style={{

                                    backgroundColor: 'rgb(0,0,0,1)',
                                    backgroundImage: `url(${v.img})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    position: "relative",
                                    height: "350px",
                                    cursor: "pointer",
                                }}>
                                    <DisplayOver>
                                        <BigTitle>{v.nom}</BigTitle>
                                        <Hover>
                                            <SubTitle>{v.categorie}</SubTitle>
                                            <Paragraph>
                                                {v.description.slice(0, 100) + '...'}
                                            </Paragraph>
                                            <CTA href={'/challenges/' + v._id}>Consulter +</CTA>
                                        </Hover>
                                    </DisplayOver>
                                </Background>
                            </Grid>
                        )) :
                    <>
                        <br/><br/>
                        <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}><CircularProgress/> Loading...
                        </div>
                        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    </>}
            </Grid>
        </>
    );
}

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
        this.hoverCardShow = this.hoverCardShow.bind(this)
        this.state = {
            challenges: [],
            dropdownOpen: false
        };
    }

    componentDidMount() {
        document.body.classList.toggle("landing-page");
        axios.get(apiConfig.baseUrl+'/challenges/')
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

    hoverCardShow() {
        this.state.challenges.sort(compare)
        return <HoverCardLocal val={this.state.challenges.slice(0, 8)} sel={"challenges"}/>
    }

    render() {
        return (
            <>
                <section className="section content-center">
                    <h1 className="text-center">Les challenges à la une</h1>
                    <Row>
                        <Col lg="1"></Col>
                        <Col>
                            {this.hoverCardShow()}
                        </Col>
                        <Col lg="1">
                        </Col>
                    </Row>
                </section>

            </>
        );
    }
}
