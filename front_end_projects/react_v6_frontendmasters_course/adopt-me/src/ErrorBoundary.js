// mostly code from reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

// ErrorBoundry is a high-level component that means that it doens't render anything
// but instead, add functionality for the componenets it contains.

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true, redirect: false };
  }

  componentDidCatch(error, info) {
    // This is where we'll log an error to our error logger (e.g. Elastic Search etc) and metrics.
    // examples: Sentry, Azure Monitor, New Relix, TrackJS etc.
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
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
