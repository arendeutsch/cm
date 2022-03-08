<template>
  <div class="footer-macros">
    <FooterMacro name="carbs" :value="details.nutrients.carbs" />
    <FooterMacro name="proteins" :value="details.nutrients.proteins" />
    <FooterMacro name="fats" :value="details.nutrients.fats" />
  </div>
</template>

<script>
import FooterMacro from "../FooterMacro/FooterMacro.vue";

export default {
  props: {
    details: {
      type: Object,
      required: true
    }
  },
  components: {
    FooterMacro
  }
};
</script>

<style scoped src="./MacrosContainerStyles.css" />
