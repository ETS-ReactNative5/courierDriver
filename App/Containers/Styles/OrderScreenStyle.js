import { Dimensions, StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

const {width, height} = Dimensions.get('window')
export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1
  },
  userLikesContainer: {
    flex: 3,
    paddingHorizontal: width * 0.04
  },
  orderFinishedBox: {
    flex: 1,
    paddingHorizontal: width * 0.07,
    justifyContent: 'center',
    backgroundColor: '#451E5D'
  },
  orderPriceBox: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  orderTextContent: {
    color: '#fff',
    fontSize: 33,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  orderRoadTime: {
    color: '#FFCC32',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  orderTextFealds: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  adressBox: {
    flexDirection: 'row',
    height: 100,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#353535'
  },
  textBox: {
    justifyContent: 'space-between',
    marginVertical: 3
  },
  iconBox: {
    alignItems: 'center',
    width: width * 0.1,
  },
  orderDash: {
    height: 30,
    flexDirection: 'column' ,
  },
  text: {
    fontSize: 18
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,

  },
  nameBox: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  nameBoxText : {
    fontSize: 17,
    color: '#27093D',

  },
  nameBoxIcon: {
    fontSize: 35,
    color: '#606060',
    fontWeight: '200',
    marginRight: 20
  },
  infoText: {
    fontSize: 19,
    fontWeight : 'bold',
    color: '#27093D'
  },
  btnBox: {
    width,
    position: 'absolute',
    bottom: height * 0.1
  }
})
