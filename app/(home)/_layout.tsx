import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import ThemedText from "@/components/ThemedText";
import { fs, hp } from "@/utils/config";

interface TabIconProps {
  color: string;
  name: string;
  focused: boolean;
  icon: (props: { color: string; size: number }) => React.ReactNode;
}

const TabIcon: React.FC<TabIconProps> = ({
  icon: IconComponent,
  color,
  name,
  focused,
}) => {
  return (
    <View style={styles.tabIconContainer}>
      <IconComponent color={color} size={24} />
      <ThemedText
        style={[
          styles.tabText,
          { color: color, fontWeight: focused ? "600" : "400" },
        ]}
      >
        {name}
      </ThemedText>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#12AF37",
          tabBarInactiveTintColor: "#3A3A3AB2",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 70,
            paddingBottom: 20,
            paddingTop: 10,
          },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_disableSound={true}
              android_ripple={null}
              style={styles.press}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={(props) => <Ionicons name="home" {...props} />}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={(props) => <AntDesign name="search1" {...props} />}
                color={color}
                name="Search"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="trend"
          options={{
            title: "Trend",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={(props) => <FontAwesome5 name="chart-line" {...props} />}
                color={color}
                name="Trend"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: "Order",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={(props) => <AntDesign name="shoppingcart" {...props} />}
                color={color}
                name="Order"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={(props) => <Ionicons name="person" {...props} />}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor={"#fff"} style={"dark"} />
    </>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: hp(50),
    paddingTop: 5,
  },
  tabText: {
    fontSize: fs(10),
    marginTop: 4,
  },
  press: {
    marginLeft: 25,
    marginTop: 5,
  },
});

export default TabLayout;
