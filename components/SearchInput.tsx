import { hp } from "@/utils/config";
import { Feather } from "@expo/vector-icons";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchInputProps {
  placeholder: string;
  onSearch: (text: string) => void;
  value: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  value,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Feather name="search" size={24} color={"#3A3A3A4D"} />
        <TextInput
          style={[styles.textInput, { height: hp(40) }]}
          placeholder={placeholder}
          placeholderTextColor={"#3A3A3A4D"}
          value={value}
          onChangeText={onSearch}
          onSubmitEditing={() => onSearch(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 18,
    marginTop: 12,
    width: "100%",
    backgroundColor: "#3A3A3A0D",
  },
  textInput: {
    fontSize: 16,
    marginTop: 2,
    marginLeft: 10,
    color: "#3A3A3A4D",
    flex: 1,
    fontFamily: "Nunito-Regular",
  },
});

export default SearchInput;
