import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Content, ListItem, Text, Radio, Right, Left, Icon } from 'native-base'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PaymentMethodScreenStyle'
import MyButton from '../Components/MyButton'
import NextButton from '../Components/NextButton'
import { KeyboardAvoidingView, View } from 'react-native'

class PaymentMethodScreen extends Component {
  constructor () {
    super()
    this.state = {
      itemSelected: 'itemOne'
    }
  }

  render () {
    return (
      <Container>
        <Content>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'itemTwo' })}>
            <Left>
              <Icon style={styles.ccIcon} type='FontAwesome' name='cc-visa' />
              <Text>9524</Text>
            </Left>
            <Right>
              <Radio
                color={'#f0ad4e'}
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'itemTwo'}
              />
            </Right>
          </ListItem>
          <ListItem style={styles.radioBox} onPress={() => this.setState({ itemSelected: 'itemTree' })}>
            <Left>
              <Icon style={styles.ccIcon} type='FontAwesome' name='cc-mastercard' />
              <Text>2655</Text>
            </Left>
            <Right>
              <Radio
                color={'#f0ad4e'}
                selectedColor={'#451E5D'}
                selected={this.state.itemSelected == 'itemTree'}
              />
            </Right>
          </ListItem>
          <NextButton
            onPress={() => this.props.navigation.navigate('AddCrediCardScreen')}
            text='Add new card'
            color='#000'
            iconBackground='#FED427'
            // borderRadius={10}
            backgroundColor='#fff' />
        </Content>
        <View style={styles.btnBox}>
          <MyButton
            onPress={() => this.props.navigation.navigate('PaymentAmountScreen')}
            color='#fff'
            backgroundColor='#7B2BFC'
            borderColor='#7B2BFC'
            borderRadius={30}
            text='Next' />
        </View>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodScreen)
