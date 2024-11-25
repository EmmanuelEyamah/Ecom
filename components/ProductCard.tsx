import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import ThemedText from "@/components/ThemedText";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;
const CARD_HEIGHT = CARD_WIDTH * 1.6;

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  style?: any;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  style,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const translateYAnim = React.useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(translateYAnim, {
        toValue: -3,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.spring(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
    ]).start();
  };

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.productCard,
        style,
        {
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
        },
      ]}
      activeOpacity={1}
    >
      <View style={styles.imageContainer} id={`product.${product.id}.image`}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <ThemedText numberOfLines={2} style={styles.productTitle}>
          {product.title}
        </ThemedText>

        <View style={styles.detailsContainer}>
          <View style={styles.priceRatingContainer}>
            <ThemedText style={styles.price}>
              ${product.price.toFixed(2)}
            </ThemedText>
            <View style={styles.ratingContainer}>
              <ThemedText style={styles.rating}>
                ⭐ {product.rating.rate.toFixed(1)}
              </ThemedText>
              <ThemedText style={styles.ratingCount}>
                ({product.rating.count})
              </ThemedText>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewButton}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <ThemedText style={styles.viewButtonText}>View Product</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  productCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginVertical: 10,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    backgroundColor: "#fff",
    padding: 10,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1a1a1a",
    lineHeight: 20,
    marginBottom: 8,
  },
  detailsContainer: {
    gap: 12,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF4949",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFB800",
  },
  ratingCount: {
    fontSize: 12,
    color: "#666",
  },
  viewButton: {
    backgroundColor: "#000",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default ProductCard;
