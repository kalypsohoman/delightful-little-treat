<script lang="ts">
    import { views } from "$lib";

    // TODO: Make Confetti
    function makeConfetti() {
    }
</script>

<form>
    <h2>Your treat should get there in about an hour.</h2>
    <button type="button" on:click={ makeConfetti }>Hooray!</button>
    <button type="button" on:click={ views.reset }>⌂</button>
</form>