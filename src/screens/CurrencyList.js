import {getRequest} from '../api/client'
import React, { useState, useEffect } from 'react';
import getStyles from '../styles/homeStyle';
import { Alert, useColorScheme,Text, View, FlatList, SafeAreaView } from 'react-native';
import { Surface,Appbar, Button, IconButton, TextInput, Dialog, Portal } from 'react-native-paper';
import CountryFlag from "react-native-country-flag";
import ChartModal from '../components/ChartModal';

const CurrencyList = () => {
  const CURRENCIES = [
    { code: 'USD', name: '$', flag: 'US' },
    { code: 'EUR', name: '€', flag: 'EU' },
    { code: 'JPY', name: '¥', flag: 'JP' },
    { code: 'LKR', name: 'Rs', flag: 'LK' },
    { code: 'CAD', name: '$', flag: 'CA' },
  ];
    const styles = getStyles();
    // const isDarkMode = useColorScheme() === 'dark';

    const [editing, setEditing] = useState(false);
    const [tempAmount, setTempAmount] = useState(audAmount);
    const [audAmount, setAudAmount] = useState(1);
    const [rates, setRates] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalCurrency, setModalCurrency] = useState('AU');


    const handleAmountChange = () => {
        // Alert.alert(tempAmount);
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
        CURRENCIES.forEach(({ code }) => {
          ratesFromAUD[code] = response.data.rates[code]/audRate
        });
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
        <CountryFlag style={styles.flag} isoCode="AU" size={14} />
      </View>
      <Text style={styles.currencyText}> AUD </Text>
    </View>

  <View style={styles.rightSection}>
      <View style={styles.rateAmmount}>
          <Text style={styles.currencyText}>
          ${parseFloat(audAmount).toFixed(2)}
          </Text>
           
      </View>
      <View style={styles.linkButton}>
        <IconButton icon="calculator" size={30} iconColor="#c5c5c5" style={{ alignSelf: 'center' }}
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
          <CountryFlag style={styles.flag} isoCode={item.flag} size={14} />
          </View>
          <Text style={styles.currencyText}>
            {item.code}
          </Text>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.rateAmmount}>
            <Text style={styles.currencyText}>
            {item.name} {rates[item.code] ? (parseFloat(audAmount) * rates[item.code]).toFixed(2) : '...'}
            </Text>
            <Text style={styles.currencyMiniText}>
            1 AUD = {rates[item.code] ? rates[item.code].toFixed(4) : '...'} {item.code}
            </Text>
          </View>
          <View style={styles.linkButton}>
            <IconButton
                onPress={() => {
                  setModalCurrency(item.code); 
                  setModalVisible(true);
                }} 
                rippleColor="rgba(0, 0, 0, .32)"
              >
            </IconButton>
          </View>
        </View>
      </Surface>
    );


    return (
      <View style={styles.homeContainer}>
      <Appbar.Header mode='center-aligned'>
        <Appbar.Content  title="Currency Convertor" />
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
            <Dialog visible={editing} onDismiss={() => setEditing(false)}>
              <Dialog.Title>Update AUD Amount</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="AUD Amount"
                  keyboardType="numeric"
                  value={tempAmount ? tempAmount : 1 }
                  onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9.]/g, '');
                    setTempAmount(numericText)
                    ;}}
                  autoFocus
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleAmountChange}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

          <ChartModal
              visible={modalVisible}
              currencyCode = {modalCurrency}
              onClose={() => setModalVisible(false)}
            />

          </View>
        </View>
        
        );

};

export default CurrencyList;