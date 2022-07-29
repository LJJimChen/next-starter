import React, { Component, ErrorInfo, ReactNode } from 'react';

type Props = { children: ReactNode };

type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo });
    }
    componentDidMount() {
        window.addEventListener('error', this.handleError);
        window.addEventListener('unhandledrejection', this.handleRejection);
    }
    componentWillUnmount() {
        window.removeEventListener('error', this.handleError);
        window.removeEventListener('unhandledrejection', this.handleRejection);
    }
    handleError = (errEvent: ErrorEvent) => {
        console.log(errEvent);
        this.setState({ hasError: true });
    };
    handleRejection = (rejectEvent: PromiseRejectionEvent) => {
        console.log(rejectEvent);
        this.setState({ hasError: true });
    };
    render() {
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <button
                        type='button'
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            );
        }

        // Return children components in case of no error
        return this.props.children;
    }
}
