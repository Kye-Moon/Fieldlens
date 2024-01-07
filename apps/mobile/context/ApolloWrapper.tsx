import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache} from "@apollo/client";
import React from "react";
import {useRecoilStateLoadable, useRecoilValueLoadable} from "recoil";
import {accessTokenState, apiUrlState} from "../state/atoms";
import {onError} from "@apollo/client/link/error";

export function ApolloWrapper({children}: React.PropsWithChildren) {
    const [authToken, setAuthToken] = useRecoilStateLoadable(accessTokenState)
    const apiUrl = useRecoilValueLoadable(apiUrlState)

    const errorLink = onError(({graphQLErrors, networkError}) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({message}) => {
                if (message === "Unauthorized") {
                    setAuthToken("")
                }
            })
        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const httpLink = new HttpLink({
        uri: apiUrl.getValue() ? `${apiUrl.getValue()}` : "",
        headers: {
            authorization: authToken.getValue() ? `Bearer ${authToken.getValue()}` : "",
        },
        credentials: "include",
    })

    const client = new ApolloClient({
        link: from([errorLink, httpLink]),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
