import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',position:'absolute',top:350,left:150}}>
      <ActivityIndicator size={100} color='blue'/>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})