import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { connect } from 'react-redux';
import { signOut } from '../../Redux/actions/authActions';




class ButtonAppBar extends React.Component {

  showDrawer = (boolean) => {
    this.props.onSignOut(boolean)
  }

  render() {
    return (
      <div>
        <AppBar color={this.props.color} position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon onClick={() => this.showDrawer(true)} />
            </IconButton>
            {this.props.children}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

}




export default ButtonAppBar;
