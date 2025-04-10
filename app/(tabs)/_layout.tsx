import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text } from "react-native";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { themeStore } from "@/stores/themeStore";
import { Ionicons } from "@expo/vector-icons";
import { Typography } from "@/constants/Typography";

export default function TabLayout() {
  const { theme } = themeStore();

  const renderLabel = (label: string, focused: boolean) => (
    <Text
      style={{
        color: focused ? theme.primary : theme.onSurfaceVariant,
        fontSize: 12,
        fontFamily: Typography.fontFamily.button,
        fontWeight: focused ? "600" : "500",
        letterSpacing: 1,
        marginTop: 4,
      }}
    >
      {label}
    </Text>
  );

  const renderIcon = (focused: boolean, icon: [any, any]) => (
    <Ionicons
      name={focused ? icon[0] : icon[1]}
      size={24}
      color={focused ? theme.primary : theme.onSurfaceVariant}
    />
  );

  const getTabOptions = ({
    label,
    icon,
  }: {
    label: string;
    icon: [string, string];
  }) => ({
    headerTitle: label,
    headerTitleAlign: "center" as const,
    headerTitleStyle: {
      color: theme.onPrimary,
      fontSize: 20,
      fontFamily: Typography.fontFamily.header,
      letterSpacing: 1,
    },
    tabBarLabel: ({ focused }: any) => renderLabel(label, focused),
    tabBarIcon: ({ focused }: any) => renderIcon(focused, icon),
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          borderTopWidth: 1,
          height: 80,
          paddingTop: Platform.OS === "ios" ? 10 : 10,
          paddingBottom: Platform.OS === "ios" ? 16 : 10,
          elevation: 2,
          backgroundColor: theme.surfaceContainer,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 16,
        },
        tabBarIconStyle: {
          width: "100%",
        },
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.primary,
        },
      }}
    >
      <Tabs.Screen
        name="timer"
        options={getTabOptions({
          label: "Timer",
          icon: ["time", "time-outline"],
        })}
      />
      <Tabs.Screen
        name="progress"
        options={getTabOptions({
          label: "Progress",
          icon: ["bar-chart", "bar-chart-outline"],
        })}
      />

      <Tabs.Screen
        name="settings"
        options={getTabOptions({
          label: "Settings",
          icon: ["settings", "settings-outline"],
        })}
      />
    </Tabs>
  );
}
