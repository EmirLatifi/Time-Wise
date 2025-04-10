import { View, Text, TextInput, StyleSheet, Modal } from "react-native";
import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { themeStore } from "@/stores/themeStore";
import { errorStore, modalStore, studyConfigStore } from "@/stores";
import Button from "../button/Button";
import { Typography } from "@/constants/Typography";

const StudySettingsModal = () => {
  const { setStudySettings, studySettings } = studyConfigStore();
  const { errors, setErrors } = errorStore();
  const { toggleModal, isModalVisible } = modalStore();
  const viewRef = useRef<Animatable.View>(null);
  const { theme } = themeStore();
  const styles = getStyles(theme);

  const timeBetweenBreaksRef = useRef("");
  const numberOfBreaksRef = useRef("");

  useEffect(() => {
    timeBetweenBreaksRef.current = studySettings.timeBetweenBreaks.toString();
    numberOfBreaksRef.current = studySettings.numberOfBreaks.toString();
  }, [studySettings]);

  const handleClose = async () => {
    if (viewRef.current) {
      await viewRef.current?.animate("fadeOutLeft", 300);
      timeBetweenBreaksRef.current = "0";
      numberOfBreaksRef.current = "0";
      setErrors({
        breakInterval: false,
        breakFrequency: false,
      });
      setStudySettings({
        timeBetweenBreaks: 0,
        numberOfBreaks: 0,
      });
      toggleModal();
    }
  };

  const handleInputChange = (
    key: keyof typeof studySettings,
    value: string,
    inputRef: React.MutableRefObject<string>
  ) => {
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
    const timeBetweenBreaks = Number(timeBetweenBreaksRef.current);
    const numberOfBreaks = Number(numberOfBreaksRef.current);
    const isValid = timeBetweenBreaks > 0 && numberOfBreaks > 0;

    if (!isValid) {
      errorStore.setState(() => ({
        errors: {
          breakInterval: timeBetweenBreaks <= 0,
          breakFrequency: numberOfBreaks <= 0,
        },
      }));
    } else {
      setStudySettings({
        timeBetweenBreaks,
        numberOfBreaks,
      });
      studyConfigStore.setState({ isConfigured: true });
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
              Set number of breaks
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
                defaultValue={timeBetweenBreaksRef.current}
                onChangeText={(text) =>
                  handleInputChange(
                    "timeBetweenBreaks",
                    text,
                    timeBetweenBreaksRef
                  )
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
              Set time between breaks
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
                defaultValue={numberOfBreaksRef.current}
                onChangeText={(text) =>
                  handleInputChange("numberOfBreaks", text, numberOfBreaksRef)
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

          <View style={styles.buttonsContainer}>
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
      //maxWidth: 600,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.modalBackground,
      paddingHorizontal: 16,
    },
    modalView: {
      width: "100%",
      backgroundColor: theme.surface,
      borderRadius: 20,
      paddingHorizontal: 32,
      paddingVertical: 40,
      gap: 24,
      shadowColor: theme.surface,
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
      color: theme.onSurface,
      fontFamily: Typography.fontFamily.label,
    },
    studySettingsModalInput: {
      padding: 8,
      fontSize: 16,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: theme.outline,
      backgroundColor: "white",
      fontFamily: Typography.fontFamily.button,
    },
    errorText: {
      color: theme.error,
      fontSize: 14,
      marginTop: 10,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      width: "100%",
    },
  });

export default StudySettingsModal;
