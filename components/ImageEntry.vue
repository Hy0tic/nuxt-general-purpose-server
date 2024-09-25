<template>
	<div class="container rounded-md bg-[rgb(30,30,30)]">
		<div class="title">
			{{ title }}
		</div>

		<img :src="url" alt="photo" />
	</div>
</template>

<script setup lang="ts">
	interface Props {
		title: string;
		description: string;
		url: string;
	}

	defineProps<Props>();
</script>
