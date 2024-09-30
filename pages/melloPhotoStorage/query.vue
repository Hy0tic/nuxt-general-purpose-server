<template>
	<div class="flex flex-col">
		<Paginator
			:rows="imageCountPerPage"
			:totalRecords="totalRecords"
			:rowsPerPageOptions="[3, 5, 10, 20, 30, 40, 50]"
			@page="onPageChange"
		/>
		<div class="flex flex-row">
			<ImageEntry
				v-for="(image, index) in images"
				:key="index"
				:src="image.url"
				class="h-36 w-auto rounded-lg"
				:title="image.title"
				:url="image.url"
				:description="image.description"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onBeforeMount } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import Paginator from "primevue/paginator";

	type ImageInfo = {
		title: string;
		description: string;
		url: string;
	};

	const route = useRoute();
	const router = useRouter();
	const pageNumber = ref(Number(route.params.pageNumber) || 1);
	const imageCountPerPage = ref(Number(route.params.imageCountPerPage) || 30);
	const totalRecords = ref(120); // Set this to the actual total number of records if known
	const images = ref<ImageInfo[]>([]);

	const fetchImages = async () => {
		// Fetch images based on current page
		const response = await $fetch("/api/queryPhoto", {
			method: "GET",
			params: {
				pageNumber: pageNumber.value - 1, // API may expect 0-based index
				imageCountPerPage: imageCountPerPage.value
			}
		});
		images.value = response.imageArray; // Adjust according to your API response structure
	};

	const onPageChange = (event: any) => {
		pageNumber.value = event.page + 1; // PrimeVue sends 0-based index
		imageCountPerPage.value = event.rows; // Update items per page
		fetchImages(); // Fetch new images
	};

	onBeforeMount(async () => {
		const authResponse = await $fetch("/api/auth/amIauthenticated", {
			method: "GET"
		});
		if (authResponse.fresh !== true && import.meta.client) {
			router.push("/login");
		}
		await fetchImages(); // Initial fetch
	});

	definePageMeta({
		layout: "default1"
	});
</script>
