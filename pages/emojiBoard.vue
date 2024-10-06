<template>
	<div class="m-4 flex flex-col items-center gap-2">
		<div v-for="(row, _) in emojiRows" class="flex flex-row gap-2">
			<EmojiBoardEmojiContainer v-for="(emoji, _) in row" :url="emoji.url" />
		</div>
	</div>
</template>

<script setup lang="ts">
	interface EmojiInfo {
		Name: string;
		url: string;
	}

	const sampleEmojiData = [
		{
			Name: "hug",
			url: "https://cdn.discordapp.com/emojis/1071702377633161256.webp?size=128&quality=lossless"
		},
		{
			Name: "hugback",
			url: "https://cdn.discordapp.com/emojis/1071702617329250404.webp?size=128&quality=lossless"
		},
		{
			Name: "rollycat",
			url: "https://cdn.discordapp.com/emojis/1071699946824278077.gif?size=128&quality=lossless"
		},
		{
			Name: "cappoyes",
			url: "https://cdn.discordapp.com/emojis/736521856387121163.gif?size=128&quality=lossless"
		},
		{
			Name: "elmoburn",
			url: "https://cdn.discordapp.com/emojis/983844260430352464.gif?size=128&quality=lossless"
		},
		{
			Name: "catbite",
			url: "https://cdn.discordapp.com/emojis/787956066947170364.gif?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		},
		{
			Name: "catpeek",
			url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
		}
	];
	const EmojiOnDisplay = ref<EmojiInfo[]>(sampleEmojiData);
	const EmojiCountPerRow = 14;

	// return array of arrays of emojies, EmojiCountPerRow is number of emojies per array
	const emojiRows = computed(() => {
		const rows = [];
		for (let i = 0; i < EmojiOnDisplay.value.length; i += EmojiCountPerRow) {
			rows.push(EmojiOnDisplay.value.slice(i, i + EmojiCountPerRow));
		}
		return rows;
	});
</script>
