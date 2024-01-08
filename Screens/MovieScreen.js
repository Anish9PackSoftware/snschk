import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getStateFromPath, useNavigation, useRoute } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import Cost from './Cost';
import MovieList from './MovieList';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../Api/MovieDb';

var { width, height } = Dimensions.get('window')


const MovieScreen = () => {
    const { params: item } = useRoute()
    const navigation = useNavigation()
    const [isHeart, setIsHeart] = useState(false)
    const [movie,setMovie] = useState({})
    const [cost, setCost] = useState([])
    const [similarMovies,setSimilarMovies] = useState([])

    useEffect(() => {
     getMovieDetails(item.id)
     getMovieCredit(item.id)
     getSimilarMovie(item.id)
    }, [])

    const getMovieDetails = async (id) =>{
      const data = await fetchMovieDetails(id)
      if(data) setMovie(data)
    }

    const getMovieCredit = async(id) =>{
       const data = await fetchMovieCredits(id)
       if(data && data.cast) setCost(data.cast)
    }

    const getSimilarMovie = async (id) =>{
       const data = await fetchSimilarMovies(id)
       if(data && data?.results) setSimilarMovies(data?.results)
      
    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{ backgroundColor: 'rgb(30,32,29)', flex: 1, position: 'relative' }}
            >
                <View style={{ position: 'absolute', zIndex: 100 }}>
                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                        <TouchableOpacity
                            style={{ height: 32, width: '25%', backgroundColor: 'rgb(237,166,50)', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="chevron-back" color="white" size={30} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ left: 190, height: 32, width: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: isHeart ? 'lightgray' : 'black' }}
                            onPress={() => setIsHeart(!isHeart)}
                        >
                            <Icon1 name="heart" color="white" size={30} />
                        </TouchableOpacity>

                    </View>
                </View>


                <View>
                    <Image
                        source={{uri:image500(movie?.poster_path)}}
                        style={{ width, height: height * 0.55, borderRadius: 10, marginBottom: 10 }}
                    />
                </View>
                <View style={{ padding: 10 }}>
                    <Text style={{ color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center', fontSize: 27, fontWeight: 'bold' }}>{movie?.title}</Text>
                    <Text style={{ marginTop: 5, color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>{movie?.status} * {movie?.release_date?.split('-')[0]} * {movie?.runtime} min</Text>


                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                
                       {movie?.genres?.map((genres,index)=>{
                            let showDot = index+1 != movie.genres.length
                            return(
                                <View key={index} style={{marginLeft:10}}>
                                <Text style={{ marginTop: 15, color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }} >{genres?.name} {showDot?'*':null}</Text>

                                    </View>
                            )
                        })} 
                    </View>

                    <Text style={{ marginTop: 5, color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                     {movie?.overview}
                    </Text>
                    <Cost navigation={navigation} cost={cost}/>
                    <MovieList title='Similar Movies' hideSee={false} data={similarMovies}/>
                </View>
              
            </ScrollView>
        </View>
    )
}

export default MovieScreen

const styles = StyleSheet.create({})