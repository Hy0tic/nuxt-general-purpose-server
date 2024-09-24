<script lang="ts" setup>
	import Button from "primevue/button";
	import InputText from "primevue/inputtext";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const isLoggedIn = ref<boolean>(true);
	const username = ref<string | undefined>();
	const warning = ref<string | undefined>();

	onBeforeMount(async () => {
		const response: any = await $fetch("/api/auth/amIauthenticated", {
			method: "GET"
		});

		if (response.fresh && process.client) {
			isLoggedIn.value = true;
			username.value = response.username;
		} else if (!response.fresh && process.client) {
			isLoggedIn.value = false;
		}
	});

	async function login(e: Event) {
		try {
			const response = await $fetch("/api/auth/login", {
				method: "POST",
				body: new FormData(e.target as HTMLFormElement)
			});

			if (response && response.statusCode === 200 && !response.requiresTOTP) {
				// Navigate to home if login is successful
				await router.push("/");
			} else if (
				response &&
				response.statusCode === 200 &&
				response.requiresTOTP
			) {
				await router.push("/TOTP");
			}
		} catch (e) {
			warning.value = "Invalid username or password";
		}
	}

	async function logout() {
		await $fetch("/api/auth/logout", {
			method: "POST"
		});

		router.go(0);
	}
</script>

<template>
	<div class="flex justify-center items-center">
		<div
			class="rounded-lg w-80 h-auto bg-[rgb(24,24,27)] flex flex-col justify-center items-center mt-48"
			v-if="!isLoggedIn"
		>
			<h1 class="text-2xl font-semibold m-4">Sign in</h1>

			<div class="text-red-700">
				{{ warning }}
			</div>

			<form
				method="post"
				action="/api/auth/login"
				@submit.prevent="login"
				class="m-5 flex flex-col"
			>
				<label htmlFor="username">Username</label>
				<InputText name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<InputText type="password" name="password" id="password" />
				<br />
				<Button type="submit"> Continue </Button>
			</form>
		</div>

		<div
			v-if="isLoggedIn"
			class="rounded-lg w-80 h-80 bg-[rgb(24,24,27)] flex flex-col justify-center items-center mt-48 gap-6"
		>
			<div>Logged in as {{ username }}</div>
			<Button type="button" @click="logout" class="m-5"> Sign out </Button>
		</div>
	</div>
</template>
