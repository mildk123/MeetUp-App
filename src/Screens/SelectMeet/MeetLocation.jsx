import React, { Component, Fragment } from 'react';

// Map 
import Directions from './Directions'

// // Drawer Material
// import Drawer from '../../Helper/Drawer'
// // Navbar
// import NavBar from '../../Helper/NavBar/'

import firebase from '../../Config/firebase'

// Button
import Button from '@material-ui/core/Button';

// Time Dialog
import TimeDialog from '../../Helper/TimeDialog/'
import Input from '@material-ui/core/Input';

// Expansion Panel
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Fetching Data from Server
import Axios from 'axios'

class MeetLocation extends Component {
    constructor() {
        super()
        this.state = {
            latLong: null,
            searchQuery: '',
            meetPlace: [],
            directions: null,

            meetingDate: '',
            meetingTime: '',
        }

        this.TimeDialog = React.createRef();
        this.selectPlace = this.selectPlace.bind(this);

    }




    setMeet = () => {
        if (this.state.VenueName) {
            firebase.auth().onAuthStateChanged((myProfile) => {
                if (myProfile) {
                    const uid = myProfile.uid;
                    firebase.database().ref('meetings/' + uid).push({
                        VenueName: this.state.VenueName,
                        VenueAdd : this.state.VenueAdd,
                        personName: this.props.personDetails.fullname,
                        pictures: this.props.personDetails.pictures,
                        meetingDate: this.state.meetingDate,
                        meetingTime: this.state.meetingTime,
                        status : 'Pending'
                    })
                    this.props.history.push('/Home');
                }
            })
        } else {
            console.log(`error`)
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(postion => {
            this.setState({
                latLong: postion.coords.latitude + "," + postion.coords.longitude,
                mylocation: {
                    latitude: postion.coords.latitude,
                    longitude: postion.coords.longitude
                }

            }, () => {
                this.getVenues()
            }
            )
        })
    }

    onChange = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    getVenues = () => {
        let latLong = this.state.latLong

        const endpoint = "https://api.foursquare.com/v2/venues/explore?"
        const params = {
            client_id: "0KBKAJO2Y4NWYLRXL4XDBKPEGG45EVHHIPKX5G32GTQGKNSS",
            client_secret: "ZZOQY3QLIOGQ3FFHWQKZUIIH0KKTLQPOHFON001XQQDUEQOS",
            ll: latLong,
            radius: 1500,
            limit: 10,
            v: 20181024
        }

        Axios.get(endpoint + new URLSearchParams(params))
            .then(response => {
                this.setState({
                    meetPlace: [...this.state.meetPlace, ...response.data.response.groups[0].items]
                })
            })
            .catch(error => error)

    }

    searchVenues = () => {
        let searchQuery = this.state.searchQuery;
        let latLong = this.state.latLong;

        const endpoint = "https://api.foursquare.com/v2/venues/search?"
        const params = {
            client_id: "0KBKAJO2Y4NWYLRXL4XDBKPEGG45EVHHIPKX5G32GTQGKNSS",
            client_secret: "ZZOQY3QLIOGQ3FFHWQKZUIIH0KKTLQPOHFON001XQQDUEQOS",
            ll: latLong,
            limit: 15,
            query: searchQuery,
            v: 20181024
        }

        Axios.get(endpoint + new URLSearchParams(params))
            .then(response => {
                this.setState({
                    meetPlace: [...response.data.response.venues]
                })
            })
            .catch(error => console.log(error)
            )
    }

    selectPlace(index) {
        if (this.state.meetPlace[index].venue) {
            this.TimeDialog.current.handleClickOpen()
            let VenueAdd = this.state.meetPlace[index].venue.location.formattedAddress[0] + "," + this.state.meetPlace[index].venue.location.formattedAddress[1]
            this.setState({
                    VenueName: this.state.meetPlace[index].venue.name,
                    VenueAdd : VenueAdd
            })
        } else {
            this.TimeDialog.current.handleClickOpen();
            let VenueAdd = this.state.meetPlace[index].location.formattedAddress[0] + "," + this.state.meetPlace[index].location.formattedAddress[1]
            this.setState({
                VenueName: this.state.meetPlace[index].name,
                VenueAdd : VenueAdd
            })
        }
    }

    getDirections(index) {
        if (this.state.meetPlace[index].venue) {
            this.setState({
                directions: {
                    latitude: this.state.meetPlace[index].venue.location.lat,
                    longitude: this.state.meetPlace[index].venue.location.lng
                }
            })
        } else {
            this.setState({
                directions: {
                    latitude: this.state.meetPlace[index].location.lat,
                    longitude: this.state.meetPlace[index].location.lng
                }
            })
        }
    }

    render() {
        const { meetPlace } = this.state
        return <Fragment>

            <TimeDialog onChangeHandler={this.onChange} setMeet={this.setMeet} ref={this.TimeDialog} />

            {!this.state.directions && <div>
                <Input
                    type="text"
                    placeholder="Search Places"
                    onChange={this.onChange}
                    name="searchQuery"
                    fullWidth
                />
                <Button style={{ textAlign: "center" }} variant="contained" color="primary" onClick={(ev) => this.searchVenues(ev)}>Search</Button>
            </div>}

            {!this.state.directions && <div style={{ float: 'left' }}>
                {meetPlace.map((place, indexNo) => {
                    return <ExpansionPanel key={indexNo}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            {place.name ? <h4>{place.name}</h4> : <h4>{place.venue.name}</h4>}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {place.location ?
                                <h4>
                                    {place.location.formattedAddress[0] + "," + place.location.formattedAddress[1]}
                                </h4> :
                                <h4 >
                                    {place.venue.location.formattedAddress[0] + "," + place.venue.location.formattedAddress[1]}
                                </h4>
                            }
                            <Button onClick={(index) => this.getDirections(indexNo)} variant="contained" color="primary" style={{ marginLeft: 5 }}>Get Directions</Button>
                            <Button onClick={(index) => this.selectPlace(indexNo)} variant="contained" color="secondary" style={{ marginLeft: 5 }}>Next</Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                })}
                <p style={{ textAlign: "center" }}> -- End of list -- </p>
            </div>}

            {this.state.directions && <Directions mylocation={this.state.mylocation} placeLocation={this.state.directions} />}
        </Fragment >
    }
}

export default MeetLocation