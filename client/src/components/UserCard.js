import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import {URL_IMAGES} from "@/utils/constans";
import styled from "styled-components";

const UserName = styled.Text`
  margin-top: 20;
  text-align: center;
  font-size: 17px;
`;


const Styles = StyleSheet.create({
 container: {
  display: "flex",
  alignItems: "center",
  maxWidth: 150,
  padding: 20,
  shadowColor: "#000",
  shadowOffset: {
   width: 2,
   height: 6,
  },
  shadowOpacity: 0.97,
  shadowRadius: 7.49,
  elevation: 12,
 },
 marginLeft: (value) => ({ marginTop: value }),
 nameContainer: {
  textAlign: "center",

 }
});

export default ({ user }) => {
 const navigation = useNavigation();
 console.log("user.avatar", user);
 return (
  <SafeAreaView>
   <TouchableWithoutFeedback onPress={() => navigation.push("Edit User", user)}>
    <View style={Styles.container}>
     <View>
      {
       user.avatar ?
        <Image 
         source={{ uri: URL_IMAGES + user.avatar }} 
         style={{ width: 120, height: 120, borderRadius: 100, marginTop: 20 }}
        /> :
        <Icon
         name="user"
         size={55}
        />
      }
     </View>
     <View>
      <UserName>            
       {user.firstName} {user.lastName}
      </UserName>
            
     </View>
    </View>
   </TouchableWithoutFeedback>
  </SafeAreaView>
 );
};