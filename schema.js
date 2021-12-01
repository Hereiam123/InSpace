const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require("graphql");
const axios = require("axios");

//Launch type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_utc: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    rocket: { type: RocketType }
  })
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios.get("https://api.spacexdata.com/v4/launches").then(res => {
		      return res.data;
      	});
    	}
	},
    launch: {
      type: LaunchType,
      args: {
        flight_number: {
          type: GraphQLInt
        }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/launches/${args.flight_number}`)
          .then(res => {
            return res.data;
          });
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios.get("https://api.spacexdata.com/v4/rockets").then(res => {
          return res.data;
        });
      }
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/rockets/${args.rocket_id}`)
          .then(res => {
            return res.data;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
