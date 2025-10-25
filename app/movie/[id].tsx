import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  
  return (
    <View className="flex-1 bg-primary">
      <Text className="text-white">Movie ID: {id}</Text>
    </View>
  );
}