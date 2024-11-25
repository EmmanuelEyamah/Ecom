import { View, StyleSheet } from "react-native";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "@/components/EmptyState";

export interface ProfileProps {}
export const Profile: FC<ProfileProps> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <EmptyState
        title="Profile Coming Soon"
        description="We're working on creating a personalized profile experience for you."
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
