import React, { Component, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';


class userInfo extends Component {
    render() {
        const { nextStep, onChangeHandler } = this.props
        return (
            <Fragment>
                <h4 variant='subtitle1'>Please Fill out the Information.</h4>
                <form>
                    <TextField
                        required
                        type="text"
                        margin="normal"
                        label="Nickname"
                        name='nickname'
                        placeholder="Jazzy"
                        fullWidth
                        onChange={(apple) => {
                            onChangeHandler(apple.target.name, apple.target.value)
                        }} />

                    <TextField
                        required
                        type="number"
                        margin="normal"
                        label="Phone No."
                        name="phoneNo"
                        placeholder="0900-78601"
                        fullWidth
                        onChange={(apple) => {
                            onChangeHandler(apple.target.name, apple.target.value)
                        }}
                    />
                    <div>
                        <Button onClick={nextStep} variant="outlined" color="secondary" >
                            Next
                     </Button>
                    </div>
                </form>
            </Fragment>
        );
    }
}

export default userInfo;