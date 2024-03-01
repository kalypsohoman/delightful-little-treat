<script lang="ts">
    import { InitialView, activeComponent } from "$lib";

    // TODO: Make Confetti
    function makeConfetti() {
    }
</script>

<form>
    <h2>Your treat should get there in about an hour.</h2>
    <button type="button" on:click={makeConfetti}>Hooray!</button>
    <button type="button" on:click={() => activeComponent.set(InitialView)}>⌂</button>
</form>