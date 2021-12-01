import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
  query LaunchQuery($id: String!) {
    launch(id: $id) {
      flight_number
      name
      success
      date_utc
      rocketData {
        name
        type
      }
    }
  }
`;

export class Launch extends Component {
  render() {
    let { id } = this.props.match.params;
    //id = parseInt(id);
    return (
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            const {
              name,
              flight_number,
              date_utc,
              success,
              rocketData: { name: rocketName, type },
            } = data.launch;
            return (
              <div>
                <h1 className="display-4 my-3">
                  <span className="text-dark">Mission: {name}</span>
                </h1>
                <h4 className="mb-3">Launch Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Flight Number: {flight_number}
                  </li>
                  <Moment className="list-group-item" format="YYYY-MM-DD HH:mm">
                    Launch Year: {date_utc}
                  </Moment>
                  <li className="list-group-item">
                    Launch Successful:{" "}
                    <span
                      className={classNames({
                        "text-success": success,
                        "text-danger": !success,
                      })}
                    >
                      {success ? "Yes" : "No or Future Launch"}
                    </span>
                  </li>
                </ul>
                <h4 className="my-3">Rocket Details</h4>
                <ul className="list-group">
                  {/*<li className="list-group-item">
                    Flight Number: {flight_number}
                    </li>*/}
                  <li className="list-group-item">Rocket Name: {rocketName}</li>
                  <li className="list-group-item">
                    Rocket Type: {type}
                  </li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Go Back
                </Link>
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default Launch;
