<template>
    <div class="flex justify-center items-center bg-slate-800 w-96 h-40 rounded-md m-2">
        <a href="">
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
//   description: string;
//   link: string;
}

const props = defineProps<Props>();
</script>