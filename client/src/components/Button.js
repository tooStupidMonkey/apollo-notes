import React from "react";
import styled from "styled-components";
import {View, Text} from "react-native";

const TouchableOpacityStyles = styled.TouchableOpacity`
  height: 30px;
  margin: 30px auto;
`;

const TextStyles = styled.Text`
  font-size: 20px;

`;

const Button  = ({styles, action, text, icon}) =>{
 return (
  <View>
   <TouchableOpacityStyles onPress={action}>
    <TextStyles style={styles}>
     {icon}{text}
    </TextStyles>
   </TouchableOpacityStyles>
  </View>
 );
};

Button.defaultProps = {
 text: "Submit",
 action: () => alert("Submit"),
 styles: {},
 icon: ""
};

export default Button;