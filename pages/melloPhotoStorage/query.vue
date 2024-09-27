<template>
	<Image
		v-for="(image, index) in images"
		:key="index"
		:src="image"
		class="h-36 w-auto rounded-lg"
		alt="image"
	/>
</template>

<script setup lang="ts">
	import Image from "primevue/image";

	const images = ref([]);

	onBeforeMount(async () => {
		const response = await $fetch("/api/auth/amIauthenticated", {
			method: "GET"
		});

		if (response.fresh !== true && process.client) {
			navigateTo("/login"); // Adjust the route as necessary
		}

        // // TODO: error handling
		// await useFetch("/api/", {
		// 	onRequest({ options }) {
		// 		options.method = "GET";
		// 	},
		// 	onResponse({}) {},
		// 	onRequestError({}) {},
		// 	onResponseError({}) {}
		// });
	});
</script>
