import React, { FC } from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";
import ThemedText from "@/components/ThemedText";
import { ProductCard } from "@/components/ProductCard";
import { useGetProducts } from "@/hooks/query/allProducts";
import ProductDetailsModal from "./ProductDetailsModal";
import { useProductDetailStore } from "@/hooks/store/productDetailStore";

const { width } = Dimensions.get("window");
const PADDING = 16;
const CARD_GAP = 12;
const CARD_WIDTH = (width - PADDING * 2 - CARD_GAP) / 2;

export interface TopProductsSectionProps {
  onProductPress: (product: Product) => void;
}
export const TopProductsSection: FC<TopProductsSectionProps> = ({
  onProductPress,
}) => {
  const { data, isLoading, error } = useGetProducts();

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#ff6b6b" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <ThemedText style={styles.errorText}>
          Oops! Something went wrong.
        </ThemedText>
      </View>
    );
  }

  const products = Array.isArray(data?.data) ? data.data : [];

  const topProducts = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 6);

  if (topProducts.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <ThemedText style={styles.emptyText}>
          No products available at the moment.
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Top Products</ThemedText>
        <ThemedText style={styles.viewAll}>View All</ThemedText>
      </View>

      <View style={styles.gridContainer}>
        {topProducts.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() => onProductPress(product)}
            style={styles.card}
          />
        ))}
      </View>

      <ProductDetailsModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: PADDING,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  viewAll: {
    fontSize: 14,
    color: "#666",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: PADDING,
    gap: CARD_GAP,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: 0, // Remove horizontal margin as we're using gap
  },
  loadingContainer: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff6b6b",
    textAlign: "center",
  },
  emptyContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default TopProductsSection;
