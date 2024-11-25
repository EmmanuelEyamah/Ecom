import { View, StyleSheet, ScrollView } from "react-native";
import React, { FC } from "react";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeHeader } from "@/components/HomeHeader";
import { ProductCarousel } from "@/components/ProductCarousel";
import TopProductsSection from "@/components/TopProductsSection ";
import { useDrawerStore } from "@/hooks/store/drawerStore";
import AppDrawer from "@/components/AppDrawer";
import { useProductDetailStore } from "@/hooks/store/productDetailStore";
import ProductDetailsModal from "@/components/ProductDetailsModal";

export interface HomeProps {}
export const Home: FC<HomeProps> = () => {
  const { toggleDrawer } = useDrawerStore();
  const { openProductDetails } = useProductDetailStore();

  return (
    <SafeAreaView style={styles.container}>
      <HomeHeader onPress={toggleDrawer} />
      <ProductCarousel />
      <AppDrawer />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TopProductsSection onProductPress={openProductDetails} />
      </ScrollView>

      <ProductDetailsModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
