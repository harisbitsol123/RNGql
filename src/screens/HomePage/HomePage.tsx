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
          layout.flexGrow_1,
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.paddingHorizontal_24,
        ]}
      >
        <View
          style={[
            layout.row,
            layout.itemsCenter,
            layout.justifyBetween,
            layout.fullWidth,
            gutters.paddingVertical_16,
          ]}
        >
          <Text style={[{ fontSize: 24, fontWeight: 'bold' }]}>Users List</Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            onPress={() => {
              addUserModalRef.current?.show();
            }}
          >
            <Text style={{ fontSize: 20 }}>+</Text>
          </TouchableOpacity>
        </View>
        <AddUserForm ref={addUserModalRef} updateData={refetch} />
      </View>
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
