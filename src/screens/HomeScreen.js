import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Categories from '../components/categories';
import Recipe from '../components/recipes';
import {allFood, categories, avatar} from '../mock/home';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Chicken');

  const handleChangeCategory = category => {
    setActiveCategory(category);
  };

  const filteredFoods = allFood.filter(
    food => food.category === activeCategory,
  );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        testID="scrollContainer">
        <View style={styles.headerContainer} testID="headerContainer">
          <Image source={{uri: avatar}} style={styles.avatar} />
          <Text style={styles.greetingText}>Hello, User!</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Make your own food,</Text>
          <Text style={styles.subtitle}>
            stay at <Text style={styles.highlight}>home</Text>
          </Text>
        </View>

        <View testID="categoryList">
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            handleChangeCategory={handleChangeCategory}
          />
        </View>

        <View testID="foodList">
          <Recipe foods={filteredFoods} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 50,
    paddingTop: hp(14),
  },
  headerContainer: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
    marginTop: hp(-8.5),
  },
  avatar: {
    height: hp(5),
    width: hp(5.5),
  },
  greetingText: {
    fontSize: hp(1.7),
    color: '#52525B',
    fontWeight: '600',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: 9999,
    textAlign: 'center',
  },
  titleContainer: {
    marginHorizontal: wp(4),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3.8),
    fontWeight: '600',
    color: '#52525B',
  },
  subtitle: {
    fontSize: hp(3.8),
    fontWeight: '600',
    color: '#52525B',
  },
  highlight: {
    color: '#F59E0B',
  },
});
