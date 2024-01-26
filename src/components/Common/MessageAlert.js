import React from "react"
import { UncontrolledAlert, Alert, Card, CardBody } from "reactstrap";

const ErrorMessageAlert = ({ isVisible, message }) => {
    return (
        <div>
            {isVisible ?
                <UncontrolledAlert
                    color="danger"
                    className="alert-dismissible fade show"
                    role="alert"
                >
                    <i className="uil uil-exclamation-octagon me-2"></i> {message}
                </UncontrolledAlert>
                :
                ""
            }
        </div>
    );
}

const AnalystConsoleNotEnableAlert = ({ props }) => {
    return (
        <Card>
            <CardBody>

                <Alert
                    color="warning"
                    className="alert-warning alert-dismissible fade show mt-4 px-4 mb-0 text-center"
                    role="alert"
                >
                    <i className="uil uil-exclamation-triangle d-block display-4 mt-2 mb-3 text-warning"></i>
                    <h5 className="text-warning">{props.t("analyst_console_not_enable_alert")}</h5>
                    <p></p>
                </Alert>
            </CardBody>

        </Card>
    );
}

const EmptyAnalysisListAlert = ({ props }) => {
    return (
        <Card>
            <CardBody>
                <Alert color="info" className="mb-0" role="alert">
                    {props.t("empty_analysis_list")}
                </Alert>
            </CardBody>
        </Card>
    );
}

export {
    ErrorMessageAlert,
    AnalystConsoleNotEnableAlert,
    EmptyAnalysisListAlert
};