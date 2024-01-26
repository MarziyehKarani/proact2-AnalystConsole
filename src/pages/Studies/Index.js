import React, { useState, useMemo } from "react"
import { Container, Row, Col, Card, CardBody } from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { withTranslation } from "react-i18next"
import TableContainer from "../../components/Common/TableContainer"
import getStudiesApi from "../../infrastructure/services/network/apiCalls/getStudiesApi";
import { setApiAuthToken } from "../../infrastructure/services/network/networkApiConfig"
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";

import { aquireAccessToken } from "../../infrastructure/azure/aquireAccessToken";
import { apiErrorToast } from "../../components/Common/apiErrorToast";
import AuthorizedPage from "../../components/Common/AuthorizedPage";

import {
    LinkCell,
    TextCell,
    EnableDisableCell,
    StatusCell,
    StudyActionsCell
} from "../../components/Common/TableCells";

const Studies = (props) => {

    const [studies, setStudies] = useState();

    aquireAccessToken(loadStudies);

    function loadStudies() {
        getStudiesApi(onApiSucccessResultCallback, apiErrorToast);
    }

    function onApiSucccessResultCallback(callResult) {
        setStudies(callResult);
    }

    const columns = useMemo(
        () => [
            {
                Header: props.t("study_id"),
                accessor: "projectId",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const study = cellProps.row.original;
                    const toParam = study.projectId + "/messages";
                    return <LinkCell toParam={toParam} value={study.projectId} />;
                }
            },
            {
                Header: props.t("study_name"),
                accessor: "name",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    return <TextCell {...cellProps} />;
                }
            },
            {
                Header: props.t("study_sponsor"),
                accessor: "sponsorName",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    return <TextCell {...cellProps} />;
                }
            },
            {
                Header: props.t("study_status"),
                accessor: "status",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const study = cellProps.row.original;
                    return <StatusCell value={study.status} props={props} />;
                }
            },
            {
                Header: props.t("study_has_analyst_console"),
                accessor: "properties.isAnalystConsoleActive",
                disableFilters: true,
                disableGlobalFilter: false,
                filterable: true,
                Cell: (cellProps) => {
                    const study = cellProps.row.original;
                    return <EnableDisableCell value={study.properties.isAnalystConsoleActive} props={props} />;
                }
            }
        ],
        []
    );

    return (
        <>
            <AuthorizedPage />
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs backButtonHidden="true" title="Console" breadcrumbItem={props.t("Studies")} />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>
                                        {studies == null ?
                                            <LoadingSpinner />
                                            :
                                            <TableContainer
                                                columns={columns}
                                                data={studies}
                                                isGlobalFilter={true}
                                                isAddTableWithoutBorderStrap={true}
                                            />
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

export default withTranslation()(Studies)