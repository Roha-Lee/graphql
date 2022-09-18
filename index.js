import { ApolloServer, gql } from 'apollo-server';
const tweets = [
    {
        id: 1,
        text: "1st tweet."
    },
    {
        id: 1,
        text: "2nd tweet."
    },
];

const typeDefs = gql`
    type User {
        id: ID!
        userName: String!
        firstName: String!
        lastName: String!
    }
    type Tweet {
        id: ID!
        text: String!
        author: User!
    }
    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }
    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
})