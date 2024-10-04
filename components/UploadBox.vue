<!-- <template>
	<Tabs value="0" class="h-96 w-96 rounded-lg bg-[rgb(24,24,27)]">
		<TabList class="">
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
			</TabPanel>
			<TabPanel value="1">
				<div class="card">
					<Toast />
					<FileUpload
						name="files"
						url="/api/uploadphotos"
						enctype="multipart/form-data"
						method="post"
						@upload="onTemplatedUpload($event)"
						:multiple="true"
						accept="image/*"
						:maxFileSize="1000000"
						@select="onSelectedFiles"
					>
						<template
							#header="{ chooseCallback, uploadCallback, clearCallback, files }"
						>
							<div
								class="flex flex-1 flex-wrap items-center justify-between gap-4"
							>
								<div class="flex gap-2">
									<Button
										@click="chooseCallback()"
										icon="pi pi-images"
										rounded
										outlined
										severity="secondary"
									></Button>
									<Button
										@click="uploadEvent(uploadCallback)"
										icon="pi pi-cloud-upload"
										rounded
										outlined
										severity="success"
										:disabled="!files || files.length === 0"
									></Button>
									<Button
										@click="clearCallback()"
										icon="pi pi-times"
										rounded
										outlined
										severity="danger"
										:disabled="!files || files.length === 0"
									></Button>
								</div>
								<ProgressBar
									:value="totalSizePercent"
									:showValue="false"
									class="md:w-20rem h-1 w-full md:ml-auto"
								>
									<span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
								</ProgressBar>
							</div>
						</template>

						<template
							#content="{
								files,
								uploadedFiles,
								removeUploadedFileCallback,
								removeFileCallback
							}"
						>
							<div class="flex flex-col gap-8 pt-4">
								<div v-if="files.length > 0">
									<h5>Pending</h5>
									<div class="flex flex-wrap gap-4">
										<div
											v-for="(file, index) of files"
											:key="file.name + file.type + file.size"
											class="rounded-border border-surface flex flex-col items-center gap-4 border p-8"
										>
											<div>
												<img
													role="presentation"
													:alt="file.name"
													:src="file.objectURL"
													width="100"
													height="50"
												/>
											</div>
											<span
												class="max-w-60 overflow-hidden text-ellipsis whitespace-nowrap font-semibold"
												>{{ file.name }}</span
											>
											<div>{{ formatSize(file.size) }}</div>
											<Badge value="Pending" severity="warn" />
											<Button
												icon="pi pi-times"
												@click="
													onRemoveTemplatingFile(
														file,
														removeFileCallback,
														index
													)
												"
												outlined
												rounded
												severity="danger"
											/>
										</div>
									</div>
								</div>

								<div v-if="uploadedFiles.length > 0">
									<h5>Completed</h5>
									<div class="flex flex-wrap gap-4">
										<div
											v-for="(file, index) of uploadedFiles"
											:key="file.name + file.type + file.size"
											class="rounded-border border-surface flex flex-col items-center gap-4 border p-8"
										>
											<div>
												<img
													role="presentation"
													:alt="file.name"
													:src="file.objectURL"
													width="100"
													height="50"
												/>
											</div>
											<span
												class="max-w-60 overflow-hidden text-ellipsis whitespace-nowrap font-semibold"
												>{{ file.name }}</span
											>
											<div>{{ formatSize(file.size) }}</div>
											<Badge
												value="Completed"
												class="mt-4"
												severity="success"
											/>
											<Button
												icon="pi pi-times"
												@click="removeUploadedFileCallback(index)"
												outlined
												rounded
												severity="danger"
											/>
										</div>
									</div>
								</div>
							</div>
						</template>
						
						<template #empty>
							<div class="flex flex-col items-center justify-center">
								<i
									class="pi pi-cloud-upload !text-muted-color !rounded-full !border-2 !p-8 !text-4xl"
								/>
								<p class="mb-0 mt-6">Drag and drop files to here to upload.</p>
							</div>
						</template>
					</FileUpload>
				</div>
			</TabPanel>
		</TabPanels>
	</Tabs>
</template>

<script setup>
	import { ref } from "vue";
	import Button from "primevue/button";
	import InputGroup from "primevue/inputgroup";
	import InputText from "primevue/inputtext";
	import "primeicons/primeicons.css";

	// Reactive references for file, title, and description
	const selectedFile = ref(null);
	const title = ref("");
	const description = ref("");

	// multi upload
	const $primevue = usePrimeVue();
	const toast = useToast();
	const totalSize = ref(0);
	const totalSizePercent = ref(0);
	const files = ref([]);

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

	// TODO: add error handling, handle partial success, track progress for the correct photo uploaded
	// multi upload
	const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
		removeFileCallback(index);
		totalSize.value -= parseInt(formatSize(file.size));
		totalSizePercent.value = totalSize.value / 10;
	};

	const onClearTemplatingUpload = (clear) => {
		clear();
		totalSize.value = 0;
		totalSizePercent.value = 0;
	};

	const onSelectedFiles = (event) => {
		files.value = event.files;
		files.value.forEach((file) => {
			totalSize.value += parseInt(formatSize(file.size));
		});
	};

	const uploadEvent = (callback) => {
		totalSizePercent.value = totalSize.value / 10;
		callback();
	};

	const onTemplatedUpload = async () => {
		if (!files.value || files.length < 1) return;

		// const formData = new FormData();
		// formData.append("files", files.value);

		// try {
		// 	const response = await fetch("/api/uploadphotos", {
		// 		method: "POST",
		// 		body: formData
		// 	});

		// 	if (response.ok) {
		// 		alert("Upload successful!");
		// 		toast.add({
		// 			severity: "info",
		// 			summary: "Success",
		// 			detail: "File Uploaded",
		// 			life: 3000
		// 		});
		// 	} else {
		// 		alert("Upload failed.");
		// 	}
		// } catch (error) {
		// 	console.error("Error uploading file:", error);
		// }
	};

	const formatSize = (bytes) => {
		const k = 1024;
		const dm = 3;
		const sizes = $primevue.config.locale.fileSizeTypes;

		if (bytes === 0) {
			return `0 ${sizes[0]}`;
		}

		const i = Math.floor(Math.log(bytes) / Math.log(k));
		const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

		return `${formattedSize} ${sizes[i]}`;
	};
</script> -->
