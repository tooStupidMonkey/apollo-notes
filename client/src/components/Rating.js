import React from "react";
import {View, StyleSheet} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Dimensions } from "react-native";


export const CommonStyles = StyleSheet.create({
 container: {
  width:  Dimensions.get("window").width - 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
 }
});

const StartIcon = ({index, action, active}) => (
 <Button
  onPress={()=>action(index)}
  icon={
   <Icon
    name={index <= active ? "star" : "star-o"}
    size={15}
   />
  }
  type={"clear"}
 />
); 

const Rating = ({action, amount = 6, active = 0}) => {
 let starts = [];
 for (i=1; i < amount; i++) {
  starts.push(<StartIcon key={i} index={i} action={action}  active={active} />);
 }
 return (
  <View style={CommonStyles.container}>
   {starts}
  </View>
 );
};

export default Rating;
