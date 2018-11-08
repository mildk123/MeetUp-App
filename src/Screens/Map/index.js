import React, { Component, Fragment } from 'react';
import Map from '../../Components/Map/Map'

import NavBar from '../../Helper/NavBar/'

import Button from '@material-ui/core/Button';

// Drawer Material
import Drawer from '../../Helper/Drawer'

import firebase from '../../Config/firebase'
const database = firebase.database().ref();




class SelecLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coords: null,
        };

        this.showDrawer = React.createRef()
        this.completedProfile = this.completedProfile.bind(this);
        this.updateCoords = this.updateCoords.bind(this);
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            this.setState({ coords: position.coords })
        });
    }

    completedProfile() {
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                const uid = myProfile.uid
                const latitude = this.state.coords.latitude;
                const longitude = this.state.coords.longitude;
                database.child('users/' + uid).child('location').update({
                    latitude: latitude,
                    longitude: longitude,
                })
                localStorage.setItem('userSignup', true);
                localStorage.setItem('myUid', uid);
            }
        })
        this.props.history.push('/home');
    }

    updateCoords({ latitude, longitude }) {
        this.setState({ coords: { latitude, longitude } })
    }

    
    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }


    render() {
        return (
            <Fragment>
                <Drawer ref={this.showDrawer}  />

                <NavBar Drawer={this.Drawer}  btnColor="secondary">Location</NavBar>
            <div>
                <Map updateCoords={this.updateCoords} coords={this.state.coords} />
                
                <div>
                    <Button 
                    style={{position: 'absolute', bottom: -10, left: 5}} 
                    size="large" 
                    variant="extendedFab" 
                    color="secondary" 
                    onClick={this.completedProfile}>All Done.
                    </Button>
                </div>
            </div>
            </Fragment>
        );
    }
}

export default SelecLocation;