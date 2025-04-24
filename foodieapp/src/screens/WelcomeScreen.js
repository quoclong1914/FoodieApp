import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {logoUrl} from '../mock/welcome';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => navigation.navigate('Home'), 1200);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.ring}>
        <Image source={{uri: logoUrl}} style={styles.logo} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>your food recipe app</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBBF24',
  },
  ring: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 9999,
  },
  logo: {
    width: hp(20),
    height: hp(20),
  },
  textContainer: {
    alignItems: 'center',
    marginTop: hp(2),
  },
  title: {
    fontSize: hp(7),
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: '500',
    color: '#FFFFFF',
    letterSpacing: 3,
  },
});
