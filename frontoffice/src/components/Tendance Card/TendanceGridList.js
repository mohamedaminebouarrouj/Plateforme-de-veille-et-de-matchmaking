import React, {Component} from "react";
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
import {makeStyles} from "@material-ui/core/styles";
import Carousel from "react-grid-carousel";

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

export default class TendanceGridList extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                {this.props.val.length > 0 ?
                    <div style={{width: '1400px'}}>
                        <Carousel cols={4} showDots={this.props.show} dotColorActive="#FFDB00">
                            {this.props.val.map(elem => (
                                <Carousel.Item key={elem._id}>
                                    <Card style={{height: "430px"}}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={elem.urlToImage}
                                            title={elem.titre}
                                            alt={elem.titre}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom style={{color: '#344675'}} variant="h5"
                                                        component="h2">
                                                {elem.titre.slice(0, 30) + '...'}
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
                                </Carousel.Item>
                            ))}
                        </Carousel>

                    </div> :
                    <div className="text-center">
                        Pas d'actualités disponible
                    </div>}
            </>
        )

    }
}
