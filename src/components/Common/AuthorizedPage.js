import React, { useState, useEffect } from "react";
import useUserSession from "../../infrastructure/session/useUserSession";
import { Redirect } from "react-router-dom";
import UserRoles from "../../infrastructure/session/UserRoles";

const AuthorizedPage = () => {

    const [isAuthorized, setIsAuthorized] = useState(true);
    const userSession = useUserSession();

    useEffect(() => {
        if (userSession) {
            var isAuth = userCanAccessToAnalystConsole();
            setIsAuthorized(isAuth);
        }
    }, [userSession]);

    var userCanAccessToAnalystConsole = function () {
        const roles = userSession.roles;
        return roles.includes(UserRoles.MedicalProfessional)
            || roles.includes(UserRoles.MedicalTeamAdmin)
            || roles.includes(UserRoles.Researcher);
    }

    return (
        <div>
            {isAuthorized ?
                ""
                :
               <Redirect to="/unauthorized"/>
            }
        </div>
    );
};

export default AuthorizedPage;