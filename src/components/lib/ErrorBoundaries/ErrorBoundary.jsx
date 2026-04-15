import React from "react";
import { Button } from "antd";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service like Sentry
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div style={{ padding: "40px", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <h2>Oops! Something went wrong.</h2>
          <p style={{ color: "#666", marginBottom: "20px", maxWidth: "500px" }}>
            We're having trouble displaying this page. Our technical team has been notified.
            If the problem persists, please try refreshing the page or checking your internet connection.
          </p>
          <Button 
            type="primary" 
            style={{ backgroundColor: "var(--orrsiPrimary, #ff4d4f)", borderColor: "var(--orrsiPrimary, #ff4d4f)" }}
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
