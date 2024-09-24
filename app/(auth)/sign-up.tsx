import { Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import { useState } from "react";
import InputField from "@/components/input-field";
import { CustomButton } from "@/components/custom-button";
import { Link } from "expo-router";
import OAuth from "@/components/oauth";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {};

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
            Create Your Account
          </Text>
          <View className={"p-5"}>
            <InputField
              label={"Name"}
              autoFocus={true}
              placeholder={"Enter your name"}
              icon={icons.person}
              value={form.name}
              onChangeText={(e) => setForm({ ...form, name: e })}
            />
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
              title={"Sign Up"}
              onPress={onSignUpPress}
              className={"mt-6"}
            />

            <OAuth />

            <Link
              href={"/sign-in"}
              className={"text-lg text-center text-general-200 mt-10"}
            >
              <Text>Already have an account? </Text>
              <Text className={"text-primary-500"}>Log In</Text>
            </Link>
          </View>

          {/* Verification Modal */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
