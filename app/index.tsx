import { Redirect, useRootNavigationState } from "expo-router";
import { FC } from "react";
import { Text, View } from "react-native";

export interface HomeProps {}
const HomePage: FC<HomeProps> = ({}) => {
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>loading</Text>
      </View>
    );
  }

  return <Redirect href={"/(home)"} />;
};
export default HomePage;
