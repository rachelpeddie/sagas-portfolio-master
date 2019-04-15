import React from 'react';
// material UI styles
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        width: '100%',
        // maxHeight: 295,
    },
    media: {
        height: 140,
    },
};

function MediaCard(props) {
    const { classes } = props;
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.project.thumbnail}
                    title={props.project.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.project.name}
                    </Typography>
                    <Typography component="p">
                        <i>{props.project.tag_name}</i>
                    </Typography>
                    <Typography component="p">
                        {props.project.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    <a href={props.project.github} target="_blank">GitHub</a>
                </Button>
                <Button size="small" color="primary">
                    <a href={props.project.website} target="_blank">Website</a>
                </Button>
            </CardActions>
        </Card>
    );
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(MediaCard));;