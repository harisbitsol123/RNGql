import Modal from 'react-native-modal';
import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/theme';
import useStyles from './styles';
import {
  useMutation,
  OperationVariables,
  ApolloQueryResult,
} from '@apollo/client';
import { ADD_USER } from '@/GraphQL';

interface IModalRef {
  show: () => void;
  hide: () => void;
}
interface IProps {
  updateData: (
    variables?: Partial<OperationVariables> | undefined,
  ) => Promise<ApolloQueryResult<any>>;
}
const AddUserModal = (props: IProps, ref: React.Ref<IModalRef>) => {
  const [isVisible, setIsVisible] = useState(false);
  const { gutters, layout, backgrounds, borders, colors } = useTheme();
  const styles = useStyles();
  const { updateData } = props;

  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');

  const profilePictures = [
    'https://www.kasandbox.org/programming-images/avatars/piceratops-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/leaf-yellow.png',
    'https://www.kasandbox.org/programming-images/avatars/aqualine-seedling.png',
    'https://www.kasandbox.org/programming-images/avatars/aqualine-seed.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-sapling.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-seedling.png',
    'https://www.kasandbox.org/programming-images/avatars/piceratops-seed.png',
    'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png',
    'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png',
    'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png',
    'https://www.kasandbox.org/programming-images/avatars/leafers-seedling.png',
    'https://www.kasandbox.org/programming-images/avatars/leafers-seed.png',
    'https://www.kasandbox.org/programming-images/avatars/cs-hopper-cool.png',
    'https://www.kasandbox.org/programming-images/avatars/cs-hopper-happy.png',
    'https://www.kasandbox.org/programming-images/avatars/leaf-yellow.png',
    'https://www.kasandbox.org/programming-images/avatars/leaf-red.png',
  ];

  const [addUser, { data: addUserData, loading: addUserLoading }] =
    useMutation(ADD_USER);

  useImperativeHandle(ref, () => ({
    show() {
      setIsVisible(true);
    },
    hide() {
      setIsVisible(false);
    },
  }));
  return (
    <Modal isVisible={isVisible} style={styles.modal} avoidKeyboard>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ color: colors.gray800, fontWeight: 'bold' }}>
            Add new user
          </Text>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setIsVisible(false)}
          >
            <Text
              style={{
                color: colors.gray800,
                fontSize: 16,
              }}
            >
              x
            </Text>
          </TouchableOpacity>
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
            keyboardType='numeric'
          />
        </View>

        <TouchableOpacity
          style={[
            gutters.paddingHorizontal_32,
            gutters.paddingVertical_12,
            borders.w_1,
            borders.rounded_4,
            gutters.marginTop_32,
            { backgroundColor: 'green' },
            layout.itemsCenter,
          ]}
          onPress={() => {
            const randomIndex = Math.floor(
              Math.random() * profilePictures.length,
            );
            const picture = profilePictures[randomIndex];
            addUser({
              variables: {
                name: userName, // These values come from state
                email: userEmail,
                age: parseInt(userAge), // Parse to integer since age should be a number
                profilepic: picture,
              },
            })
              .then(() => {
                console.log('User added successfully');
                updateData();
                setIsVisible(false);
                setUserAge('');
                setUserName('');
                setUserEmail('');
              })
              .catch((error) => console.log('Error adding user:', error));
          }}
        >
          <Text style={{ color: colors.white, fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
export default forwardRef(AddUserModal);
