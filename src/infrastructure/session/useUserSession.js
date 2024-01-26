import React from 'react';
import { ReactSession } from 'react-client-session';
import { apiErrorToast } from '../../components/Common/apiErrorToast';
import UserRoles from './UserRoles';
import { aquireAccessToken } from '../azure/aquireAccessToken';
import getCurrentUserDetailsApi from '../services/network/apiCalls/getCurrentUserDetailsApi';
import { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

const useUserSession = () => {
    const [userSession, setUserSession] = useState(null);

    aquireAccessToken(loadCurrentUserData);

    function loadCurrentUserData() {
        const userProfileStr = ReactSession.get("userProfile");
        if(userProfileStr){
            var user = getUserProfile();
            setUserSession(user);
        }
        else{
            getCurrentUserDetailsApi(saveUserProfile, apiErrorToast);
        }
    }

    function saveUserProfile(userData) {
        console.log("No user cached profile. User profile loaded with api:");
        console.log({userData});
        var userProfileStr = JSON.stringify(userData);
        ReactSession.set("userProfile", userProfileStr);
        setUserSession(userData);
    }

    function getUserProfile() {
        const userProfileStr = ReactSession.get("userProfile");
        return JSON.parse(userProfileStr);
    }

    return userSession;
};


export default useUserSession;