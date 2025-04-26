import React, { useEffect, useState } from 'react';
import { Modal, View, Text, ActivityIndicator, StyleSheet, Dimensions, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getRequest } from '../api/client'; 

const screenWidth = Dimensions.get('window').width;

const ChartModal = ({ visible, currencyCode, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    if (visible) {
      fetchRates();
    }
  }, [visible]);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        return d.toISOString().split('T')[0]; // format: yyyy-mm-dd
      }).reverse();

      const ratesPromises = last7Days.map(date =>
        getRequest(`historical/${date}.json`)
      );

      const ratesResponses = await Promise.all(ratesPromises);

      const points = ratesResponses.map(r => r.rates[currencyCode]);
      setLabels(last7Days.map(d => d.slice(5))); // 'MM-DD'
      setDataPoints(points);
    } catch (error) {
      console.error('Error fetching weekly rates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={styles.modalContainer}>
        <View style={styles.chartBox}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <>
              <Text style={styles.title}>{currencyCode} - Last 7 Days</Text>
              <LineChart
                data={{
                  labels: labels,
                  datasets: [
                    {
                      data: dataPoints,
                    },
                  ],
                }}
                width={screenWidth * 0.8}
                height={220}
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 2,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ChartModal;
