<template>
	<nav class="navbar">
		<ul>
			<li><NuxtLink to="/">Home</NuxtLink></li>
			<li><NuxtLink to="/about">About</NuxtLink></li>
			<li><NuxtLink to="/contact">Contact</NuxtLink></li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: "NavBar"
};
</script>

<style scoped>
.navbar {
	display: flex;
	justify-content: space-around;
	padding: 1rem;
	background-color: #333;
	color: red;
}

.navbar ul {
	list-style: none;
	display: flex;
	gap: 1rem;
}

.navbar li {
	cursor: pointer;
}

.navbar a {
	text-decoration: none;
	color: white;
}
</style>
