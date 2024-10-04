<template>
	<div class="mt-40 flex flex-col items-center justify-center gap-10">
		<!-- <div class="flex flex-wrap justify-center items-center gap-5">
        <img v-for="(image, index) in images" :key="index" :src="image" class="h-36 w-auto rounded-lg" alt="Random Photo" />
      </div> -->
		<Button @click="navigateToPhotoPage"> Go To Photo Page </Button>
		<!-- <UploadBox /> -->

		<Tabs value="0" class="h-96 w-96 rounded-lg bg-[rgb(24,24,27)]">
			<TabList>
				<Tab value="0">Single Upload</Tab>
				<Tab value="1">Multi Upload</Tab>
			</TabList>

			<TabPanels>
				<TabPanel value="0">
					<form @submit.prevent="uploadFile">
						<input
							class="m-10"
							type="file"
							ref="fileInput"
							@change="handleFileChange"
						/>

						<div class="m-5 flex flex-col gap-10">
							<InputGroup>
								<InputText v-model="titleField" placeholder="Enter title" />
							</InputGroup>

							<InputGroup>
								<InputText
									v-model="descriptionField"
									placeholder="Enter description"
								></InputText>
							</InputGroup>

							<Button type="submit" :disabled="!selectedFileField"
								>Upload</Button
							>
						</div>
					</form>
				</TabPanel>

				<TabPanel value="1">
					<div>
						<FileUploadMultiFileUpload
							:size="totalSize"
							:files="filesField"
							:onSelectedFiles="onSelectedFiles"
							:totalSize="totalSize"
							:totalSizePercent="totalSizePercent"
							:onRemoveTemplatingFile="onRemoveTemplatingFile"
							:uploadEvent="uploadEvent"
						/>
					</div>
				</TabPanel>
			</TabPanels>
		</Tabs>
		<!-- TODO: let user upload multiple photos at once -->
	</div>
</template>

<script setup>
	const response = await $fetch("/api/auth/amIauthenticated", {
		method: "GET"
	});

	if (response.fresh !== true && import.meta.client) {
		navigateTo("/login"); // Adjust the route as necessary
	}

	const router = useRouter();

	const navigateToPhotoPage = async () => {
		await router.push("/melloPhotoStorage/query");
	};

	const selectedFileField = ref(null);
	const titleField = ref("");
	const descriptionField = ref("");

	const filesField = ref([]);
	const totalSize = ref(0);
	const totalSizePercent = ref(0);

	// Handles the form submission to upload the file and additional data
	async function uploadFile() {
		if (!selectedFileField.value) return;

		const formData = new FormData();
		formData.append("file", selectedFileField.value);
		formData.append("title", titleField.value); // Append the title
		formData.append("description", descriptionField.value); // Append the description

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

	const onSelectedFiles = (event) => {
		filesField.value = event.files;
		filesField.value.forEach((file) => {
			totalSize.value += parseInt(formatSize(file.size));
		});
	};

	const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
		removeFileCallback(index);
		totalSize.value -= parseInt(formatSize(file.size));
		totalSizePercent.value = totalSize.value / 10;
	};

	const uploadEvent = (callback) => {
		totalSizePercent.value = totalSize.value / 10;
		callback();
	};

	// Handles file change event
	function handleFileChange(event) {
		selectedFileField.value = event.target.files[0];
	}

	definePageMeta({
		layout: "default1"
	});
</script>
