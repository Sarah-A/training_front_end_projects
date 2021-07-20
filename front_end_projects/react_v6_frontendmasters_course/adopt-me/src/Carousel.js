import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // defaultProps defines what's the fallback if there are no images returned.
  // It must be static.
  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    // state is mutable. It's my state that only I can change within this component.
    const { active } = this.state;

    // I get props from my parent (calling Component). This is immutable to me and can
    // only be changed by my parent, not by me.
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // the image below should be a button. But in the course,
            // in order to simplify and save time, we've disabeld the eslint
            // warning instead:
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
