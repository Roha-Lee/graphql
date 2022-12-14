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
let users = [
    {
        id: "1", 
        firstName: "roha", 
        lastName: "Lee"
    },

];

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        fullName: String!
    }
    type Tweet {
        id: ID!
        text: String!
        author: User!
    }
    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
        allUsers: [User!]!
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
        allUsers() {
            return users;
        }
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
        fullName({ firstName, lastName}) {
            return `${firstName} ${lastName}`;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
})