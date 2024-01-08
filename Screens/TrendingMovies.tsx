import { Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import { useNavigation } from '@react-navigation/native'
import { image500 } from '../Api/MovieDb'

var {width,height} = Dimensions.get('window')

const TrendingMovies = ({trending}:any) => {
  const navigation = useNavigation<any>()
  
  const handleClick = (item:any) =>{
    navigation.navigate('Movie',item)
  }



  return (
    <View style={{marginTop:15,paddingHorizontal:5}}>
      <Text style={{color:'white',fontSize:28,fontStyle:'normal',fontWeight:'750'}}>Trending</Text>
      <Carousel
      data={trending}
      renderItem={({item})=><MovieCard item={item} handleClick={handleClick}/>}
      firstItem={1}
      inactiveSlideOpacity={0.68}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display:'flex',alignItems:'center'}}
      /> 
     </View>
  )
}

const MovieCard = ({item,handleClick}:any) =>{
    return(
        <TouchableWithoutFeedback onPress={()=>{handleClick(item)}}>
         <Image
         source={{uri:image500(item.poster_path)}}
         style={{width:width*0.6,height:height*0.4,borderRadius:10}}
         />
        </TouchableWithoutFeedback>
    )
}

export default TrendingMovies

const styles = StyleSheet.create({})