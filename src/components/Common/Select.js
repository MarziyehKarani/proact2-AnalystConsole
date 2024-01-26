import React from "react";
import { Label } from "reactstrap";
import Select from "react-select";
import { useState,useEffect } from "react";

const SingleSelect = ({ title, options, selectKey, onSelectCallback }) => {
    const [selectedValue, setSelectedValue] = useState(null)
    useEffect(() => {
        if (selectedValue != null && onSelectCallback != null) {
            onSelectCallback(selectKey, selectedValue);
        }

    }, [selectedValue])

    return (
        <div className="mb-3">
            <Label>{title}</Label>
            <Select
                value={selectedValue}
                onChange={setSelectedValue}
                options={options}
                classNamePrefix="select2-selection"
            />
        </div>
    );
};

const MultipleSelect = ({ title, options, selectKey, onSelectCallback }) => {
    const [selectedValues, setSelectedValues] = useState(null)
    useEffect(() => {
        if (selectedValues != null && onSelectCallback != null) {
            onSelectCallback(selectKey, selectedValues);
        }
    }, [selectedValues])

    return (
        <div className="mb-3">
            <Label>{title}</Label>
            <Select
                value={selectedValues}
                isMulti={true}
                onChange={setSelectedValues}
                options={options}
                classNamePrefix="select2-selection"
            />
        </div>
    );
};


export {
    SingleSelect,
    MultipleSelect
}