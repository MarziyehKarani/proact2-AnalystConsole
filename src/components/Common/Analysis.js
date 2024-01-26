
import React from "react";
import { Col, Row, Card, CardBody, Badge } from "reactstrap";
import { map } from "lodash";

const AnalysisDetail = ({ props, analysisDetail }) => {
    return (
        <Card>
            <CardBody>
                <AnalysisHeader analysisDetail={analysisDetail} />

                { analysisDetail.resultsVisible && <div className="mt-2">
                    {map(analysisDetail.resultsGroupByCategories, group => (
                        <AnalysisCategoryGroup key={group.categoryId} categoryGroup={group} />
                    ))}
                </div> }

            </CardBody>
        </Card>
    );
};

const AnalysisHeader = ({ analysisDetail }) => {
    return (
        <Row>
            <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                    <img
                        className="rounded-circle avatar-sm"
                        src={analysisDetail.author.avatarUrl}
                        alt="Medical team icon"
                    />
                </div>
                <div className="flex-grow-1">
                    <h5 className="font-size-14 my-1">
                        {analysisDetail.author.name}
                    </h5>
                    <small className="text-muted">
                        {new Date(analysisDetail.creationDate).toLocaleString()}
                    </small>
                </div>
            </div>
        </Row>
    );
};

const AnalysisCategoryGroup = ({ categoryGroup }) => {
    return (
        <Row><Col>
            <h5>{categoryGroup.categoryName}</h5>
            {map(categoryGroup.results, result => (
                <Badge
                key={result.labelId}
                    style={{ fontSize: 12 }}
                    className="p-2 m-1 text-lg-center rounded-pill bg-soft-danger">{result.resultLabel}</Badge>
            ))}
            <hr />
        </Col>
        </Row>
    );
};

export {
    AnalysisDetail,
    AnalysisHeader,
    AnalysisCategoryGroup
}