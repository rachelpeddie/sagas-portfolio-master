import React from 'react';
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
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

function MediaCard(props) {
    const { classes } = props;
    return (
        <div>
        {
            this.props.reduxState.projects.map(project =>
        <Card className={classes.card} key={project.id}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={project.thumbnail}
                    title={project.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
          </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
        </Button>
                <Button size="small" color="primary">
                    Learn More
        </Button>
            </CardActions>
        </Card>
            </div>
    );
}
//         <section key={project.id}>
//             <h3>{project.name}</h3>
//             <img src= alt={project.name}></img>
//             <a href={project.github}>GitHub</a>
//             <a href={project.website}>Website</a>
//             <p>{project.tag_name}</p>
//             <p>{project.description}</p>
//         </section >
//     )
// }

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapReduxStateToProps = reduxState => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(withStyles(styles)(MediaCard));;