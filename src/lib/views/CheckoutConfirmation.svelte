<script lang="ts">
    import { views } from "$lib";
    import { Confetti } from "svelte-confetti"
    import ToggleConfetti from "./ToggleConfetti.svelte";
</script>

<form>
    <h2>Your treat should get there in about an hour.</h2>
    <ToggleConfetti>
        <button type="button" slot="label">Hooray!</button>
        <Confetti y={[-0.5, 1]} x={[-1, 1]} delay={[100, 200]} duration={2500} amount={50} />
    </ToggleConfetti>
    <button type="button" on:click={ views.reset }>Go back to the start</button>
</form>