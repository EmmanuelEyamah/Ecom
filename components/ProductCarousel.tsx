import React, { useRef, useState, useEffect } from "react";
import {
  View,
  FlatList,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewToken,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { useGetProducts } from "@/hooks/query/allProducts";

const { width: WINDOW_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = WINDOW_WIDTH * 0.9;
const ITEM_HEIGHT = 200;
const SPACING = 10;

// Define interfaces for type safety
interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

interface CarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Product>);

export const ProductCarousel: React.FC<CarouselProps> = ({
  autoPlay = true,
  autoPlayInterval = 3000,
}) => {
  const { data, isLoading, error } = useGetProducts(7);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Product>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  const products = (data?.data || []) as Product[];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && products.length > 0) {
      interval = setInterval(() => {
        const nextIndex =
          activeIndex === products.length - 1 ? 0 : activeIndex + 1;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }, autoPlayInterval);
    }
    return () => interval && clearInterval(interval);
  }, [activeIndex, isAutoPlaying, products, autoPlayInterval]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index !== null) {
        setActiveIndex(viewableItems[0].index);
      }
    }
  ).current;

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.itemContainer}
        onPress={() => {
          // Handle product press
        }}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.backgroundImage}
          blurRadius={3}
        >
          <View style={styles.overlay}>
            <View style={styles.contentContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.textContent}>
                <View style={styles.discountBadge}>
                  <ThemedText style={styles.discountText}>15% OFF</ThemedText>
                </View>
                <ThemedText numberOfLines={2} style={styles.title}>
                  {item.title}
                </ThemedText>
                <ThemedText style={styles.price}>
                  ${item.price.toFixed(2)}
                </ThemedText>
                <TouchableOpacity style={styles.shopButton}>
                  <ThemedText style={styles.shopButtonText}>
                    SHOP NOW
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
      </View>
    );
  }

  if (error || !products.length) {
    return (
      <View style={styles.errorContainer}>
        <ThemedText>Unable to load products</ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        ref={flatListRef}
        data={products}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + SPACING * 2}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
        keyExtractor={(item) => item.id.toString()}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + SPACING * 2,
          offset: (ITEM_WIDTH + SPACING * 2) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  loadingContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingHorizontal: SPACING,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: SPACING,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
  },
  imageContainer: {
    width: "40%",
    justifyContent: "center",
  },
  productImage: {
    width: "100%",
    height: "80%",
  },
  textContent: {
    width: "60%",
    paddingLeft: 15,
    justifyContent: "center",
  },
  discountBadge: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginBottom: 12,
  },
  shopButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  shopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
