import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View ,Image,Dimensions, TouchableWithoutFeedback} from 'react-native'
import React, { useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { debounce } from 'lodash'
import { image185, searchMovies } from '../Api/MovieDb';

var { width, height } = Dimensions.get('window')

const SerachScreen = () => {
    const navigation = useNavigation()
    const [result,setResult] = useState([])
    const [loading,setLoading] = useState(true)
  
  
    const handleSearch = (text) =>{
      if(text){
        searchMovies({
          query:text,
          include_adult:'false',
          language:'en-US',page:'1'
        }).then((data)=>{
          setLoading(false)
          if(data && data.results) setResult(data.results)
        })
      }else{
        setLoading(true)
        setResult([])
      }
    }
  
    const handleTextDebounce = useCallback(debounce(handleSearch,600),[])

    return (
   <SafeAreaView style={{backgroundColor:'rgb(30,32,29)',flex:1,padding:10}}>
   <TextInput
   onChangeText={handleTextDebounce}
   placeholder='Search Movies'
   placeholderTextColor='lightgray'
   style={{paddingLeft:25,fontWeight:'bold',borderColor:'white',borderWidth:1,justifyContent:'center',alignItems:'center',borderRadius:50,color:'white'}}
   />

   <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={{position:'absolute',right:20,top:20}}>
   <Icon name="x-circle" color="white" size={30} />
   </TouchableOpacity>

  
  {loading?(
    <Loading/>
  ):(
    result.length>0?
      <ScrollView
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}
      >
      <Text style={{color:'white',marginTop:10}}>Result({result.length})</Text>
      
      <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
   
   {result.map((item,index)=>{
   
       return(
     <TouchableWithoutFeedback key={index} onPress={()=>navigation.push('Movie',item)}>
       <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       <Image
                       source={{uri:image185(item?.poster_path)}}
                       style={{ width: width * 0.35, height: height * 0.25, borderRadius: 10 ,margin:15 }}
                     />
   
                     <Text style={{color:'white'}}>{item?.title.length> 22 ? item?.title.slice(0,16):item?.title}</Text>
       </View>
     
     </TouchableWithoutFeedback>
       )
       })}
   
   
      </View>
      </ScrollView>:
      <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Image
                       source={require('../assets/img2.jpg')}
                       style={{ width:'50%', height:'50%', borderRadius: 10 ,margin:15 }}
                     />
      </View>
      
   
  )
}
  


  
 
   </SafeAreaView>
  )
}

export default SerachScreen

const styles = StyleSheet.create({})