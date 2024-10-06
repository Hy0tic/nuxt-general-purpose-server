<template>
	<div
		class="container m-5 flex h-96 max-h-96 flex-col rounded-md bg-[rgb(41,40,40)]"
	>
		<Image :src="url" class="rounded-lg" alt="image" width="255px" />

		<div class="title text-center font-bold">
			{{ title }}
		</div>

		<div class="font-thin text-center">
			{{ formattedDate }}
		</div>
	</div>
</template>

<script setup lang="ts">
	import Image from "primevue/image";
	const props = defineProps<Props>();

	const date: Date = new Date(props.uploadDateAsString);
	const options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit', // Include seconds if needed
		hour12: true // Set to false for 24-hour format
	};
	const formattedDate: string = date.toLocaleDateString('en-US', options);


	interface Props {
		title: string;
		description: string;
		url: string;
		uploadDateAsString: string;
	}

</script>
