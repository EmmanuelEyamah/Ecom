import React, { useRef, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
  Platform,
  StatusBar,
  BackHandler,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import { useGetSingleProduct } from "@/hooks/query/allProducts";
import { useProductDetailStore } from "@/hooks/store/productDetailStore";

const { height, width } = Dimensions.get("window");
const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

export const ProductDetailsModal = () => {
  const { isVisible, product, closeProductDetails } = useProductDetailStore();
  const { data: productData } = useGetSingleProduct(product?.id ?? 0);

  const productDetails = productData?.data;

  const slideAnim = useRef(new Animated.Value(height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isVisible) {
          closeProductDetails();
          return true;
        }
        return false;
      }
    );

    return () => backHandler.remove();
  }, [isVisible, closeProductDetails]);

  useEffect(() => {
    if (isVisible) {
      showModal();
    } else {
      hideModal();
    }
  }, [isVisible]);

  const showModal = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const hideModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(closeProductDetails);
  };

  if (!productDetails) return null;

  return (
    <>
      <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
        <TouchableOpacity
          style={styles.backdropTouch}
          onPress={closeProductDetails}
        />
      </Animated.View>

      <Animated.View
        style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.content}>
          <View style={styles.coverImageContainer}>
            <Image
              source={{ uri: productDetails.image }}
              style={styles.coverImage}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeProductDetails}
            >
              <AntDesign name="close" size={18} color="white" />
            </TouchableOpacity>
            <View style={styles.curvedOverlay} />
          </View>

          <ScrollView bounces={false} style={styles.scrollContent}>
            <View style={styles.productInfo}>
              <ThemedText style={styles.title}>
                {productDetails.title}
              </ThemedText>

              <View style={styles.priceRatingContainer}>
                <ThemedText style={styles.price}>
                  ${productDetails.price.toFixed(2)}
                </ThemedText>
                <View style={styles.ratingContainer}>
                  <ThemedText style={styles.rating}>
                    ⭐ {productDetails.rating.rate.toFixed(1)}
                  </ThemedText>
                  <ThemedText style={styles.ratingCount}>
                    ({productDetails.rating.count})
                  </ThemedText>
                </View>
              </View>

              <ThemedText style={styles.description}>
                {productDetails.description}
              </ThemedText>

              <TouchableOpacity style={styles.addToCartButton}>
                <ThemedText style={styles.addToCartButtonText}>
                  Add to Cart
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000",
    zIndex: 1,
  },
  backdropTouch: {
    flex: 1,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  coverImageContainer: {
    height: height * 0.4,
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  coverImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  curvedOverlay: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 1,
  },
  closeButton: {
    position: "absolute",
    top: STATUSBAR_HEIGHT + 10,
    left: 16,
    zIndex: 10,
    backgroundColor: "#131313B2",
    width: 32,
    height: 32,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flex: 1,
    backgroundColor: "white",
    marginTop: -20,
    zIndex: 10,
  },
  productInfo: {
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  priceRatingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FF4949",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: "#666",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProductDetailsModal;
