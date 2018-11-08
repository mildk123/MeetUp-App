import React from 'react';
import firebase from '../../Config/firebase'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Login extends React.Component {
    constructor() {
        super()

        this.state = {
            open: false,
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    loginHandler = () => {
        let email = this.state.loginEmail;
        let password = this.state.loginPassword;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((success) => {
               this.props.history.push("./Profile");
            })
            .catch(function (error) {
                // Handle Errors here.
                console.log(error.code);
                console.log(error.message);
            });

    }



    handleClickOpen = () => (
        this.setState({ open: true })
    )

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    
                    <DialogContent>

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Email Address"
                            name='loginEmail'
                            type="email"
                            fullWidth
                            onChange={(event) => this.onChangeHandler(event)}
                        />

                        <TextField
                            margin="dense"
                            id="name"
                            name="loginPassword"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={(event) => this.onChangeHandler(event)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
            </Button>
                        <Button onClick={() => this.loginHandler()} color="primary">
                            Login
            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Login;