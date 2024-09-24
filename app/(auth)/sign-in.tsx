import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import { useState } from "react";
import InputField from "@/components/input-field";
import { CustomButton } from "@/components/custom-button";
import { Link } from "expo-router";
import OAuth from "@/components/oauth";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className={"bg-white"} contentContainerStyle={{ flexGrow: 1 }}>
      <View className={"flex-1 bg-white"}>
        <View className={"relative w-full h-[250px]"}>
          <Image source={images.signUpCar} className={"z-0 w-full h-[250px]"} />
          <Text
            className={
              "text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5"
            }
          >
            Welcome 👋
          </Text>
          <View className={"p-5"}>
            <InputField
              label={"Email"}
              autoComplete={"email"}
              placeholder={"Enter your email"}
              icon={icons.email}
              value={form.email}
              onChangeText={(e) => setForm({ ...form, email: e })}
            />
            <InputField
              label={"Password"}
              autoComplete={"password"}
              placeholder={"Enter your password"}
              secureTextEntry={true}
              icon={icons.lock}
              value={form.password}
              onChangeText={(e) => setForm({ ...form, password: e })}
            />
            <CustomButton
              title={"Sign In"}
              onPress={onSignInPress}
              className={"mt-6"}
            />

            <OAuth />

            <Link
              href={"/sign-up"}
              className={"text-lg text-center text-general-200 mt-10"}
            >
              <Text>Don't have an account? </Text>
              <Text className={"text-primary-500"}>Sign Up</Text>
            </Link>
          </View>

          {/* Verification Modal */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
