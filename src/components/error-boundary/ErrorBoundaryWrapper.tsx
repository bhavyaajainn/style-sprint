import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FallbackPage from './FallbackPage';

interface ErrorBoundaryProps {
    children: ReactNode; 
}

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryProps> = ({ children}) => {
    return (
        <ErrorBoundary
            FallbackComponent={FallbackPage}
        >
            {children}
        </ErrorBoundary>
    );
};

export default ErrorBoundaryWrapper;
