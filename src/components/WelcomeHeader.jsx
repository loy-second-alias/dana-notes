import React from 'react';
import './WelcomeHeader.css';

const WelcomeHeader = () => {
    return (
        <div className="welcome-header">
            <h1 className="welcome-message">
                <span className="orange-gradient-text">Welcome back, </span>
                <span className="dana-text-wrapper">
                    <span className="dana-text">Dana</span>
                </span>
            </h1>
        </div>
    );
};

export default WelcomeHeader;
