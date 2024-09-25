<template>
	<nav
		class="navbar flex justify-around bg-[#333] p-[1rem] text-[rgb(255,255,255)]"
	>
		<ul class="list-none gap-[1rem] flex">
			<li class="cursor-pointer"><NuxtLink to="/">Home</NuxtLink></li>
			<li class="cursor-pointer"><NuxtLink to="/about">About</NuxtLink></li>
			<li class="cursor-pointer"><NuxtLink to="/contact">Contact</NuxtLink></li>
		</ul>
	</nav>
</template>

<script>
	export default {
		name: "NavBar"
	};
</script>
