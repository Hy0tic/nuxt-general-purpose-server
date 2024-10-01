<template>
	<div class="flex flex-col">
		<Paginator
			:rows="imageCountPerPage"
			:totalRecords="totalRecords"
			:rowsPerPageOptions="[3, 5, 10, 20, 30, 40, 50]"
			@page="onPageChange"
		/>

		<div class="card m-5 flex flex-row justify-start gap-5">
			<Dropdown
				class="md:w-14rem w-60"
				v-model="selectedFilter"
				:options="filterOptions"
				optionLabel="name"
				placeholder="Select a sort option"
			/>
			<input
				class="w-60 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
				type="text"
				v-model="searchQuery"
				placeholder="Search..."
			/>
		</div>

		<div class="flex flex-col">
			<template v-for="(row, _) in imageRows" :key="rowIndex">
				<div class="flex flex-row">
					<ImageEntry
						v-for="(image, index) in row"
						:key="index"
						:src="image.url"
						class="h-36 w-auto rounded-lg"
						:title="image.title"
						:url="image.url"
						:description="image.description"
					/>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onBeforeMount, computed } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import Paginator from "primevue/paginator";
	import Dropdown from "primevue/dropdown";

	type ImageInfo = {
		title: string;
		description: string;
		url: string;
	};

	const filterOptions = ref([
		{ name: "Newest First" },
		{ name: "Oldest First" },
		{ name: "Alphabetical Order" },
		{ name: "Reverse Alphabetical Order" }
	]);
	const selectedFilter = ref<string>();
	const route = useRoute();
	const router = useRouter();
	const pageNumber = ref(Number(route.params.pageNumber) || 1);
	const imageCountPerPage = ref(Number(route.params.imageCountPerPage) || 30);
	const totalRecords = ref(120); // Set this to the actual total number of records if known
	const images = ref<ImageInfo[]>([]);
	const imageCountPerRow = 8;
	const searchQuery = ref("");

	const fetchImages = async () => {
		const response = await $fetch("/api/queryPhoto", {
			method: "GET",
			params: {
				pageNumber: pageNumber.value - 1, // API may expect 0-based index
				imageCountPerPage: imageCountPerPage.value
			}
		});
		images.value = response.imageArray; // Adjust according to your API response structure
		totalRecords.value = response.totalImageCount;
	};

	const onPageChange = (event: any) => {
		pageNumber.value = event.page + 1; // PrimeVue sends 0-based index
		imageCountPerPage.value = event.rows; // Update items per page
		fetchImages(); // Fetch new images
	};

	const imageRows = computed(() => {
		const rows = [];
		for (let i = 0; i < images.value.length; i += imageCountPerRow) {
			// Adjust 3 to your desired images per row
			rows.push(images.value.slice(i, i + imageCountPerRow));
		}
		return rows;
	});

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
