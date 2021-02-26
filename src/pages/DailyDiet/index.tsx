import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import AuthContext from "../../contexts/auth";

const DailyDiet: React.FC = () => {
  const { handleSignOut } = useContext(AuthContext);
  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 40, marginBottom: 200 }}>
        DailyDiet Dashboard
      </Text>
      <Button title="Logout" onPress={handleSignOut} />
    </View>
  );
};

export default DailyDiet;
