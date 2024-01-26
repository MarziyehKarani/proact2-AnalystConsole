import React from "react";
import { ReactSession } from 'react-client-session';
import { useMemo } from "react";
import {
    BooleanCell,
    DateCell,
    MessageBodyCell
} from "../../components/Common/TableCells";
import {
    MessageScopeIcon,
    MessageMoodIcon,
    RepliesCounterWithIcon
} from "../../components/Common/Messages";

export function MessagesTableColumns(props) {
    const columns = useMemo(() => [
        {
            Header: props.t("message_body"),
            accessor: "originalMessage.body",
            disableFilters: true,
            filterable: true,
            Cell: (cellProps) => {
                const message = cellProps.row.original;
                var userId = ReactSession.get("selectedPatientId");
                var toParam = `messages/userId/${userId}/messageId/${message.originalMessage.messageId}`;
                return <MessageBodyCell props={props} toParam={toParam} message={message} />;
            }
        },
        {
            Header: props.t("message_datetime"),
            accessor: "originalMessage.createdDateTime",
            disableFilters: true,
            filterable: true,
            Cell: (cellProps) => {
                return <DateCell {...cellProps} />;
            }
        },
        {
            Header: props.t("message_has_analysis"),
            accessor: "originalMessage.hasAnalysis",
            disableFilters: true,
            filterable: true,
            Cell: (cellProps) => {
                const message = cellProps.row.original;
                return <BooleanCell
                    value={message.originalMessage.hasAnalysis}
                    props={props} />;
            }
        },
        {
            Header: props.t("message_summary"),
            accessor: "originalMessage.emotion",
            disableFilters: true,
            filterable: true,
            Cell: (cellProps) => {
                const message = cellProps.row.original;
                return <>
                    <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 overflow-hidden align-self-center me-2">
                            <RepliesCounterWithIcon replies={message.replyMessages.length} />
                        </div>
                        <div className="flex-shrink-1 align-self-center me-2">
                            <MessageScopeIcon scope={message.originalMessage.messageScope} />
                        </div>
                        <div className="flex-shrink-2 overflow-hidden align-self-center me-2">
                            <MessageMoodIcon mood={message.originalMessage.emotion} height="20" />
                        </div>
                    </div>
                </>;
            }
        }
    ],
        []
    );

    return columns;
}


