import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import { getProductsDetail } from "../../Publics/Redux/Action/products.js";
import {
  getWishlistDetail,
  getWishlist
} from "../../Publics/Redux/Action/wishlist.js";

import Detail from "../detail/Detail";

class detail extends Component {
  constructor() {
    super();
    this.state = {
      dataDetail: [],
      dataWishlist: [],
      param: ""
    };
  }

  componentDidMount = async () => {
    let param = this.props.match.params.name;
    this.setState({
      param: param
    });

    await this.props.dispatch(getProductsDetail(param)).then(res => {
      this.setState({
        dataDetail: this.props.detail
      });
    });

    await this.props.dispatch(getWishlistDetail(8)).then(res => {
      this.setState({
        dataWishlist: this.props.wishlist
      });
    });
  };

  render() {
    return (
      <Fragment>
        <Detail
          detailProducts={this.state.dataDetail}
          wishlist={this.state.dataWishlist}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    detail: state.products.dataProductsDetail,
    wishlist: state.wishlist.addedWishlist
  };
};

export default connect(mapStateToProps)(detail);
