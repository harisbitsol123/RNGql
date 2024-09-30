import { StyleSheet } from 'react-native';
import { useTheme } from '@/theme';

const useStyle = () => {
  const { layout, gutters, backgrounds, borders, fonts } = useTheme();

  const commonStyles = StyleSheet.create({
    container: {
      ...backgrounds.white,
      ...layout.fullWidth,
      ...gutters.padding_24,
      ...borders.rounded_16,
    },
    header: {
      ...layout.row,
      ...layout.itemsCenter,
      ...layout.justifyBetween,
      ...gutters.paddingBottom_24,
    },
    title: {},
    close: {
      ...layout.itemsCenter,
      ...layout.justifyCenter,
      ...borders.w_1,
      ...borders.rounded_15,
      height: 20,
      width: 20,
    },
    saveBtnText: {},
    discardBtnText: {},
    descriptionText: {},
  });
  const mobileStyles = StyleSheet.create({
    ...commonStyles,
    modal: {
      padding: 0,
      margin: 0,
      ...layout.justifyEnd,
    },
    buttonContainer: {
      ...gutters.paddingTop_24,
      ...layout.justifyCenter,
    },
    saveBtnBG: {
      ...gutters.marginBottom_12,
    },
    discardBtnBG: {
      ...backgrounds.white,
      ...borders.gray100,
      ...borders.w_1,
    },
    detailText: {
      fontSize: 18,
      marginVertical: 5,
      color: '#333',
      flex: 1,
    },
  });

  return mobileStyles;
};
export default useStyle;
