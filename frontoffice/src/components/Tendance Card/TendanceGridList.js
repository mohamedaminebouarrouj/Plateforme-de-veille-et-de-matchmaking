import React, {Component} from "react";
import {
    Card,
    CardContent,
    Typography,
    CardActions,
    CardMedia,
} from '@material-ui/core/'
import {Button} from "@material-ui/core";
import Carousel from "react-grid-carousel";


export default class TendanceGridList extends Component {

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
