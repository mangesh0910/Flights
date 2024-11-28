import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: '',
        };
    }

    // This method is called when a child component throws an error
    static getDerivedStateFromError(error) {
        // Return a state update to show the fallback UI
        return {
            hasError: true,
            errorMessage: error.message || 'An unknown error occurred',
        };
    }

    // This method is called to log error information (e.g., to an error logging service)
    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error);
        console.error('Error info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI for API failure or other errors
            return (
                <div>
                    <h1>API Request Failed</h1>
                    <p>{this.state.errorMessage}</p>
                </div>
            );
        }

        // If no error, render the children components as normal
        return this.props.children;
    }
}

export default ErrorBoundary;
