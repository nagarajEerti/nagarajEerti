/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect} from 'react';
// import type {Node} from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import firebase from 'react-native-firebase';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




const App = () => {
  useEffect(() => {
    getToken();
  createChannel();
  notificationListener();
  console.log('hi...........')
   }, [])
   //get token
   const getToken = async ()=>{
     const firebaseToken = await firebase.messaging().getToken();
     console.log(firebaseToken ,'(hi)')
   }

   const createChannel = () =>{
     const channel = new firebase.notifications.Android.Channel(
       'channelId','channelName',
       firebase.notifications.Android.Importance.Max
     ).setDescription('Description');
     firebase.notifications().android.createChannel(channel)
   };
   const notificationListener =() =>{
     firebase.notifications().onNotification((notification)=>{
       if(Platform.OS === 'android'){
         const localNotification = new firebase.notifications.Notification(
           {sound:"default",show_in_foreground :true}
         ).setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSubtitle(notification.subtitle)
          .setBody(notification.body)
          .setData(notification.data)
          .android.setPriority(firebase.notifications.Android.Priority.High);

          firebase.notifications().displayNotification(localNotification)
          .catch(err => console.log(err))
       }
     })
   }
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section> */}
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
