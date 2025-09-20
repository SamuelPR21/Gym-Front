import { View } from 'react-native';
import List from '../componets/Excersice/listExcercises';



export default function Exercise() {
    return (
        <View className="flex-1 justify-center items-center bg-gray-900">
            <List />
        </View>
    );
}