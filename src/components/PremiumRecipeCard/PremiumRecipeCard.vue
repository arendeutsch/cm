<template>
  <v-card elevation="1" class="premium-recipe-root" @click="onCardClick">
    <div class="image-container" :style="style">
      <v-icon class="heart-icon" :style="likeStyle">{{
        recipe.isPublished ? "mdi-heart" : "mdi-heart-outline"
      }}</v-icon>
      <div v-if="recipe.isPremium" class="premium-chip">
        <v-icon small>mdi-trophy-outline</v-icon>
        <span class="premium-chip-content">Premium Recipe</span>
      </div>
    </div>
    <span class="title">{{ recipe.title }}</span>
    <div class="rating-container">
      <v-rating
        :value="recipe.rating.score"
        color="#FDA01E"
        dense
        half-increments
        readonly
        size="20"
      />
      <div class="rating-count">{{ recipe.rating.count }} ratings</div>
    </div>
    <v-card-actions class="card-footer">
      <div class="footer-icons">
        <v-icon>mdi-clock-time-nine-outline</v-icon>
        <span>{{ renderTime(recipe.preparationTimeMinutes) }}</span>
        <img src="../../assets/caloriesIcon.svg" />
        <span ref="calories">{{
          this.user.energyUnits === "KJ"
            ? renderCalories(recipe.details.energy)
            : recipe.details.energy
        }}</span>
        <span>{{
          this.user.energyUnits === "calories" ? "Calories" : "KJ"
        }}</span>
      </div>
      <MacrosContainer class="macros-root" :details="recipe.details" />
    </v-card-actions>
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
      imageUrl: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(22, 27, 35, 0.2) 70.94%, rgba(26, 29, 34, 0.79) 106.25%), url(${this.recipe.images[0].url})`,
      isPublished: this.recipe.isPublished
    };
  },
  computed: {
    style() {
      return {
        "background-image": this.imageUrl
      };
    },
    likeStyle() {
      return {
        color: this.isPublished ? "#1BC98E" : "#FFFFFF"
      };
    }
  },
  methods: {
    renderTime: convertMinutesToDuration,
    renderCalories: convertCalToKJ,
    onCardClick() {
      alert(
        "you have clicked card " + this.recipe.id + ": " + this.recipe.title
      );
    }
  }
};
</script>

<style scoped src="./PremiumRecipeCardStyles.css" />
