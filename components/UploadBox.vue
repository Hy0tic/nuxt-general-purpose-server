<template>
  <form @submit.prevent="uploadFile" class="border-solid border-2 border-slate-600 rounded-lg w-80 h-96">
    <input type="file" ref="fileInput" @change="handleFileChange" />
    <div class="flex flex-col gap-20">
      <input type="text" v-model="title" placeholder="Enter title" />
      <textarea v-model="description" placeholder="Enter description"></textarea>
      <Button type="submit" :disabled="!selectedFile">Upload</Button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import Button from 'primevue/button';
// Reactive references for file, title, and description
const selectedFile = ref(null);
const title = ref('');
const description = ref('');

// Handles file change event
function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
}

// Handles the form submission to upload the file and additional data
async function uploadFile() {
  if (!selectedFile.value) return;

  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('title', title.value); // Append the title
  formData.append('description', description.value); // Append the description

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
