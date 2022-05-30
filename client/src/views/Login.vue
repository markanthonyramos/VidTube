<template>
	<ApolloMutation
		:mutation="gql => gql`
			mutation($input: UserInput!) {
				login(input: $input) {
					message
					access_token
					wrongCredentials
					refresh_token
				}
			}
		`"
		:variables="{ 
			input: {
				username,
				password
			}
		}"
		@done="onDone"
	>
		<template v-slot="{ mutate, loading, error }">
			<Loading v-if="loading" />
			<p v-if="error">An Error Occured.</p>
			<div class="login" v-else>
				<div>
					<img src="@/assets/login-image.jpeg" />
				</div>
				<form @submit.prevent="mutate()">
					<input type="text" placeholder="Username" name="username" v-model="username" /><br>
					<input type="text" placeholder="Password" name="password" v-model="password" /><br>
					<button type="submit">Log In</button>
					<p class="register-link"><router-link to="/register">Don't have an account yet?</router-link></p>
					<Message v-if="message" :message="message" :error="wrongCredentials" />
				</form>
			</div>
		</template>
	</ApolloMutation>
</template>

<script>
import Loading from '../components/Loading.vue';
import Message from '../components/Message.vue';

export default {
  components: { 
		Loading,
		Message
	},
	data: () => ({
		username: "",
		password: "",
		message: "",
		wrongCredentials: false
	}),
	methods: {
		onDone({ data }) {
			this.message = data.login.message;
			this.wrongCredentials = data.login.wrongCredentials;
			
		}
	}
}
</script>

<style lang="scss">
@import "@/scss/variables.scss";

.login {
	display: flex;
	align-items: center;

	div:first-child {
		width: 75%;
	}

	img {
		width: 100%;
		height: calc(100vh - 66px);
	}

	form {
		background-color: white;
		height: calc(100vh - 66px);
		width: 25%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;

		input {
			// margin-bottom: 1rem;
			width: 100%;
			font-size: 1.5rem;
			padding: 1rem 1rem;
		}

		button {
			width: 100%;
			
		}
	}
}
.register-link {
	margin-top: 1rem;
	text-align: center;
	font-size: 1.2rem;
}
</style>