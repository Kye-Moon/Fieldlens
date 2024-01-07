import * as ImagePicker from "expo-image-picker";
import {LazyQueryExecFunction} from "@apollo/client";
import {Exact, PreSignedUrlQuery} from "gql-types"

interface UploadImagesProps {
    getPresignedUrl: LazyQueryExecFunction<PreSignedUrlQuery, Exact<{ key: string }>>;
    images: ImagePicker.ImagePickerAsset[];
    variationId: string;

}

export const uploadImages = async ({
                                       images,
                                       getPresignedUrl,
                                       variationId,
                                   }: UploadImagesProps): Promise<string[]> => {
    // Mapping each image upload to a promise
    const uploadPromises = images.map(async (result,index) => {
        const preSignedUrl = await getPresignedUrl({variables: {key: `${variationId}-${result.fileName}`}});
        const picture = await (await fetch(result.uri)).blob();

        if (!!preSignedUrl.data?.presignedUrl) {
            const response = await fetch(preSignedUrl.data.presignedUrl, {
                method: 'PUT',
                body: picture,
                headers: {
                    'Content-Type': 'image/jpeg',
                }
            });
            return response.url.split('?')[0];
        }

        // Handle the case where preSignedUrl is not available
        return null;
    });

    // Using Promise.all to run all promises concurrently
    const imageUrls = await Promise.all(uploadPromises);
    console.log(imageUrls);

    // Filter out null values (in case some uploads failed)
    return imageUrls.filter((url): url is string => url !== null);
};

