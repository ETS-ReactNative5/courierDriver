import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  kodBox: {
    flex: 1,
    paddingHorizontal: width * 0.26,
    marginVertical: width * 0.4
  },
  kodTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#7C7C7C',
  },
  kodDescription: {
    textAlign: 'center',
    fontSize: 13,
    color: '#7C7C7C',
    marginVertical: 15
  },
  btnBox: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: width * 0.04,
  }
})
