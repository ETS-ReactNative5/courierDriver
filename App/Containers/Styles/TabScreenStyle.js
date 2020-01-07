import { StyleSheet,Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes/'
const {height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  tabView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  map: {
    flex: 1,
    height: height-60,

  },
})
