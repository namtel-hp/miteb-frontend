import React, {Component} from 'react';
import axios from 'axios';
import {firebaseDB} from '../../../firebaseConfig'

import firebase from 'firebase'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import {getUserDetails} from '../../../Services/firebaseDBService'
import {sendPasswordResetEmail} from '../../../Services/firebaseAuthService'
import {uploadProfilePic} from '../../../Services/firebaseStorageService'
import {requestOTP} from '../../../Services/NotificationService'

import {connect} from 'react-redux'
import Avatar from 'material-ui/Avatar'
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import Snackbar from 'material-ui/Snackbar';
import {List,ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader'
import Checkbox from 'material-ui/Checkbox';

import OtpDialog from '../../Dialogs/OtpDialog'
//import SwipeableViews from 'react-swipeable-views';




class ProfileContainer extends Component {
  constructor (props) {
    super(props)
  }

  
  render() {
    const TextFields=()=>{
        return(
          <div style={{backgroundColor: '', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%'}}>
             <TextField
              floatingLabelText="Name"
              type="text"
              value={this.props.user && this.props.user.name}
              />

            <TextField
              floatingLabelText="Name Abbreviation"
              type="text"
              value={this.props.user && this.props.user.nameAbbrv}
              />

            <TextField
              floatingLabelText="Email"
              type="text"
              value={this.props.user && this.props.user.email}
              disabled={true}
              />

            <TextField
              floatingLabelText="Primary Contact"
              type="text"
              value={this.props.user && this.props.user.primaryContact}
              />
           </div>   
          )
      }

const ProfilePicture = () => {
      return (
      <div style={{display: 'flex'}}>
        <div>
        <Avatar src={this.props.user && this.props.user.profilePicURL} size={160} onClick={this.handlePicUpload}/>
        </div>     
      </div>
      )
      }

    return (
       <Paper zDepth={3} style={{height:'calc(100% - 1px)', display: 'flex', justifyContent: 'center', width: '100%', padding: 10}}>
                    
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
           <div style={{display:'flex', flexDirection: this.props.isMobile ? 'column' : 'row', justifyContent: 'space-around', alignItems: this.props.isMobile ? 'center': '', width: '80%', backgroundColor: ''}}>
            <ProfilePicture />
            <TextFields />
            <input ref={input => this.inputElement = input} type="file" id="media-upload" onChange={(e)=>this._handleImageChange(e)} accept="video/*,image/*" style={{display: 'none'}}/>
          </div>
        
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <p>Note: An OTP will be sent to the Primary Contact</p>
            <RaisedButton
              label="Request OTP"
              primary={true}
              onClick={this.showDialog}
              style={{width: '70%'}}
            />
          </div>
        </div>
    </Paper>
    );
  }
}

function mapStateToProps(state) {
  const {openSideNav, isMobile, filter} = state.toggler
  const {user, verified} = state.authentication
  return {
    user,
    openSideNav,
    verified,
    isMobile,
    filter
  }
}

export default connect(mapStateToProps)(ProfileContainer)
