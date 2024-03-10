import {StyleSheet} from "react-native";
import {
  Button,
  ButtonText,
  Heading,
  HStack,
  Input,
  InputField,
  ScrollView,
  Switch,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import {graphql} from "gql-types";
import {dropBoxAuthService} from "../../../lib/auth";
import {useRecoilStateLoadable, useRecoilValueLoadable,} from "recoil";
import {
  cameraRollUploadDefaultState,
  dropBoxFolderPathState,
  dropboxRefreshTokenState,
  dropboxUploadDefaultState,
} from "../../../state/atoms";
import FormInputWrapper from "../../../components/FormInputWrapper";
import * as z from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validateDropBoxPath} from "../../../lib/utils";

export default function SaveLocationDefaultsForm() {
  const [request, res, promptAsync] = dropBoxAuthService.useDropboxAuth();
  const dBoxRefreshToken = useRecoilValueLoadable(dropboxRefreshTokenState);
  const [dBoxFolderPath, setDBoxFolderPath] = useRecoilStateLoadable(
    dropBoxFolderPathState,
  );
  const [dropBoxUploadDefault, setDropBoxUploadDefault] =
    useRecoilStateLoadable(dropboxUploadDefaultState);
  const [cameraRollUploadDefault, setCameraRollUploadDefault] =
    useRecoilStateLoadable(cameraRollUploadDefaultState);

  const dropBoxPathSchema = z.object({
    path: z.string().min(1, "Path is required"),
  });

  const form = useForm({
    resolver: zodResolver(dropBoxPathSchema),
    mode: "onChange",
    defaultValues: {
      path: dBoxFolderPath.getValue() ?? "",
    },
  });

  const handleDropBoxPathChangeBlur = (event: any) => {
    const isValid = validateDropBoxPath(event, form);
    if (isValid) {
      setDBoxFolderPath(event.nativeEvent.text);
    } else {
      form.setValue("path", "");
    }
  };

  return (
    <View style={styles.content}>
      <Heading size={"xs"} textAlign={"center"}>
        Select where you images will be automatically saved
      </Heading>
      <ScrollView>
        <HStack style={styles.settingsItem}>
          <Text size={"md"} fontWeight={"$semibold"}>
            Camera Roll
          </Text>
          <Switch
            value={cameraRollUploadDefault.getValue()}
            onChange={() =>
              setCameraRollUploadDefault(!cameraRollUploadDefault.getValue())
            }
            size={"sm"}
          />
        </HStack>
        <HStack style={styles.settingsItem}>
          <VStack>
            <Text size={"md"} fontWeight={"$semibold"}>
              DropBox
            </Text>
            <HStack style={styles.folderEditContainer}>
              <Controller
                control={form.control}
                name="path"
                render={({ field, formState, fieldState }) => (
                  <VStack>
                    <FormInputWrapper
                      helperText={"Path to save images"}
                      formState={formState}
                      field={field}
                    >
                      <Input
                        style={{ width: 200, height: 30, paddingBottom: 4 }}
                      >
                        <InputField
                          type={"text"}
                          onBlur={(event: any) =>
                            handleDropBoxPathChangeBlur(event)
                          }
                          value={field.value}
                          onChange={(value) =>
                            field.onChange(value.nativeEvent.text)
                          }
                        />
                      </Input>
                    </FormInputWrapper>
                    <Text style={{ color: "red" }}>
                      {formState.errors.path?.message}
                    </Text>
                  </VStack>
                )}
              />
            </HStack>
          </VStack>
          {dBoxRefreshToken.getValue() ? (
            <Switch
              value={dropBoxUploadDefault.getValue()}
              onChange={async () =>
                setDropBoxUploadDefault(!dropBoxUploadDefault.getValue())
              }
              size={"sm"}
            />
          ) : (
            <Button
              size={"sm"}
              onPress={async () => {
                // @ts-ignore
                await promptAsync();
              }}
            >
              <ButtonText>Connect</ButtonText>
            </Button>
          )}
        </HStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 16,
    margin: 16,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  folderEditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
});
//sl.BtS4aeEmxiGve9zljzi5YQzwUkOHeRWdsp8rinOteOPMXoByWPYgvSAJcLjUt0TZs2URtSzPhxvyyWAPxrxty6B-vslO8WB0O38mNCAswx8JpYh0x5g6PsMM18coVoafGWeTKnC6B80O
