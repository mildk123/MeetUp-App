import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


const styles = {
  card: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '2%',
    maxWidth: '520px',
    width: '95vw'
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
          image={props.dp}
          title="Contemplative Reptile"
        />
        <CardContent>
          <div>
          <b>Meet :</b> {props.meetingWith}<br/>
          <b>Venue :</b>{props.meetingVenue}<br/>
          <b>Address :</b>{props.meetingVenueAdd}<br/>
          <b>Date :</b>{props.meetingDate}<br/>
          <b>Time :</b>{props.meetingTime} <br/>
          <b>Status :</b>{props.status}<br/>
          </div>

        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {props.btnLeft}
        </Button>
        <Button size="small" color="primary">
        {props.btnRight}
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
