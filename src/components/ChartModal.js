import React, { useEffect, useState } from 'react';
import { Modal, Alert, View, Text, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getRequest } from '../api/client'; 
import getStyles from '../styles/homeStyle';
const screenWidth = Dimensions.get('window').width;

const defaultCurrencyRates = {
  start_date: "2025-04-23",
  end_date: "2025-04-26",
  base: "AUD",
  rates: {
    "2025-04-23": {
      USD: 0.65,
      EUR: 0.60,
      JPY: 99.5,
      CAD: 0.87,
      LKR: 208.5
    },
    "2025-04-24": {
      USD: 0.651,
      EUR: 0.602,
      JPY: 99.8,
      CAD: 0.869,
      LKR: 209.2
    },
    "2025-04-25": {
      USD: 0.648,
      EUR: 0.599,
      JPY: 100.1,
      CAD: 0.872,
      LKR: 208.9
    },
    "2025-04-26": {
      USD: 0.652,
      EUR: 0.603,
      JPY: 99.7,
      CAD: 0.874,
      LKR: 209.0
    },
    "2025-04-27": {
      USD: 0.652,
      EUR: 0.603,
      JPY: 99.7,
      CAD: 0.874,
      LKR: 209.0
    }
  }
};

const ChartModal = ({ visible, currencyCode, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const styles = getStyles();


  useEffect(() => {
    if (visible) {
      fetchRates();
    }
  }, [visible]);

  const fetchRates = async () => {

    const today = new Date();
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(today.getDate() - 14);
    
    // Format both dates for yyyy-mm-dd format
    const endDate = getFormattedDate(today);
    const startDate = getFormattedDate(fourteenDaysAgo);
   
    try {
      setLoading(true);
      const param = {
        start: startDate,
        end: endDate,
        base: "AUD",
        symbols: currencyCode,
        prettyprint: 1
      };
      //  API doesn't support to use respons data
      // const response = await getRequest('time-series.json', param);
      
      const rates = defaultCurrencyRates.rates;
      const dates = Object.keys(rates);
      const points = dates.map(date => rates[date][currencyCode]);
     
      const labels = dates.map(date =>{ 
        const dateForm = new Date(date);
        const day = dateForm.getDate();
        const month = dateForm.toLocaleString('en-GB', { month: 'short' });
        return `${day} ${month}`;

      });

      setLabels(labels);  
      setDataPoints(points);  
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
    }
  };


  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    return `${year}-${day}-${month}`;
  };
  const getLabelDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    
    return `${day}-${month}`;
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.chartBox}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <>
              <Text style={styles.title}>AUD/{currencyCode} - Foreign Exchange Rate</Text>
              <LineChart
              bezier
                data={{
                  labels: labels,
                  datasets: [
                    {
                      data: dataPoints,
                    },
                  ],
                }}
                width={screenWidth * 0.9}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(100, 180, 255, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                style={{ borderRadius: 16 }}
              />
              <Button title="Close" onPress={onClose} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

});

export default ChartModal;
