import { ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../Api/MovieDb';


var { width, height } = Dimensions.get('window')

const MovieList = ({ data, title, hideSee }) => {
  const navigation = useNavigation()

  return (
    <>
      <View style={styles.nav}>

        <View>
          <Text style={styles.text}>{title}</Text>
        </View>

        {hideSee && (
          <TouchableOpacity>
            <Text style={{ display: 'flex', justifyContent: 'center', alignItems: "center", color: 'yellow', fontSize: 18, fontWeight: '500' }}>See All</Text>
          </TouchableOpacity>
        )}


      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        style={{ marginTop: 20 }}
      >

        {
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                  <Image
                    source={{uri:image185(item.poster_path)}}
                    style={{ width: width * 0.4, height: height * 0.3, borderRadius: 10 }}
                  />
                  <Text style={{ color: 'white', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>{item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}</Text>
                </View>

              </TouchableWithoutFeedback>
            )
          })
        }

      </ScrollView>
    </>
  )
}

export default MovieList

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 3,
    textAlign: 'center',
    height: 30,
    marginTop: 12,
    paddingHorizontal: 5
  },

  text: {
    color: 'white',
    fontSize: 23,
    fontWeight: '600',
  }

})