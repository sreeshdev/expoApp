// import Input from "components/Input";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import OTPInput from "components/OtpInput";
import * as Actions from "modules/actions";
import * as ActionTypes from "modules/actions/action.types";
import PhoneInput from "react-native-international-phone-number";
import { connect } from "react-redux";
import { Button, Label, Text, XStack, YStack } from "tamagui";

const LoginScreen = (props) => {
  const { reqStatus, getOtp, verifyOtp, login, getToken } = props;
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [signInType, setSignInType] = useState(null);
  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [error, setError] = useState(false);
  const [otpInvalid, setOtpInvalid] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [resendOtp, setResendOtp] = useState(0);
  const resendOtpInterval = useRef();
  const maximumCodeLength = 6;

  useEffect(() => {
    switch (reqStatus) {
      case ActionTypes.GET_OTP_SUCCESS: {
        setSignInType("OTP");
        setOtpInvalid(false);
        const interval = setInterval(() => {
          setResendOtp((prev) => (prev === 0 ? 30 : prev - 1));
        }, 1000);
        resendOtpInterval.current = interval;
        break;
      }
      case ActionTypes.VERIFY_OTP_FAILURE: {
        setOtpInvalid(true);
        break;
      }
      case ActionTypes.VERIFY_OTP_SUCCESS: {
        login({ signature: otpCode });
        break;
      }

      case ActionTypes.LOGIN_SUCCESS: {
        getToken();
        break;
      }
      case ActionTypes.GET_TOKEN_SUCCESS: {
        if (props.isLoggedIn) {
          props.navigation.navigate("TabNavigator");
        }
        break;
      }
    }
  }, [reqStatus]);

  useEffect(() => {
    if (resendOtp === 0) {
      clearInterval(resendOtpInterval.current);
    }
  }, [resendOtp]);

  return (
    <KeyboardAvoidingView
      enabled={true}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainContainer}
    >
      <Pressable
        pressRetentionOffset={{ bottom: 0, left: 0, right: 0, top: 0 }}
        onPress={Keyboard.dismiss}
      >
        <View>
          <LinearGradient
            colors={["#7bfdde", "#03a07a"]}
            style={styles.bannerContainer}
          >
            <ImageBackground
              source={require("../../../assets/bannerBg.png")}
              resizeMode="contain"
              style={styles.bgimage}
            >
              {/* <View style={styles.innerBanner}>
                <Text style={styles.bannerText}>Welcome to SchoolWithMe</Text>
              </View> */}
            </ImageBackground>
          </LinearGradient>
          {!signInType && (
            <View style={styles.loginContainer}>
              <View style={{ width: "100%" }}>
                <Text style={styles.head}>SIGN IN</Text>
                <Label htmlFor="mobile">Mobile Number</Label>
                <PhoneInput
                  value={userName}
                  onChangePhoneNumber={setUserName}
                  selectedCountry={selectedCountry}
                  onChangeSelectedCountry={setSelectedCountry}
                  language="en"
                  defaultCountry="IN"
                  placeholder="Mobile Number"
                  // customMask={["##### #####"]}
                />
                {otpInvalid && <Text>OTP Invalid!</Text>}
                {/* <Input
                  size="$4"
                  borderWidth={2}
                  marginTop={10}
                  value={userName}
                  id="mobile"
                  keyboardType={"numeric"}
                  onChangeText={(val) => {
                    if (val.length <= 10) {
                      if (error) {
                        setError(false);
                        setUserName(val);
                      } else setUserName(val);
                    }
                  }}
                /> */}
                {/* <FormControl isInvalid={error} w="100%" maxW="400px">
                  <FormControl.Label>Mobile Number</FormControl.Label>
                  <Input
                    size="2xl"
                    value={userName}
                    placeholder="Enter Mobile"
                    keyboardType={"numeric"}
                    onChangeText={(val) => {
                      if (val.length <= 10) {
                        if (error) {
                          setError(false);
                          setUserName(val);
                        } else setUserName(val);
                      }
                    }}
                  />
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Mobile Number is required.
                  </FormControl.ErrorMessage>
                </FormControl> */}
              </View>

              <View style={styles.buttonContainer}>
                <Pressable
                  pressRetentionOffset={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                  }}
                  style={{ ...styles.button }}
                  onPress={() => {
                    const countryCode = selectedCountry?.callingCode.slice(1);
                    const removeMask = userName?.replace(/\s+/g, "");
                    userName
                      ? getOtp({
                          userName: countryCode + removeMask,
                        })
                      : setError(true);
                  }}
                >
                  <LinearGradient
                    colors={["#02664F", "#005441"]}
                    start={{ y: 1.0, x: 0.0 }}
                    end={{ y: 0.0, x: 1.0 }}
                    style={{ ...styles.button }}
                  >
                    <Text style={styles.buttonText}> GET OTP </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          )}
          {signInType === "OTP" && (
            <View style={{ ...styles.loginContainer, borderBottomWidth: 0 }}>
              <View style={{ width: "100%" }}>
                <Text style={{ ...styles.head, marginBottom: "10%" }}>
                  Enter OTP
                </Text>
                {/* <FormControl isInvalid={otpInvalid}> */}
                <OTPInput
                  code={otpCode}
                  setCode={setOTPCode}
                  maximumLength={maximumCodeLength}
                  setIsPinReady={setIsPinReady}
                />
                <YStack alignItems="flex-end">
                  <Button
                    marginVertical={10}
                    chromeless
                    color={"#005542"}
                    onPress={() => {
                      const countryCode = selectedCountry?.callingCode.slice(1);
                      const removeMask = userName?.replace(/\s+/g, "");
                      getOtp({
                        userName: countryCode + removeMask,
                      });
                    }}
                    disabled={resendOtp !== 0}
                  >
                    <XStack gap={5}>
                      <Text color={resendOtp ? "#adadad" : "#005542"}>
                        Resend OTP {resendOtp ? resendOtp : ""}
                      </Text>
                    </XStack>
                  </Button>
                </YStack>
                {/* <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    Otp Invalid!
                  </FormControl.ErrorMessage>
                </FormControl> */}
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      setSignInType(null);
                      setOTPCode("");
                    }}
                    icon={
                      <Image
                        source={require("../../../assets/chevronLeft.png")}
                      />
                    }
                    size="$6"
                    chromeless
                    color={"#005542"}
                    fontWeight={600}
                  >
                    Back
                  </Button>
                  <Pressable
                    pressRetentionOffset={{
                      bottom: 0,
                      left: 0,
                      right: 0,
                      top: 0,
                    }}
                    style={{ ...styles.loginButton, flex: 0.5 }}
                    onPress={() => {
                      Keyboard.dismiss();
                      otpCode.length === 6
                        ? verifyOtp({ signature: otpCode })
                        : setError(true);
                    }}
                  >
                    <LinearGradient
                      colors={["#02664F", "#005441"]}
                      style={{ ...styles.loginButton, flex: 0.5 }}
                      start={{ y: 1.0, x: 0.0 }}
                      end={{ y: 0.0, x: 1.0 }}
                    >
                      <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
          {/* {signInType === "PASSWORD" && (
            <View style={{ ...styles.loginContainer, borderBottomWidth: 0 }}>
              <View style={{ width: "100%" }}>
                <Text style={{ ...styles.head, marginBottom: "10%" }}>
                  Enter Credentials
                </Text>
                <VStack space="2.5">
                  <Input
                    size="2xl"
                    label={""}
                    value={userName}
                    disabled={true}
                  />
                  <Input
                    size="2xl"
                    label={""}
                    value={password}
                    onChangeText={setPassword}
                  />
                </VStack>
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => setSignInType(null)}
                    leftIcon={
                      <Image
                        source={require("../../../assets/chevronLeft.png")}
                      />
                    }
                    size="lg"
                    variant="ghost"
                    _text={styles.GreenText}
                  >
                    Back
                  </Button>
                  <Pressable
                    pressRetentionOffset={{
                      bottom: 0,
                      left: 0,
                      right: 0,
                      top: 0,
                    }}
                    onPress={() => props.login({ userName, password })} //props.navigation.navigate("TabNavigator")
                    style={{ ...styles.button, flex: 0.2 }}
                  >
                    <LinearGradient
                      colors={["#02664F", "#005441"]}
                      style={{ ...styles.button }}
                      start={{ y: 1.0, x: 0.0 }}
                      end={{ y: 0.0, x: 1.0 }}
                    >
                      <Image
                        source={require("../../../assets/arrowRightWhite.png")}
                      />
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </View>
          )} */}
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.AppBaseReducer.isLoggedIn,
    reqStatus: state.AppBaseReducer.reqStatus,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
