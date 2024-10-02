import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
}
type UserDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetails'
>;
const UserListItem = (props: IUser) => {
  const { name, id, email, age } = props;
  const { layout, gutters, fonts, backgrounds, borders } = useTheme();
  const navigation = useNavigation<UserDetailsScreenNavigationProp>();

  return (
    <TouchableOpacity
      key={id}
      style={[
        gutters.marginBottom_16,
        borders.w_1,
        borders.purple500,
        borders.rounded_16,
        layout.fullWidth,
      ]}
      onPress={() => {
        navigation.navigate('UserDetails', {
          userID: id,
        });
      }}
    >
      <View
        style={[
          layout.row,
          layout.itemsCenter,
          backgrounds.red500,
          gutters.padding_12,
          borders.roundedTop_16,
        ]}
      >
        <Text style={[fonts.bold, fonts.white]}>{id}</Text>
        <Text style={[fonts.bold, fonts.white, gutters.paddingLeft_24]}>
          {name}
        </Text>
      </View>

      <Text
        style={[
          gutters.paddingHorizontal_12,
          gutters.paddingTop_12,
          fonts.gray800,
        ]}
      >
        {age}
      </Text>
      <Text style={[gutters.padding_12, fonts.gray800]}>{email}</Text>
    </TouchableOpacity>
  );
};

export default UserListItem;
