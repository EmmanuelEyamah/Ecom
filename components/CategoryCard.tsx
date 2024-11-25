import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { LinearGradient } from "expo-linear-gradient";

interface CategoryCardProps {
  category: {
    name: string;
    image: string;
  };
  onPress?: () => void;
  style?: any;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  style,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.categoryCard,
        style,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
      activeOpacity={1}
    >
      <Image
        source={{ uri: category.image }}
        style={styles.categoryBackground}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)"]}
        locations={[0.4, 1]}
        style={styles.categoryOverlay}
      >
        <View style={styles.categoryContent}>
          <ThemedText style={styles.categoryName}>
            {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
          </ThemedText>
        </View>
      </LinearGradient>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  categoryBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  categoryOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  categoryContent: {
    padding: 16,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
});

export default CategoryCard;
