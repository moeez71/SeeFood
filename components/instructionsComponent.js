import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default class InstructionsComponent extends PureComponent {
  render() {
    return (
        <View>
            <Text style={styles.title}>{this.props.number}.</Text>
            <Text style={styles.subtitle}>{this.props.step}</Text>
            <View style={styles.hr}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: 'Nexa Bold',
    color: '#1B1B13',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Nexa Regular',
    color: '#1B1B13',
    textAlign: 'center',  
  },
  hr: {
    borderWidth: 1,
    borderColor: 'rgba(219, 219, 219, 0.2)',
    marginVertical: 8,
  },
})
