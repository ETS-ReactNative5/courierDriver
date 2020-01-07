import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const {width} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.1,
    flex: 1
  }
})
