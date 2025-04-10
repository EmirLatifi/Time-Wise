import { View, Text, TextInput, StyleSheet, Modal } from "react-native";
import React, { useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import { themeStore } from "@/stores/themeStore";
import { errorStore, modalStore, studyConfigStore } from "@/stores";
import Button from "../button/Button";
import { Typography } from "@/constants/Typography";

const BreaksModal = () => {
  const { setBreaksSettings, breaksSettings } = studyConfigStore();
  const { errors, setErrors } = errorStore();
  const { toggleModal, isModalVisible } = modalStore();
  const viewRef = useRef<Animatable.View>(null);
  const { theme } = themeStore();
  const styles = getStyles(theme);

  const timeBetweenBreaksRef = useRef("");
  const numberOfBreaksRef = useRef("");

  useEffect(() => {
    timeBetweenBreaksRef.current = breaksSettings.timeBetweenBreaks.toString();
    numberOfBreaksRef.current = breaksSettings.numberOfBreaks.toString();
  }, [breaksSettings]);

  const handleClose = async () => {
    if (viewRef.current) {
      await viewRef.current?.animate("fadeOutDown", 300);
      timeBetweenBreaksRef.current = "0";
      numberOfBreaksRef.current = "0";
      setErrors({
        breakInterval: false,
        breakFrequency: false,
      });
      setBreaksSettings({
        timeBetweenBreaks: 0,
        numberOfBreaks: 0,
      });
      toggleModal();
    }
  };

  const handleInputChange = (
    key: keyof typeof breaksSettings,
    value: string,
    inputRef: React.MutableRefObject<string>
  ) => {
    inputRef.current = value;

    if (Number(value) > 0) {
      setErrors({
        ...errors,
        [key]: false,
      });
    }
  };

  const savebreaksSettings = () => {
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
      setBreaksSettings({
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
        animation="fadeInUp"
        duration={300}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.breaksSettingsModalInputDiv}>
            <Text style={styles.breaksSettingsModalInputText}>
              Set number of breaks
            </Text>
            <View>
              <TextInput
                style={[
                  styles.breaksSettingsModalInput,
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
                  Number of breaks is required.
                </Text>
              )}
            </View>
          </View>

          <View style={styles.breaksSettingsModalInputDiv}>
            <Text style={styles.breaksSettingsModalInputText}>
              Set time between breaks
            </Text>
            <View>
              <TextInput
                style={[
                  styles.breaksSettingsModalInput,
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
                  Time between breaks is required.
                </Text>
              )}
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              title="Set up"
              onPress={savebreaksSettings}
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
    breaksSettingsModalInputDiv: {
      gap: 8,
    },
    breaksSettingsModalInputText: {
      fontSize: 18,
      color: theme.onSurface,
      fontFamily: Typography.fontFamily.label,
    },
    breaksSettingsModalInput: {
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
      fontFamily: Typography.fontFamily.button,
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      width: "100%",
    },
  });

export default BreaksModal;
