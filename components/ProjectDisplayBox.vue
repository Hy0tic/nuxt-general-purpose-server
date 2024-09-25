<template>
	<div
		class="m-10 flex h-40 w-96 items-center justify-center rounded-md bg-[rgb(40,40,40)]"
	>
		<a :href="path">
			<div class="text-xl font-bold text-white">
				{{ name }}
			</div>
		</a>
	</div>
</template>

<script setup lang="ts">
	// Type-safe props definition
	interface Props {
		name: string;
		path: string;
		//   description: string;
		//   link: string;
	}

	const props = defineProps<Props>();
</script>
