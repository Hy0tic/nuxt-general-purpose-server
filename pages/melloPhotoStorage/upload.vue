<template>
	<div class="mt-40 flex flex-col items-center justify-center gap-10">
		<!-- <div class="flex flex-wrap justify-center items-center gap-5">
        <img v-for="(image, index) in images" :key="index" :src="image" class="h-36 w-auto rounded-lg" alt="Random Photo" />
      </div> -->
		<UploadBox />
		<!-- TODO: let user upload multiple photos at once -->
	</div>
</template>

<script setup lang="ts">
	import UploadBox from "~/components/UploadBox.vue";

	const response = await $fetch("/api/auth/amIauthenticated", {
		method: "GET"
	});

	if (response.fresh !== true && import.meta.client) {
		navigateTo("/login"); // Adjust the route as necessary
	}

	definePageMeta({
		layout: "default1"
	});
</script>
