import { useToast } from "@gluestack-ui/themed";
import { showErrorToast } from "../lib/toasts";
import { useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
import {
  dropboxAccessTokenState,
  dropBoxFolderPathState,
  dropboxRefreshTokenState,
} from "../state/atoms";

const useDropboxUpload = () => {
  const [accessToken, setAccessToken] = useRecoilStateLoadable(
    dropboxAccessTokenState,
  );
  const [refreshToken, setRefreshToken] = useRecoilStateLoadable(
    dropboxRefreshTokenState,
  );
  const dropBoxFolderPath = useRecoilValueLoadable(dropBoxFolderPathState);
  const toast = useToast();
  const refreshAccessToken = async () => {
    const url = "https://api.dropboxapi.com/oauth2/token";
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken.getValue(),
      client_id: "xpzyrjngkoapbm1",
      client_secret: "bcsu6ia8fiq6t3s",
    });

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = await response.json();
    if (response.ok) {
      setAccessToken(data.access_token);
    }
  };

  const uploadImage = async (imageFile: any) => {
    await refreshAccessToken();
    const url = "https://content.dropboxapi.com/2/files/upload";
    const dropboxApiArg = JSON.stringify({
      path: `${dropBoxFolderPath.getValue()}/${imageFile.filename}`, // Customize the upload path
      mode: "add",
      autorename: true,
      mute: false,
      strict_conflict: false,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken.getValue()}`,
          "Dropbox-API-Arg": dropboxApiArg,
          "Content-Type": "application/octet-stream",
        },
        body: imageFile,
      });
      return await response.json();
    } catch (error) {
      console.log(error);
      showErrorToast({
        toast,
        message: "Error uploading to Dropbox",
      });
    }
  };

  return { uploadImage };
};

export default useDropboxUpload;
