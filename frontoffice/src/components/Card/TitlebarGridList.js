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

export default class TitlebarGridList extends Component {
    constructor(props) {
        super(props);
    }

    render() {

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
                    {this.props.val.map(elem => (
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
}
