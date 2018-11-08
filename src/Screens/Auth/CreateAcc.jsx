// import React, { Component, Fragment } from 'react';
// import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import FormControl from '@material-ui/core/FormControl';

// import firebase from '../../Config/firebase'
// import './style.css'


// // FACEBOOK PROVIDER
// var provider = new firebase.auth.FacebookAuthProvider();


// class CreateAcc extends Component {
//     constructor() {
//         super()
//         this.state = {}

//         this.signUpWithFb = this.signUpWithFb.bind(this);
//         // this.signUpHandler = this.signUpHandler.bind(this);
//     }

//     signUpWithFb() {
//         firebase.auth().signInWithPopup(provider)
//             .then(function (result) {
//                 console.log(result.user)
//                 window.location.pathname = '/Profile'

//             }).catch(function (error) {
//                 console.log(error.message)
//             });
//     }

//     onChangeHandler(targetName, targetValue) {
//         this.setState({
//             [targetName]: targetValue,
//         })
//     }

//     // signUpHandler() {
//     //     const email = this.state.email;
//     //     const password = this.state.Password;
//     //     firebase.auth().createUserWithEmailAndPassword(email, password)
//     //         .then((succes) => {
//     //             console.log(`succes`)
//     //             window.location.pathname = '/Profile'
//     //         })
//     //         .catch(function (error) {
//     //             // Handle Errors here.
//     //             var errorCode = error.code;
//     //             var errorMessage = error.message;
//     //             console.log(errorCode, errorMessage)
//     //         });
//     // }



//     render() {
//         return <Fragment>
//             <div className="myComponent">
// {/* 
//                 <FormControl fullWidth>
//                     <div>
//                         <TextField
//                             type="text"
//                             required={true}
//                             label="First Name"
//                             margin="normal"
//                             placeholder="Jhon"
//                             name="firstName"
//                             onChange={(apple) => {
//                                 this.onChangeHandler(apple.target.name, apple.target.value)
//                             }}
//                         />
//                     </div>
//                 </FormControl>
//                 <FormControl>

//                     <div>
//                         <TextField
//                             type="text"
//                             required={true}
//                             label="Last Name"
//                             margin="normal"
//                             placeholder="Doe"
//                             name="lastName"
//                             onChange={(apple) => {
//                                 this.onChangeHandler(apple.target.name, apple.target.value)
//                             }}
//                         />
//                     </div>
//                 </FormControl>
//                 <FormControl>

//                     <div>
//                         <TextField
//                             type="email"
//                             required={true}
//                             label="E-mail"
//                             margin="normal"
//                             placeholder="JDoe@example.com"
//                             name="email"
//                             onChange={(apple) => {
//                                 this.onChangeHandler(apple.target.name, apple.target.value)
//                             }}
//                         />
//                     </div>

//                 </FormControl>
//                 <FormControl>
//                     <div>
//                         <TextField
//                             type="Password"
//                             required={true}
//                             label="Password"
//                             margin="normal"
//                             name="Password"
//                             onChange={(apple) => {
//                                 this.onChangeHandler(apple.target.name, apple.target.value)
//                             }}
//                         />
//                     </div>
//                 </FormControl>


//                 <div>
//                     <Button variant="contained" onClick={this.signUpHandler} color="primary">Create Account</Button>
//                 </div> */}
//                 <div>
//                     <Button onClick={this.signUpWithFb.bind(this)} variant="contained" color="secondary" >
//                         Use Facebook Instead
//                     </Button>
//                 </div>
//             </div>
//         </Fragment>
//     }
// }

// export default CreateAcc;