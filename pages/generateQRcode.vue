<template>
	<div class="flex items-center justify-center">
		<div class="mt-48 flex h-96 w-[28rem] flex-col items-center justify-center rounded-lg bg-[rgb(24,24,27)]">
			<div class="text-center">
				Install Authenticator app and scan QR code below
			</div>
			<h1>QR Code:</h1>
			<img v-if="qrCode" :src="qrCode" alt="QR Code" />
			<p v-else>Loading QR Code...</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	const qrCode = ref(null);

	onMounted(async () => {
		try {
			const response = await fetch("/api/auth/generateQRcode");
			const data = await response.json();

			qrCode.value = data.result; // Set the QR code data URL
		} catch (error) {
			console.error("Error fetching QR code:", error);
		}
	});
</script>
