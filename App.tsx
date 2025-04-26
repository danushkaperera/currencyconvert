/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import CurrencyList from './src/screens/CurrencyList';
import { PaperProvider } from 'react-native-paper';


function App(): React.JSX.Element {
 
  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  
  return (
    <PaperProvider>
   <CurrencyList />
   </PaperProvider>
  );
}



export default App;
