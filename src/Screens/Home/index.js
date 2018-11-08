import React, { Component } from 'react';
// Material Button
import Button from '@material-ui/core/Button';
// Drawer Material
import Drawer from '../../Helper/Drawer'
// Navbar
import NavBar from '../../Helper/NavBar/'
// SnackBar
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Card from '../../Helper/Card/'

import firebase from '../../Config/firebase';
const database = firebase.database().ref();


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSnackBar: true,
            meetingList: []
        };

        this.showDrawer = React.createRef()
        this.setMeeting = this.setMeeting.bind(this);

    }

    setMeeting() {
        this.props.history.push("/SelectMeeting");
    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                const uid = myProfile.uid
                database.child('meetings').child(uid).on('child_added', (callback) => {
                    let myAllMeetings = callback.val()
                    this.setState({
                        meetingList: [...this.state.meetingList ,{
                            meetingDate: myAllMeetings.meetingDate,
                            meetingTime: myAllMeetings.meetingTime,
                            meetingVenue: myAllMeetings.VenueName,
                            meetingVenueAdd: myAllMeetings.VenueAdd,
                            meetingWith: myAllMeetings.personName,
                            meetingWithPic: myAllMeetings.pictures,
                            status: myAllMeetings.status,
                        }],
                        showSnackBar : false
                    })
                })
            }
        })
    }


    render() {
        return (
            <div>
                <Drawer ref={this.showDrawer} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Dashboard
                    <Button onClick={this.setMeeting} color="primary" variant="contained" size="small">
                        Set a meeting!
                    </Button>
                </NavBar>



                <div>
                    {this.state.showSnackBar && <SnackbarContent
                        message={
                            'You haven’t done any meeting yet!”, try creating a new meeting!'
                        }
                    />}
                </div>

                <div>
                    {this.state.meetingList.map((item, index) => {
                    return <Card key={index}  
                    meetingWith={item.meetingWith} 
                    meetingVenueAdd={item.meetingVenueAdd} 
                    meetingVenue={item.meetingVenue}
                    meetingDate={item.meetingDate} 
                    meetingTime={item.meetingTime} 
                    status={item.status} 
                    dp={item.meetingWithPic[0]}

                    btnLeft="Start" 
                    btnRight="cancel" />
                    })}
                </div>

            </div>
        );
    }
}

export default Home;