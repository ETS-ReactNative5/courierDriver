import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Container, Tab, Tabs } from 'native-base'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TabAll from '../Components/TabAll'
import TabAll1 from '../Components/TabAll1'
import Tabсosts from '../Components/Tabсosts'
import MyButton from '../Components/MyButton'
// Styles
import styles from './Styles/GainScreenStyle'



class GainScreen extends Component {

  render () {
    return (
      <View style={{flex: 1}} >
        <View style={styles.gainSumBox}>
          <Text style={styles.gainSum}>245.60 AZN</Text>
          <Text style={styles.gainHint}>57 rides in 21 hr 18 min</Text>
          <View style={styles.btnBox}>
            <MyButton
              onPress={() => this.props.navigation.navigate('AddCrediCardScreen')}
              text='BALANSI ARTIR'
              color='#fff'
              borderColor='#7B2BFC'
              borderRadius={30}
              backgroundColor='#7B2BFC' />
          </View>
        </View>
        <Container style={{flex: 2}} >
          <Tabs tabBarUnderlineStyle={{borderWidth: 0, backgroundColor: '#7B2BFC', marginTop: 0}}>
            <Tab tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#7B2BFC'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#7B2BFC', fontWeight: 'bold'}} heading="HAMISI">
              <TabAll />
            </Tab>
            <Tab tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#7B2BFC'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#7B2BFC', fontWeight: 'bold'}} heading="GƏLİRLƏR">
              <TabAll1 />
            </Tab>
            <Tab tabStyle={{backgroundColor: '#fff'}} textStyle={{color: '#7B2BFC'}} activeTabStyle={{backgroundColor: '#fff'}} activeTextStyle={{color: '#7B2BFC', fontWeight: 'bold'}} heading="XƏRCLƏR">
              <Tabсosts />
            </Tab>
          </Tabs>
        </Container>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GainScreen)
