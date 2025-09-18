import React from "react";
import { useHistory } from "react-router-dom";
import "./Error404Page.css";

const Error404Page = () => {
    const history = useHistory();

    const handleBackToHomepage = () => {
        history.push("/");
    };

    const handleContactSupport = () => {
        history.push("/contact-us");
    };

    return (
        <div className="error404-container">
            {/* Ticket Illustration */}
            <div className="ticket-graphic">
                <div className="ticket-stamp">404</div>
                <div className="ticket-shape">
                    <span className="bus-icon">🚌</span>
                    <h2>Ticket Not Found</h2>
                    <p>
                        Looks like you missed this bus. The page you’re looking for doesn’t
                        exist or has expired. Let’s get you back on the right route.
                    </p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="ticket-actions">
                <button onClick={handleBackToHomepage} className="btn-primary">
                    🎟️ Book New Ticket
                </button>
                <button onClick={handleContactSupport} className="btn-secondary">
                    📞 Contact Support
                </button>
            </div>
        </div>
    );
};

export default Error404Page;
