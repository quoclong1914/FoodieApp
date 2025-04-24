import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function MyRecipeScreen() {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const storedRecipes = await AsyncStorage.getItem('customRecipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  const handleAddRecipe = () => {
    navigation.navigate('RecipesFormScreen');
  };

  const handlerecipeClick = (recipe) => {
    navigation.navigate('CustomRecipesScreen', { recipe });
  };
  const deleteRecipe = async (index) => {
    try {
      const updatedRecipes = [...recipes];
      updatedRecipes.splice(index, 1);
      await AsyncStorage.setItem(
        'customRecipes',
        JSON.stringify(updatedRecipes)
      );
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error deleting the recipe:', error);
    }
  };

  const editRecipe = (recipe, index) => {
    navigation.navigate('NewsFormScreen', {
      recipeToEdit: recipe,
      recipeIndex: index,
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Text style={styles.backButtonText}>{'Back'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAddRecipe} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add New recipe</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {recipes.length === 0 ? (
            <Text style={styles.noRecipesText}>No recipes added yet.</Text>
          ) : (
            recipes.map((recipe, index) => (
              <View key={index} style={styles.recipeCard} testID="recipeCard">
                <TouchableOpacity
                  testID="handlerecipeBtn"
                  onPress={() => handlerecipeClick(recipe)}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <Text
                    style={styles.recipeDescription}
                    testID="recipeDescription"
                  />
                </TouchableOpacity>

                {/* Edit and Delete Buttons */}
                <View
                  style={styles.actionButtonsContainer}
                  testID="editDeleteButtons">
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => editRecipe(recipe, index)}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteRecipe(index)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(4),
    backgroundColor: '#F9FAFB',
  },
  backButton: {
    marginBottom: hp(1.5),
  },
  backButtonText: {
    fontSize: hp(2.2),
    color: '#4F75FF',
  },
  addButton: {
    backgroundColor: '#4F75FF',
    padding: wp(0.7),
    alignItems: 'center',
    borderRadius: 5,
    width: 300,
    marginTop: hp(2),
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: hp(2.2),
    marginTop: hp(2),
  },
  scrollContainer: {
    paddingBottom: hp(2),
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  noRecipesText: {
    textAlign: 'center',
    fontSize: hp(2),
    color: '#6B7280',
    marginTop: hp(5),
  },
  recipeCard: {
    width: 400,
    height: 300,
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: 8,
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  recipeTitle: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#111827',
    marginBottom: hp(0.5),
  },
  recipeDescription: {
    fontSize: hp(1.8),
    color: '#6B7280',
    marginBottom: hp(1.5),
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(1),
  },
  editButton: {
    backgroundColor: '#34D399',
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: hp(1.8),
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    padding: wp(0.5),
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: hp(1.8),
  },
});
