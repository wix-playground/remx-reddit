import React, { PureComponent } from 'react'
import {FlatList, TouchableOpacity, Alert} from 'react-native';
import {Colors, View, Text, Button, Card, LoaderScreen, ListItem, Toast} from 'react-native-ui-lib'
import { connect } from 'remx';

import * as store from '../stores/topics/topicsStore';
import * as actions from '../stores/topics/topicsActions';

import FAB from 'react-native-fab';

class TopicsList extends PureComponent {
  state = {
    showToast: false
  };

  componentWillMount(){
    actions.fetchTopics();
  }

  renderLoader() {
    return <LoaderScreen
      loaderColor={Colors.blue30}
      message="Loading Topics"
    />
  }

  keyExtractor = (item) => item.url;

  renderItem = ({item}) => {
    return (
      <Card
        row
        containerStyle={{margin: 12}}
        onPress={() => {
          // noinspection BadExpressionStatementJS
          item.url.includes('/r/sports') ? console.error(`You found a bug!!!!`) : null;
          this.showPostsScreen(item)
        }}
      >
        <Card.Image
          imageSource={{uri: item.icon_img}}
          width={96}
        />
        <Card.Section body>
          <Card.Item>
            <Text text50 red10>{item.title}</Text>
          </Card.Item>
          <Card.Item>
            <Text text70>{this.trimText(item.description)}</Text>
          </Card.Item>
        </Card.Section>
      </Card>
    )
  };

  trimText = (text) => (text.length > 60)? text.substring(0, 60) + "..." : text

  showPostsScreen = (topic) => {
    const {title,url} = topic;
    this.props.navigator.push({
      screen: 'remxReddit.PostsList',
      title: title,
      passProps: {url}
    })
  };

  renderList= () => {
    return (
      <FlatList
        data={this.props.topics}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }

  pushScreen = () => {
    this.props.navigator.push({
      screen: 'bootstrap.Screen1',
      title: 'Screen1',
      passProps: {someProp: "someProp"}
    })
  };

  render() {
    return (
      <View flex>
        {(this.props.isLoading) ?
          this.renderLoader() :
          this.renderList()
        }
          <FAB buttonColor='red' iconTextColor='#FFFFFF' onClickAction={() => this.setState({showToast: true})} visible={true} iconTextComponent={<Text>+</Text>} />
        {this.state.showToast ? Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
            {text: 'Ask me later', onPress: () => {
              this.setState({showToast: false});
              console.log('Ask me later pressed')
              }},
            {text: 'Cancel', onPress: () => {
                this.setState({showToast: false});
                console.log('Cancel Pressed')}, style: 'cancel'},
            {text: 'OK', onPress: () => {
                this.setState({showToast: false});
                console.log('OK Pressed')
              }},
          ],
          { cancelable: true }
        ) : null}
      </View>
    );
  }
}

function mapStateToProps() {
  return {
    isLoading: store.getters.isLoading(),
    topics: store.getters.getTopics()
  };
}

export default connect(mapStateToProps)(TopicsList);
