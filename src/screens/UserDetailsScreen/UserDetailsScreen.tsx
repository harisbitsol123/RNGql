import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { useTheme } from '@/theme';
import {
  DELETE_USER_BY_ID,
  GET_USER_BY_ID,
  UPDATE_USER_BY_ID,
} from '@/GraphQL';

type UserDetailsRouteProps = {
  userID: number; // or string, depending on your implementation
};
const UserDetailsScreen = () => {
  const route = useRoute();
  const { userID } = route.params as UserDetailsRouteProps;

  const navigation = useNavigation();

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { searchKey: userID },
  });
  const [updateUser, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER_BY_ID);
  const [deleteUser, { loading: deleteLoading, error: deleteError }] =
    useMutation(DELETE_USER_BY_ID);

  const isLoading = loading || updateLoading || deleteLoading;

  const { gutters, layout, backgrounds, borders, colors } = useTheme();

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');

  const handleDelete = () => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteUser({
              variables: { id: userID }, // Replace `userID` with the actual user ID
            })
              .then(() => {
                console.log('User deleted successfully');
                navigation.goBack();
              })
              .catch((error) => {
                console.log('Error deleting user:', error);
              });
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleStartQuiz = () => {
    navigation.navigate('QuizPlayer' as never);
  };

  useEffect(() => {
    setUserName(data?.userById?.name ?? '');
    setUserEmail(data?.userById?.email ?? '');
    setUserAge(data?.userById?.age.toString() ?? '');
  }, [data]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View
          style={[layout.fullWidth, layout.fullHeight, backgrounds.gray100]}
        >
          <ActivityIndicator size={'large'} />
        </View>
      )}
      {error && (
        <View
          style={[
            layout.flex_1,
            backgrounds.gray100,
            layout.justifyCenter,
            layout.itemsCenter,
          ]}
        >
          <Text>{error?.message}</Text>
        </View>
      )}
      {updateError && (
        <View
          style={[
            layout.flex_1,
            backgrounds.gray100,
            layout.justifyCenter,
            layout.itemsCenter,
          ]}
        >
          <Text>{updateError?.message}</Text>
        </View>
      )}
      {deleteError && (
        <View
          style={[
            layout.flex_1,
            backgrounds.gray100,
            layout.justifyCenter,
            layout.itemsCenter,
          ]}
        >
          <Text>{deleteError?.message}</Text>
        </View>
      )}
      {/* Circular Image */}
      {!isLoading && !error && !updateError && !deleteError && (
        <View style={[layout.justifyCenter, layout.itemsCenter]}>
          <Image
            source={{ uri: data.userById.profilepic }}
            height={120}
            width={120}
            style={[
              borders.w_2,
              borders.rounded_70,
              gutters.padding_10,
              borders.gray200,
              gutters.marginBottom_30,
            ]}
          />
          <View
            style={[
              layout.row,
              layout.fullWidth,
              gutters.paddingTop_16,
              layout.justifyBetween,
            ]}
          >
            <Text style={styles.detailText}>ID </Text>
            <TextInput
              value={data.userById.id.toString()}
              style={[borders.w_1, gutters.paddingHorizontal_12, { flex: 4 }]}
              readOnly
            />
          </View>
          <View
            style={[
              layout.row,
              layout.fullWidth,
              gutters.paddingTop_16,
              layout.justifyBetween,
            ]}
          >
            <Text style={styles.detailText}>Name </Text>
            <TextInput
              value={userName}
              onChangeText={setUserName}
              style={[borders.w_1, gutters.paddingHorizontal_12, { flex: 4 }]}
            />
          </View>
          <View
            style={[
              layout.row,
              layout.fullWidth,
              gutters.paddingTop_16,
              layout.justifyBetween,
            ]}
          >
            <Text style={styles.detailText}>Email </Text>
            <TextInput
              value={userEmail}
              onChangeText={setUserEmail}
              style={[borders.w_1, gutters.paddingHorizontal_12, { flex: 4 }]}
            />
          </View>
          <View
            style={[
              layout.row,
              layout.fullWidth,
              gutters.paddingTop_16,
              layout.justifyBetween,
            ]}
          >
            <Text style={styles.detailText}>Age </Text>
            <TextInput
              value={userAge}
              onChangeText={setUserAge}
              style={[borders.w_1, gutters.paddingHorizontal_12, { flex: 4 }]}
            />
          </View>
          <View style={[layout.row, gutters.marginTop_32]}>
            <TouchableOpacity
              style={[
                gutters.paddingVertical_12,
                borders.w_1,
                borders.rounded_4,
                gutters.marginHorizontal_4,
                { backgroundColor: 'green' },
                layout.flex_1,
                layout.justifyCenter,
                layout.itemsCenter,
              ]}
              onPress={() => {
                updateUser({
                  variables: {
                    searchKey: userID, // Ensure userID is correctly defined
                    newName: userName,
                    newEmail: userEmail,
                    newAge: parseInt(userAge ?? '0'), // Ensure `userAge` is an integer if your schema requires it
                  },
                });
                navigation.goBack();
              }}
            >
              <Text style={{ color: colors.white, fontWeight: 'bold' }}>
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                gutters.paddingVertical_12,
                borders.w_1,
                borders.rounded_4,
                gutters.marginHorizontal_4,
                { backgroundColor: 'red' },
                layout.flex_1,
                layout.justifyCenter,
                layout.itemsCenter,
              ]}
              onPress={handleDelete}
            >
              <Text style={{ color: colors.white, fontWeight: 'bold' }}>
                Delete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                gutters.paddingVertical_12,
                borders.w_1,
                borders.rounded_4,
                gutters.marginHorizontal_4,
                { backgroundColor: 'blue' },
                layout.flex_1,
                layout.justifyCenter,
                layout.itemsCenter,
              ]}
              onPress={handleStartQuiz}
            >
              <Text style={{ color: colors.white, fontWeight: 'bold' }}>
                Start Quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  detailText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
    flex: 1,
  },
});

export default UserDetailsScreen;
