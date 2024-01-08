import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from './MovieList';
import { fetchPersonDetails, fetchPersonMovies, image185, image342 } from '../Api/MovieDb';

var { width, height } = Dimensions.get('window')
const PersonScreen = () => {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [isHeart, setIsHeart] = useState(false)
    const [person,setPerson] = useState([])
    const [personMovies,setPersonMovies] = useState([])

useEffect(()=>{
 getPersonDetails(item.id)
 getPersonMovie(item.id)
},[])

const getPersonDetails = async (id) =>{
    const data = await fetchPersonDetails(id)
    if(data) setPerson(data)
}


const getPersonMovie = async (id) =>{
    const data = await fetchPersonMovies(id)
    if(data && data?.cast) setPersonMovies(data?.cast)
}


    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: 'rgb(30,32,29)' }}
            contentContainerStyle={{ paddingBottom: 20 }}
        >
            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity
                    style={{ height: 32, width: '10%', backgroundColor: 'rgb(237,166,50)', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="chevron-back" color="white" size={30} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ height: 32, width: '10%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: isHeart ? 'tomato' : 'lightgray' }}
                    onPress={() => setIsHeart(!isHeart)}
                >
                    <Icon1 name="heart" color="white" size={30} />
                </TouchableOpacity>

            </View>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>

                <View style={{
                    width: width * 0.5,
                    height: height * 0.25,
                    borderColor: 'lightgray',
                    borderRadius: 100,
                    elevation: 10,
                }}>
                    <Image
                        source={{uri:image342(person?.profile_path)}}
                        style={{ width: width * 0.5, height: height * 0.25, borderRadius: 100, borderWidth: 3, borderColor: 'white' }}
                    />
                </View>

            </View>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                <Text style={{ color: 'white', fontSize: 28, fontStyle: 'normal', fontWeight: 'bold' }}>{person.name}</Text>
            </View>


            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 25, backgroundColor: 'rgb(50,51,50)', borderRadius: 30, width: width * 0.95, height: height * 0.09, marginHorizontal: 10, flexDirection: 'row' }}>
                
                <View style={{ borderRightWidth: 1, borderColor: 'white', paddingRight: 5 ,display:'flex',justifyContent:'center',alignItems:'center' }}>
                    <Text style={{ color: 'white' ,fontWeight: '600',fontSize:16 }}>Gender</Text>
                    <Text style={{ color: 'white' }}>{person.gender===1?'Female':'Male'}</Text>
                </View>

                <View style={{ borderRightWidth: 1, borderColor: 'white', paddingRight: 5,marginLeft:12 ,display:'flex',justifyContent:'center',alignItems:'center'  }}>
                    <Text style={{ color: 'white' ,fontWeight: '600',fontSize:16 }}>Birthday</Text>
                    <Text style={{ color: 'white' }}>{person?.birthday}</Text>
                </View>

                <View style={{ borderRightWidth: 1, borderColor: 'white', paddingRight: 5 ,marginLeft:12,display:'flex',justifyContent:'center',alignItems:'center' }}>
                    <Text style={{ color: 'white' ,fontWeight: '600',fontSize:16 }}>Known for</Text>
                    <Text style={{ color: 'white' }}>{person?.known_for_department}</Text>
                </View>

                 <View style={{paddingRight: 5,marginLeft:8 ,display:'flex',justifyContent:'center',alignItems:'center' }}>
                    <Text style={{ color: 'white' ,fontWeight: '600',fontSize:16 }}>Popularity</Text>
                    <Text style={{ color: 'white' }}>{person?.popularity?.toFixed(2)}%</Text>
                </View>

            </View>

            <View style={{ marginTop:20,paddingHorizontal:10}}>
                <Text style={{ color: 'white', fontSize: 28, fontStyle: 'normal', fontWeight: '400' }}>Biography</Text>
                <Text style={{ marginTop: 5, color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                      {person?.biography || 'N/A'}
                    </Text>
            </View>
           
           <MovieList data={personMovies} title='Movies' hideSee={false}/>

        </ScrollView>
    )
}

export default PersonScreen

const styles = StyleSheet.create({})