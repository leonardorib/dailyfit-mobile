import React from "react";
import { View, Text, Button, Platform } from "react-native";

import { SafeAreaView, KeyboardAvoidingView, ScrollView } from "./styles";

import Header from "../../components/Header";
import Meal from "../../components/Meal";

const DailyDiet: React.FC = () => {
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
            <Meal />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DailyDiet;
