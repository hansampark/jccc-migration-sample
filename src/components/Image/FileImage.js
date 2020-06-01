import React, { Component } from 'react';
import { Img, Placeholder } from './index';

export default class Preview extends Component {
  static defaultProps = {
    width: 'auto',
    height: 'auto',
    resizeMode: 'cover',
    borderRadius: 'inherit',
  };

  state = {
    dataUrl: null,
  };

  render() {
    const { file, ...rest } = this.props;
    const { dataUrl } = this.state;

    return dataUrl ? (
      <Img src={dataUrl} {...rest} />
    ) : (
      <Placeholder {...rest} />
    );
  }

  componentDidMount() {
    const { file } = this.props;

    const reader = new FileReader();

    reader.onload = (e) => {
      this.setState({
        dataUrl: e.target.result,
      });
    };

    reader.readAsDataURL(file);
  }

  // componentWillUpdate(nextProps) {
  //   if (this.props.file !== nextProps.file) {
  //     const reader = new FileReader();

  //     reader.onload = (e: Event): void => {
  //       this.setState({
  //         dataUrl: e.target.result
  //       });
  //     };

  //     reader.readAsDataURL(nextProps.file);
  //   }
  // }
}
