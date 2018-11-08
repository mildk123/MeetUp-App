import React, { Component, Fragment } from 'react';
import ImageUploader from 'react-images-upload';
import Button from '@material-ui/core/Button';

import firebase from '../../Config/firebase'
const database = firebase.database().ref();




class UserPic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePictures: [],
            profilePicturesLink: []
        };

        this.onDrop = this.onDrop.bind(this);
        this.imageUploadHandler = this.imageUploadHandler.bind(this);

    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            profilePictures: [...this.state.profilePictures, ...pictureFiles]
        })
    }

    imageUploadHandler() {
        let storageRef = firebase.storage().ref();

        firebase.auth().onAuthStateChanged((myProfile) => {
            if (myProfile) {
                const myUid = myProfile.uid;
                this.state.profilePictures.map((image) => {
                    return storageRef.child(`UserProfile Pictures/${myUid}/${image.name}`).put(image)
                        .then((snapshot) => {
                            return snapshot.ref.getDownloadURL();
                        })
                        .then(downloadURL => {
                            this.setState({
                                profilePicturesLink: [...this.state.profilePicturesLink, downloadURL]
                            })
                            database.child('users/' + myUid).update({
                                profilePicturesLink: this.state.profilePicturesLink
                            })
                                this.state.profilePicturesLink.length === this.state.profilePictures.length && this.props.nextStep()
                                return downloadURL;
                        })
                        .catch((error) => {
                            console.log(error.message)
                        })
                })
            }
        })
    }


    render() {
        return (
            <Fragment>
                <div>
                    <h1>Upload Photos to Your Profile</h1>
                </div>
                <ImageUploader
                    buttonText='Upload'
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={10000000}
                    onChange={this.onDrop}
                    withPreview
                    label="'Select At least 3 images*"
                />
                <div>
                    <Button onClick={this.imageUploadHandler} variant="contained" color="primary" >
                        Next
                     </Button>
                </div>
            </Fragment>
        );
    }
}

export default UserPic;