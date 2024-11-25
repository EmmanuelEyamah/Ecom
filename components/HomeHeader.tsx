import { View, StyleSheet, Pressable } from "react-native";
import React, { FC } from "react";
import ThemedText from "@/components/ThemedText";
import Feather from "@expo/vector-icons/Feather";
import { hp, wp } from "@/utils/config";

export interface HeaderProps {
  userName?: string;
  welcomeMessage?: string;
  onPress?: () => void;
}

export const HomeHeader: FC<HeaderProps> = ({
  userName = "Eyamah Emmanuel",
  welcomeMessage = "Welcome to Bridge Merchant’s Store",
  onPress,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Pressable onPress={onPress} style={styles.menuIcon}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </Pressable>
        <View style={styles.welcomeText}>
          <ThemedText style={styles.welcomeLabel} fontSize={14}>
            {welcomeMessage}
          </ThemedText>
          <ThemedText style={styles.userName} fontSize={15} fontWeight={600}>
            {userName}
          </ThemedText>
        </View>
      </View>

      <View style={styles.headerRight}>
        <Pressable style={styles.notificationBtn}>
          <Feather name="bell" size={24} color="black" />
        </Pressable>
        <View style={styles.profileCircle}>
          <ThemedText style={styles.profileInitial} fontSize={14}>
            E
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  headerLeft: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },
  menuIcon: {
    width: wp(24),
    height: hp(24),
    justifyContent: "center",
    gap: 4,
  },
  menuLine: {
    width: "100%",
    height: 2,
    backgroundColor: "#000",
    borderRadius: 2,
  },
  welcomeText: {
    gap: 4,
  },
  welcomeLabel: {
    color: "#666666",
  },
  userName: {
    color: "#000000",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  notificationBtn: {
    width: wp(40),
    height: hp(40),
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCircle: {
    width: wp(36),
    height: hp(36),
    borderRadius: 16,
    backgroundColor: "#E7E5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#12AF37",
  },
});
