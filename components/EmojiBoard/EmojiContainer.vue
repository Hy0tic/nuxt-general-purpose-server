<template>
	<img
		:src="$props.url"
		alt="emote"
		width="110"
		class="rounded-md border-8 border-solid border-transparent hover:border-gray-700"
	/>
</template>

<script setup lang="ts">
	interface props {
		url: string;
	}

	defineProps<props>();
</script>
