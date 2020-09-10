<template>
  <div>
    <Pixel isPicked color="white" :current="color == 'white' ? true : false"/>
    <Pixel isPicked color="red" :current="color == 'red' ? true : false"/>
    <Pixel isPicked color="yellow" :current="color == 'yellow' ? true : false"/>
    <Pixel isPicked color="rice" :current="color == 'rice' ? true : false"/>
    <Pixel isPicked color="darkgreen" :current="color == 'darkgreen' ? true : false"/>
    <Pixel isPicked color="blue" :current="color == 'blue' ? true : false"/>
    <Pixel isPicked color="darkblue" :current="color == 'darkblue' ? true : false"/>
  </div>
</template>

<script>
import Pixel from "./Pixel";
export default {
  name: "ColorPicker",
  props: {
    color: String
  },
  methods: {
    changeColor: function(color) {
      alert(color);
    }
  },
  components: {
    Pixel
  }
};
</script>