import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { quotes } from "@/data/quotes";
import { useThemeStore } from "@/store/useThemeStore";

const { width, height } = Dimensions.get("window");

const QuoteComponent = () => {
  const { theme } = useThemeStore();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuoteIndex(randomIndex);
  };

  const styles = getStyles(theme);

  const renderCard = (index: any) => {
    const { quote, author } = quotes[index];

    return (
      <View key={index} style={[styles.inner]}>
        <Pressable style={styles.box} onPressIn={handleNext}>
          <View style={styles.triangle} />
          <Icon
            name="quote-left"
            size={styles.startQuote.fontSize}
            color="rgba(100, 58, 122, 0.2)"
            style={styles.startQuote}
          />
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.credit}>⸛ {author}</Text>
        </Pressable>
      </View>
    );
  };

  return <View style={styles.container}>{renderCard(currentQuoteIndex)}</View>;
};

const getStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    inner: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },

    box: {
      width: "100%",
      aspectRatio: 16 / 9,
      maxHeight: height * 0.4,
      backgroundColor: theme.surfaceContainer,
      borderRadius: 5,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 1.5,
      elevation: 3,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: "5%",
    },
    triangle: {
      position: "absolute",
      top: "-40%",
      right: "-15%",
      width: "30%",
      height: "60%",
      backgroundColor: theme.tertiaryFixed,
      transform: [{ rotate: "-45deg" }],
      zIndex: -1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 1.5,
      elevation: 3,
    },
    quote: {
      width: "100%",
      color: theme.onSurface,
      textAlign: "center",
      fontSize: Math.min(width * 0.045, 18),
      fontFamily: "DancingScript-Regular",
    },
    credit: {
      position: "absolute",
      bottom: "10%",
      right: "5%",
      fontSize: Math.min(width * 0.035, 14),
      color: theme.onSurface,
      fontFamily: "JosefinSans-SemiBold",
    },
    startQuote: {
      position: "absolute",
      top: "10%",
      left: "4%",
      color: theme.inverseSurface,
      fontSize: Math.min(width * 0.085, 35),
    },
    button: {
      position: "absolute",
      bottom: 0,
      padding: 8,
    },
  });

export default QuoteComponent;
