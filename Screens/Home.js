import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/EvilIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrendingMovies from './TrendingMovies';
import MovieList from './MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../Api/MovieDb';





const Home = () => {
  const [trending,setTrending] = useState([])
  const [upComing,setUpComing] = useState([])
  const [topRated,setTopRated] = useState([])
 const [loading,setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(()=>{
  getTrendingMovies()
  getUpComingMovies()
  getTopRatedMovies()
  },[])

  const getTrendingMovies = async () =>{
    const data = await fetchTrendingMovies()
    if(data && data.results){
     setTrending(data.results)
      setLoading(false)
    }
 
  }

  const getUpComingMovies = async () =>{
    const data = await fetchUpcomingMovies()
    if(data && data.results){
     setUpComing(data.results)
      setLoading(false)
    }
 
  }

  const getTopRatedMovies = async () =>{
    const data = await fetchTopRatedMovies()
    if(data && data.results){
     setTopRated(data.results)
      setLoading(false)
    }
 
  }


  return (
    <View style={{ flex: 1, justifyContent: 'flexStart', backgroundColor: 'rgb(30,32,29)' }}>

      <SafeAreaView>
        <View style={styles.nav}>

          <View>
            <Text style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}><Icon name="bars-staggered" color="white" size={25} /></Text>
          </View>

          <View>
            <Text style={styles.text}><Text style={{ color: 'yellow' }}>M</Text>ovies</Text>
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate('SearchScreen')}>
            <Text style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }}><Icon1 name="search" color="white" size={30} /></Text>
          </TouchableOpacity>


        </View>
      </SafeAreaView>



{loading?(
  <Loading/>
) : (
     <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
     <TrendingMovies trending={trending}/>
    <MovieList title='Upcoming' hideSee={true} data={upComing}/>
    <MovieList title='Top Rated' hideSee={true} data={topRated}/>
      </ScrollView>
)

}

      


    </View>
  );
}

export default Home

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 3,
    textAlign: 'center',
    height: 30,
    marginTop: 8,
    paddingHorizontal: 5
  },

  text: {
    color: 'white',
    fontSize: 23,
    fontWeight: '600',
  }
})