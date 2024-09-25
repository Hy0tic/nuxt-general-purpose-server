<template>
	<nav
		class="navbar flex justify-between bg-[#333] p-[1rem] text-[rgb(255,255,255)]"
	>
		<ul class="flex list-none gap-[1rem]">
			<li class="cursor-pointer"><NuxtLink to="/">Home</NuxtLink></li>
		</ul>

		<div class="flex flex-row gap-5"> 
			<div v-if="username">
				Welcome back, {{ username }}
			</div>

			<Button v-if="!isLoggedIn">
				<NuxtLink to="/login">
					Login
				</NuxtLink>
			</Button>
	
			<Button v-if="isLoggedIn" @click="logout">
				Logout
			</Button>
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
	const router = useRouter();

	async function logout() {
		await $fetch("/api/auth/logout", {
			method: "POST"
		});

		router.go(0);
	}

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

</script>