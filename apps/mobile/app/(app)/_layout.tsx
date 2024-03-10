import {Stack, useRouter} from 'expo-router';
import {useRecoilValueLoadable} from "recoil";
import {apiUrlState} from "../../state/atoms";
import React, {useEffect, useState} from 'react';
import {PhotoOverlayProvider} from "../../context/PhotoOverlay";
import {ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache, useMutation} from "@apollo/client";
import {useAuth, useOrganization, useUser} from "@clerk/clerk-expo";
import {onError} from "@apollo/client/link/error";
import {setContext} from "@apollo/client/link/context";
import {Image, Spinner, Text, View} from "@gluestack-ui/themed";
import {graphql} from "gql-types";
import {CustomOrganizationSwitcher} from "../../components/CustomOrgSwitcher";
import {StyleSheet} from "react-native";
import {GlobalFallback} from "../../components/Error/GlobalErrorBoundary";
import ErrorBoundary from "react-native-error-boundary";

export const initialiseUserMutation = graphql(`
    mutation InitialiseUser {
        initialiseUser {
            id
        }
    }
`)

export default function RootLayout() {
    const {isLoaded, isSignedIn, getToken, signOut} = useAuth();
    const [client, setClient] = useState<ApolloClient<any> | null>(null);
    const apiUrl = useRecoilValueLoadable(apiUrlState)
    const router = useRouter();

    useEffect(() => {
        const httpLink = new HttpLink({
            uri: apiUrl.getValue() ? `${apiUrl.getValue()}` : "",
            credentials: 'include',
        });

        const authMiddleware = setContext(async (_, {headers}) => {
            // Call getToken before each request to ensure the latest token is used
            const token = await getToken();
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : "",
                    "Access-Control-Allow-Origin": "*",
                },
            };
        });

        const errorLink = onError(({graphQLErrors, networkError, forward, operation}) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({message}) => {
                    if (message === "Unauthorized") {
                        signOut().then(() => {
                            // Optionally, redirect to sign-in page or perform other cleanup
                            router.push('/sign-in');
                        });
                        return;
                    }
                });
            }
            if (networkError) console.log(`[Network error]: ${networkError}`);
            return forward(operation);
        });

        // Initialize Apollo Client with the middleware that fetches the token dynamically
        const client = new ApolloClient({
            link: from([authMiddleware, errorLink, httpLink]),
            cache: new InMemoryCache(),
        });

        setClient(client);
    }, [apiUrl, getToken, signOut]);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
        }
    }, [isLoaded, isSignedIn, router]);

    if (!isLoaded || !client) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image alt={'logo'} source={require('../../assets/images/icon.png')} style={{width: 100, height: 100}}/>
                <Spinner/>
            </View>
        );
    }

    return (
        <ErrorBoundary FallbackComponent={GlobalFallback}>
            <ApolloProvider client={client}>
                <RootLayoutNav/>
            </ApolloProvider>
        </ErrorBoundary>

    )
}

function RootLayoutNav() {
    const [initialiseUser] = useMutation(initialiseUserMutation)
    const {user} = useUser();
    const {organization} = useOrganization();
    const {isLoaded, isSignedIn} = useAuth();

    useEffect(() => {
        const initUser = async () => {
            await initialiseUser()
            await user?.reload()
        }
        initUser()
    }, [user?.publicMetadata.fieldLenz_initialised, isSignedIn])

    if (!user?.publicMetadata.fieldLenz_initialised) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Image alt={'logo'} source={require('../../assets/images/icon.png')} style={{width: 100, height: 100}}/>
                <Spinner/>
            </View>
        )
    }

    if (!organization?.publicMetadata.fieldLenz_access) {
        return (
            <View style={styles.content}>
                <Image
                    alt={'logo'}
                    source={require('../../assets/images/icon.png')}
                    style={styles.logo}
                />
                <Text style={styles.text}>
                    Your current organization does not have access to FieldLenz
                </Text>
                <CustomOrganizationSwitcher/>
            </View>
        );
    }

    return (
        <PhotoOverlayProvider>
            <Stack screenOptions={{headerShown: false}}>
            </Stack>
        </PhotoOverlayProvider>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 26,
        paddingTop: 100,
        gap: 16, // Note: gap property might not work as expected in React Native. Consider spacing manually or using a library that supports gap.
    },
    logo: {
        width: 100,
        height: 100,
    },
    text: {
        textAlign: 'center',
        marginVertical: 16, // Adjust as needed for spacing
    },
});