import React from "react";
import { connect } from "react-redux";
import { Appbar } from "react-native-paper";
import { getUser } from "../store/actions";

class Header extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { user } = this.props;
    return (
      <Appbar.Header>
        <Appbar.Content title={user.name} subtitle={user.email} />
      </Appbar.Header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getUser())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
