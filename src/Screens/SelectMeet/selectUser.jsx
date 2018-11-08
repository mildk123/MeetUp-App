import React, { Component, Fragment } from 'react'

// Drawer Material
import Drawer from '../../Helper/Drawer'
import SwipeCard from '../../Helper/Swipe-Card'
import MeetLocation from './MeetLocation'

// Navbar
import NavBar from '../../Helper/NavBar/'

import firebase from '../../Config/firebase'

// SweetAlert
import swal from 'sweetalert';

// CSS
import './style.css'

const database = firebase.database().ref();

class selectMeet extends Component {
    constructor() {
        super()
        this.state = {
            userListArray: [],
            myInfo: {},
            userDisliked: [],
            userLiked: [],
            showPeople: true
        }

        this.showDrawer = React.createRef()
        this.swipeLeft = this.swipeLeft.bind(this)
        this.swipeRight = this.swipeRight.bind(this)
    }

    componentDidMount() {
        this.getMyDataDb()
        this.getUser()
    }

    getMyDataDb = () => {
        // getting my Own Data from server
        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                const uid = myProfile.uid
                database.child('users/' + uid).on('child_added', (myData) => {
                    this.setState(prevState => ({
                        myInfo: {
                            ...prevState.myInfo, [myData.key]: myData.val()
                        }
                    }))
                    // { this.state.myInfo.selections && this.filterUser() }
                })
            }
        })
    }

    getUser = () => {
        database.child('/users').on('child_added', (response) => {
            this.setState(prevState => ({
                userListArray: [...this.state.userListArray, response.val()],
            }))
        })
    }

    swipeRight(UID, index) {
        swal({
            title: "Are you sure?",
            text: `Do you want to meet ${this.state.userListArray[index].fullname} ?`,
            icon: "info",
            buttons: true,
            dangerMode: false,
        })
            .then((yes) => {
                if (yes) {
                    this.setState({
                        showPeople: false,
                        meetingPerson: {
                            fullname: this.state.userListArray[index].fullname,
                            pictures: this.state.userListArray[index].profilePicturesLink
                        }
                    })
                } else {
                    return
                }
            });

        // MySwal.fire({
        //     title: 'Meeting',
        //     html: <p>Do you want to meet {this.state.userListArray[index].fullname} ?</p>,
        //     confirmButtonText: "Yes",
        //     cancelButtonText: 'No',
        //     footer: '',
        // })
        //     .then(() => {
        //         this.setState({
        //             showPeople: false,
        //             meetingPerson: {
        //                 fullname: this.state.userListArray[index].fullname,
        //                 pictures: this.state.userListArray[index].profilePicturesLink
        //             }
        //         })
        //     })
    }

    swipeLeft(UID, index) {
        this.setState({
            userDisliked: [...this.state.userDisliked, UID]
        })
    }

    onEnd() {
        console.log('Get More Cards')
    }

    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }

    render() {
        return (

            <Fragment>
                <Drawer ref={this.showDrawer} />

                <NavBar Drawer={this.Drawer} btnColor={'secondary'}>Meet</NavBar>

                {this.state.showPeople && <SwipeCard
                    userListArray={this.state.userListArray}
                    swipeLeft={this.swipeLeft}
                    swipeRight={this.swipeRight}
                    onEnd={this.onEnd}
                />
                }

                {this.state.showPeople === false && <MeetLocation personDetails={this.state.meetingPerson} />}
            </Fragment >
        )
    }
}

export default selectMeet;