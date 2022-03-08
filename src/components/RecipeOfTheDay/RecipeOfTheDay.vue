<template>
  <v-card elevation="1" class="recipeoftheday-root">
    <div class="image-container" :style="style">
      <div class="header">Recipe of the day</div>
      <div class="title">{{ recipe.title }}</div>
      <v-rating
        :value="recipe.rating.score"
        class="rating-container"
        color="#FDA01E"
        dense
        half-increments
        readonly
        size="20"
      />
      <div class="info-container">
        <span>{{ renderTime(recipe.preparationTimeMinutes) }}</span>
        <hr class="info-divider" />
        <span ref="calories">{{
          this.user.energyUnits === "KJ"
            ? renderCalories(recipe.details.energy)
            : recipe.details.energy
        }}</span>
        <span>{{
          this.user.energyUnits === "calories" ? "Calories" : "KJ"
        }}</span>
      </div>
      <div class="card-footer">
        <MacrosContainer :details="recipe.details" />
        <v-btn rounded small class="action-btn" @click="onCardClick">
          Learn More
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import MacrosContainer from "../MacrosContainer/MacrosContainer.vue";
import { convertMinutesToDuration, convertCalToKJ } from "../../utils/utils";
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    MacrosContainer
  },
  data() {
    return {
      imageUrl: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(22, 27, 35, 0.2) 70.94%, rgba(26, 29, 34, 0.79) 106.25%), url(${this.recipe.images[0].url})`
    };
  },
  computed: {
    style() {
      return {
        "background-image": this.imageUrl
      };
    }
  },
  methods: {
    renderTime: convertMinutesToDuration,
    renderCalories: convertCalToKJ,
    onCardClick() {
      alert("Recipe of the day " + this.recipe.id + ": " + this.recipe.title);
    }
  }
};
</script>

<style scoped src="./RecipeOfTheDayStyles.css" />
