import { FlatList, Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupItem from '../../components/GroupItem';
import { logos } from '../../constants/images';


const data = [
    { groupName: 'Group 1', description: 'This is group 1' },
    { groupName: 'Group 2', description: 'This is group 2' },
    { groupName: 'Group 3', description: 'This is group 3' },
    { groupName: 'Group 2', description: 'This is group 2' },
    { groupName: 'Group 3', description: 'This is group 3' },
    { groupName: 'Group 2', description: 'This is group 2' },
    { groupName: 'Group 3', description: 'This is group 3' },
    // Add more items as needed
];

const Home = () => {
    // Handle group press
    const handleGroupPress = (groupName) => {
        Alert.alert('Group Selected', `You selected ${groupName}`);
    };

    return (
        <SafeAreaView className="flex-1 bg-backGroundColor p-4">
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <GroupItem
                        name={item.groupName}
                        description={item.description}
                        groupImage={logos.first}
                        handlePress={() => handleGroupPress(item.groupName)}
                        containerStyle="mb-4"
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
};

export default Home;
