import React from 'react';
import veryBadMoodImage from "../../assets/images/Messages/moodVeryBad.png"
import BadMoodImage from "../../assets/images/Messages/moodBad.png"
import goodMoodImage from "../../assets/images/Messages/moodGood.png"
import veryGoodMoodImage from "../../assets/images/Messages/moodVeryGood.png"

//resources
import patientProfileImg from "../../assets/images/users/patient-placeholder.png";

const MessageScopeIcon = ({ scope, iconSizeClass }) => {

    var iconClassName = "";

    if (scope == 1) {
        iconClassName = "fas fa-info-circle " + iconSizeClass;
        return (
            <span style={{ color: "#213384" }}><i className={iconClassName}></i></span>
        );
    }
    else if (scope == 2) {
        iconClassName = "fas fa-heartbeat " + iconSizeClass;
        return (
            <span style={{ color: "#FE387B" }}><i className={iconClassName}></i></span>
        );
    }
    else {
        return ("");
    }
};

const RepliesCounterWithIcon = ({ replies }) => {

   //var iconClassName = "";
   // iconClassName = "fas fa-info-circle " + iconSizeClass;
    return (
        <span className='text-secondary'><i className="uil uil-comment-alt-lines"></i> {replies}</span>
    );
};

const MessageMoodIcon = ({ mood, height }) => {
    switch (mood) {
        case 0:
            return (
                <img
                    src={veryBadMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );
        case 1:
            return (
                <img
                    src={BadMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );
        case 2:
            return (
                <img
                    src={goodMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );
        case 3:
            return (
                <img
                    src={veryGoodMoodImage}
                    alt="Mood message"
                    height={height}
                />
            );

        case 4:
            return ("");
    }
}

const OriginalMessageHeader = ({ OriginalMessage }) => {
    return (
        <div className="d-flex align-items-center mb-4">
            <div className="flex-shrink-0 me-3">
                <img
                    className="rounded-circle avatar-sm"
                    src={patientProfileImg}
                    alt="patient icon"
                />
            </div>
            <div className="flex-grow-1">
                <h5 className="font-size-14 my-1">
                    {OriginalMessage.authorName}
                </h5>
                <small className="text-muted font-size-12">
                    {new Date(OriginalMessage.createdDateTime).toLocaleString()}
                </small>
            </div>
        </div>
    );
}

const ReplyHeader = ({ Reply }) => {

    var profileImg = patientProfileImg;
    var profileName = Reply.authorName;

    if (Reply.messageType != 0) {
        profileImg = Reply.avatarUrl;
    }

    return (
        <div className="d-flex align-items-center m-1">
            <div className="flex-shrink-0 align-self-center me-2">
                <div className="user-img">
                    <img
                        src={profileImg}
                        className="rounded-circle avatar-xs"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <div className="text-truncate font-size-12">
                    <strong>{profileName}</strong>
                </div>
                <small className="text-muted font-size-11 align-top">
                    {new Date(Reply.createdDateTime).toLocaleString()}
                </small>
            </div>

        </div>
    );
}

export {
    MessageScopeIcon,
    MessageMoodIcon,
    OriginalMessageHeader,
    ReplyHeader,
    RepliesCounterWithIcon
}