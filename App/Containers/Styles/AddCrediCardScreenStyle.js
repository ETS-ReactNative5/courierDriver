import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const {width} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    padding: width * 0.01,
    marginTop: 30
  },
  btnBox: {
    marginBottom: width * 0.1,
    flex: 1,
    justifyContent: 'flex-end'
  },
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  label: {
    color: 'black',
    fontSize: 12
  },
  input: {
    fontSize: 16,
    color: 'black'
  }
})
