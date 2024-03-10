import {Image, Text, View} from "@gluestack-ui/themed";
import React from "react";
import {StyleSheet} from "react-native";
import {CustomOrganizationSwitcher} from "../../../components/CustomOrgSwitcher";
import {useOrganization, useUser} from "@clerk/clerk-expo";
import LabelAndValue from "../../../components/LabelAndValue";

export default function OrganisationSettings() {
    const {user} = useUser();
    const {organization} = useOrganization();
    return (
        <View style={styles.content}>
            <View style={{height: "100%"}}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.headingText}>User Details</Text>
                    <LabelAndValue label={'Name'} value={user?.fullName}/>
                    <LabelAndValue label={'Email'} value={user?.emailAddresses[0].emailAddress}/>
                    <LabelAndValue label={'Phone'} value={user?.phoneNumbers[0].phoneNumber ?? "-"}/>
                </View>
                <View height={'$full'} style={styles.detailsContainer}>
                    <Text style={styles.headingText}>Organisation Details</Text>
                    {organization?.hasImage &&
                        <Image alt={'image'} source={{uri: organization.imageUrl}} resizeMode={"contain"}
                               style={{width: 50, height: 50}}/>
                    }
                    <CustomOrganizationSwitcher/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        gap: 16,
    },
    headingText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    detailsText: {
        fontSize: 16,
    },
    detailsContainer: {
        gap: 16,
        margin: 16,
    }

});