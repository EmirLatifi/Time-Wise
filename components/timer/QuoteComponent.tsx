import { useMemo, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { quotes } from "@/data/quotes";
import { themeStore } from "@/stores/themeStore";

const { width, height } = Dimensions.get("window");

const QuoteComponent = () => {
  const { theme } = themeStore();
  const [prevQuoteIndex, setPrevQuoteIndex] = useState<number | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setPrevQuoteIndex(currentQuoteIndex);
    setCurrentQuoteIndex(randomIndex);
  };

  const handlePrevious = () => {
    if (prevQuoteIndex !== null) {
      setCurrentQuoteIndex(prevQuoteIndex);
      setPrevQuoteIndex(null);
    }
  };

  const renderCard = (index: any) => {
    const { quote, author } = quotes[index];

    return (
      <View style={styles.box}>
        <View style={styles.triangle} />
        <View style={styles.quoteContainer}>
          <Icon
            name="quote-left"
            size={styles.startQuote.fontSize}
            color="rgba(100, 58, 122, 0.2)"
            style={styles.startQuote}
          />
          <Text style={styles.quote}>{quote}</Text>
          <Text style={styles.credit}>- {author}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable style={[styles.navButton]} onPress={handlePrevious}>
            <Icon name="chevron-left" size={24} color={theme.onSurface} />
          </Pressable>
          <Pressable style={styles.navButton} onPress={handleNext}>
            <Icon name="chevron-right" size={24} color={theme.onSurface} />
          </Pressable>
        </View>
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
      maxWidth: 600,
    },

    box: {
      width: "100%",
      minHeight: height * 0.3,
      backgroundColor: theme.surfaceContainer,
      borderRadius: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
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
    quoteContainer: {
      width: "100%",
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      paddingTop: 60,
      paddingHorizontal: 20,
    },
    quote: {
      color: theme.onSurface,
      textAlign: "center",
      fontSize: Math.min(width * 0.045, 18),
      fontFamily: "DancingScript-Regular",
      marginBottom: 20,
    },
    credit: {
      fontSize: Math.min(width * 0.035, 14),
      color: theme.onSurface,
      fontFamily: "JosefinSans-SemiBold",
      alignSelf: "flex-end",
    },
    startQuote: {
      position: "absolute",
      top: 0,
      left: 20,
      color: theme.inverseSurface,
      fontSize: Math.min(width * 0.085, 35),
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
      marginTop: 20,
    },
    navButton: {
      padding: 8,
    },
    disabledButton: {
      opacity: 0.5,
    },
  });

export default QuoteComponent;
