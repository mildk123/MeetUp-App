import React, { Component, Fragment } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';

// import FormControl from '@material-ui/core/FormControl';
// import Input from '@material-ui/core/Input';
// import InputAdornment from '@material-ui/core/InputAdornment';

import firebase from '../../Config/firebase'
const database = firebase.database().ref();


class UserPic extends Component {
    constructor() {
        super()
        this.state = {
            selections: {
                Coffee: false,
                HotChocolate: false,
                Tea: false,
                CaffèMocha: false,
                Sting: false,
                Strong: false,
                MountainDew: false,
                MurreClassic: false,
                TenMin: false,
                twentyMin: false,
                fortyMin: false,
            },
            // customTime: "",
        };
    }

    handleChange = name => event => {
        let selections = {
            [name]: event.target.checked            
        }
        this.setState({
            selections: {...this.state.selections, ...selections}
        });
    };

    handleChoices = () => {

        for (let key in this.state.selections) {
            if (this.state.selections[key] === true) {
                firebase.auth().onAuthStateChanged((myProfile) => {
                    if (myProfile) {
                        const uid = myProfile.uid
                        database.child('users/' + uid).child('/selections').update({
                            [key]: this.state.selections[key],
                        })
                        this.props.nextStep()
                    }
                })

            }
        }
    }

    render() {
        return (
            <Fragment>
                <h1>Choices: </h1>
                <div>
                    <DialogContentText >
                        Please select the hot drinks you like.
                         </DialogContentText>
                    <Divider />

                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('Coffee')}
                            />
                        }
                        label="Coffee"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('HotChocolate')}
                            />
                        }
                        label="Hot Chocolate"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('Tea')}
                            />
                        }
                        label="Tea"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('CaffèMocha')}
                            />
                        }
                        label="Caffè mocha"
                    />
                </div>
                {/* Cold Drinks */}
                <div>
                    <DialogContentText >
                        Please select the Cold drinks you like.
                         </DialogContentText>
                    <Divider />

                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('Sting')}
                            />
                        }
                        label="Sting"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('Strong')}
                            />
                        }
                        label="Strong"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('MountainDew')}
                            />
                        }
                        label="Mountain Dew"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('MurreClassic')}
                            />
                        }
                        label="Murre Classic"
                    />
                </div>
                {/* Duration Of Meeting */}
                <div>
                    <DialogContentText >
                        Select a meetup duration.
                         </DialogContentText>
                    <Divider />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('TenMin')}
                            />
                        }
                        label="10min"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('twentyMin')}
                            />
                        }
                        label="20min"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={this.handleChange('fortyMin')}
                            />
                        }
                        label="40min"
                    />
                    {/* <FormControl
                        aria-describedby="time-helper-text"
                    >
                        <Input
                            onChange={this.handleChange('customTime')}
                            endAdornment={<InputAdornment position="end">min</InputAdornment>}

                            inputProps={{
                                'aria-label': 'time',
                            }}
                        />
                    </FormControl> */}
                </div>

                <div>
                    <Button onClick={this.handleChoices} margin="normal" variant="contained" color="secondary" >
                        Next
                     </Button>
                </div>

            </Fragment>
        );
    }
}

export default UserPic;