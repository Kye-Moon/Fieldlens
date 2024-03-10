import { atom, DefaultValue } from "recoil";
import * as SecureStore from "expo-secure-store";
import { localStorageEffect, SecureStorageEffect, takenImagesEffect } from "./effects";
import { ImageSavedLocation } from "../constants/enums";


export const accessTokenState = atom({
  key: "accessToken",
  default: "",
  effects: [
    ({ onSet, setSelf }) => {
      onSet(async (newValue: any, _: any, isReset: any) => {
        await SecureStore.setItemAsync(
          "access_token",
          JSON.stringify(newValue)
        );
      });
      setSelf(
        SecureStore.getItemAsync("access_token").then((value) =>
          value != null ? JSON.parse(value) : new DefaultValue()
        )
      );
    }
  ]
});

export const API_URLS = {
  local: "http://localhost:4000/graphql",
  dev: "https://fieldlenz-server.onrender.com/graphql"
};

export const apiUrlState = atom({
  key: "base_url",
  default: __DEV__ ? API_URLS.local : API_URLS.dev
});

export const dropboxAccessTokenState = atom({
  key: "dropbox_access_token",
  default: "",
  effects: [SecureStorageEffect("dropbox_access_token")]
});

export const dropboxRefreshTokenState = atom({
  key: "dropbox_refresh_token",
  default: "",
  effects: [SecureStorageEffect("dropbox_refresh_token")]
});

export const dropBoxFolderPathState = atom({
  key: "dropbox_folder_path",
  default: "/fieldlenz",
  effects: [localStorageEffect("dropbox_folder_path")]
});

export const dropboxUploadDefaultState = atom({
  key: "dropbox_upload",
  default: false,
  effects: [localStorageEffect("dropbox_upload")]
});

export const cameraRollUploadDefaultState = atom({
  key: "camera_roll_upload",
  default: false,
  effects: [localStorageEffect("camera_roll_upload")]
});

/**
 *
 */
export const showDateDefaultState = atom({
  key: "show_date",
  default: true,
  effects: [localStorageEffect("show_date")]
});

export const showLocationDefaultState = atom({
  key: "show_location",
  default: true,
  effects: [localStorageEffect("show_location")]
});

export const showTimeDefaultState = atom({
  key: "show_time",
  default: true,
  effects: [localStorageEffect("show_time")]
});

export const showLogoDefaultState = atom({
  key: "show_logo",
  default: true,
  effects: [localStorageEffect("show_logo")]
});

export const textBackgroundColourState = atom({
  key: "text_background_color",
  default: "#fff",
  effects: [localStorageEffect("text_background_color")]
});

export const textColourState = atom({
  key: "text_color",
  default: "#000",
  effects: [localStorageEffect("text_color")]
});

interface TakenImage {
  uri: string;
  id: string;
  failedLocations?: ImageSavedLocation[];
}

export const takenImagesState = atom<TakenImage[]>({
  key: "taken_images",
  default: [],
  effects: [takenImagesEffect("images")]
});


