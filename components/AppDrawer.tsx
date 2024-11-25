import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from "react-native";
import ThemedText from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDrawerStore } from "@/hooks/store/drawerStore";

const { width, height } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.8;
const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? 44 : StatusBar.currentHeight || 0;

interface DrawerItemProps {
  icon: React.ComponentProps<typeof Feather>["name"];
  title: string;
  onPress?: () => void;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
    <Feather name={icon} size={24} color="#333" style={styles.drawerItemIcon} />
    <ThemedText style={styles.drawerItemText}>{title}</ThemedText>
  </TouchableOpacity>
);

export const AppDrawer: React.FC = () => {
  const { isOpen, closeDrawer } = useDrawerStore();

  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      openDrawerAnimation();
    } else {
      closeDrawerAnimation();
    }
  }, [isOpen]);

  const openDrawerAnimation = () => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 40,
        friction: 10,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0.5,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawerAnimation = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropOpacity,
            display: isOpen ? "flex" : "none",
          },
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={closeDrawer}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <SafeAreaView style={styles.drawerContent}>
          {/* Header */}
          <View style={styles.drawerHeader}>
            <View style={styles.profileSection}>
              <View style={styles.profileImage}>
                <ThemedText style={styles.profileInitial}>E</ThemedText>
              </View>
              <View>
                <ThemedText style={styles.profileName}>
                  Eyamah Emmanuel
                </ThemedText>
                <ThemedText style={styles.profileEmail}>
                  officialeminz@gmail.com
                </ThemedText>
              </View>
            </View>
            <TouchableOpacity onPress={closeDrawer}>
              <Feather name="x" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Drawer Items */}
          <View style={styles.drawerItems}>
            <DrawerItem icon="home" title="Home" onPress={() => {}} />
            <DrawerItem
              icon="shopping-cart"
              title="My Orders"
              onPress={() => {}}
            />
            <DrawerItem icon="user" title="Profile" onPress={() => {}} />
            <DrawerItem icon="settings" title="Settings" onPress={() => {}} />
          </View>

          {/* Footer */}
          <View style={styles.drawerFooter}>
            <DrawerItem icon="log-out" title="Logout" onPress={() => {}} />
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  },
  drawerContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: "white",
    zIndex: 101,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  drawerContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E7E5FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#12AF37",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
  },
  profileEmail: {
    fontSize: 12,
    color: "#666",
  },
  drawerItems: {
    marginTop: 20,
    gap: 15,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  drawerItemIcon: {
    marginRight: 10,
  },
  drawerItemText: {
    fontSize: 16,
    color: "#333",
  },
  drawerFooter: {
    marginTop: "auto",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
});

export default AppDrawer;
