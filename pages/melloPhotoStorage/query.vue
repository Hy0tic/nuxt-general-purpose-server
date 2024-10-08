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

			<Button @click="search"> Search </Button>

			<Button @click="navigateToUploadPage"> Go To Upload Page </Button>
		</div>

		<div class="flex flex-col">
			<template v-if="!isLoading" v-for="(row, _) in imageRows" :key="rowIndex">
				<div class="flex flex-row">
					<ImageEntry
						v-for="(image, index) in row"
						:key="index"
						:src="image.url"
						class="h-36 w-auto rounded-lg"
						:title="image.title"
						:url="image.url"
						:description="image.description"
						:upload-date-as-string="image.uploadDate"
					/>
				</div>
			</template>
			<ProgressSpinner
				v-if="isLoading"
				style="width: 50px; height: 50px"
				strokeWidth="8"
				fill="transparent"
				animationDuration=".5s"
				aria-label="Custom ProgressSpinner"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onBeforeMount, computed } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import Paginator from "primevue/paginator";
	import Dropdown from "primevue/dropdown";
	import ProgressSpinner from "primevue/progressspinner";

	type ImageInfo = {
		title: string;
		description: string;
		url: string;
		uploadDate: string;
	};

	const filterOptions = ref([
		{ name: "Newest First", sortOption: "SORT_BY_DATE" },
		{ name: "Oldest First", sortOption: "SORT_BY_DATE_REVERSE" },
		{ name: "Alphabetical Order", sortOption: "SORT_BY_TITLE" },
		{ name: "Reverse Alphabetical Order", sortOption: "SORT_BY_TITLE_REVERSE" }
	]);
	const selectedFilter = ref({
		name: "Newest First",
		sortOption: "SORT_BY_DATE"
	});

	const route = useRoute();
	const router = useRouter();

	const pageNumber = ref(Number(route.query.pageNumber) || 1);
	const imageCountPerPage = ref(Number(route.query.imageCountPerPage) || 30);
	const searchQuery = ref(route.query.searchQuery);

	const totalRecords = ref<number>(); // Set this to the actual total number of records if known
	const imageCountPerRow = 8;

	const images = ref<ImageInfo[]>([]);
	const isLoading = ref<boolean>(true);

	const search = async () => {
		// Build query parameters
		const query = {
			pageNumber: pageNumber.value,
			imageCountPerPage: imageCountPerPage.value,
			searchQuery: searchQuery.value,
			sortOption: selectedFilter.value?.sortOption
		};

		// Navigate to the same route with new query parameters
		router.push({ query });
		await fetchImages();
	};

	const navigateToUploadPage = async () => {
		await router.push("/mellophotostorage/upload");
	};

	const fetchImages = async () => {
		isLoading.value = true;
		const response = await $fetch("/api/queryPhoto", {
			method: "GET",
			params: {
				pageNumber: pageNumber.value - 1, // API expect 0-based index
				imageCountPerPage: imageCountPerPage.value,
				searchQuery: searchQuery.value,
				sortOption: selectedFilter.value?.sortOption
			}
		});

		images.value = response.imageArray; // Adjust according to your API response structure
		totalRecords.value = response.totalImageCount;

		isLoading.value = false;
	};

	const onPageChange = async (event: any) => {
		pageNumber.value = event.page + 1; // PrimeVue sends 0-based index
		imageCountPerPage.value = event.rows; // Update items per page
		await fetchImages(); // Fetch new images
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
	});

	onMounted(async () => {
		await fetchImages(); // Initial fetch
	});

	definePageMeta({
		layout: "default1"
	});
</script>
