import { DpBetween, DpFlex } from "@/assets/styles";
import { BackIcon } from "@/constants/Icon";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { BackHandler, StyleSheet, TouchableOpacity } from "react-native";
import { SemiBold, Span } from "src/core/components/StyledText";

interface ModalHeadProps {
  children?: React.JSX.Element;
  title?: string;
  isTitleBold?: boolean;
  backPressCallback?: () => void;
  option?: string;
}

export default function ModalHead({ children, title, isTitleBold, backPressCallback, option }: ModalHeadProps) {
  const navigation = useNavigation();

  const backAction = useCallback(() => {
    if (navigation.canGoBack()) {
      backPressCallback ? backPressCallback() : navigation.goBack();
      return true;
    }
    return false;
  }, [backPressCallback, navigation]);

  useFocusEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  });

  if (option === "flex") {
    return (
      <DpFlex style={[styles.head]} gap={6}>
        <DpFlex style={{ gap: 8 }}>
          <TouchableOpacity onPress={backAction}>
            <BackIcon />
          </TouchableOpacity>
          {title && isTitleBold ? (
            <SemiBold size={16}>{title}</SemiBold>
          ) : (
            <Span size={16}>{title}</Span>
          )}
        </DpFlex>
        {children}
      </DpFlex>
    );
  }

  return (
    <DpBetween style={[styles.head]}>
      <DpFlex style={{ gap: 8 }}>
        <TouchableOpacity onPress={backAction}>
          <BackIcon />
        </TouchableOpacity>
        {title && isTitleBold ? (
          <SemiBold size={16}>{title}</SemiBold>
        ) : (
          <Span size={16}>{title}</Span>
        )}
      </DpFlex>
      {children}
    </DpBetween>
  );
}

const styles = StyleSheet.create({
  head: {
    height: 54,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E8EE",
    elevation: 0, //for android
    shadowOpacity: 0, //for ios
  },
});