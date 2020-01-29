import { StyleSheet,Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const {height} = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: height * 0.13
  },
  gumburger: {
    padding: 10,
    position: 'absolute',
    top: 40,
    left: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
