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
        size="18"
      />
      <div class="rating-count">{{ recipe.rating.count }} ratings</div>
    </div>
    <v-card-actions class="card-footer">
      <div class="footer-icons">
        <v-icon>mdi-clock-time-nine-outline</v-icon>
        <span>{{ renderTime(recipe.preparationTimeMinutes) }}</span>
        <img src="../assets/caloriesIcon.svg" />
        <span ref="calories">{{ renderCalories(recipe.details.energy) }}</span>
        <span>{{ this.user.energyUnits === "calories" ? "Calories" : "KJ" }}</span>
      </div>
      <div class="footer-macros">
        <FooterMacro name="carbs" :value="recipe.details.nutrients.carbs" />
        <FooterMacro
          name="proteins"
          :value="recipe.details.nutrients.proteins"
        />
        <FooterMacro name="fats" :value="recipe.details.nutrients.fats" />
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import FooterMacro from "./FooterMacro.vue";
export default {
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    FooterMacro,
  },
  data() {
    return {
      imageUrl: `linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(22, 27, 35, 0.2) 70.94%, rgba(26, 29, 34, 0.79) 106.25%), url(${this.recipe.images[0].url})`,
      isPublished: this.recipe.isPublished,
    };
  },
  computed: {
    style() {
      return {
        "background-image": this.imageUrl,
      };
    },
    likeStyle() {
      return {
        color: this.isPublished ? "#1BC98E" : "#FFFFFF",
      };
    },
  },
  methods: {
    renderTime(time) {
      if (time < 60) return `${time} min`;
      return `${time / 60} hr ${time % 60} min`;
    },
    renderCalories(energy) {
      if (this.user.energyUnits === "calories") return energy;
      return energy / 1000 * 4.184;
    },
    onCardClick() {
      alert(
        "you have clicked card " + this.recipe.id + ": " + this.recipe.title
      );
    },
  },
};
</script>

<style scoped>
.premium-recipe-root {
  width: 343px;
  height: 318px;
  border-radius: 12px;
  background-color: white;
  margin: 10px;
}
.premium-recipe-root:hover {
  cursor: pointer;
}

.image-container {
  width: 343px;
  height: 200px;
  background-size: cover;
  position: relative;
}
.image-container:hover {
  background-color: #ffffff;
  opacity: 0.4;
}

.heart-icon {
  position: absolute !important;
  top: 16px;
  right: 15px;
}

.premium-chip {
  position: absolute !important;
  bottom: 16px;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 12px;
  border-radius: 10px;
  height: 20px;
  width: 117px;
  background-color: #ffffff;
  opacity: 0.3;
}

.premium-chip-content {
  font-weight: 600;
}

.title {
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: left;
  color: #0c0c0a;
  margin-top: 8px;
  margin-left: 16px;
  margin-right: 16px;

  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.rating-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
  margin-top: 5px;
}

.rating-count {
  color: #1ca677;
  font-size: 14px;
  font-weight: 500;
}
.card-footer {
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  width: 100%;
}

.footer-icons {
  display: flex;
  flex-direction: row;
  flex: auto;
  align-items: center;
  justify-content: space-between;
}
.footer-macros {
  display: flex;
  flex-direction: row;
  flex: auto;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5px;
}
</style>
