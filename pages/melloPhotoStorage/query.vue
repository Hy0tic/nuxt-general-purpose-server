<template>
	<div class="flex flex-row"> 
		<ImageEntry
			v-for="(image, index) in images"
			:key="index"
			:src="image"
			class="h-36 w-auto rounded-lg"
			:title="image.title"
			:url="image.url"
			:description="image.description"
		/>
	</div>
</template>

<script setup lang="ts">
	type ImageInfo = {
		title: string;
		description: string;
		url: string;
	}

	const images = ref<ImageInfo[]>([{
		title: "test image",
		description: "japan or smthn",
		url: "https://www.thesprucepets.com/thmb/b_dt6JpFxaD6ROMYy7nVmwuFars=/3504x0/filters:no_upscale():strip_icc()/Pomeranian-GettyImages-1014940472-a6ba0030958a4bbba0eee3e982ee9bc6.jpg"
	},{
		title: "sketch",
		description: "japan or smthn",
		url: "https://www.thesprucepets.com/thmb/b_dt6JpFxaD6ROMYy7nVmwuFars=/3504x0/filters:no_upscale():strip_icc()/Pomeranian-GettyImages-1014940472-a6ba0030958a4bbba0eee3e982ee9bc6.jpg"
	},{
		title: "test image",
		description: "japan or smthn",
		url: "https://www.thesprucepets.com/thmb/b_dt6JpFxaD6ROMYy7nVmwuFars=/3504x0/filters:no_upscale():strip_icc()/Pomeranian-GettyImages-1014940472-a6ba0030958a4bbba0eee3e982ee9bc6.jpg"
	},{
		title: "test image",
		description: "japan or smthn",
		url: "https://www.thesprucepets.com/thmb/b_dt6JpFxaD6ROMYy7nVmwuFars=/3504x0/filters:no_upscale():strip_icc()/Pomeranian-GettyImages-1014940472-a6ba0030958a4bbba0eee3e982ee9bc6.jpg"
	}]);

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
