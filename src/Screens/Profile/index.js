import React, { Component, Fragment } from 'react';
import firebase from '../../Config/firebase'

import Step1 from './UserInfo';
import Step2 from './UserPic';
import Step3 from './UserChoices';

// Drawer Material
import Drawer from '../../Helper/Drawer'

// Navbar
import NavBar from '../../Helper/NavBar/'

const database = firebase.database().ref();

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderStep1: true,
            renderStep2: false,
            renderStep3: false,
        };

        this.showDrawer = React.createRef()
        this.nextStep = this.nextStep.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(targetName, targetValue) {
        this.setState({
            [targetName]: targetValue,
        })
    }

    nextStep() {
        // Step One
        if (this.state.renderStep1 === true) {
            if (this.state.nickname && this.state.phoneNo) {
                firebase.auth().onAuthStateChanged((myProfile) => {
                    if (myProfile) {
                        const uid = myProfile.uid
                        const nickname = this.state.nickname
                        const phoneNo = this.state.phoneNo
                        database.child('users/' + uid).update({
                            uid: uid,
                            nickname: nickname,
                            phoneNo: phoneNo,
                        })
                    }
                });
                this.setState({
                    renderStep1: false,
                    renderStep2: true,
                })
            }
        } else if (this.state.renderStep2 === true) {
            this.setState({
                renderStep2: false,
                renderStep3: true,
            })
        } else if (this.state.renderStep3 === true) {
            this.setState({
                renderStep3: false,
            })
            this.props.history.push('/selectLocation');

        }
    }


    Drawer = () => {
        this.showDrawer.current.handleClickOpen('left', true);
    }
    
    render() {
        return (
            <Fragment>
                <Drawer ref={this.showDrawer} />

                <NavBar Drawer={this.Drawer} btnColor="secondary">
                    Profile
            </NavBar>
                <div>
                    {this.state.renderStep1 && <Step1 onChangeHandler={this.onChangeHandler} nextStep={this.nextStep} />}
                    {this.state.renderStep2 && <Step2 onChangeHandler={this.onChangeHandler} nextStep={this.nextStep} />}
                    {this.state.renderStep3 && <Step3 onChangeHandler={this.onChangeHandler} nextStep={this.nextStep} />}
                </div>
            </Fragment>
        );
    }
}

export default Profile;
