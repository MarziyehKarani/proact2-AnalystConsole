import { LogLevel } from "@azure/msal-browser";

const devEnvironment = {
    clientId: "6376e7f4-1656-4340-b330-342ef88b2244",
    signinUserFlow: "B2C_1_EngitelDevProact",
    domain: "devetproactb2c.b2clogin.com",
    loginEndpoint: "https://devetproactb2c.b2clogin.com/devetproactb2c.onmicrosoft.com/B2C_1_EngitelDevProact",
    scopes: ["https://devetproactb2c.onmicrosoft.com/5640d05e-b6cb-4aac-a235-611db24fd6f3/Api.Scope"]
}

const prodEnvironment = {
    clientId: "",
    signinUserFlow: "",
    domain: "",
    loginEndpoint: "",
    scopes: [""]
}


export const b2cPolicies = {
    names: {
        signUpSignIn: devEnvironment.signinUserFlow
    },
    authorities: {
        signUpSignIn: {
            authority: devEnvironment.loginEndpoint
        }
    },
    authorityDomain: devEnvironment.domain
}


export const msalConfig = {
    auth: {
        clientId: devEnvironment.clientId,
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

export const protectedResources = {
    api: {
        scopes: devEnvironment.scopes
    },
}

export const loginRequest = {
    scopes: [...protectedResources.api.scopes]
};

export const authRequest = {
    ...loginRequest
};
