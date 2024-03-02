<script lang="ts">
	import { InitialView, views } from '$lib';
    views.push({component: InitialView, props: null})
</script>

{#each $views as { component, props }, index}
    <div class="page">
        <svelte:component this={component} {...props} />
    </div>
{/each}