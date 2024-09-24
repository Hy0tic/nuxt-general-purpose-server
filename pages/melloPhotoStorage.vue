<template>
	<div class="flex flex-col justify-center items-center gap-10 mt-40">
		<!-- <div class="flex flex-wrap justify-center items-center gap-5">
        <img v-for="(image, index) in images" :key="index" :src="image" class="h-36 w-auto rounded-lg" alt="Random Photo" />
      </div> -->
		<UploadBox />
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import UploadBox from "~/components/UploadBox.vue";
	// import { fetchRandomPhoto } from '~/utils/fetchRandomPhoto'; // Import the function

	// const images = ref<string[]>([]); // Array to hold image URLs

	//   const loadImages = async () => {
	//     for (let i = 0; i < 3; i++) {
	//       const photoUrl = await fetchRandomPhoto(); // Use the imported function
	//       console.log(photoUrl)
	//       if (photoUrl) {
	//         images.value.push(photoUrl); // Add the photo URL to the array
	//       }
	//     }
	//   };

	const response = await $fetch("/api/auth/amIauthenticated", {
		method: "GET"
	});

	if (response.fresh !== true && process.client) {
		navigateTo("/login"); // Adjust the route as necessary
	}

	onMounted(() => {
		// loadImages(); // Load three random images when the component is mounted
	});
</script>
