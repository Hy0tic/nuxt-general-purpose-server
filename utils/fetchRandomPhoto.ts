// utils/fetchRandomPhoto.js

export const fetchRandomPhoto = async () => {
    try {
      const response = await $fetch('/api/fetchrandomphoto');
      
      // Check if the response status is 'success' and return the URL
      if (response.status === 'success') {
        return response.result; // This is the image URL
      } else {
        throw new Error('Failed to fetch the random photo');
      }
    } catch (error) {
      console.error('Error fetching random photo:', error);
      return ''; // Return an empty string or handle the error as needed
    }
  };
  