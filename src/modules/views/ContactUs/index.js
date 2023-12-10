import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Linking, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Button, Card, Text, XStack, YStack } from "tamagui";
import { styles } from "./styles";
import * as Actions from "modules/actions";
import { Image } from "expo-image";

const ContactUs = (props) => {
  const { studentDetails, institutesList } = props;
  const instituteContactDetails = institutesList?.find(
    ({ id }) => id === studentDetails?.instituteId
  );
  return (
    <LinearGradient
      colors={["#22b693", "#03a07a"]}
      style={styles.mainContainer}
    >
      <ScrollView style={styles.scrollContainer}>
        <YStack gap={15} paddingBottom={50}>
          <Card size="$4" bordered style={styles.innerContainer}>
            <YStack gap={5}>
              <XStack alignItems="center" gap={10}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  contentFit="contain"
                  source={require("../../../assets/online.svg")}
                />
                <Text fontSize={16} fontWeight={700}>
                  Online
                </Text>
              </XStack>
              <XStack
                borderWidth={1}
                borderRadius={50}
                paddingHorizontal={10}
                paddingVertical={10}
                borderColor={"#22b693"}
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize={14} fontWeight={500}>
                  Ask Us
                </Text>
                <Button
                  backgroundColor={"#22b693"}
                  borderRadius={50}
                  padding={5}
                  width={30}
                  height={30}
                  onPress={() => props.navigation.navigate("AskUsForm")}
                >
                  <Image
                    style={{
                      width: 23,
                      height: 23,
                    }}
                    contentFit="contain"
                    source={require("../../../assets/forward.svg")}
                  />
                </Button>
              </XStack>
            </YStack>
          </Card>
          <Card size="$4" bordered style={styles.innerContainer}>
            <YStack gap={5}>
              <XStack alignItems="center" gap={10}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  contentFit="contain"
                  source={require("../../../assets/phoneCall2.svg")}
                />
                <Text fontSize={16} fontWeight={700}>
                  By Phone
                </Text>
              </XStack>
              {instituteContactDetails?.addresses?.map((address) => (
                <YStack gap={15}>
                  {address?.phoneDetails?.map((phone) =>
                    phone?.phoneWithCountryCode ? (
                      <XStack
                        borderWidth={1}
                        borderRadius={50}
                        paddingHorizontal={10}
                        paddingVertical={10}
                        borderColor={"#22b693"}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <YStack>
                          {phone?.name && (
                            <Text fontSize={14} fontWeight={500}>
                              {phone?.name}
                            </Text>
                          )}
                          <Text fontSize={12} color={"grey"} fontWeight={500}>
                            {`+${phone?.phoneWithCountryCode}`}
                          </Text>
                        </YStack>
                        <Button
                          backgroundColor={"#22b693"}
                          borderRadius={50}
                          padding={5}
                          width={30}
                          height={30}
                          onPress={() =>
                            Linking.openURL(
                              `tel:+${phone?.phoneWithCountryCode}`
                            )
                          }
                        >
                          <Image
                            style={{
                              width: 23,
                              height: 23,
                            }}
                            contentFit="contain"
                            source={require("../../../assets/phoneCall.svg")}
                          />
                        </Button>
                      </XStack>
                    ) : null
                  )}
                </YStack>
              ))}
            </YStack>
          </Card>
          <Card size="$4" bordered style={styles.innerContainer}>
            <YStack gap={5}>
              <XStack alignItems="center" gap={10}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  contentFit="contain"
                  source={require("../../../assets/emailSent.svg")}
                />
                <Text fontSize={16} fontWeight={700}>
                  By E-Mail
                </Text>
              </XStack>
              {instituteContactDetails?.addresses?.map((address) => (
                <YStack gap={15}>
                  {address?.emailDetails?.map(({ name, email }) =>
                    email ? (
                      <XStack
                        borderWidth={1}
                        borderRadius={50}
                        paddingHorizontal={10}
                        paddingVertical={10}
                        borderColor={"#22b693"}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <YStack>
                          <Text fontSize={14} fontWeight={500}>
                            {name}
                          </Text>
                          <Text fontSize={12} color={"grey"} fontWeight={500}>
                            {email}
                          </Text>
                        </YStack>
                        <Button
                          backgroundColor={"#22b693"}
                          borderRadius={50}
                          padding={5}
                          width={30}
                          height={30}
                          onPress={() => Linking.openURL(`mailto:${email}`)}
                        >
                          <Image
                            style={{
                              width: 25,
                              height: 25,
                            }}
                            contentFit="contain"
                            source={require("../../../assets/email.svg")}
                          />
                        </Button>
                      </XStack>
                    ) : null
                  )}
                </YStack>
              ))}
            </YStack>
          </Card>
          <Card size="$4" bordered style={styles.innerContainer}>
            <YStack gap={10}>
              <XStack alignItems="center" gap={10}>
                <Image
                  style={{
                    width: 28,
                    height: 28,
                  }}
                  contentFit="contain"
                  source={require("../../../assets/address-pin.svg")}
                />
                <Text fontSize={16} fontWeight={700}>
                  Address
                </Text>
              </XStack>
              {instituteContactDetails?.addresses?.map((address) => (
                <YStack gap={5}>
                  <Text fontWeight={500}>{address?.name}</Text>
                  <Text>
                    {address?.addressLine1} {address?.addressLine2}{" "}
                    {address?.city} {address?.state}{" "}
                    {address?.zipCode ? `- ${address?.zipCode}` : ""}
                  </Text>
                </YStack>
              ))}
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => {
  return {
    studentDetails: state.AppBaseReducer?.studentDetails,
    institutesList: state.AppBaseReducer.institutesList,
  };
};

const mapDispatchToProps = {
  ...Actions,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
