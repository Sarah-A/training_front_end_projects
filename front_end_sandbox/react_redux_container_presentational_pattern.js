//------------------------------------------------
// Redux Code:
//------------------------------------------------
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};



const store = Redux.createStore(messageReducer);

//------------------------------------------------------------------------------------------------
// React Code:
//------------------------------------------------------------------------------------------------
// Presentational - This term generally refers to React components that ARE NOT DIRECTLY connected 
//  to Redux. They are simply responsible for the presentation of UI and do this as a function of 
//  the props they receive. 
//------------------------------------------------------------------------------------------------
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.state.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};

//------------------------------------------------------------------------------------------------
// react-redux code. Provider - makes the Redux store available to any nested components that 
//  have been wrapped in the connect() function.
//  Since any React component in a React Redux app can be connected, most applications will render 
//  a <Provider> at the top level, with the entire app’s component tree inside of it.
//  Normally, you can’t use a connected component unless it is nested inside of a <Provider>.
//------------------------------------------------------------------------------------------------

const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Presentational />
            </Provider>
            );
    }
};

//-----------------------------------------------------------------------------------------------------
// Connect the state (redux store) to the React properties (props) so that every time the store 
// changes, the React properties are notified and can access the new values through props
// Behind the scenes, React Redux uses the store.subscribe() method to implement mapStateToProps().
// state - the entire Redux store state - the same one returned from store.getState();
//-----------------------------------------------------------------------------------------------------
function mapStateToProps(state) {
    return {
        messages: state
    };
}

//-----------------------------------------------------------------------------------------------------
// The mapDispatchToProps() function is used to provide specific action creators to your React components 
//      so they can dispatch actions against the Redux store
//-----------------------------------------------------------------------------------------------------
function mapDispatchToProps(dispatch) {
    return {
      submitNewMessage: function(message) {
        dispatch(addMessage(message));
      }
    }
  }

//-----------------------------------------------------------------------------------------------------
// connect your state to props and your dispatch functions:
//-----------------------------------------------------------------------------------------------------
const ConnectedComponent = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Presentational);