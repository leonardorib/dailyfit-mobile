import React from "react";
import { View, Text, Platform } from "react-native";
import Header from "../../components/Header";
import { SafeAreaView, KeyboardAvoidingView, ScrollView } from "./styles";

const Profile: React.FC = () => {
  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView>
          <View
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
            }}
          >
            <Header />

            <Text style={{ fontSize: 30 }}>Seu Perfil</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Profile;
