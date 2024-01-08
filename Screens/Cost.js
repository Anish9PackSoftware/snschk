import { ScrollView, StyleSheet, Text, TouchableOpacity, View ,Image,Dimensions} from 'react-native'
import React from 'react'
import { image185 } from '../Api/MovieDb'

const Cost = ({ cost,navigation }) => {
  const CharacterName = 'Kenedey Killer'
  const PersonName = 'John Wick'
  var { width, height } = Dimensions.get('window')
    return (
        <View style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <Text style={{ marginTop: 5, color: 'white', fontSize: 20, fontWeight: '500' }} >Top Cast</Text>


            <View style={{ marginTop: 20 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                >
                    {
                        cost && cost.map((person, index) => {

                            return <TouchableOpacity
                                key={index}
                                style={{ alignItems: 'center' }}
                                onPress={()=>navigation.navigate('PersonScreen',person)}
                            >
                                <View style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                                {person.profile_path?<Image
                        source={{uri:image185(person.profile_path)}}
                        style={{ width:width*0.2, height: height * 0.1, borderRadius:100, marginBottom: 10 }}
                    />:<Text style={{ width:width*0.2, height: height * 0.1, borderRadius:100, marginBottom: 10 ,color:'white'}}>No Image</Text>}
                                <Text style={{ color: 'white',marginLeft:10 ,textAlign:'center'}}>{person?.character.length>10?person?.character.slice(0,10)+'...':person?.character}</Text>
                                <Text style={{ color: 'lightgray',marginLeft:10,textAlign:'center',alignSelf:'center' }}>{person?.original_name.length>10?person?.original_name.slice(0,10)+'...':person?.original_name}</Text>
                                </View>
                                
                            </TouchableOpacity>
                        })
                    }
                </ScrollView>

            </View>


        </View>
    )
}

export default Cost

const styles = StyleSheet.create({})