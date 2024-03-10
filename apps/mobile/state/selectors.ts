import { selector } from "recoil";
import {
  cameraRollUploadDefaultState,
  dropboxUploadDefaultState,
  showDateDefaultState,
  showLocationDefaultState, showLogoDefaultState, showTimeDefaultState, textBackgroundColourState, textColourState
} from "./atoms";

export const defaultSaveLocationState = selector({
  key: "default_save_locations",
  get: async ({ get }) => {
    const uploadToDropbox = get(dropboxUploadDefaultState);
    const uploadToCameraRoll = get(cameraRollUploadDefaultState);

    return {
      uploadToDropbox,
      uploadToCameraRoll
    };
  }
});


export const photoOverlayDefaultsSelector = selector({
  key: "photo_overlay_defaults",
  get: ({ get }) => {
    const showDateDefault = get(showDateDefaultState);
    const showLocationDefault = get(showLocationDefaultState);
    const showTimeDefault = get(showTimeDefaultState);
    const showLogoDefault = get(showLogoDefaultState);
    const textBackgroundColourDefault = get(textBackgroundColourState);
    const textColourDefault = get(textColourState);
    return {
      showDateDefault,
      showLocationDefault,
      showTimeDefault,
      showLogoDefault,
      textBackgroundColourDefault,
      textColourDefault
    };
  }
});