import { useTheme } from '@/theme';
import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { GET_USERS } from '@/GraphQL';
interface IModalRef {
  show: () => void;
  hide: () => void;
}
type UserDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetails'
>;
export default () => {
  const { layout, gutters, fonts, backgrounds, borders, variant, changeTheme } =
    useTheme();
  const [onPullToRefresh, setOnPullToRefresh] = useState<boolean>(false);
  const addUserModalRef = useRef<IModalRef>(null);

  const isFocused = useIsFocused();
  const navigation = useNavigation<UserDetailsScreenNavigationProp>();
  const onRefresh = useCallback(() => {
    setOnPullToRefresh(true);
    setTimeout(() => {
      refetch();
      setOnPullToRefresh(false);
    }, 2000);
  }, []);

  const { loading, error, data, refetch } = useQuery(GET_USERS);

  useEffect(() => {
    console.log('isFocused: ', isFocused);
    if (isFocused === true) {
      refetch();
    }
  }, [isFocused]);

  return {
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
    variant,
    changeTheme,
    refetch,
    onRefresh,
  };
};
