<template>
  <div>
    <h1>QR Code</h1>
    <img v-if="qrCode" :src="qrCode" alt="QR Code" />
    <p v-else>Loading QR Code...</p>
  </div>
</template>


<script setup lang="ts">

const qrCode = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/api/auth/generateQRcode');
    const data = await response.json();
    console.log(data)
    qrCode.value = data.result; // Set the QR code data URL
  } catch (error) {
    console.error('Error fetching QR code:', error);
  }
});

</script>
