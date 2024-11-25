import React, { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import SearchInput from "@/components/SearchInput";
import { Feather } from "@expo/vector-icons";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import {
  useGetProductCategories,
  useGetProducts,
  useGetProductsByCategory,
} from "@/hooks/query/allProducts";
import { wp } from "@/utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProductDetailsModal from "@/components/ProductDetailsModal";
import { useProductDetailStore } from "@/hooks/store/productDetailStore";
import FilterDropdown from "@/components/FilterDropdown";
import {
  categoryImages,
  MAX_HISTORY_ITEMS,
  SEARCH_HISTORY_KEY,
} from "@/constants/data";

const { width } = Dimensions.get("window");

export const Search: FC = () => {
  const CARD_WIDTH = width * 0.7;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [isFilterVisible, setFilterVisible] = useState(false);

  const { openProductDetails } = useProductDetailStore();

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetProductCategories();
  const { data: allProducts, isLoading: isAllProductsLoading } =
    useGetProducts();
  const { data: categoryProducts, isLoading: isCategoryProductsLoading } =
    useGetProductsByCategory(selectedCategory as ProductCategory, undefined, {
      enabled:
        !!selectedCategory &&
        Object.keys(categoryImages).includes(selectedCategory),
    });

  useEffect(() => {
    loadSearchHistory();
  }, []);

  useEffect(() => {
    updateDisplayProducts();
  }, [
    searchQuery,
    selectedCategory,
    allProducts,
    categoryProducts,
    filteredProducts,
  ]);

  const updateDisplayProducts = () => {
    if (searchQuery) {
      setDisplayProducts(filteredProducts);
    } else if (selectedCategory && categoryProducts?.data) {
      setDisplayProducts(categoryProducts.data);
    } else if (allProducts?.data) {
      setDisplayProducts(allProducts.data);
    } else {
      setDisplayProducts([]);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setFilteredProducts([]);
      return;
    }

    const searchTerms = text.toLowerCase().split(" ");
    const productsToSearch = selectedCategory
      ? categoryProducts?.data
      : allProducts?.data;

    if (!productsToSearch) {
      setFilteredProducts([]);
      return;
    }

    const filtered = productsToSearch.filter((product) => {
      const searchableText =
        `${product.title} ${product.category} ${product.description}`.toLowerCase();
      return searchTerms.every((term) => searchableText.includes(term));
    });

    setFilteredProducts(filtered);
    saveSearchHistory(text);
  };

  const loadSearchHistory = async () => {
    try {
      const history = await AsyncStorage.getItem(SEARCH_HISTORY_KEY);
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error("Error loading search history:", error);
    }
  };

  const saveSearchHistory = async (query: string) => {
    try {
      const updatedHistory = [
        query,
        ...searchHistory.filter((item) => item !== query),
      ].slice(0, MAX_HISTORY_ITEMS);
      await AsyncStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(updatedHistory)
      );
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error("Error saving search history:", error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem(SEARCH_HISTORY_KEY);
      setSearchHistory([]);
    } catch (error) {
      console.error("Error clearing search history:", error);
    }
  };

  const handleHistoryItemPress = (item: string) => {
    setSearchQuery(item);
    handleSearch(item);
  };

  const handleCategoryPress = (categoryName: string) => {
    setSearchQuery("");
    setFilteredProducts([]);
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
    }
  };

  const categories =
    categoriesData?.data
      ?.filter((categoryName): categoryName is ProductCategory =>
        [
          "men's clothing",
          "women's clothing",
          "jewelery",
          "electronics",
        ].includes(categoryName)
      )
      ?.map((categoryName) => ({
        name: categoryName,
        image: categoryImages[categoryName],
      })) || [];

  const isLoading =
    isCategoriesLoading ||
    isAllProductsLoading ||
    (selectedCategory && isCategoryProductsLoading);

  const handleFilterButtonClick = () => {
    setFilterVisible(!isFilterVisible);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[styles.content, styles.centerContent]}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.searchRow}>
            <View style={styles.searchContainer}>
              <SearchInput
                placeholder="Search products..."
                onSearch={handleSearch}
                value={searchQuery}
              />
            </View>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleFilterButtonClick}
            >
              <Feather name="sliders" size={24} color="#3A3A3A" />
            </TouchableOpacity>
          </View>

          {searchHistory.length > 0 && !searchQuery && (
            <>
              <View style={styles.historyHeader}>
                <ThemedText style={styles.historyTitle}>
                  Search History
                </ThemedText>
                <TouchableOpacity onPress={clearSearchHistory}>
                  <ThemedText style={styles.clearButton}>clear</ThemedText>
                </TouchableOpacity>
              </View>

              <View style={styles.historyContainer}>
                {searchHistory.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.historyItem}
                    onPress={() => handleHistoryItemPress(item)}
                  >
                    <ThemedText style={styles.historyText}>{item}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {!searchQuery && (
            <View style={styles.categoriesSection}>
              <View style={styles.categoryHeader}>
                <ThemedText style={styles.categoriesTitle}>
                  Browse Categories
                </ThemedText>
                {selectedCategory && (
                  <TouchableOpacity
                    onPress={() => handleCategoryPress(selectedCategory)}
                  >
                    <ThemedText style={styles.clearButton}>Show All</ThemedText>
                  </TouchableOpacity>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesScroll}
              >
                {categories.map((category, index) => (
                  <CategoryCard
                    key={index}
                    category={category}
                    style={{
                      width: CARD_WIDTH,
                      height: CARD_WIDTH * 0.5,
                      marginRight: index === categories.length - 1 ? 16 : 12,
                      marginLeft: index === 0 ? 16 : 0,
                      borderWidth: selectedCategory === category.name ? 2 : 0,
                      borderColor:
                        selectedCategory === category.name
                          ? "#000"
                          : "transparent",
                    }}
                    onPress={() => handleCategoryPress(category.name)}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          <ScrollView style={styles.productsSection}>
            <ThemedText style={styles.productsTitle}>
              {searchQuery
                ? `Search Results${
                    filteredProducts.length
                      ? ` (${filteredProducts.length})`
                      : ""
                  }`
                : selectedCategory
                ? `${selectedCategory} Products`
                : "All Products"}
            </ThemedText>
            {displayProducts.length > 0 ? (
              <View style={styles.productsGrid}>
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => openProductDetails(product)}
                    style={styles.productCard}
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noResults}>
                <ThemedText style={styles.noResultsText}>
                  {searchQuery ? "No products found" : "No products available"}
                </ThemedText>
              </View>
            )}
          </ScrollView>
        </View>
      </View>

      <ProductDetailsModal />
      <FilterDropdown
        isVisible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flex: 1,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3A3A3A0D",
    justifyContent: "center",
    alignItems: "center",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3A3A3A",
  },
  clearButton: {
    fontSize: 14,
    color: "#FF6B6B",
  },
  historyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
  },
  historyItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
  },
  historyText: {
    fontSize: 14,
    color: "#3A3A3A80",
  },
  categoriesSection: {
    marginTop: 24,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 12,
    width: wp(400),
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3A3A3A",
  },
  categoriesScroll: {
    paddingVertical: 8,
  },
  productsSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3A3A3A",
    marginBottom: 16,
    textTransform: "capitalize",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 2,
  },
  productCard: {
    width: "48%",
    marginHorizontal: 0,
  },
  noResults: {
    padding: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "#666",
  },
});

export default Search;
