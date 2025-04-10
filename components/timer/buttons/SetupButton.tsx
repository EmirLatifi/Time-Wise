import Button from "@/components/button/Button";
import { modalStore, studyConfigStore } from "@/stores";
import { themeStore } from "@/stores/themeStore";

const SetupButton = () => {
  const toggleModal = modalStore((state) => state.toggleModal);
  const isConfigured = studyConfigStore((state) => state.isConfigured);
  const { theme } = themeStore();
  return (
    <Button
      onPress={toggleModal}
      disabled={isConfigured}
      title={"SetUp"}
      backgroundColor={
        isConfigured ? theme.surfaceContainerHigh : theme.secondary
      }
      textColor={isConfigured ? theme.onSurface : theme.onSecondary}
      icon="add"
    />
  );
};

export default SetupButton;
