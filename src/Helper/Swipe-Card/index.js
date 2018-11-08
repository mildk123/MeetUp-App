import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Cards, { Card } from 'react-swipe-deck'


import Button from '@material-ui/core/Button';

// Images Carousel
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    return (
        <div className='cardContainer'>
            <Cards
                onEnd={props.onEnd}
                // cardSize={[300,300]}
                // size={[100, 300]}
            >
                {props.userListArray.map((item, noId) =>
                    <Card
                        key={noId}
                        onSwipeLeft={(UID, index) => props.swipeLeft(item.uid, noId)}
                        onSwipeRight={(UID, index) => props.swipeRight(item.uid, noId)}>
                        <Carousel
                            infiniteLoop
                            showStatus={false}
                            showThumbs={false}
                            useKeyboardArrows
                            transitionTime={250}
                            dynamicHeight={true}
                        >
                            {item.profilePicturesLink.map((img, index) => {
                                return <img key={index} src={img} alt={index} />
                            })}
                        </Carousel>
                        <div>
                            <h3 id='nameUser'>Full Name: {item.fullname}</h3>
                            <h3 id='nameUser'>Nick: {item.nickname}</h3>
                        </div>

                        <div className="btnDiv">

                            <Button className="btn" variant="contained" color="primary" >
                                Add To Stalk List
                         </Button>
                            <Button className="btn" variant="contained" color="secondary" >
                                Superlike ❤
                         </Button>
                        </div>
                    </Card>
                )}
            </Cards>
        </div>

    )
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);
