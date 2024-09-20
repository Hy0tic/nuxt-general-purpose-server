<!--pages/login.vue-->
<script lang="ts" setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

async function login(e: Event) {
	await $fetch("/api/auth/login", {
		method: "POST",
		body: new FormData(e.target as HTMLFormElement)
	});
	await navigateTo("/");
}
</script>

<template>
	<div class="flex justify-center items-center">
		<div class="rounded-lg w-80 h-80 bg-[rgb(24,24,27)] flex flex-col justify-center items-center mt-48">
			<h1>Sign in</h1>
			<form method="post" action="/api/auth/login" @submit.prevent="login" class="m-5 flex flex-col">
				<label htmlFor="username">Username</label>
				<InputText name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<InputText type="password" name="password" id="password" />
				<br />
				<Button>Continue</Button>
			</form>
		</div>
	</div>
</template>