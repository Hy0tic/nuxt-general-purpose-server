<template>
	<div
		class="container m-5 flex h-96 max-h-96 flex-col rounded-md bg-[rgb(41,40,40)]"
	>
		<Image :src="url" class="rounded-lg" alt="image" width="255px" />

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
