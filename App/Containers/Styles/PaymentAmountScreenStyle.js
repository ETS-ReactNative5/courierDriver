import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
  },
  inputBox: {
    borderBottomWidth: 1
  },
  box: {
    marginTop: width * 0.4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: width * 0.05,
    color: '#7B2BFC',
    marginBottom: width * 0.06
  },
  btnBox: {
    position: 'absolute',
    bottom: '10%',
    width
  },
  errorMsg: {
    fontSize: 20,
    color: 'red',
    alignSelf: 'center',
    marginTop: 20
  }
})
