import { Component } from "react";
import { withRouter } from "react-router-dom";

class Details extends Component {
  state = { loading: true };

  // componentDidMount is called only once by React, after the component renders for the 1st time.
  // This is usually where you'll do data fetching and processing before displaying it.
  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, description, name } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

// withRouter is required for this componenet to receive the path-related variable
// (in this instance, the id)
export default withRouter(Details);
