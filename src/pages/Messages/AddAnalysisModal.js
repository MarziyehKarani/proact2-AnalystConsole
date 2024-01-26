import React from "react";
import { useState } from "react";
import { Modal, Row, Col } from "reactstrap";
import { map } from "lodash";
import getLexiconApi from "../../infrastructure/services/network/apiCalls/getLexiconApi";
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";
import { aquireAccessToken } from "../../infrastructure/azure/aquireAccessToken";
import { apiErrorToast } from "../../components/Common/apiErrorToast";
import { SingleSelect, MultipleSelect } from "../../components/Common/Select";
import { ErrorMessageAlert } from "../../components/Common/MessageAlert";
import postMessageAnalysisApi from "../../infrastructure/services/network/apiCalls/postMessageAnalysisApi";
import { success } from "toastr";

function GroupLexiconCategoryLabels(labels) {

    var result = labels.reduce(function (r, a) {
        r[a.groupName] = r[a.groupName] || [];
        r[a.groupName].push(a);
        return r;
    }, Object.create(null));

    var categories = [];

    Object.entries(result).map(item => {
        var category = {};
        category.label = item[0];
        category.options = [];

        item[1].forEach(labelItem => {
            var optionItem = {};
            optionItem.label = labelItem.label;
            optionItem.value = labelItem.id;
            category.options.push(optionItem);
        });

        categories.push(category);
    })

    return categories;
}

export const AddAnalysisModal = ({ props, isOpen, closeCallback, addAnalysisSuccessCallback }) => {

    const messageId = props.match.params.id;
    const studyId = props.match.params.studyId;
    const [lexicon, setLexicon] = useState(null);
    const [selectedLabelsMap, setSelectedLabelsMap] = useState(new Map());
    const [isValidationErrorVisible, setValidationErrorVisible] = useState(false);

    aquireAccessToken(loadLexicon);

    function loadLexicon() {
        getLexiconApi(studyId, onLoadLexiconSuccess, apiErrorToast);
    }

    function onLoadLexiconSuccess(result) {
        setLexicon(result);
    }

    function onSingleSelectCallback(key, selectedLabel) {
        selectedLabelsMap.set(key, selectedLabel);
        setSelectedLabelsMap(selectedLabelsMap);
        setValidationErrorVisible(false);
    }

    function OnMultipleSelectCallBack(key, selectedLabels) {
        selectedLabelsMap.set(key, selectedLabels);
        setSelectedLabelsMap(selectedLabelsMap);
        setValidationErrorVisible(false);
    }

    function prepareRequestBody() {
        const selectedValuesList = [];
        for (const item of selectedLabelsMap.values()) {

            if (Array.isArray(item)) {
                for (const arrayItem of item) {
                    selectedValuesList.push({ labelId: arrayItem.value })
                }
            }
            else {
                selectedValuesList.push({ labelId: item.value })
            }
        }

        const requestBody = {
            messageId: messageId,
            analysisResults: selectedValuesList
        }
        return requestBody;
    }

    function addNewAnalysis() {
        const request = prepareRequestBody();
        console.log(request);
        ValidateRequest(request);
        if (!isValidationErrorVisible) {
            postMessageAnalysisApi(request, addAnalysisSuccessHandler, apiErrorToast);
        }
    }

    function addAnalysisSuccessHandler(resultData) {
        if (addAnalysisSuccessCallback != null) {
            closeModalHandler();
            addAnalysisSuccessCallback(resultData);
        }
    }

    function ValidateRequest(request) {
        setValidationErrorVisible(request.analysisResults.length == 0);
    }

    function closeModalHandler() {
        setSelectedLabelsMap(new Map());
        closeCallback();
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={() => {
                //tog_standard()
            }}
        >
            <div className="modal-header">
                <h5 className="modal-title mt-0" id="myModalLabel">
                    {props.t("add_analysis")}
                </h5>
                <button
                    type="button"
                    onClick={closeModalHandler}
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <form>
                    <Row>
                        <Col>

                            <ErrorMessageAlert
                                isVisible={isValidationErrorVisible}
                                message={props.t("new_analysis_validation_error")} />

                            {
                                lexicon == null ?
                                    <LoadingSpinner />
                                    :
                                    <Row>
                                        {map(lexicon.categories, category => (
                                            <div key={category.id}>
                                                {category.multipleSelection ? (
                                                    <MultipleSelect
                                                        title={category.name}
                                                        selectKey={category.id}
                                                        options={GroupLexiconCategoryLabels(category.labels)}
                                                        onSelectCallback={OnMultipleSelectCallBack}
                                                    />
                                                ) : (
                                                    <SingleSelect
                                                        title={category.name}
                                                        selectKey={category.id}
                                                        options={GroupLexiconCategoryLabels(category.labels)}
                                                        onSelectCallback={onSingleSelectCallback} />
                                                )}
                                            </div>

                                        ))}
                                    </Row>
                            }
                        </Col>
                    </Row>
                </form>
            </div>

            <div className="modal-footer">
                <button
                    type="button"
                    onClick={closeModalHandler}
                    className="btn btn-secondary waves-effect"
                    data-dismiss="modal"
                >
                    {props.t("close")}
                </button>
                <button
                    type="button"
                    onClick={() => {
                        addNewAnalysis();
                    }}
                    className="btn btn-primary waves-effect waves-light"
                >
                    {props.t("save_analysis")}
                </button>
            </div>
        </Modal>
    );
}