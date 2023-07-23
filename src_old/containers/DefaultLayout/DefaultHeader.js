import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
// import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: "../oadmin/assets/img/avatars/logo.png", width: 110, height: 57, alt: 'Ootel' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Ootel' }}
          style={{
          marginBottom: '-15px',
        }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        
        <Nav className="ml-auto" navbar>
         
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../oadmin/assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right>
              
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
       
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
