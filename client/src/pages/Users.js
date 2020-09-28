import React from "react";
import { useQuery } from "@apollo/react-hooks";
import {View, Text, StyleSheet, Animated, Easing, ActivityIndicator, FlatList, Dimensions} from "react-native";
import {FETCH_USERS} from "@/utils/queries";
import UserCard from "@/components/UserCard";
import {SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: "center"
 },
 listContainer: {
  display: "flex",
  alignItems: "center"
 },
 horizontal: {
  flexDirection: "row",
  justifyContent: "space-around",
  padding: 10
 },
 listHeader: {
  textAlign: "center",
  marginTop: 10,
  width: Dimensions.get("window").width,
  marginBottom: 20
 }
});

export default () => {
 const {data} = useQuery(FETCH_USERS);

 if (data) {
  return (
   <SafeAreaView>
    <FlatList
     contentContainerStyle={styles.listContainer}
     numColumns={3}
     data={data.users}
     renderItem={({ item }) => <UserCard user={item} />}
     keyExtractor={item => String(item.id)}
     ListHeaderComponent={<Text style={styles.listHeader}>Active users</Text>}
     extraData={data.users}
    />
   </SafeAreaView>
  );
 }
 return (
  <View style={[styles.container, styles.horizontal]}>
   <ActivityIndicator size="large" color="#0000ff" />
  </View>
 );
};
