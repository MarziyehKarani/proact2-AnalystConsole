import React from "react"
import { useState } from "react";
import { Container, Row, Col, Card, CardBody, Button, Modal, Alert, UncontrolledAlert } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next"
import getMessageDetailsApi from "../../infrastructure/services/network/apiCalls/getMessageDetailsApi";
import getMessageAnalysisApi from "../../infrastructure/services/network/apiCalls/getMessageAnalysisApi";
import getProjectDetailsApi from "../../infrastructure/services/network/apiCalls/getProjectDetailsApi";
import { map } from "lodash";
import {
    MessageScopeIcon,
    MessageMoodIcon,
    OriginalMessageHeader,
    ReplyHeader
} from "../../components/Common/Messages";
import {
    MessageAttachment
} from "../../components/Common/MessageAttachments";
import { MessageDetailPlaceholder, AnalysisDetailPlaceholder } from "../../components/Common/Placeholders";

import { AnalysisDetail } from "../../components/Common/Analysis";
import { AddAnalysisModal } from "./AddAnalysisModal";
import { VideoAttachmentModal } from "./VideoAttachmentModal";
import { aquireAccessToken } from "../../infrastructure/azure/aquireAccessToken";
import { apiErrorToast } from "../../components/Common/apiErrorToast";
import AuthorizedPage from "../../components/Common/AuthorizedPage";
import {
    AnalystConsoleNotEnableAlert,
    EmptyAnalysisListAlert
} from "../../components/Common/MessageAlert";

//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";

const MessageDetails = (props) => {

    const studyId = props.match.params.studyId;
    const messageId = props.match.params.id;
    const userId = props.match.params.userId;

    const [messageDetails, setMessageDetails] = useState();
    const [analysis, setAnalysis] = useState();
    const [isAddAnalysisModalVisibile, setAddAnalysisModalVisibile] = useState(false)
    const [isAttachmentModalVisible, setAttachmentModalVisible] = useState(false);
    const [selectedAttachment, setSelectedAttachment] = useState(null);
    const [selectedMessageIdAttachment, setSelectedMessageIdAttachment] = useState(null);
    const [success_msg, setsuccess_msg] = useState(false);
    const [isAnalystConsoleActive, setAnalystConsoleActive] = useState(false);
    const [isAnalysisLoading, setAnalysisLoading] = useState(true);

    aquireAccessToken(accessTokenAquiredHandler);

    function accessTokenAquiredHandler() {
        loadMessageDetails();
        loadProjectDetails();
    }

    function loadMessageDetails() {
        getMessageDetailsApi(userId, messageId, onGetMessageDetailsSuccess, apiErrorToast);
    }

    function loadProjectDetails() {
        getProjectDetailsApi(studyId, onGetProjectDetailsSuccess, apiErrorToast);
    }

    function loadAnalysis() {
        getMessageAnalysisApi(messageId, onGetAnalysisSuccess, apiErrorToast);
    }

    function onGetMessageDetailsSuccess(result) {
        setMessageDetails(result);
    }

    function onGetProjectDetailsSuccess(result) {
        if (result.properties
            && result.properties.isAnalystConsoleActive) {
            setAnalystConsoleActive(true);
            loadAnalysis();
        }
        else {
            setAnalysisLoading(false);
        }
    }

    function onGetAnalysisSuccess(result) {
        setAnalysis(result);
        setAnalysisLoading(false);
    }

    function addAnalysisHandler(result) {
        analysis.analysis.unshift(result);
        setAnalysis(analysis);
        setsuccess_msg(true);
    }

    function closeAddAnalysisModal() {
        setAddAnalysisModalVisibile(!isAddAnalysisModalVisibile)
    }

    function OnAttachmentClicked(attachment, messageId) {
        setSelectedAttachment(attachment);
        setSelectedMessageIdAttachment(messageId);
        setAttachmentModalVisible(true);
    }

    function closeVideoAttachmentModal() {
        setAttachmentModalVisible(!isAttachmentModalVisible);
    }

    return (
        <>
            <AuthorizedPage />
            <React.Fragment>
                <div className="page-content" >
                    <Container fluid >
                        <Breadcrumbs
                            backButtonLinkTo={`/${studyId}/messages`}
                            title={props.t("Messages")}
                            breadcrumbItem={props.t("MessageDetails")} />

                        <Row>
                            <Col xs="8">
                                <Card className="message_detail_body">

                                    {messageDetails != null ?
                                        (
                                            <CardBody>
                                                <Row>
                                                    <Col xs="10">
                                                        <OriginalMessageHeader OriginalMessage={messageDetails.originalMessage} />
                                                    </Col>
                                                    <Col xs="1">
                                                        <MessageMoodIcon mood={messageDetails.originalMessage.emotion} height="32" />
                                                    </Col>
                                                    <Col xs="1">
                                                        <MessageScopeIcon scope={messageDetails.originalMessage.messageScope} iconSizeClass="fa-2x" />
                                                    </Col>
                                                </Row>

                                                <p>
                                                    {messageDetails.originalMessage.body}
                                                </p>

                                                <Row>
                                                    <Col xl="5">
                                                        <MessageAttachment
                                                            props={props}
                                                            onClickCallback={OnAttachmentClicked}
                                                            messageId={messageDetails.originalMessage.messageId}
                                                            attachment={messageDetails.originalMessage.attachment} />
                                                    </Col>
                                                </Row>

                                                <hr />

                                                <h5 className="mb-4">
                                                    <i className="uil uil-comment-alt-lines me-1"></i>
                                                    {messageDetails.replyMessages.length} {messageDetails.replyMessages.length == 1 ? props.t("Reply") : props.t("Replies")}
                                                </h5>

                                                {map(messageDetails.replyMessages, reply => (
                                                    <Row key={reply.messageId}>
                                                        <ReplyHeader Reply={reply} />
                                                        <Row>
                                                            {reply.body}
                                                        </Row>
                                                        <Row className="my-3">
                                                            <Col xl="4">
                                                                <MessageAttachment
                                                                    onClickCallback={OnAttachmentClicked}
                                                                    props={props}
                                                                    messageId={reply.messageId}
                                                                    attachment={reply.attachment} />
                                                            </Col>
                                                        </Row>
                                                        <hr />
                                                    </Row>
                                                ))}
                                            </CardBody>
                                        )
                                        :
                                        (
                                            <MessageDetailPlaceholder props={props} />
                                        )

                                    }
                                </Card>
                            </Col>



                            <Col xs="4" className="message_detail_analysis">
                                <Row className="my-2">
                                    <Col xs="6">
                                        <h5 ><i className="fas fa-file-contract me-2"></i>
                                            {analysis != null && analysis.analysis != null ? analysis.analysis.length : ""} {props.t("Analysis")}
                                        </h5>
                                    </Col>
                                    <Col xs="6">
                                        {
                                            isAnalystConsoleActive ?
                                                <Button
                                                    style={{ float: 'right' }}
                                                    color="danger"
                                                    className="btn-rounded waves-effect waves-light"
                                                    onClick={() => setAddAnalysisModalVisibile(true)}
                                                >
                                                    <i className="fas fa-plus fa-1x"></i> {props.t("add_analysis")}
                                                </Button>
                                                :
                                                <></>
                                        }

                                    </Col>
                                </Row>

                                {analysis &&

                                    <Row>
                                        {map(analysis.analysis, analysis => (

                                            <AnalysisDetail
                                                key={analysis.analysisId}
                                                props={props}
                                                analysisDetail={analysis} />


                                        ))}
                                    </Row>
                                }

                                {analysis && analysis.analysis.length == 0 &&
                                    <EmptyAnalysisListAlert props={props} />
                                }

                                {isAnalysisLoading &&
                                    <AnalysisDetailPlaceholder />
                                }

                                {!isAnalysisLoading && !isAnalystConsoleActive &&
                                    <AnalystConsoleNotEnableAlert props={props} />
                                }

                            </Col>

                        </Row>

                        <AddAnalysisModal
                            props={props}
                            isOpen={isAddAnalysisModalVisibile}
                            closeCallback={closeAddAnalysisModal}
                            addAnalysisSuccessCallback={addAnalysisHandler} />

                        <VideoAttachmentModal
                            isOpen={isAttachmentModalVisible}
                            closeCallback={closeVideoAttachmentModal}
                            attachment={selectedAttachment}
                            messageId={selectedMessageIdAttachment} />

                        {success_msg ? (
                            <SweetAlert
                                title={props.t("add_analysis_success_msg")}
                                success
                                confirmBtnBsStyle="success"
                                onConfirm={() => {
                                    setsuccess_msg(false);
                                }}

                            >
                            </SweetAlert>
                        ) : null}

                    </Container>
                </div>
            </React.Fragment>
        </>
    )
}

export default withTranslation()(MessageDetails)

