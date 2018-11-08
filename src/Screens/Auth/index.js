import React, { Component, Fragment } from 'react';

// Login Dialog 
import LoginDialog from '../../Helper/LoginDialog/'

// Material Button
import Button from '@material-ui/core/Button';

// Firebase Config
import firebase from '../../Config/firebase'

// Local CSS
import './style.css'

// FACEBOOK PROVIDER
const provider = new firebase.auth.FacebookAuthProvider();

const database = firebase.database().ref();


class AuthScreen extends Component {
    constructor(props) {
        super(props)

        this.showLogin = this.showLogin.bind(this);
        this.LoginDialogs = React.createRef()
        this.signUpWithFb = this.signUpWithFb.bind(this);
    }


    componentWillMount() {
        if (localStorage.getItem('userSignup')) {
            this.props.history.push("/home");
        }
    }

    signUpWithFb() { 
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const fullname = result.user.displayName
                const email = result.user.email
                const uid = result.user.uid

                if (result.additionalUserInfo.isNewUser) {
                    database.child('users/' + uid).set({
                        fullname: fullname,
                        email: email,
                        uid: uid,
                    })
                    this.props.history.push('/Profile');

                } else {
                    
                    this.props.history.push('/Home');
                    localStorage.setItem('userSignup', true);
                }
            })

            .catch(function (error) {
                console.log(error.message)
            });
            console.log(this.props)
    }

    onChangeHandler(targetName, targetValue) {
        this.setState({
            [targetName]: targetValue,
        })
    }

    showLogin() {
        this.LoginDialogs.current.handleClickOpen();
    }

    render() {
        return <Fragment >
            <div className="myComponent">
                <h1>Meeting App</h1>

                <LoginDialog ref={this.LoginDialogs} />

                {/* </Button> */}
                <div className='btnDiv'>
                    <Button className="btn" onClick={this.showLogin} variant="contained" color="secondary" >
                        Login
                    </Button>

                    <Button className="btn" onClick={this.signUpWithFb.bind(this)} variant="contained" color="primary" >
                        Facebook
                    </Button>
                </div>

                {/* <Button variant="contained" color="primary" >
                            <Link to='/CreateAcc'>
                                Create Account
                            </Link> */}

            </div>
        </Fragment>
    }


}

export default AuthScreen;