import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap"

//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user4 from "../../../assets/images/users/avatar.png"

//Azure b2c
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../infrastructure/azure/azureB2cConfig";
import useUserSession from "../../../infrastructure/session/useUserSession"

const ProfileMenu = props => {

  const { instance, accounts } = useMsal();
  const [profileImage, setProfileImage] = useState(user4);
  const userSession = useUserSession();

  useEffect(() => {
    if (userSession) {
      setProfileImage(userSession.avatarUrl);
    }
  }, [userSession]);

  const handleLogin = () => {
    instance.loginPopup(loginRequest)
      .catch((error) => console.log(error))
  }

  const handleLogout = () => {
    instance.logoutPopup({ postLogoutRedirectUri: "/signout", mainWindowRedirectUri: "/" })
  }

  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <AuthenticatedTemplate>
        <Dropdown
          isOpen={menu}
          toggle={() => setMenu(!menu)}
          className="d-inline-block"
        >
          <DropdownToggle
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
            tag="button"
          >
            <img
              className="rounded-circle header-profile-user"
              src={profileImage}
              alt="Header Avatar"
            />
            <span className="d-none d-xl-inline-block ms-1 fw-medium font-size-15">{accounts != null && accounts.length > 0 ? accounts[0].name : ""}</span>{" "}
            <i className="uil-angle-down d-none d-xl-inline-block font-size-15"></i>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <Link to="#" onClick={handleLogout} className="dropdown-item text-danger">
              <i className="fas fa-sign-out-alt font-size-18 align-middle me-2"></i>
              <span>{props.t("Logout")}</span>
            </Link>
          </DropdownMenu>
        </Dropdown>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <Button color="success" className="waves-effect d-inline-block my-2" onClick={handleLogin} >{props.t("Login")}</Button>
      </UnauthenticatedTemplate>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state.Profile
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
