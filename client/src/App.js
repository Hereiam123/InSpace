import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import logo from "./space_x.png";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>
            <img
              src={logo}
              alt="SpaceX"
              style={{ width: 300, display: "block", margin: "auto" }}
            />
          </h1>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
