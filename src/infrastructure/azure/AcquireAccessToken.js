import { useEffect } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal, useAccount } from "@azure/msal-react";
import { protectedResources } from "./azureB2cConfig";

import { setApiAuthToken } from "../services/network/networkApiConfig";

const AcquireAccessToken = ({ onTokenAquiredCallBack }) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                if (account && inProgress === "none") {
                    const response = await instance.acquireTokenSilent({
                        scopes: protectedResources.api.scopes,
                        account: account
                    });
                    accessTokenAquireHandler(response.accessToken);
                }
            } catch (error) {
                if (error instanceof InteractionRequiredAuthError) {
                    try {
                        if (account && inProgress === "none") {
                            const response = await instance.acquireTokenPopup({
                                scopes: protectedResources.api.scopes,
                            });
                            accessTokenAquireHandler(response.accessToken);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        };

        fetchAccessToken();
    }, [account, inProgress, instance]);

    const accessTokenAquireHandler = (accessToken) => {
        setApiAuthToken(accessToken);
        onTokenAquiredCallBack();
    };

    //return null; // or you can return any JSX if needed
};

export default AcquireAccessToken;