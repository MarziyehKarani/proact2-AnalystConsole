import React from "react";
import { Button } from "reactstrap";
import { useHistory, Link } from "react-router-dom";

export const BackButton = ({ title, linkTo }) => {
    return (
        <Link to={linkTo}>
            <Button
                color="secondary"
                className="btn-sm"
                outline
            >
                <i className="fas fa-chevron-left"></i> {title}
            </Button>
        </Link>
    );
}