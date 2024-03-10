import * as SecureStore from "expo-secure-store";
import { DefaultValue } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SecureStorageEffect =
  (key: any) =>
    ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
      setSelf(
        SecureStore.getItemAsync(key).then(
          (savedValue) =>
            savedValue != null ? JSON.parse(savedValue) : new DefaultValue() // Abort initialization if no value was stored
        )
      );

      // Subscribe to state changes and persist them to localStorage
      onSet((newValue: any, _: any, isReset: any) => {
        isReset
          ? SecureStore.deleteItemAsync(key)
          : SecureStore.setItemAsync(key, JSON.stringify(newValue));
      });
    };

export const localStorageEffect = (key: string) => ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
  AsyncStorage.getItem(key).then((value) => {
    if (value != null) {
      setSelf(JSON.parse(value));
    }
  });


  onSet((newValue: any, _: any, isReset: any) => {
    isReset
      ? AsyncStorage.removeItem(key)
      : () => {
        AsyncStorage.setItem(key, JSON.stringify(newValue)).then(
          () => setSelf(newValue) // Update the state with the new value
        );
      };
  });
};


export const takenImagesEffect = (key: string) => ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
  AsyncStorage.getItem(key).then((value) => {
    if (value != null) {
      setSelf(JSON.parse(value));
    }
  });


  onSet((newValue: any, _: any) => {
    AsyncStorage.getItem(key).then((value) => {
      const takenImages = value != null ? JSON.parse(value) : [];
      const newTakenImages = [...takenImages, ...newValue];
      AsyncStorage.setItem(key, JSON.stringify(newTakenImages)).then(() => {
          setSelf(newTakenImages);
        }
      );
    });
  });
};