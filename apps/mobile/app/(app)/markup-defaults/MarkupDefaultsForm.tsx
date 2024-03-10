import { StyleSheet } from "react-native";
import { HStack, ScrollView, Switch, Text, View } from "@gluestack-ui/themed";
import ColorPickerPopover from "../../../components/ColorPickerPopover";
import React, { useState } from "react";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { graphql } from "gql-types";
import { usePhotoOverlay } from "../../../context/PhotoOverlay";
import { usePhotoOverlayDefaults } from "../../../hooks/usePhotoOverlay";


export default function MarkupDefaultsForm() {
  const {
    showDateDefault,
    toggleDate,
    showTimeDefault,
    toggleTime,
    showLocationDefault,
    toggleLocation,
    showLogoDefault,
    toggleLogo,
    textColourDefault,
    setTextColourDefault,
    textBackgroundColourDefault,
    setTextBackgroundColourDefault
  } = usePhotoOverlayDefaults();

  return (
    <View style={styles.content}>
      <ScrollView>
        <Text>Stamps</Text>
        <HStack style={styles.settingsItem}>
          <Text size={"md"} fontWeight={"$semibold"}>Date</Text>
          <Switch value={showDateDefault} onChange={() => toggleDate()} size={"sm"} />
        </HStack>
        <HStack style={styles.settingsItem}>
          <Text size={"md"} fontWeight={"$semibold"}>Time</Text>
          <Switch value={showTimeDefault} onChange={() => toggleTime()} size={"sm"} />

        </HStack>
        <HStack style={styles.settingsItem}>
          <Text size={"md"} fontWeight={"$semibold"}>GPS</Text>
          <Switch value={showLocationDefault} onChange={() => toggleLocation()} size={"sm"} />

        </HStack>
        <HStack style={styles.settingsItem}>
          <Text size={"md"} fontWeight={"$semibold"}>Logo</Text>
          <Switch value={showLogoDefault} onChange={() => toggleLogo()} size={"sm"} />

        </HStack>
        <HStack style={styles.settingsItem}>
          <Text size={"md"} fontWeight={"$semibold"}>Text color</Text>
          <ColorPickerPopover
            onChange={(color) => setTextColourDefault(color)}
            colors={["#ffffff", "#000000", "#0039ff"]}
            selectedColor={textColourDefault}
          />
        </HStack>
        <HStack style={styles.settingsItem}>
          <Text size={"md"} fontWeight={"$semibold"}>Text background</Text>
          <ColorPickerPopover
            onChange={(color) => setTextBackgroundColourDefault(color)}
            colors={["#ffffff", "#000000"]}
            selectedColor={textBackgroundColourDefault}
          />
        </HStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: 16,
    margin: 16
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6
  }
});