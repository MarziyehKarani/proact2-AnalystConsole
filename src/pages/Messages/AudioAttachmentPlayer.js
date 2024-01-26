import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";
import { aquireAccessToken } from "../../infrastructure/azure/aquireAccessToken";
import getAttachmentSasUriApi from "../../infrastructure/services/network/apiCalls/getAttachmentSasUriApi";
import { apiErrorToast } from "../../components/Common/apiErrorToast";

export const AudioAttachmentPlayer = ({ messageId }) => {

    const [sasUri, setSasUri] = useState(null);
    
    useEffect(() => {
        if (!sasUri) {
            LoadUrl();
        }
    }, [sasUri]);

    function LoadUrl() {
        if (messageId) {
            getAttachmentSasUriApi(messageId, OnLoadUrlSuccess, apiErrorToast);
        }
    }

    function OnLoadUrlSuccess(result) {
        setSasUri(result.contentUrl);
    }

    return (

        <div className="modal-body">
            {sasUri ?
                <audio
                    controls
                    controlsList="nodownload"
                    src={sasUri}>
                    Your browser does not support the
                    <code>audio</code> element.
                </audio>
                :
                <LoadingSpinner />
            }
        </div>
    );
}