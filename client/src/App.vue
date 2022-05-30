<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
@import "@/scss/variables.scss";

html {
	font-size: $base-font;
  font-family: Arial;
}
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
body {
  background-color: $background-color;
}
button {
	padding: 0.5rem 1rem;
	background-color: $primary-color;
	border: 0.1rem solid $primary-color;
	border-radius: 0.3rem;
	color: white;
	font-weight: bold;
	cursor: pointer;
	outline: none;
	font-size: 1.3rem;
}
input {
	padding: 0.5rem 0.5rem;
	outline: none;
	border: 0.1rem solid #999;
	border-radius: 0.3rem;
}
input:focus {
	border-color: $primary-color;
}
</style>
