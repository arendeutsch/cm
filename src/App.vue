<template>
  <div id="app">
    <div class="cm-container">
      <div class="cm-logo-wrapper">
        <img alt="Carb Manager" src="./assets/cm-logo.svg" class="cm-logo" />
      </div>
      <h2>Carb Manager Dev Assignment</h2>
      <div class="recipes-container">
        <div v-for="recipe in recipes" :key="recipe.id">
          <PremiumRecipeCard
            v-if="!showRecipeOfTheday"
            :recipe="recipe"
            :user="user"
          />
          <RecipeOfTheDay
            v-if="showRecipeOfTheday"
            :recipe="recipe"
            :user="user"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PremiumRecipeCard from "./components/PremiumRecipeCard/PremiumRecipeCard.vue";
import RecipeOfTheDay from "./components/RecipeOfTheDay/RecipeOfTheDay.vue";

export default {
  name: "App",

  components: {
    PremiumRecipeCard,
    RecipeOfTheDay
  },

  data: () => ({
    recipes: [],
    user: {},
    showRecipeOfTheday: true
  }),

  async mounted() {
    const userResponse = await fetch("http://localhost:3000/user");
    this.user = await userResponse.json();
    const recipesResponse = await fetch("http://localhost:3000/recipes");
    this.recipes = await recipesResponse.json();
  }
};
</script>

<style>
#app {
  font-family: "proxima-nova", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style scoped>
.cm-logo-wrapper {
  margin-bottom: 30px;
}

.cm-logo {
  max-width: 150px;
  height: auto;
}

.cm-container {
  max-width: 960px;
  margin: auto;
}

.recipes-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}
</style>
