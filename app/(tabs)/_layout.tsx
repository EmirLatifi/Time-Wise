// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform, View, Text } from "react-native";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { useThemeStore } from "@/store/useThemeStore";
// import { ThemeToggle } from "@/components/ThemeToggle";

// export default function TabLayout() {
//   const { theme } = useThemeStore();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: true,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: {
//           height: 80,
//           backgroundColor: theme.sourFaceContainer,
//           ...Platform.select({
//             ios: {
//               position: "absolute",
//               backgroundColor: theme.sourFaceContainer,
//             },
//           }),
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//         },
//         tabBarIconStyle: {
//           width: "100%", // Ensures the icon is centered
//         },
//         tabBarItemStyle: {
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         },
//         tabBarActiveTintColor: theme.onSourFace,
//         tabBarInactiveTintColor: theme.outline,
//         headerTitleAlign: "center",
//         headerStyle: {
//           backgroundColor: theme.primaryContainer,
//         },
//         headerRight: () => (
//           <View style={{ marginRight: 16, marginTop: 4 }}>
//             <ThemeToggle />
//           </View>
//         ),
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           headerTitle: "Home",
//           headerTitleStyle: {
//             color: theme.onPrimaryContainer,
//             lineHeight: 21,
//             fontSize: 16,
//           },
//           tabBarLabelStyle: {
//             fontSize: 12,
//           },
//           tabBarLabel: ({ focused }) => (
//             <Text
//               style={{
//                 color: theme.onSourFace,
//                 fontSize: 12,
//                 fontWeight: focused ? "900" : "400",
//               }}
//             >
//               Home
//             </Text>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <IconSymbol
//               size={24}
//               name="house.fill"
//               color={focused ? theme.onSourFace : theme.outline}
//             />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="progress"
//         options={{
//           title: "Progress",
//           headerTitle: "Progress",
//           headerTitleStyle: {
//             color: theme.onPrimaryContainer,
//             lineHeight: 21,
//             fontSize: 16,
//           },
//           tabBarLabel: ({ focused }) => (
//             <Text
//               style={{
//                 color: theme.onSourFace,
//                 fontSize: 12,
//                 fontWeight: focused ? "700" : "400",
//               }}
//             >
//               Progress
//             </Text>
//           ),
//           tabBarIcon: ({ focused }) => (
//             <IconSymbol
//               size={24}
//               name="paperplane.fill"
//               color={focused ? theme.onSourFace : theme.outline}
//             />
//           ),
//         }}
//       />

//       {/* <Tabs.Screen
//         name="setting"
//         options={{
//           title: "Setting",
//           headerTitle: "Setting",
//           headerTitleAlign: "center",
//           tabBarIcon: () => (
//             <IconSymbol size={28} name="paperplane.fill" color={theme.text} />
//           ),
//         }}
//       /> */}
//     </Tabs>
//   );
// }
