import React from 'react';
import { Link } from "react-router-dom"
import { Card, Button } from 'reactstrap';
import { useState } from 'react';
import { AudioAttachmentPlayer } from '../../pages/Messages/AudioAttachmentPlayer';

//Lightbox
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

const MessageAttachment = ({ props, attachment, messageId, onClickCallback }) => {
    if (attachment != null) {
        if (attachment.attachmentType == 0) {
            return (MessageImageAttachment({ props, attachment }));
        }
        else if (attachment.attachmentType == 1) {
            return (MessageVideoAttachment({ props, attachment, messageId, onClickCallback }));
        }
        else if (attachment.attachmentType == 2) {
            return (MessageAudioAttachment({ props, attachment, messageId, onClickCallback }));
        }
    }
    else {
        return ("");
    }
}

const MessageImageAttachment = ({ props, attachment }) => {

    const [islightboxVisible, setLightboxVisible] = useState(false)

    return (

        <div>
            {islightboxVisible ? (
                <Lightbox
                    mainSrc={attachment.url}
                    enableZoom={false}
                    onCloseRequest={() => {
                        setLightboxVisible(!islightboxVisible)
                    }}
                />
            ) : null}

            <Link to="#">
                <Card className="border shadow-none">
                    <img
                        onClick={() => {
                            setLightboxVisible(true)
                        }}
                        className="card-img-top img-fluid"
                        src={attachment.url}
                        alt="Minible"
                    />
                    <div className="py-2 text-center">
                        {props.t("open_image")}
                    </div>
                </Card>
            </Link>

        </div>
    );
};

const MessageVideoAttachment = ({ props, attachment, messageId, onClickCallback }) => {

    const duration
        = millisToMinutesAndSeconds(attachment.durationInMilliseconds);

    function onClickHandler() {
        if (onClickCallback != null) {
            onClickCallback(attachment, messageId);
        }
    }

    return (
        <Link to="#" onClick={onClickHandler}>
            <Card className="border shadow-none" >
                <img
                    className="card-img-top img-fluid"
                    src={attachment.thumbnailUrl}
                />
                <div className="py-2 text-center">
                    <span style={{ color: "#FE387B" }}><i className="fas fa-video m-2"></i>{props.t("open_video")}</span>
                    <div>({duration})</div>
                </div>
            </Card>
        </Link>
    );
};

const MessageAudioAttachment = ({ props, attachment, messageId, onClickCallback }) => {
    return (
        <AudioAttachmentPlayer
            messageId={messageId}
        />
    );
};


export {
    MessageAttachment
}