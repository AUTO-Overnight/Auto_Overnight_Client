import { StyleSheet, Text, View } from 'react-native';

type SelectHelperProps = {
  text: string;
};

const SelectHelper: React.FC<SelectHelperProps> = ({ text }) => (
  <View style={styles.view}>
    <Text>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EFFF',
  },
});

export default SelectHelper;
