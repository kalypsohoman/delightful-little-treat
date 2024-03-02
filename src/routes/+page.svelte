<script lang="ts">
	import { activeComponent, InitialView } from '$lib';
    activeComponent.set(InitialView)
</script>

<svelte:component this={$activeComponent} />