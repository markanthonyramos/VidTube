<template>
	<div class="navbar">
		<h2>VidTube</h2>
		<div>
			<router-link to="/">Home</router-link> |
			<router-link to="/login">Login</router-link> |
			<router-link to="/about">About</router-link>
		</div>
	</div>
</template>

<style lang="scss">
.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 6rem;
	background-color: white;
	border-bottom: 0.1rem solid #999;

	h2 {
		font-size: 2rem;
	}

	a {
		font-weight: bold;
		color: #2c3e50;
		font-size: 1.5rem;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>