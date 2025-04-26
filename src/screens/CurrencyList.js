import {getRequest} from '../api/client'
import React, { useState, useEffect } from 'react';
import getStyles from '../styles/homeStyle';
import { Alert, useColorScheme,Text, View, FlatList, SafeAreaView } from 'react-native';
import { Surface,Appbar, Button,TouchableRipple, IconButton, TextInput, Dialog, Portal } from 'react-native-paper';


const CurrencyList = () => {
  const CURRENCIES = [
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'LKR', name: 'Sri Lankan', flag: '🇱🇰' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  ];
    const styles = getStyles();
    const isDarkMode = useColorScheme() === 'dark';

    const [editing, setEditing] = useState(false);
    const [visible, setVisible] = useState(false);
    const [tempAmount, setTempAmount] = useState(audAmount);
    const [audAmount, setAudAmount] = useState('1.00');
    const [rates, setRates] = useState({});

    const openDialog = () => {
      setTempAmount(audAmount);
      setEditing(true);
    };

    const handleAmountChange = () => {
      setAudAmount(tempAmount);
      setEditing(false);
    };



    const fetchRates = async () => {
      try {
        const param = {};
        const response = await getRequest('latest.json', param);
        /** since free trial givies USD base currency rate Here we calculate for AUD Base **/
        //Convert USD base currency rate to AUD Base
        const audRate = response.data.rates['AUD']; 
        const ratesFromAUD = {};
        const newRates = {};
        CURRENCIES.forEach(({ code }) => {
          newRates[code] = response.data.rates[code];
          ratesFromAUD[code] = newRates[code]/audRate
        });
        // Alert.alert("Response", JSON.stringify(response.data.rates)); 
        setRates(ratesFromAUD);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
  
    useEffect(() => { 
      fetchRates();
    }, []);


const EditableSurface = () => {
  return(
  <Surface style={styles.currencySurface}>
    <View style={styles.currencyIcon}>
      <View style={styles.flagIco}>
      <Text style={styles.flag}>🇦🇺</Text>
      </View>
      <Text style={styles.currencyText}>
          AUD 
      </Text>
    </View>

  <View style={styles.rightSection}>
      <View style={styles.rateAmmount}>
          <Text style={styles.currencyText}>
          ${parseFloat(audAmount).toFixed(2)}
          </Text>
           
      </View>
      <View style={styles.linkButton}>
        <IconButton
          onPress={() => setEditing(true)}
            rippleColor="rgba(0, 0, 0, .32)"
          >
        </IconButton>
      </View>
  </View>
  </Surface>

  )
}





    const renderItem = ({ item }) => (
      <Surface style={styles.currencySurface}>
        <View style={styles.currencyIcon}>
          <View style={styles.flagIco}>
          <Text style={styles.flag}>{item.flag}</Text>
          </View>
          <Text style={styles.currencyText}>
            {item.code}
          </Text>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.rateAmmount}>
            <Text style={styles.currencyText}>
            {rates[item.code] ? (parseFloat(audAmount) * rates[item.code]).toFixed(2) : '...'}
            </Text>
            <Text style={styles.currencyMiniText}>
            1 AUD = {rates[item.code] ? rates[item.code].toFixed(4) : '...'} {item.code}
            </Text>
          </View>
          <View style={styles.linkButton}>
            <IconButton
                onPress={() => console.log('Pressed')}
                rippleColor="rgba(0, 0, 0, .32)"
              >
            </IconButton>
          </View>
        </View>
      </Surface>
    );


    return (
      <View style={styles.homeContainer}>
      <Appbar.Header>
        <Appbar.Content title="Currency Convertor" />
      </Appbar.Header>

      <View style={styles.viewContainer}>
            <View style={styles.paddingHome}>
              <EditableSurface />
            </View>
            
            <FlatList
              data={CURRENCIES}
              keyExtractor={(item) => item.code}
              renderItem={renderItem}
              style={styles.list}
              contentContainerStyle={{ paddingTop: 55 }}
            />

          <Portal>
            <Dialog visible={editing} onDismiss={() => setVisible(false)}>
              <Dialog.Title>Update AUD Amount</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="AUD Amount"
                  keyboardType="numeric"
                  value={tempAmount}
                  onChangeText={(text) => setTempAmount(text)}
                  autoFocus
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleAmountChange}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>


          </View>
        </View>
        
        );

};

export default CurrencyList;