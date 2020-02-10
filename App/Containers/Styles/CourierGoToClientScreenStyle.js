import {Dimensions, StyleSheet} from 'react-native'
import {ApplicationStyles} from '../../Themes/'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  map: {
    flex: 1
  },
  orderContainer: {
    paddingHorizontal: width * 0.06,
    bottom: 0,
    position: 'absolute',
    paddingBottom: height * 0.04,
    backgroundColor: '#fff',
    width,
    height: height * 0.35
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: height * 0.01

  },
  inputIcon: {
    flex: 1,
    paddingVertical: 5.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputButton: {
    flex: 9,
    justifyContent: 'space-between',
    marginVertical: height * 0.01
  },
  line: {
    borderBottomColor: '#353535',
    borderBottomWidth: 1,
    marginVertical: 10
  },
  buttonContainer: {

  },
  inputText: {
    fontSize: 18
  },
  actionBox: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  swipeBox: {
    width,
    paddingVertical: 20,
    left: 0,
    bottom: 0,
    position: 'absolute'
  },
})
