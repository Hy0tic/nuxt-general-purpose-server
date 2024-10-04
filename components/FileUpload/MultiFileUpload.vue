<template>
	<div class="card">
		<Toast />
		<FileUpload
			name="files"
			url="/api/uploadphotos"
			enctype="multipart/form-data"
			method="post"
			:multiple="true"
			accept="image/*"
			:maxFileSize="1000000"
			@select="onSelectedFiles"
		>
			<template
				#header="{ chooseCallback, uploadCallback, clearCallback, files }"
			>
				<div class="flex flex-1 flex-wrap items-center justify-between gap-4">
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
										onRemoveTemplatingFile(file, removeFileCallback, index)
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
								<Badge value="Completed" class="mt-4" severity="success" />
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
</template>

<script setup lang="ts">
	import "primeicons/primeicons.css";
	interface Props {
		size: number;
		onSelectedFiles: (event: any) => void;
		files: CustomFile[];
		uploadedFiles: CustomFile[];
		totalSize: number;
		totalSizePercent: number;
		onRemoveTemplatingFile: (
			file: File,
			removeFileCallback: (index: number) => void,
			index: number
		) => void;
		uploadEvent: (callback: any) => void;
	}

	interface CustomFile extends File {
		objectURL: string; // Custom property
	}

	defineProps<Props>();

	const $primevue = usePrimeVue();

	const formatSize = (bytes: number) => {
		const k = 1024;
		const dm = 3;
		const sizes = $primevue.config?.locale?.fileSizeTypes ?? [];

		if (bytes === 0) {
			return `0 ${sizes[0]}`;
		}

		const i = Math.floor(Math.log(bytes) / Math.log(k));
		const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

		return `${formattedSize} ${sizes[i]}`;
	};
</script>
