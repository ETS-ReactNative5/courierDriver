import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 50,
    marginRight: 10
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16
  }
})
