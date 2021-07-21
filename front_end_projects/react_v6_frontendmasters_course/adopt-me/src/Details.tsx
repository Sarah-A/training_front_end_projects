import { Component, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";
import { Animal, PetAPIResponse } from "./APIResponseTypes";

// Note - since Details is used with Route and it receives an id (see in App.js),
// we need to add the following type definition to it:
class Details extends Component<RouteComponentProps<{ id: string }>> {
  state = {
    loading: true,
    animal: "" as Animal,
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
    showModal: false,
  };

  // componentDidMount is called only once by React, after the component renders for the 1st time.
  // This is usually where you'll do data fetching and processing before displaying it.
  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = (await res.json()) as PetAPIResponse;
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  // We're using a simple window.location redirect since we're heading off site.
  // This is bad accessibility so you should be extra cautious when doing this!
  adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    // To test that our error handling works as expected:
    // uncomment the next line and restart the server:
    // throw new Error("This is a new error!!");

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

// withRouter is required for this componenet to receive the path-related variable
// (in this instance, the id)
const DetailsWithRouter = withRouter(Details);

const DetailsErrorBoundary: FunctionComponent =
  function DetailsErrorBoundary() {
    return (
      <ErrorBoundary>
        <DetailsWithRouter />
      </ErrorBoundary>
    );
  };

export default DetailsErrorBoundary;
