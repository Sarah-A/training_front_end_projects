// mostly code from reactjs.org/docs/error-boundaries.html
import { Component, ErrorInfo, ReactNode } from "react";
import { Link, Redirect } from "react-router-dom";

// ErrorBoundry is a high-level component that means that it doens't render anything
// but instead, add functionality for the componenets it contains.

interface ErrorStateType {
  hasError: boolean;
  redirect: boolean;
}

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError(): ErrorStateType {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // This is where we'll log an error to our error logger (e.g. Elastic Search etc) and metrics.
    // examples: Sentry, Azure Monitor, New Relix, TrackJS etc.
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate(): void {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render(): ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h2>
      );
    }

    // This will return the content (children) of the <ErrorBoundry> tag.
    // See Details.js for this tag's definition.
    return this.props.children;
  }
}

export default ErrorBoundary;
