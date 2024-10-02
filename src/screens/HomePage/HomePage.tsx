import { SafeScreen } from '@/components/template';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { AddUserForm, UserListItem } from '@/components';
import useHomePage from './useHomePage';

interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

function HomePage() {
  const {
    loading,
    error,
    data,
    layout,
    gutters,
    backgrounds,
    onPullToRefresh,
    addUserModalRef,
    variant,
    fonts,
    borders,
    changeTheme,
    refetch,
    onRefresh,
  } = useHomePage();
  const renderUserItem = ({ item }: { item: IUser }) => {
    return (
      <UserListItem
        name={item.name}
        age={item.age}
        email={item.email}
        id={item.id}
      />
    );
  };
  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  if (loading || onPullToRefresh)
    return (
      <View
        style={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
          backgrounds.purple100,
        ]}
      >
        <ActivityIndicator size={'large'} />
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View
        style={[
          layout.flex_1,
          layout.justifyCenter,
          layout.itemsCenter,
          backgrounds.red500,
        ]}
      >
        <Text>Error!</Text>
      </View>
    );
  return (
    <SafeScreen>
      <View
        style={[
          layout.row,
          layout.itemsCenter,
          layout.justifyBetween,
          layout.fullWidth,
          gutters.padding_24,
        ]}
      >
        <Text style={[{ fontSize: 24, fontWeight: 'bold' }, fonts.gray800]}>
          Users List
        </Text>
        <TouchableOpacity
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 6,
              borderRadius: 10,
            },
            borders.gray800,
            borders.w_1,
          ]}
          onPress={onChangeTheme}
        >
          <Text style={[{ fontSize: 20 }, fonts.gray800]}>Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            },
            borders.gray800,
            borders.w_1,
          ]}
          onPress={() => {
            addUserModalRef.current?.show();
          }}
        >
          <Text style={[{ fontSize: 20 }, fonts.gray800]}>+</Text>
        </TouchableOpacity>
      </View>
      <AddUserForm ref={addUserModalRef} updateData={refetch} />
      <FlatList
        data={data.allUsers.nodes}
        renderItem={renderUserItem}
        refreshing={onPullToRefresh}
        onRefresh={onRefresh}
        contentContainerStyle={[gutters.paddingHorizontal_16]}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeScreen>
  );
}

export default HomePage;
