<template>
	<p :class="error ? 'message error' : 'message success'">
		{{ message }}
	</p>
</template>
<script>
export default {
	props: {
		message: {
			type: String,
			required: true
		},
		error: {
			type: Boolean,
			required: true
		}
	}
}
</script>
<style lang="scss">
@import "@/scss/variables.scss";

.message {
	font-size: 1.2rem;
	padding: 1rem 2rem;
	border-radius: 0.3rem;
	margin-top: 1rem;
	font-weight: bold;
	text-align: center;
	width: 100%;
}
.error {
	background-color: $error-bg-color;
	border: $error-border;
}
.success {
		background-color: $success-bg-color;
	border: $success-border;
}
</style>