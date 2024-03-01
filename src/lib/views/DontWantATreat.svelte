<script lang="ts">
    import InitialView from "./InitialView.svelte";
    import { activeComponent } from "$lib";
</script>

<form>
    <h2>Well, come back when you want a little treat.</h2>
    <button type="button" on:click={() => activeComponent.set(InitialView)}>↩</button>
</form>