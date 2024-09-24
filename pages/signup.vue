<!--pages/signup.vue-->
<script lang="ts" setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";

async function signup(e: Event) {
  await $fetch("/api/auth/signup", {
    method: "POST",
    body: new FormData(e.target as HTMLFormElement),
  });
  await navigateTo("/");
}
</script>

<template>
  <div class="flex justify-center items-center">
    <div
      class="rounded-lg w-80 h-80 bg-[rgb(24,24,27)] flex flex-col justify-center items-center mt-48"
    >
      <h1 class="text-2xl font-semibold">Create Account</h1>

      <form
        method="post"
        action="/api/auth/signup"
        @submit.prevent="signup"
        class="m-5 flex flex-col"
      >
        <label htmlFor="username">Username</label>
        <InputText name="username" id="username" />
        <br />

        <label htmlFor="password">Password</label>
        <InputText type="password" name="password" id="password" />

        <br />
        <Button type="submit"> Continue </Button>
      </form>
    </div>
  </div>
</template>
