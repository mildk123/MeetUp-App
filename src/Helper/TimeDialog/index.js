import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  // setMeet = () => {
  //   if (this.state.meetingDate && this.state.meetingTime) {
  //     firebase.auth().onAuthStateChanged((myProfile) => {
  //       if (myProfile) {
  //         const uid = myProfile.uid;
  //         database.child('meetings/' + uid)('meeting').update({
  //           meetingDate: this.state.meetingDate,
  //           meetingTime: this.state.meetingTime,
  //         })
  //         this.props.setMeet()
  //       }
  //     })
  //   }else{
  //     console.log(`error`)
  //   }
  // }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Meet Time</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Select Suitable Date and Time for your meeting.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              type="date"
              name="meetingDate"
              variant="standard"
              onChange={(ev) => this.props.onChangeHandler(ev)}
              fullWidth
              required
            />
            <TextField
              autoFocus
              margin="normal"
              type="time"
              name="meetingTime"
              variant="standard"
              onChange={(ev) => this.props.onChangeHandler(ev)}
              required
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.setMeet} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
