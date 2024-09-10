<template>
    <form @submit.prevent="uploadFile">
      <input type="file" ref="fileInput" @change="handleFileChange" />
      <button type="submit" :disabled="!selectedFile">Upload</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const selectedFile = ref(null);
  
  function handleFileChange(event) {
    selectedFile.value = event.target.files[0];
  }
  
  async function uploadFile() {
    if (!selectedFile.value) return;
  
    const formData = new FormData();
    formData.append('file', selectedFile.value);
  
    try {
      const response = await fetch('/api/uploadphoto', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Upload successful!');
      } else {
        alert('Upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  </script>
  