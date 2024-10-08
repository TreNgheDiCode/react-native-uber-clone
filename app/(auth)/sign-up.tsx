import { Alert, Image, ScrollView, Text, View } from "react-native";
import { icons, images } from "@/constants";
import { useState } from "react";
import InputField from "@/components/input-field";
import { CustomButton } from "@/components/custom-button";
import { Link, router } from "expo-router";
import OAuth from "@/components/oauth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // TODO: Create a database user
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
          code: "",
        });
        console.error(JSON.stringify(completeSignUp, null, 2));
        Alert.alert("Error", "Verification failed");
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
        code: "",
      });
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

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

          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() => {
              if (verification.state === "success") {
                setShowSuccessModal(true);
              }
            }}
          >
            <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
              <Text className={"text-2xl font-JakartaExtraBold mb-2"}>
                Verification
              </Text>
              <Text className={"font-Jakarta mb-5"}>
                We've sent a verification code to {form.email}
              </Text>
              <InputField
                label={"Code"}
                icon={icons.lock}
                placeholder={"12345"}
                value={verification.code}
                keyboardType={"numeric"}
                onChangeText={(code) =>
                  setVerification({ ...verification, code })
                }
              />
              {verification.error && (
                <Text className={"text-red-500 text-sm mt-1.5"}>
                  {verification.error}
                </Text>
              )}

              <CustomButton
                title={"Verify Email"}
                onPress={onPressVerify}
                className={"mt-5 bg-success-500"}
              />
            </View>
          </ReactNativeModal>

          <ReactNativeModal isVisible={showSuccessModal}>
            <View className={"bg-white px-7 py-9 rounded-2xl min-h-[300px]"}>
              <Image
                source={images.check}
                className={"w-[110px] h-[110px] mx-auto my-5"}
              />
              <Text className={"text-3xl font-JakartaBold text-center"}>
                Verified
              </Text>
              <Text
                className={
                  "text-base text-gray-400 font-Jakarta text-center mt-2"
                }
              >
                You have successfully verified your account.
              </Text>

              <CustomButton
                title={"Browse Home"}
                onPress={() => router.replace("/(root)/(tabs)/home")}
                className={"mt-5"}
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
