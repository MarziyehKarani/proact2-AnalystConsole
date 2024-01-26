import React from "react"
import { ReactSession } from 'react-client-session';
import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Input, Button, Spinner } from "reactstrap"
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next"
import getPatientsApi from "../../infrastructure/services/network/apiCalls/getPatientsApi";
import getMessagesApi from "../../infrastructure/services/network/apiCalls/getMessagesApi";
import TableContainer from "../../components/Common/TableContainer";
import { BooleanCell, DateCell, MessageBodyCell } from "../../components/Common/TableCells";
import { map } from "lodash";
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";
import { PatientsListPlaceholder } from "../../components/Common/Placeholders";
import { aquireAccessToken } from "../../infrastructure/azure/aquireAccessToken";
import { apiErrorToast } from "../../components/Common/apiErrorToast";
import AuthorizedPage from "../../components/Common/AuthorizedPage";
import {
    MessageScopeIcon,
    MessageMoodIcon,
    RepliesCounterWithIcon
} from "../../components/Common/Messages";

import { MessagesTableColumns } from "./MessagesTableColumns";

//resources
import patientProfileImg from "../../assets/images/users/patient-placeholder.png";
import exportAnalysisOfAPatientAsCsvApi from "../../infrastructure/services/network/apiCalls/exportAnalysisApi";
import generateAndDownloadTextFile from "../../helpers/generateAndDownloadTextFile";

const Messages = (props) => {

    const projectId = props.match.params.id;

    const [filteredPatients, setFilteredPatients] = useState();
    const [patients, setPatients] = useState();
    const [messages, setMessages] = useState();
    const [selectedPatientId, setSelectedPatientId] = useState("");
    const [csvIsDownloading, setCsvIsDownloading] = useState();

    aquireAccessToken(LoadPatients);

    function LoadPatients() {
        getPatientsApi(projectId, onGetPatientsApiSuccess, apiErrorToast);
    }

    function LoadMessages(userId) {
        ReactSession.set("selectedPatientId", userId);
        getMessagesApi(userId, onGetMessagesApiSuccess, apiErrorToast);
    }

    function onGetPatientsApiSuccess(callResult) {
        console.log(callResult);
        setPatients(callResult);
        setFilteredPatients(callResult);
        if (callResult.length > 0) {
            const firstPatientId = callResult[0].userId;
            setSelectedPatientId(firstPatientId);
            LoadMessages(firstPatientId);
        }
    }

    function onGetMessagesApiSuccess(callResult) {
        console.log(callResult);
        setMessages(callResult);
    }

    function onUserClick(userId) {
        setMessages(null);
        setSelectedPatientId(userId);
        LoadMessages(userId);
    }

    function onSearchTextChange(event) {
        var query = event.target.value.toLowerCase();
        var patientsSearched = patients.filter(function (patient, index) {
            if (patient.name.toLowerCase().includes(query))
                return true;
        });
        setFilteredPatients(patientsSearched);
    }

    function exportAnalysisAsCsv() {
        setCsvIsDownloading(true);
        var patientId = ReactSession.get("selectedPatientId");
        exportAnalysisOfAPatientAsCsvApi(
            patientId,
            handleExportAnalysisSuccess,
            apiErrorToast);
    }

    function handleExportAnalysisSuccess(data) {
        var patientId = ReactSession.get("selectedPatientId");
        var filename = patientId + "." + data.type;
        var content = data.value;
        generateAndDownloadTextFile(content, filename);
        setCsvIsDownloading(false);
    }

    const messagesTableColumns = MessagesTableColumns(props);

    return (
        <>
            <AuthorizedPage />
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Console" backButtonLinkTo="/studies" breadcrumbItem={props.t("Messages")} />

                        <Row>
                            <Col xs="3">
                                <Card>
                                    <div className="p-3">
                                        <div className="search-box chat-search-box">
                                            <div className="position-relative">
                                                <Input
                                                    type="text"
                                                    className="form-control bg-light border-light rounded"
                                                    onChange={onSearchTextChange}
                                                    placeholder={props.t("search_placeholder")}
                                                />
                                                <i className="uil uil-search search-icon"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-3 border-top">
                                        <div>
                                            <h5 className="font-size-16 mb-3"><i className="uil uil-user me-1"></i> {props.t("Patients")}</h5>

                                            {filteredPatients == null ? <PatientsListPlaceholder /> :
                                                <ul className="list-unstyled chat-list">
                                                    {map(filteredPatients, patient => (
                                                        <li
                                                            key={patient.userId}
                                                            className={
                                                                selectedPatientId === patient.userId
                                                                    ? "active"
                                                                    : ""
                                                            }
                                                        >
                                                            <Link
                                                                to="#"
                                                                onClick={() => {
                                                                    onUserClick(patient.userId);
                                                                }}
                                                            >
                                                                <div className="d-flex align-items-center">
                                                                    <div className="flex-shrink-0 align-self-center me-2">

                                                                        <div className="user-img">
                                                                            <img
                                                                                src={patientProfileImg}
                                                                                className="rounded-circle avatar-xs"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex-1 overflow-hidden">
                                                                        <h5 className="text-truncate font-size-12">
                                                                            {patient.name}
                                                                        </h5>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            }
                                        </div>
                                    </div>
                                </Card>
                            </Col>

                            <Col xs="9">
                                <Card>
                                    <CardBody>
                                        {messages == null ? <LoadingSpinner /> :
                                            <>
                                                <div className="d-flex justify-content-between mb-2">
                                                    <h6>{props.t("Messages")}</h6>
                                                    <Button
                                                        color='info'
                                                        size="sm"
                                                        className="px-3"
                                                        disabled={csvIsDownloading || messages.length == 0}
                                                        onClick={exportAnalysisAsCsv} >
                                                        {csvIsDownloading ?
                                                            <Spinner color="light" size="sm" className="me-2" />
                                                            :
                                                            <i className="fas fa-file-download me-2"></i>
                                                        }
                                                        {props.t("ExportAsCsv")}
                                                    </Button>
                                                </div>

                                                <TableContainer
                                                    columns={messagesTableColumns}
                                                    data={messages}
                                                    isGlobalFilter={true}
                                                    isAddTableWithoutBorderStrap={true}
                                                />
                                            </>
                                        }
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        </>
    )
}

export default withTranslation()(Messages)