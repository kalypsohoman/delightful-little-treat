<script lang="ts">
    import InitialView from "./InitialView.svelte";
    import { activeComponent } from "$lib";
</script>

<form>
    <h2>Hooray! Your treat should get there in about an hour.</h2>
    <button type="button" on:click={() => activeComponent.set(InitialView)}>⌂</button>
</form>