<template>
	<form
		@submit.prevent="uploadFile"
		class="rounded-lg w-80 h-96 bg-[rgb(24,24,27)]"
	>
		<input
			class="m-10"
			type="file"
			ref="fileInput"
			@change="handleFileChange"
		/>

		<div class="flex flex-col gap-10 m-5">
			<InputGroup>
				<InputText v-model="title" placeholder="Enter title" />
			</InputGroup>

			<InputGroup>
				<InputText
					v-model="description"
					placeholder="Enter description"
				></InputText>
			</InputGroup>

			<Button type="submit" :disabled="!selectedFile">Upload</Button>
		</div>
	</form>
</template>

<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputText from "primevue/inputtext";

// Reactive references for file, title, and description
const selectedFile = ref(null);
const title = ref("");
const description = ref("");

// Handles file change event
function handleFileChange(event) {
	selectedFile.value = event.target.files[0];
}

// Handles the form submission to upload the file and additional data
async function uploadFile() {
	if (!selectedFile.value) return;

	const formData = new FormData();
	formData.append("file", selectedFile.value);
	formData.append("title", title.value); // Append the title
	formData.append("description", description.value); // Append the description

	try {
		const response = await fetch("/api/uploadphoto", {
			method: "POST",
			body: formData
		});

		if (response.ok) {
			alert("Upload successful!");
		} else {
			alert("Upload failed.");
		}
	} catch (error) {
		console.error("Error uploading file:", error);
	}
}
</script>
