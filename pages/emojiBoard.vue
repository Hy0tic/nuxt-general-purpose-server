<template>
	<div class="flex h-screen w-screen justify-center bg-black">
		<div
			class="m-4 flex h-fit w-fit flex-col items-center gap-2 rounded-xl bg-[rgb(30,30,30)]"
		>
			<div class="flex flex-row">
				<input
					class="m-5 w-60 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
					type="text"
					placeholder="Search..."
				/>
				<Button class="m-5 items-center"> Search </Button>
			</div>

			<div v-for="(row, _) in emojiRows" class="flex flex-row gap-2">
				<EmojiBoardEmojiContainer
					v-for="(emoji, _) in row"
					:name="emoji.Name"
					:url="emoji.url"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Button from "primevue/button";
	interface EmojiInfo {
		Name: string;
		url: string;
	}

	const catPeek = {
		Name: "catpeek",
		url: "https://cdn.discordapp.com/emojis/1122425487701069846.webp?size=128&quality=lossless"
	};
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
		catPeek,
		catPeek,
		catPeek,
		catPeek,
		catPeek,
		catPeek
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
