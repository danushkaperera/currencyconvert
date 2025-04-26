import * as React from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
import getStyles from '../styles/homeStyle';
import { Dimensions, ScrollView } from 'react-native';
import { Portal, Modal, Text, Button } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const CurrencyHistory = ({ visible, onDismiss, data, currencyCode }) => {
  const [visible, setVisible] = React.useState(false);
  const styles = getStyles();
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  // return (
  // //   <PaperProvider>
  // //     <Portal>
  // //       <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
  // //         <Text>Example Modal.  Click outside this area to dismiss.</Text>
  // //       </Modal>
  // //     </Portal>
  // //     <Button style={{marginTop: 30}} onPress={showModal}>
  // //       Show
  // //     </Button>
  // //   </PaperProvider>
  // // );
  const labels = data.map(item => item.date.slice(5)); // show MM-DD
  const rates = data.map(item => item.rate);

  const chartData = {
    labels,
    datasets: [{ data: rates }],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 2,
    propsForDots: { r: '4' },
  };

  const width = Math.max(screenWidth, labels.length * 50);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Text style={styles.title}>{currencyCode} — 7-Day Trend</Text>
        <ScrollView horizontal>
          <LineChart
            data={chartData}
            width={width}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </ScrollView>
        <Button mode="contained" onPress={onDismiss} style={styles.closeButton}>
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

export default CurrencyHistory;