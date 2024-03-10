import {useOrganization, useOrganizationList} from "@clerk/clerk-expo";
import {Checkbox, CheckboxIndicator, FlatList, HStack, Text, View} from "@gluestack-ui/themed";
import React, {useState} from "react";
import {StyleSheet} from "react-native";
import {CheckIcon} from "lucide-react-native";
import {OrganizationMembershipResource} from "@clerk/types";

export const CustomOrganizationSwitcher = () => {
    const {organization} = useOrganization();
    const [selectedOrgId, setSelectedOrgId] = useState<string | null
    >(organization?.id || null);

    const {isLoaded, setActive, userMemberships} = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    if (!isLoaded) {
        return <p>Loading</p>;
    }

    const handleSelect = (orgId: string) => {
        setSelectedOrgId(orgId); // Update the state with the new selection
        setActive({organization: orgId}); // Call setActive with the selected organization ID
    };

    const renderItem = (mem: OrganizationMembershipResource) => (
        <View style={styles.orgItem}>
            <HStack style={{width: '100%', justifyContent: 'space-between'}}>
                <Text>{mem.organization.name}</Text>
                <Checkbox size={'lg'} aria-label={'test'} isChecked={selectedOrgId === mem.organization.id}
                          value={mem.organization.id}
                          onChange={() => handleSelect(mem.organization.id)}>
                    <CheckboxIndicator>
                        <CheckIcon color={'white'}/>
                    </CheckboxIndicator>
                </Checkbox>
            </HStack>
        </View>
    );

    return (
        <View style={{flex: 1, paddingHorizontal: 4}}>
            <FlatList
                data={userMemberships.data}
                renderItem={({item}) => renderItem(item as OrganizationMembershipResource)}
                keyExtractor={(item: any) => item.organization.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    activeOrgText: {
        fontWeight: '500',
    },
    orgItem: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 6,
    }
})