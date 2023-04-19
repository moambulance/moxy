
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import axios from 'axios';

import React, { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

function TrackerHome({route, navigation}) {
    const [selected, setSelected] = React.useState("");
    const { UserName } = route.params;
    const onPressLogout = () => navigation.navigate("Login");
  const trackers = [
      {key:'1', value:'JIVMOT0001B0001', disabled:true},
      {key:'2', value:'JIVMOT0002B0002'},
      {key:'3', value:'JIVMOT0003B0003'},
      {key:'4', value:'JIVMOT0005B0005', disabled:true},
      
  ]
  
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
    <View style={styles.container}>
      <View style={styles.rect}></View>
      <View style={styles.rect2}></View>
      <View style={styles.rect4}></View>
      <View style={styles.driverNameStack}>
        <Text style={styles.driverName}>Driver Name :</Text>
        <Text style={styles.driverName2}>Driver Name</Text>
      </View>
      <Text style={styles.location}>Location:</Text>
      <View style={styles.imageStack}>
        <Image
          source={require("../assets/images/moxy_logo.jpg")}
          resizeMode="contain"
          style={styles.image}
        ></Image>
        <Text style={styles.loggedInUser1}>POWERED BY MO AMBULANCE</Text>
      </View>
      <Text style={styles.welcome}>WELCOME :</Text>
      <Text style={styles.select}>SELECT</Text>
      
      <View style={styles.rect5}>
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
      </View>
      <View style={styles.rect6}></View>
      <Text style={styles.loremIpsum4}>MESSAGE FROM MOAMBULANCE</Text>
      <Text style={styles.in2}>{responseLoadcellData["perwght"]}</Text>
      <Text style={styles.time}>Time:</Text>
      <Text style={styles.type2}>Type :</Text>
      <Text style={styles.oxygen3}>Oxygen:</Text>
      <Text style={styles.number}>Number :</Text>
      <Text style={styles.als}>ALS</Text>
      <Text style={styles.loggedInUser}>{UserName}</Text>
      <Text style={styles.vehicleNumber}>Vehicle Number</Text>
      <Text style={styles.timestamp}>{convertUTCToLocalTime(responseLoadcellData["ts"])}</Text>
      <Text style={styles.loc3}>Loc</Text>
      <Text style={styles.tracker4}>Tracker:</Text>
      <Text style={styles.trackerName3}>{responseData["virtual_tracker_id"]}</Text>
      <Text style={styles.totalMessage}>Total Message</Text>
      <View style = {styles.logout}>
         <TouchableOpacity onPress={onPressLogout}>
         <Image source={require('../assets/images/sign-out-icon.png')} />
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around"
  },
  rect: {
    flex: 0.21,
    backgroundColor: "#f7f7f7",
    left: 0,
    width: 375,
    top: 0,
    height: 171
  },
  rect2: {
    flex: 0.79,
    backgroundColor: "rgba(255,255,255,1)",
    left: 0,
    width: 375,
    top: 219,
    height: 652
  },
  rect4: {
    top: 238,
    left: 28,
    width: 319,
    height: 4,
    position: "absolute",
    backgroundColor: "rgba(74,144,226,1)"
  },
  driverName: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 26,
    width: 121,
    fontSize: 18
  },
  driverName2: {
    top: 0,
    left: 119,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(65,117,5,1)",
    height: 26,
    width: 154,
    fontSize: 18
  },
  driverNameStack: {
    top: 260,
    left: 28,
    width: 273,
    height: 26,
    position: "absolute"
  },
  location: {
    top: 395,
    left: 28,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 29,
    width: 112,
    fontSize: 20
  },
  image: {
    top: 0,
    left: 0,
    width: 200,
    height: 75,
    position: "absolute"
  },
  loggedInUser1: {
    top: 57,
    left: 21,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(230,16,16,1)",
    height: 24,
    width: 168,
    fontSize: 11
  },
  imageStack: {
    top: 52,
    left: 88,
    width: 200,
    height: 81,
    position: "absolute"
  },
  welcome: {
    top: 147,
    left: 28,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 24,
    width: 80
  },
  select: {
    top: 201,
    left: 28,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 56
  },
  loremIpsum: {
    top: -30,
    left: -295,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212"
  },
  rect5: {
    top: 192,
    left: 88,
    width: 258,
    height: 39,
    position: "absolute",
    backgroundColor: "#E6E6E6"
  },
  loremIpsum3: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 21,
    width: 96,
    marginTop: 9,
    marginLeft: 31
  },
  rect6: {
    top: 558,
    left: 27,
    width: 320,
    height: 1,
    position: "absolute",
    backgroundColor: "rgba(19,18,227,1)"
  },
  loremIpsum4: {
    top: 535,
    left: 28,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(144,19,254,1)",
    height: 20,
    width: 224
  },
  in2: {
    top: 431,
    left: 149,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    height: 27,
    width: 102,
    fontSize: 20
  },
  time: {
    top: 462,
    left: 27,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 112,
    fontSize: 20
  },
  type2: {
    top: 287,
    left: 29,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 24,
    width: 60,
    fontSize: 18
  },
  oxygen3: {
    top: 427,
    left: 27,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(0,0,0,1)",
    height: 35,
    width: 90,
    fontSize: 20
  },
  number: {
    top: 314,
    left: 28,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 28,
    width: 92,
    fontSize: 18
  },
  als: {
    top: 288,
    left: 147,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(65,117,5,1)",
    height: 23,
    width: 106,
    fontSize: 18
  },
  loggedInUser: {
    top: 147,
    left: 114,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 24,
    width: 139
  },
  vehicleNumber: {
    top: 314,
    left: 146,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(65,117,5,1)",
    height: 28,
    width: 139,
    fontSize: 18
  },
  timestamp: {
    top: 462,
    left: 149,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 27,
    width: 162,
    fontSize: 20
  },
  loc3: {
    top: 395,
    left: 147,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 29,
    width: 154,
    fontSize: 20
  },
  tracker4: {
    top: 359,
    left: 28,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 29,
    width: 112,
    fontSize: 20
  },
  trackerName3: {
    top: 359,
    left: 146,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 29,
    width: 169,
    fontSize: 20
  },
  totalMessage: {
    top: 567,
    left: 28,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(20,19,254,1)",
    height: 20,
    width: 224
  },
  logout: {
    top: 147,
    left: 294,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#FF0000",
    height: 24,
    width: 52
  }
});

export default TrackerHome;
