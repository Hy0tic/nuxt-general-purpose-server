<template>
	<div
		class="flex justify-center items-center bg-green-900 w-96 h-40 rounded-md m-2"
	>
		<a :href="path">
			<div class="text-white font-bold text-xl">
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
