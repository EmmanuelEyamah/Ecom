// components/FilterDropdown.tsx
import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import {
  FilterOption,
  SortOption,
  useFilterStore,
} from "@/hooks/store/filterStore";

const { width } = Dimensions.get("window");

interface FilterDropdownProps {
  isVisible: boolean;
  onClose: () => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isVisible,
  onClose,
}) => {
  const { sortBy, filterCategory, setSortBy, setFilterCategory, resetFilters } =
    useFilterStore();

  // Animated values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Sort options
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "highRated", label: "Highest Rated" },
    { value: "lowPrice", label: "Lowest Price" },
  ];

  // Filter category options
  const categoryOptions: { value: FilterOption; label: string }[] = [
    { value: "all", label: "All Categories" },
    { value: "men", label: "Men's Clothing" },
    { value: "women", label: "Women's Clothing" },
    { value: "electronics", label: "Electronics" },
    { value: "jewelry", label: "Jewelry" },
  ];

  // Animation effect
  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 40,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 40,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  // Render filter section
  const renderFilterSection = (
    title: string,
    options: { value: string; label: string }[],
    currentValue: string,
    onSelect: (value: any) => void
  ) => (
    <View style={styles.filterSection}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.filterOption,
              currentValue === option.value && styles.selectedOption,
            ]}
            onPress={() => onSelect(option.value)}
          >
            <ThemedText
              style={[
                styles.optionText,
                currentValue === option.value && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // Backdrop and animated container
  return (
    <>
      {isVisible && (
        <TouchableOpacity
          style={styles.backdrop}
          onPress={onClose}
          activeOpacity={1}
        />
      )}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [300, 0],
                }),
              },
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Filter & Sort</ThemedText>
          <TouchableOpacity onPress={resetFilters}>
            <ThemedText style={styles.resetText}>Reset</ThemedText>
          </TouchableOpacity>
        </View>

        {renderFilterSection("Sort By", sortOptions, sortBy, (value) =>
          setSortBy(value as SortOption)
        )}

        {renderFilterSection(
          "Category",
          categoryOptions,
          filterCategory,
          (value) => setFilterCategory(value as FilterOption)
        )}

        <TouchableOpacity style={styles.applyButton} onPress={onClose}>
          <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    zIndex: 101,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  resetText: {
    color: "#FF6B6B",
    fontSize: 14,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterOption: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  selectedOption: {
    backgroundColor: "#E7E5FF",
  },
  optionText: {
    fontSize: 14,
    color: "#3A3A3A",
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
  applyButton: {
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#3A3A3A",
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FilterDropdown;
