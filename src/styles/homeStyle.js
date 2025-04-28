'use strict';
import { StyleSheet, useColorScheme } from "react-native";
import {  Colors  } from 'react-native/Libraries/NewAppScreen';



const homeStyle = StyleSheet.create({

    homeContainer:{
        flex:1,
        backgroundColor: '#ffffff',
        padding: 16,              
    },

    viewContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    viewContainer2:{
      backgroundColor: '#fff',
    },
    paddingHome: {
        paddingTop: 40,  
        backgroundColor: '#fff',
    },

    container: {
        flex: 1,
        padding: 16,
      },
      mainCurrencySurface: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 10,
        elevation: 4,
        marginBottom: 16,
      },
      flag: {
        width: 25,
        height: 25,
        // fontSize: 32,
        margin: 6,
        borderRadius: 20, 
       
      },
      flagIco:{
        
        // borderRadius: 20, 
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: 0, // s
      },
      amountSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      amountText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
      },
      list: {
        // flex: 1,
        backgroundColor:'#fff',
      },

      currencySurface: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: 1,
        borderRadius: 10,
        elevation: 2,
        marginHorizontal:16,
        marginBottom: 12,

     
      },
      rightSection: {
        flexDirection: 'row',
      },

      linkButton: {
        width:50,
        borderLeftWidth: 1,
        borderLeftColor: '#ccc', 
        marginLeft: 1,        
        justifyContent: 'center',
        // backgroundColor:'#000'
      },

      currencyIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        padding:14,
      },
      rateAmmount:{
        alignItems: 'right',
        padding:10,
        justifyContent: 'center'
      },

      currencyText: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 8,
        textAlign:'right'
      },

      currencyMiniText: {
        fontSize: 12,
        fontWeight: '100',
        marginLeft: 12,
        textAlign:'right'
      },

      surface: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        padding:14,
        marginVertical:'10%',
        marginHorizontal:5,
        borderRadius: 10,
        
    
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      chartBox: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        width: '90%',
      },
      title: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 10,
      },

});

module.exports = () => {
    const safePadding = '5%';
    const isDarkMode = useColorScheme() === 'dark';

   return StyleSheet.create({
    ...homeStyle,
    viewContainer:{
        ...homeStyle.viewContainer,
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    }



   })
}