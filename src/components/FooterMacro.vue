<template>
  <div class="root">
    <div class="macro" :style="style" />
    {{ value }}g
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      macroType: this.name,
    };
  },
  computed: {
    style() {
      return {
        // "background-color": this.macroType === "carbs" ? "#f94642" : "#3177bb",
        "background-color": 
            this.macroType === "carbs" ? "#f94642"
            : this.macroType === "proteins" ? "#3177bb"
            : "#fda120"
            ,
      };
    },
  },
};
</script>

<style scoped>
.root {
  display: flex;
  align-items: center;
  margin: 0px 5px;
}
.macro {
  height: 6px;
  width: 6px;
  border-radius: 15px;
  margin-right: 3px;
}
</style>