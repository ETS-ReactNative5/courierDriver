import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, FlatList, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import news from '../Fixtures/news'
import { Container, Content, Text } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/NotificationsScreenStyle'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class NotificationsScreen extends Component {
  renderNewsItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.newsItemContainer, {backgroundColor: index % 2 === 1 ? '#fafafa' : ''}]}>
        <View style={[styles.iconWrapper, {backgroundColor: item.iconBackground}]}>
          <Icon style={styles.linkIcon} name='accusoft' size={25} color='#fff' />
        </View>
        <View style={styles.newsTextBox}>
          <Text style={styles.newsTitle} numberOfLines={1} ellipsizeMode='tail' >{item.title}</Text>
          <Text style={styles.newsText} numberOfLines={1} ellipsizeMode='tail' >{item.text}</Text>
          <Text style={styles.newsDate}>{item.date}</Text>
        </View>
      </TouchableOpacity>
    )
  };
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Container>
            <Content>
              <FlatList
                renderItem={this.renderNewsItem}
                keyExtractor={(item) => item.id}
                data={news} />
            </Content>
          </Container>
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)
