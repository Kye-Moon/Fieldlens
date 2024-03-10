import { graphql } from "gql-types";
import { useMutation } from "@apollo/client";
import { showErrorToast } from "../lib/toasts";
import { useToast } from "@gluestack-ui/themed";
import { usePhotoOverlay } from "../context/PhotoOverlay";
import useDropboxUpload from "./useDropboxUpload";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { defaultSaveLocationState } from "../state/selectors";
import * as MediaLibrary from "expo-media-library";
import { ImageSavedLocation } from "../constants/enums";
import { takenImagesState } from "../state/atoms";

const saveImageDateMutation = graphql(`
    mutation SaveImageDate($input: CreateImageInfoInput!) {
        createImageInfo(createImageInfoInput: $input) {
            id
        }
    }
`);

interface UploadToRemoteProps {
  img: MediaLibrary.Asset;
  uploadFn: (img: MediaLibrary.Asset) => Promise<void>;
  locationKey: ImageSavedLocation;
}

export const useSaveImage = () => {
  const setNewImage = useSetRecoilState(takenImagesState);

  const toast = useToast();
  const { uploadImage } = useDropboxUpload();
  let failedUploadLocations: ImageSavedLocation[] = [];
  const { uploadToDropbox } = useRecoilValue(defaultSaveLocationState);
  const [saveImageData] = useMutation(saveImageDateMutation, {
    onError: (e) => showErrorToast({ message: "Error saving image to remote storage. Will try again later, images are saved on the device", toast })
  });


  const handleSaveImage = async (uri: string) => {
    const img = await MediaLibrary.createAssetAsync(uri);
    if (uploadToDropbox) {
      await uploadImageToRemote({ img, uploadFn: uploadImage, locationKey: ImageSavedLocation.DROPBOX });
    }
    await uploadToInternal(img);

    if (failedUploadLocations.length > 0) {
      showErrorToast({ message: "Failed to upload to remote storage, Will try again later, images are saved on the device", toast: toast });
    }

    // if any location failed to upload, we will save the image with the failed locations to try again later
    setNewImage([{
        id: img.id,
        uri: img.uri,
        ...(failedUploadLocations.length > 0 && { failedUploadLocations })
      }]
    );
  };

  const uploadToInternal = async (img: MediaLibrary.Asset) => {
    try {
      await saveImageData({
        variables: {
          input: {
            imageId: img.id,
            uri: img.uri,
            name: img.filename,
            savedLocations: [ImageSavedLocation.LOCAL, ...(uploadToDropbox ? [ImageSavedLocation.DROPBOX] : [])]
          }
        }
      });
    } catch (e) {
      failedUploadLocations.push(ImageSavedLocation.LOCAL);
    }
  };

  const uploadImageToRemote = async ({ img, uploadFn, locationKey }: UploadToRemoteProps) => {
    try {
      await uploadFn(img);
    } catch (e) {
      failedUploadLocations.push(locationKey);
    }
  };


  return { handleSaveImage };

};