import { View, StyleSheet } from "react-native";
import React, { FC } from "react";
import ThemedText from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";

export interface TrendProps {}
export const Trend: FC<TrendProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <EmptyState
        title="Trend Coming Soon"
        description="We're working on creating a personalized trend experience for you."
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
