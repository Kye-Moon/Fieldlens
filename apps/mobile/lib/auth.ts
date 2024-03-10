import React from "react";
import {makeRedirectUri, useAuthRequest} from "expo-auth-session";
import {SetterOrUpdater, useSetRecoilState} from "recoil";
import {dropboxAccessTokenState, dropboxRefreshTokenState, dropboxUploadDefaultState} from "../state/atoms";

export const dropBoxAuthService = (() => {

    const discovery = {
        authorizationEndpoint: "https://www.dropbox.com/oauth2/authorize",
    };

    function useDropboxAuth() {
        const [request, response, promptAsync] = useDropboxAuthRequest();
        const setDropBoxAccessToken = useSetRecoilState(dropboxAccessTokenState);
        const setDropBoxRefreshToken = useSetRecoilState(dropboxRefreshTokenState);
        const setDropBoxUploadDefault = useSetRecoilState(dropboxUploadDefaultState);
        React.useEffect(() => {
            if (response?.type === "success") {
                handleAuthSuccess(response.params.code, response.params.state, request?.codeVerifier, setDropBoxAccessToken, setDropBoxRefreshToken);
                setDropBoxUploadDefault(true)
            }
        }, [response, request?.codeVerifier, setDropBoxAccessToken, setDropBoxRefreshToken]);

        return [request, response, promptAsync];
    }

    function useDropboxAuthRequest() {
        return useAuthRequest(
            {
                clientId: "xpzyrjngkoapbm1",
                usePKCE: true,
                extraParams: {
                    token_access_type: "offline",
                },
                redirectUri: generateRedirectUri(),
            },
            discovery
        );
    }

    async function handleAuthSuccess(code: string, state: string, codeVerifier: string | undefined, setAccessToken: SetterOrUpdater<string>, setRefreshToken: SetterOrUpdater<string>) {
        if (!codeVerifier) return
        const token = await fetchToken(code, codeVerifier);
        if (token.access_token && token.refresh_token) {
            setAccessToken(token.access_token);
            setRefreshToken(token.refresh_token);
        }
    }

    async function fetchToken(code: string, codeVerifier: string) {
        const url = `https://api.dropboxapi.com/oauth2/token?grant_type=authorization_code&code=${code}&client_id=xpzyrjngkoapbm1&client_secret=bcsu6ia8fiq6t3s&code_verifier=${codeVerifier}&redirect_uri=com.synex.dropbox://redirect`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        return await response.json();
    }


    function generateRedirectUri() {
        return makeRedirectUri({
            preferLocalhost: true,
            path: "redirect",
            native: "com.synex.dropbox://redirect",
        });
    }


    return {
        useDropboxAuth,
    }
})();