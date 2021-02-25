import styled from "@emotion/styled/macro";
import React, {Component} from "react";
import {
    Grid,
} from '@material-ui/core/'

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

export default class HoverCard extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                <Grid
                    container
                    spacing={0.5}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    {this.props.val.map(v =>
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
                        ))}
                </Grid>
            </>
        );
    }
}
