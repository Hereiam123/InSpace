const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");
const axios = require("axios");

//Launch type
const LaunchType = new GraphQLObjectType({
  name: "Launch",
  fields: () => ({
    id: {type: GraphQLString},
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_utc: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    rocket: { type: GraphQLString },
    rocketData: { type: RocketType },
  }),
});

//Rocket Type
const RocketType = new GraphQLObjectType({
  name: "RocketData",
  fields: () => ({
    name: { type: GraphQLString },
    type: { type: GraphQLString },
  }),
});

//Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v4/launches")
          .then((res) => {
            return res.data;
          });
      },
    },
    launch: {
      type: LaunchType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        console.log(args);
        return axios
          .get(`https://api.spacexdata.com/v4/launches/${args.id}`)
          .then((res) => {
            return res.data;
          });
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v4/rockets")
          .then((res) => {
            return res.data;
          });
      },
    },
    rocketData: {
      type: RocketType,
      args: {
        rocket: {
          type: GraphQLString,
        },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v4/rockets/${args.rocket}`)
          .then((res) => {
            console.log(res.data);
            return res.data;
          });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
