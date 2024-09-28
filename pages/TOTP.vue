<template>
	<div class="flex items-center justify-center">
		<!-- do I need action? -->
		<form
			type="submit"
			method="post"
			action="/api/auth/validateTOTP"
			@submit.prevent="verifyTOTP"
			class="mt-48 flex h-auto w-[25rem] flex-col items-center justify-center rounded-lg bg-[rgb(24,24,27)]"
		>
			<h1 class="my-5 mb-2 mt-5 font-bold">OTP Verification</h1>

			<p class="mt-0 text-center">
				Enter the code from Google Authenticator app
			</p>

			<div class="text-red-700">
				{{ warning }}
			</div>

			<InputText name="TOTP" class="m-5" />

			<Button type="submit" class="mb-5"> Send Code </Button>
		</form>
	</div>
</template>

<script setup lang="ts">
	import InputText from "primevue/inputtext";

	const router = useRouter();

	const warning = ref<string | undefined>();

	async function verifyTOTP(e: Event) {
		try {
			const response = await $fetch("/api/auth/validateTOTP", {
				method: "POST",
				body: new FormData(e.target as HTMLFormElement)
			});

			if (response && response.statusCode === 200) {
				await router.push("/");
			}

			if (response.statusCode === 400) {
				warning.value = "Invalid Code, try again.";
			}
		} catch (e) {
			warning.value = "Invalid Code, try again.";
		}
	}

	definePageMeta({
		layout: "default1"
	});
</script>
