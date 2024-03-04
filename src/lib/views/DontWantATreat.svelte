<script lang="ts">
    import { views, noTreatClicked } from "$lib";
</script>

<form>
    <h2>Well, come back when you want a little treat.</h2>
    <button type="button" on:click={() => {noTreatClicked.set(false); views.reset}}>↩</button>
</form>