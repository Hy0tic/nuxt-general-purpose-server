<template>
	<nav
		class="navbar flex justify-between bg-[#333] p-[1rem] text-[rgb(255,255,255)]"
	>
		<ul class="flex list-none gap-[1rem]">
			<li class="mt-2 cursor-pointer font-bold">
				<NuxtLink to="/"> Home </NuxtLink>
			</li>
		</ul>

		<div class="flex flex-row gap-5">
			<div v-if="!isLoading && username" class="mt-2">
				Welcome back, {{ username }}
			</div>

			<div v-if="!isLoading && isLoggedIn && !twoFaEnabled" class="mt-2">
				<NuxtLink to="/generateQRcode">
					Enable Two Factor Authentication
				</NuxtLink>
			</div>

			<Button v-if="!isLoading && !isLoggedIn">
				<NuxtLink to="/login"> Login </NuxtLink>
			</Button>

			<Button v-if="isLoggedIn && !isLoading" @click="logout"> Logout </Button>
		</div>
	</nav>
</template>

<script lang="ts">
	export default {
		name: "NavBar"
	};
</script>

<script setup lang="ts">
	const isLoggedIn = ref<boolean>();
	const username = ref<string | undefined>();
	const twoFaEnabled = ref<boolean>();
	const router = useRouter();
	const isLoading = ref<boolean>(true);

	async function logout() {
		await $fetch("/api/auth/logout", {
			method: "POST"
		});

		router.go(0);
	}

	onBeforeMount(async () => {
		// TODO: error handling
		await useFetch("/api/auth/amIauthenticated", {
			onRequest({ options }) {
				options.method = "GET";
			},
			onResponse({ response }) {
				// Process the response data
				if (response._data.fresh && import.meta.client) {
					isLoggedIn.value = true;
					username.value = response._data.username;
					twoFaEnabled.value = response._data.twoFA;
				} else {
					isLoggedIn.value = false;
				}
			},
			onRequestError({}) {},
			onResponseError({}) {}
		});

		isLoading.value = false;
	});
</script>
