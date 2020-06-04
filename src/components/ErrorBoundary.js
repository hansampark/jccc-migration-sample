/**
 * ErrorBoundary
 * @flow
 */
import React from 'react';
import { ErrorMessage } from './Errors';

export default class ErrorBoundary extends React.Component {
  state = {
    error: null,
    info: null,
  };

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('[Component Error]', error, info);
    // Display fallback UI

    this.setState({ error, info });
  }

  render() {
    const { error } = this.state;

    if (error) {
      // You can render any custom fallback UI
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    return this.props.children;
  }
}
