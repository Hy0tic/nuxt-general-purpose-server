<template>
	<img
		:src="$props.url"
		alt="emote"
		width="70"
		class="rounded-md border-2 border-solid border-[rgb(90,90,90)] hover:border-[rgb(250,250,250)] m-3"
	/>
</template>

<script setup lang="ts">
	interface props {
        name: string
		url: string;
	}
    
defineProps<props>();
</script>
