import React from "react";
import {View, Text} from "react-native";
import {Note} from "@/styles/index";
import styled from "styled-components";

const HeaderStyles = styled.Text`
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 25px;
`;

export default ({totalResults}) => {
 return (
  <View style={Note.header}>
   <HeaderStyles>Total amount: {totalResults}</HeaderStyles>
  </View>
 );
};