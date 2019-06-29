import React from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import { Constants } from 'expo';
import { Card } from 'react-native-paper';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShowingText: true, year: 1497, day: 202, daysInYear: 365 };
    this.restore();
  }

  static navigationOptions = {
    header: null,
  };

  addDay = async () => {
    try {
      let day = this.state.day;
      if (day === this.state.daysInYear) {
        this.addYear();
        day = 0;
        this.setState({ day: 0 });
      }
      day++;
      this.setState({ day: day });
      await AsyncStorage.setItem('day', ''+day);
    } catch (error) {
      // smth
    }
  };

  removeDay = async () => {
    try {
      let day = this.state.day;
      if (day === 0) {
        this.removeYear();
        day = this.state.daysInYear;
        this.setState({ day: this.state.daysInYear });
      }
      day--;
      this.setState({ day: day });
      await AsyncStorage.setItem('day', ''+day);
    } catch (error) {
      // smth
    }
  };

  addYear = async () => {
    try {
      const year = this.state.year + 1;
      this.setState({ year: year });
      await AsyncStorage.setItem('year', ''+year);
    } catch (error) {
      // smth
    }
  };

  removeYear = async () => {
    try {
      const year = this.state.year - 1;
      this.setState({ year: year });
      await AsyncStorage.setItem('year', ''+year);
    } catch (error) {
      // smth
    }
  };

  restore = async () => {
    try {
      const year = await AsyncStorage.getItem('year');
      if (year !== null) {
        this.setState({ year: year });
      }

      const day = await AsyncStorage.getItem('day');
      if (day !== null) {
        this.setState({ day: day });
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            {this.state.year == null && <Text>Please enter year number</Text>}
            <Text style={styles.paragraph}>
              year: {this.state.year}
              &nbsp; day: {this.state.day}
            </Text>
            <Button title="Next" onPress={this.addDay} />
          </View>
          <View style={styles.container}>
            <Button title="Previous" onPress={this.removeDay} />
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
