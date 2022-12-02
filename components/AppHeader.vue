<template>
    <header class="header">
        <h2 class="title">Organize your Projects</h2>
        <ul>
            <li>
                <NuxtLink to="/about">About Us</NuxtLink>
            </li>
        </ul>
    </header>
</template>


<script>
export default {
    name: "AppHeader"
}
</script>

<style>
    .header{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1.5px dotted #ccc;
    }

    .header .title{
        font-size: 2rem;
        color: #526488;
    }

    .header ul{
        display: flex;
        list-style: none;
    }

    .header a {
        display: inline-block;
        /* background: #333; */
        color: #333;
        padding: 0.3rem 1rem;
        margin-right: 0.5rem;
    }
</style>

