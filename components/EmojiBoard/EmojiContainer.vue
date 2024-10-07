<template>
    <button
        v-tooltip.top="{ value: 'rollycat', autoHide: false }"
    >
        <img
            :src="$props.url"
            :alt="$props.name"
            width="70"
            class="m-3 rounded-md border-2 border-solid border-[rgb(90,90,90)] hover:border-[rgb(250,250,250)]"
        />
    </button>
</template>

<script setup lang="ts">
	interface props {
		name: string;
		url: string;
	}

	defineProps<props>();
</script>
