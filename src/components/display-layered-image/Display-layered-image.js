import React, { Component } from "react";
import "./Display-layered-image.scss";

class DisplayLayeredImage extends Component {
  static defaultProps = {
    title: "",
    colorOptions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      layeredImages: this.props.layeredImages
    };
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.layeredImages !== this.state.checked) {
    this.setState({
      layeredImages: nextProps.layeredImages
    });
    // }
  }

  // onColorSelected = cOption => {
  //   this.props.onColorSelected(cOption);
  // };

  render() {
    const { layeredImages, keyVal } = this.state;

    const loadedLayeredImages = layeredImages
      .sort((a, b) => {
        return a.layer < b.layer;
      })
      .map(imageOption => {
        console.log(
          "layeredImages optoins --",
          process.env.PUBLIC_URL + imageOption.src
        );
        return (
          // <div
          //   key={imageOption.id + "__" + imageOption.name}
          //   className="col p-0"
          // >
          <img
            key={keyVal + "__" + imageOption.id}
            src={`${process.env.PUBLIC_URL + imageOption.src}`}
            alt="product"
            className="layered-image"
            style={{ zIndex: 400 + imageOption.layer }}
          />
          // </div>
        );
      });
    return (
      <div key={"baseImage__" + keyVal} className="col p-0">
        <div className="row mx-0 p-0">{loadedLayeredImages}</div>
      </div>
    );
  }
}

export default DisplayLayeredImage;
