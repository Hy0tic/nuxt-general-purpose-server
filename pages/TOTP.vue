<template>
    <h1>
        Enter one time code from authenticator app
    </h1>

    <form type="submit" method="post" action="/api/auth/validateTOTP" @submit.prevent="verifyTOTP"> 
        <InputText name="TOTP"/>
    
    </form>

</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';

const router = useRouter();

async function verifyTOTP(e: Event) {
    const response = await $fetch("/api/auth/validateTOTP", {
      method: "POST",
      body: new FormData(e.target as HTMLFormElement)
    });


    if(response && response.statusCode === 200){
        await router.push("/");
    }
}
</script>