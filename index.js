import { ApolloServer, gql } from 'apollo-server';
let tweets = [
    {
        id: "1",
        text: "1st tweet."
    },
    {
        id: "2",
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
        },
        tweet(_, { id }) {
            const tweet = tweets.find(tweet.id === id);
            return tweet ? tweet : null;
        },
    },
    Mutation: {
        postTweet(_, { text, userId }) {
            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, { id }) {
            const tweet = tweets.find(tweet => tweet.id === id);
            if (!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id);
            return true;
        },
    },
    User: {
        
    },
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
})