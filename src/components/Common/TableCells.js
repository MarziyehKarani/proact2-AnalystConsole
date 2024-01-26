import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, UncontrolledTooltip } from 'reactstrap';



const LinkCell = ({ toParam, value, onClickCallback }) => {

    function onClickHandler() {

        if (onClickCallback != null) {
            onClickCallback(value);
        }
    }

    return (
        <Link to={toParam} onClick={onClickHandler} className="fw-bold link-primary"><small><u>{value ? value : ''}</u></small></Link>
    );
};

const TextCell = (cell) => {
    return cell.value ? cell.value : '';
};

const BooleanCell = ({value,props}) => {
    return (
        <Badge
            className={"badge badge-pill bg-pill px-3 font-size-12 bg-soft-" + (value ? "success" : "danger")}>
            {value ? props.t("Yes") : props.t('No')}
        </Badge>
    )
};

const EnableDisableCell = ({value,props}) => {
    return (
        <Badge
            className={"badge badge-pill bg-pill font-size-12 bg-soft-" + (value ? "success" : "danger")}>
            {value ? props.t("Enabled") : props.t('Disabled')}
        </Badge>
    )
};

const StatusCell = ({value,props}) => {
    return (
        <Badge
            className={"badge badge-pill bg-pill font-size-12 bg-soft-" + (value === 0 ? "success" : "danger")}>
            {value === 0 ? props.t("Open") : props.t('Closed')}
        </Badge>
    )
};

const DateCell = (cell) => {
    if (cell.value) {
        return (<small>{new Date(cell.value).toLocaleString()}</small>);
    }
    else {
        return '';
    }
};

const StudyActionsCell = (cell) => {
    const study = cell.row.original;
    const toParam = study.projectId + "/messages";

    return (

        <div className="d-flex gap-3">
            <Link
                to={toParam}
                className="text-success">
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                </UncontrolledTooltip>
            </Link>
        </div>
    );
};

const MessageBodyCell = ({ props, toParam, message }) => {

    var value = message.originalMessage.body;
    if (message.originalMessage.attachment != null 
        && message.originalMessage.attachment.attachmentType == 1) {
        value = props.t("video_message_title");
    }
    else if (message.originalMessage.attachment != null
         && message.originalMessage.attachment.attachmentType == 2) {
        value = props.t("audio_message_title");
    }

    return (
        <Link to={toParam}  className="fw-bold link-primary d-inline-block text-truncate" style={{width:"300px"}}><small><u>{value ? value : ''}</u></small></Link>
    );
};

export {
    LinkCell,
    TextCell,
    BooleanCell,
    EnableDisableCell,
    StatusCell,         
    StudyActionsCell,
    DateCell,
    MessageBodyCell
};