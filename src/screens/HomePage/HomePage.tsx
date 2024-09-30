import { SafeScreen } from '@/components/template';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { AddUserForm } from '@/components';
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
    fonts,
    backgrounds,
    borders,
    onPullToRefresh,
    addUserModalRef,
    navigation,
    refetch,
    onRefresh,
  } = useHomePage();
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
      <ScrollView
        contentContainerStyle={[
          layout.flexGrow_1,
          layout.justifyCenter,
          layout.itemsCenter,
          gutters.paddingHorizontal_24,
        ]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={onPullToRefresh} onRefresh={onRefresh} />
        }
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
        {data.allUsers.nodes.map((item: IUser) => (
          <TouchableOpacity
            key={item.id}
            style={[
              gutters.marginBottom_16,
              borders.w_1,
              borders.purple500,
              borders.rounded_16,
              layout.fullWidth,
            ]}
            onPress={() => {
              navigation.navigate('UserDetails', {
                userID: item.id,
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
              <Text style={[fonts.bold, fonts.white]}>{item.id}</Text>
              <Text style={[fonts.bold, fonts.white, gutters.paddingLeft_24]}>
                {item.name}
              </Text>
            </View>

            <Text style={[gutters.paddingHorizontal_12, gutters.paddingTop_12]}>
              {item.age}
            </Text>
            <Text style={[gutters.padding_12]}>{item.email}</Text>
          </TouchableOpacity>
        ))}
        <AddUserForm ref={addUserModalRef} updateData={refetch} />
      </ScrollView>
    </SafeScreen>
  );
}

export default HomePage;
