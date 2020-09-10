<template>
  <div :class="['pixel', color, current ? 'current' : '']" @click="handleClick"></div>
</template>

<script>
export default {
  name: "Pixel",
  props: {
    color: String,
    current: Boolean,
    isPicked: Boolean,
    isInCanvas: Boolean,
    index: Number
  },
  methods: {
    handleClick: function() {
      if (this.isPicked) {
        this.$root.$emit("updatecolor", this.color);
      }
      if (this.isInCanvas) {
        this.$root.$emit("clickedpixel", this.index);
      }
    }
  }
};
</script>

<style scoped>
.pixel {
  border: 1px solid lightgray;
  width: 30px;
  height: 30px;
  box-sizing: border-box;
}
.white {
  background-color: white;
}
.red {
  background-color: #ED6A5A;
}
.yellow {
  background-color: #F4F1BB;
}
.darkgreen {
  background-color: #9BC1BC;
}
.rice {
  background-color: #E6EBE0;
}
.blue {
  background-color: #36A4C7;
}
.darkblue {
  background-color: #140C40;
}
.pixel.current {
  border: 4px solid yellow;
}
</style>