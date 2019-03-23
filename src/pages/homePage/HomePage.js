import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePage.scss";
import ChooseColorPanel from "../../components/choose-color-pannel/Choose-color-panel";
import DisplayLayeredImage from "../../components/display-layered-image/Display-layered-image";

const colorOptions = [
  {
    id: 1,
    name: "default",
    layer: 1,
    code: "#D9A884",
    src: ""
  },
  {
    id: 2,
    name: "maroon",
    layer: 1,
    code: "#9F4949",
    src: "assets/images/door/door_red.png"
  },
  {
    id: 3,
    name: "oliev green",
    layer: 1,
    code: "#9F8E49",
    src: "assets/images/door/door_green.png"
  },
  {
    id: 4,
    name: "violet",
    layer: 1,
    code: "#604999",
    src: "assets/images/door/door_blue.png"
  }
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagesObj: [
        {
          id: 0,
          layer: 0,
          name: "base_door",
          src: "assets/images/door/left_top_view_door_base.png"
        }
      ],
      selectedDoorColor: []
    };
  }

  componentDidMount() {
    const defaultDoorColor = colorOptions[0];
    this.setState({
      selectedDoorColor: defaultDoorColor
    });
    this.applyDoorColor(defaultDoorColor);
  }

  applyDoorColor = colorOption => {
    let prevImages = this.state.imagesObj;
    prevImages = prevImages.filter(item => item.layer !== colorOption.layer);

    this.setState({
      selectedDoorColor: JSON.parse(JSON.stringify(colorOption)),
      imagesObj:
        colorOption.src !== "" ? [colorOption, ...prevImages] : [...prevImages]
    });
  };

  render() {
    const { imagesObj, selectedDoorColor } = this.state;
    return (
      <div className="container-fluid mx-0 p-0 home-page-container">
        <div className="row mx-0 p-5 pt-5 pb-5">
          <div className="col-md-4 p-0">
            <ChooseColorPanel
              keyVal="door_colors"
              title="Choose Door Color :"
              colorOptions={colorOptions}
              selectedColor={selectedDoorColor}
              onColorSelected={colorOption => this.applyDoorColor(colorOption)}
            />
          </div>
          <div className="col-md-8 p-0">
            <DisplayLayeredImage
              layeredImages={imagesObj}
              keyVal={"base_door_image"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
