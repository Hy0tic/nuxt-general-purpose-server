<template>
	<div class="flex flex-col container rounded-md bg-[rgb(30,30,30)] h-48 w-56 m-5">
		<Image 
			:src="url" 
			class="rounded-lg" 
			alt="image" 
		/>

		<div class="title text-center">
			{{ title }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import Image from "primevue/image";

	interface Props {
		title: string;
		description: string;
		url: string;
	}

	defineProps<Props>();
</script>
