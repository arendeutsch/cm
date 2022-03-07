<template>
  <v-card elevation="1" class="premium-recipe-root">
    <div class="image-container" :style="style"></div>
    <span class="title">{{ recipe.title }}</span>
    <div class="rating-container">
      <v-rating
        :value="recipe.rating.score"
        color="#FDA01E"
        dense
        half-increments
        readonly
        size="14"
      />
      <div class="rating-count">{{ recipe.rating.count }} ratings</div>
    </div>
    <div class="card-footer">
      <v-icon>mdi-clock-time-nine-outline</v-icon>
      <span>{{ renderTime(recipe.preparationTimeMinutes) }}</span>
      <img src="../assets/caloriesIcon.svg"/>
      <span>{{ renderCalories(recipe.details.energy) }}</span>
    </div>
  </v-card>
</template>

<script>
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
  data() {
    return {
      imageUrl: `url(${this.recipe.images[0].url})`
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
    renderTime(time) {
      if (time < 60) return `${time} min`;
      return `${time / 60} hr ${time % 60} min`;
    },
    renderCalories(energy) {
      if (this.user.energyUnits === "calories") return `${energy} Calories`;
      return `${energy / 1000 * 4.184} KJ`;
    }
  }
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

.image-container {
  width: 343px;
  height: 200px;
  background-size: cover;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 13px;
  margin-top: 10px;
  font-size: 12px;
}
</style>
