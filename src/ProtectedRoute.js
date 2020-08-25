import React, { Component } from "react";
import { connect } from "react-redux";

export const Authenticate = (ProtectedComponent) => {
  class ProtectedRoute extends Component {
    componentDidMount() {
      if (!this.props.user.isAuthenticated) {
        window.location.href = "/login";
      }
    }

    componentDidUpdate(nextProps) {
      if (!nextProps.user.isAuthenticated) {
        window.location.href = "/login";
      }
    }
    render() {
      return <ProtectedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

  return connect(mapStateToProps)(ProtectedRoute);
};
