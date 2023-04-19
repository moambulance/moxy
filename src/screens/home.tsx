/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Alert, TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { SelectList } from 'react-native-dropdown-select-list';


type SectionProps = PropsWithChildren<{
  title: string;
}>;



function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function Home(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selected, setSelected] = React.useState("");
  const createTwoButtonAlert = () =>
  Alert.alert('Alert Title', 'My Alert Msg', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
  const trackers = [
      {key:'1', value:'JIVMOT0001B0001', disabled:true},
      {key:'2', value:'JIVMOT0002B0002'},
      {key:'3', value:'JIVMOT0003B0003'},
      {key:'4', value:'JIVMOT0005B0005', disabled:true},
      
  ]
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let [responseData, setResponseData] = useState([]);
  let [responseLoadcellData, setResponseLoadcellData] = useState([]);
  const getDataUsingSimpleGetCall = () => {
    
    let rtid="JIVMOT0002B0002";
 
        if(selected=="")
        {
          //console.warn(responseData);
          
        }
        else
        {
           rtid=selected;
            //rtid="JIVMOT0002B0002";
            console.log("in else:" + rtid);
        }
        var urlString = 'https://trk.gyrfalconintelliedge.com:8003/TRestAPI/live/{"id":"clinohealth67","password":"onilc@112022","v_id":"'+rtid+'"}';
        console.log(urlString);
    axios
        .get(urlString)
        .then(function (response) {
          // handle success
          //const pokedex = Convert.toPokedex(JSON.stringify(response));
          setResponseData(response.data.Customer);
          setResponseLoadcellData(response.data.Loadcell);
          console.log(JSON.stringify(response.data["Location and Navigation"]));
          //console.warn(pokedex);
      })
        .catch(function (error) {
            // handle error
            //Alert.alert(error.message);
            console.log("malaya : " + responseData);
        })
        .finally(function () {
            // always executed
            //Alert.alert('Finally called');
        });
};
const convertUTCToLocalTime = (utf: any) => {

  const unixTimestamp = utf

  const milliseconds = unixTimestamp * 1000 // 1575909015000

  const dateObject = new Date(milliseconds)

  const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15

  return humanDateFormat;
};
useEffect(() => {
    getDataUsingSimpleGetCall();
}, []);

  return (
   
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
      <SelectList 
      dropdownStyles={{
        backgroundColor: "white",
        position: "absolute",
        top: 40,
        width: "80%",
        zIndex: 999,
      }}
        onSelect={() => getDataUsingSimpleGetCall()}
        setSelected={(val: React.SetStateAction<string>) => setSelected(val)} 
        data={trackers} 
        save="value"
    />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        
          
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
            
          <Text>TRACKER : {responseData["virtual_tracker_id"]}</Text>
                <Text>WEIGHT [KG] : {responseLoadcellData["perwght"]}</Text>
                <Text>DATE AND TIME : {convertUTCToLocalTime(responseLoadcellData["ts"])}</Text>
                <Text>TRACKER : {selected}</Text>
              
        </View> 
       
      </ScrollView>
    </SafeAreaView>
  
  );
      
}

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

export default Home;
