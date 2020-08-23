import React from "react";
import {View, Text, FlatList, SafeAreaView} from "react-native";
import { Query } from "react-apollo";
import {CommonStyles} from "@/styles/index";
import LogOut from "@/components/LogOut";
import NoteItem from "@/components/NoteItem";
import ListHeader from "@/components/ListHeader";
import {GET_NOTES} from "@/utils/queries";

export default () => {
    return (
        <SafeAreaView style={CommonStyles.container}>
            <View>
                <LogOut />
            </View>
            <Query
                query={GET_NOTES}
                fetchPolicy='network-only'
            >
                {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) {
                        return <Text>Error :(</Text>;
                    } 
                    if (!data.notes.notes.length) {
                        return <Text>No data</Text>;
                    }
                    return (
                        <FlatList
                            data={data.notes.notes}
                            renderItem={({ item }) => <NoteItem item={item} />}
                            keyExtractor={item => String(item.id)}
                            ListHeaderComponent={<ListHeader totalResults={data.notes.notes.length} />}
                            extraData={data.notes.notes}
                        />
                    );
                }}
            </Query>
        </SafeAreaView>
    );
};