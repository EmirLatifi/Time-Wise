import { View, Text, TextInput, StyleSheet, Modal } from "react-native";
import React, { useRef, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { themeStore } from "@/stores/themeStore";
import { progressModalStore, studyConfigStore, targetStore } from "@/stores";
import Button from "../button/Button";
import { Typography } from "@/constants/Typography";

const TargetModal = () => {
  const { toggleProgressModal, isModalVisible, targetType } =
    progressModalStore();
  const { dailyTarget, setDailyTarget } = targetStore();
  const viewRef = useRef<Animatable.View>(null);
  const { theme } = themeStore();
  const styles = React.useMemo(() => getStyles(theme), [theme]);

  const targetRef = useRef("");

  useEffect(() => {
    targetRef.current = dailyTarget.toString();
  }, [dailyTarget]);

  const handleTargetChange = (value: string) => {
    if (!/^\d*$/.test(value)) return;
    targetRef.current = value;
  };

  const handleClose = async () => {
    if (viewRef.current) {
      await viewRef.current?.animate("fadeOutDown", 300);
      toggleProgressModal();
    }
  };

  const saveTarget = () => {
    const numValue = parseInt(targetRef.current) || 0;
    setDailyTarget(numValue);

    studyConfigStore.setState({ isConfigured: true });
    toggleProgressModal();
  };

  return (
    <Modal
      visible={isModalVisible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
    >
      <Animatable.View
        ref={viewRef}
        animation="fadeInUp"
        duration={300}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.targetModalInputDiv}>
            <Text style={styles.targetModalInputText}>Set daily target</Text>
            <View>
              <TextInput
                style={styles.targetModalInput}
                keyboardType="numeric"
                defaultValue={targetRef.current}
                onChangeText={handleTargetChange}
                maxLength={3}
              />
            </View>
          </View>

          <View style={styles.buttonsDiv}>
            <Button
              onPress={saveTarget}
              backgroundColor={theme.primary}
              textColor={theme.onPrimary}
              title="Add"
            />

            <Button
              onPress={handleClose}
              backgroundColor={theme.secondary}
              textColor={theme.onSecondary}
              title="Close"
            />
          </View>
        </View>
      </Animatable.View>
    </Modal>
  );
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.9)",
      paddingHorizontal: 16,
    },
    modalView: {
      width: "100%",
      backgroundColor: theme.surface,
      borderRadius: 20,
      paddingVertical: 32,
      paddingHorizontal: 32,
      gap: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    targetModalInputDiv: {
      gap: 8,
    },
    targetModalInputText: {
      fontSize: 18,
      color: theme.onSurface,
      fontFamily: Typography.fontFamily.label,
    },
    targetModalInput: {
      padding: 8,
      fontSize: 16,
      backgroundColor: "white",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.outline,
      fontFamily: Typography.fontFamily.button,
    },

    buttonsDiv: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });

export default TargetModal;
