import {
    ApolloClient,
    InMemoryCache
} from "@apollo/client";

export const client = new ApolloClient({
    // uri: 'https://48p1r2roz4.sse.codesandbox.io',
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache()
});
