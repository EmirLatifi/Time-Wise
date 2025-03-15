import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { useThemeStore } from "@/store/useThemeStore";
import {
  useErrorStore,
  useModalStore,
  useStudyConfigStore,
} from "@/store/useStudyStore";
import Button from "../button/Button";

const StudySettingsModal = () => {
  const { setStudySettings, studySettings } = useStudyConfigStore();
  const { errors, setErrors } = useErrorStore();
  const { toggleModal, isModalVisible } = useModalStore();
  const viewRef = useRef<Animatable.View>(null);
  const { theme } = useThemeStore();
  const styles = getStyles(theme);

  const breakIntervalRef = useRef("");
  const breakFrequencyRef = useRef("");

  useEffect(() => {
    breakIntervalRef.current = studySettings.breakInterval.toString();
    breakFrequencyRef.current = studySettings.breakFrequency.toString();
  }, [studySettings]);

  const handleClose = async () => {
    if (viewRef.current) {
      await viewRef.current?.animate("fadeOutLeft", 300);
      breakIntervalRef.current = "0";
      breakFrequencyRef.current = "0";
      setErrors({
        breakInterval: false,
        breakFrequency: false,
      });
      setStudySettings({
        breakInterval: 0,
        breakFrequency: 0,
      });
      toggleModal();
    }
  };

  const handleInputChange = (
    key: keyof typeof studySettings,
    value: string,
    inputRef: React.MutableRefObject<string>
  ) => {
    // Allow only numbers
    inputRef.current = value;

    // Clear errors if a valid value is entered
    if (Number(value) > 0) {
      setErrors({
        ...errors,
        [key]: false,
      });
    }
  };

  const saveStudySettings = () => {
    const breakInterval = Number(breakIntervalRef.current);
    const breakFrequency = Number(breakFrequencyRef.current);
    const isValid = breakInterval > 0 && breakFrequency > 0;

    if (!isValid) {
      useErrorStore.setState(() => ({
        errors: {
          breakInterval: breakInterval <= 0,
          breakFrequency: breakFrequency <= 0,
        },
      }));
    } else {
      setStudySettings({
        breakInterval,
        breakFrequency,
      });
      useStudyConfigStore.setState({ isConfigured: true });
      toggleModal();
    }
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
        animation="fadeInLeft"
        duration={300}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.studySettingsModalInputDiv}>
            <Text style={styles.studySettingsModalInputText}>
              Set break interval
            </Text>
            <View>
              <TextInput
                style={[
                  styles.studySettingsModalInput,
                  errors.breakInterval && {
                    borderWidth: 1,
                    borderColor: "red",
                  },
                ]}
                keyboardType="numeric"
                inputMode="numeric"
                defaultValue={breakIntervalRef.current}
                onChangeText={(text) =>
                  handleInputChange("breakInterval", text, breakIntervalRef)
                }
                maxLength={2}
              ></TextInput>
              {errors.breakInterval && (
                <Text style={styles.errorText}>
                  Break interval is required.
                </Text>
              )}
            </View>
          </View>

          <View style={styles.studySettingsModalInputDiv}>
            <Text style={styles.studySettingsModalInputText}>
              Set break frequency
            </Text>
            <View>
              <TextInput
                style={[
                  styles.studySettingsModalInput,
                  errors.breakFrequency && {
                    borderWidth: 1,
                    borderColor: theme.error,
                  },
                ]}
                keyboardType="numeric"
                inputMode="numeric"
                defaultValue={breakFrequencyRef.current}
                onChangeText={(text) =>
                  handleInputChange("breakFrequency", text, breakFrequencyRef)
                }
                maxLength={2}
              ></TextInput>
              {errors.breakFrequency && (
                <Text style={styles.errorText}>
                  Break frequency is required.
                </Text>
              )}
            </View>
          </View>

          <View style={styles.buttonsDiv}>
            <Button
              title="Set up"
              onPress={saveStudySettings}
              backgroundColor={theme.primary}
              textColor={theme.onPrimary}
            />

            <Button
              title="Cancel"
              onPress={handleClose}
              backgroundColor={theme.secondary}
              textColor={theme.onSecondary}
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
      backgroundColor: theme.modalBackground,
      paddingHorizontal: 16,
    },
    modalView: {
      width: "100%",
      backgroundColor: theme.surfaceContainer,
      borderRadius: 20,
      paddingHorizontal: 32,
      paddingVertical: 40,
      gap: 24,
      shadowColor: theme.primary,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    studySettingsModalInputDiv: {
      gap: 8,
    },
    studySettingsModalInputText: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.onSurface,
    },
    studySettingsModalInput: {
      padding: 8,
      fontSize: 16,
      borderRadius: 4,
      borderBlockColor: theme.outlineVariant,
      backgroundColor: theme.surfaceBright,
      color: theme.onSurface,
    },
    errorText: {
      color: theme.error,
      fontSize: 14,
      marginTop: 10,
    },
    buttonsDiv: {
      width: "100%",
      flexDirection: "row",
      gap: 24,
      paddingTop: 16,
    },
  });

export default StudySettingsModal;
