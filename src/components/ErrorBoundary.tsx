import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-red-100">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <div className="bg-red-50 p-4 rounded-lg overflow-auto mb-4">
              <p className="font-mono text-sm text-red-800 font-bold">{this.state.error?.toString()}</p>
            </div>
            <details className="bg-gray-50 p-4 rounded-lg overflow-auto">
              <summary className="font-bold text-gray-700 cursor-pointer mb-2">Component Stack Trace</summary>
              <pre className="font-mono text-xs text-gray-600 whitespace-pre-wrap">
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
