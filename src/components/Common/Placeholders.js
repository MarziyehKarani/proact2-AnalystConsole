import React from "preact/compat";
import { Card, CardBody, Row, Col, Badge } from "reactstrap";

const OriginalMessageHeaderPlaceholder = () => {
    return (
        <div className="d-flex align-items-center mb-4 placeholder-glow">
            <div className="flex-shrink-0 me-3">
                <span
                    className="rounded-circle avatar-sm placeholder bg-primary"
                />
            </div>
            <div className="flex-grow-1 palceholder-glow">
                <span className="placeholder col-10"></span>{" "}
                <span className="placeholder placeholder-xs col-4"></span>{" "}
            </div>
        </div>
    );
}

const MessageDetailPlaceholder = ({ props }) => {
    return (
        <CardBody>
            <Row>
                <Col xs="10">
                    <OriginalMessageHeaderPlaceholder />
                </Col>
            </Row>
            <p className="card-text placeholder-glow">
                <span className="placeholder bg-secondary col-7"></span>{" "}
                <span className="placeholder bg-secondary col-4"></span>{" "}
                <span className="placeholder bg-secondary col-4"></span>{" "}
                <span className="placeholder bg-secondary col-6"></span>{" "}
                <span className="placeholder bg-secondary col-8"></span>{" "}
                <span className="placeholder bg-secondary col-7"></span>{" "}
            </p>

            <hr />

            <h4 className="mb-4 placeholder-glow">
                <i className="uil uil-comment-alt-lines me-1"></i>
                {props.t("replies")}
            </h4>

            <ReplyPlaceholder />

            <ReplyPlaceholder />


        </CardBody>
    );
}

const ReplyPlaceholder = () => {
    return (
        <Row className="placeholder-glow mt-2" >
            <Row>
                <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 me-3">
                        <span
                            className="rounded-circle avatar-sm placeholder bg-primary"
                        />
                    </div>
                    <div className="flex-grow-1">
                        <span className="placeholder col-10"></span>{" "}
                        <span className="placeholder placeholder-xs col-4"></span>{" "}
                    </div>
                </div>
            </Row>
            <Row className="mt-3">

                <Col xl="9">
                    <p className="card-text">
                        <span className="placeholder bg-secondary col-6"></span>{" "}
                        <span className="placeholder bg-secondary col-2"></span>{" "}
                        <span className="placeholder bg-secondary col-4"></span>{" "}
                        <span className="placeholder bg-secondary col-8"></span>{" "}
                    </p>
                </Col>
            </Row>
            <hr className="my-2" />
        </Row>
    );
}

const AnalysisDetailPlaceholder = () => {
    return (
        <Card>
            <CardBody>
                <Row>
                    <div className="d-flex align-items-center placeholder-glow">
                        <div className="flex-shrink-0 me-3">
                            <span
                                className="rounded-circle avatar-sm placeholder bg-primary"
                            />
                        </div>
                        <div className="flex-grow-1">
                            <span className="placeholder col-10"></span>{" "}
                            <span className="placeholder placeholder-xs col-4"></span>{" "}
                        </div>
                    </div>
                </Row>

                <div className="mt-2">
                    <Row><Col className="placeholder-glow">
                        <h5> <span className="placeholder col-4"></span></h5>
                        <Badge
                            style={{ fontSize: 12 }}
                            className="p-2 m-1 text-lg-center rounded-pill bg-soft-danger col-4">{" "}</Badge>

                        <Badge
                            style={{ fontSize: 12 }}
                            className="p-2 m-1 text-lg-center rounded-pill bg-soft-danger col-2">{" "}</Badge>
                        <hr />
                    </Col>
                    </Row>

                    <Row><Col className="placeholder-glow">
                        <h5> <span className="placeholder col-4"></span></h5>
                        <Badge
                            style={{ fontSize: 12 }}
                            className="p-2 m-1 text-lg-center rounded-pill bg-soft-danger col-8">{" "}</Badge>

                        <hr />
                    </Col>
                    </Row>

                    <Row><Col className="placeholder-glow">
                        <h5> <span className="placeholder col-4"></span></h5>
                        <Badge
                            style={{ fontSize: 12 }}
                            className="p-2 m-1 text-lg-center rounded-pill bg-soft-danger col-4">{" "}</Badge>

                        <Badge
                            style={{ fontSize: 12 }}
                            className="p-2 m-1 text-lg-center rounded-pill bg-soft-danger col-4">{" "}</Badge>
                        <hr />
                    </Col>
                    </Row>
                </div>

            </CardBody>
        </Card>
    );
};

const PatientsListPlaceholder = () => {
    return (
        <div>
            <PatientListItemPlaceholder />
            <hr />
            <PatientListItemPlaceholder />
            <hr />
            <PatientListItemPlaceholder />
            <hr />
        </div>
    );
};

const PatientListItemPlaceholder = () => {
    return (
        <div className="d-flex align-items-center placeholder-glow px-2">
            <div className="flex-shrink-0 align-self-center me-2">

                <div className="user-img">
                    <span
                        className="rounded-circle avatar-xs placeholder bg-primary"
                    />
                </div>
            </div>

            <div className="flex-grow-1">
                <span className="placeholder col-10"></span>{" "}
            </div>
        </div>
    )
}

export {
    MessageDetailPlaceholder,
    AnalysisDetailPlaceholder,
    PatientsListPlaceholder
}