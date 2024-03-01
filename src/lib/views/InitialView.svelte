<script lang="ts">
    import ZipForm from "./ZipForm.svelte";
	import FirstNo from "./FirstNo.svelte";
    import { activeComponent } from "$lib";
</script>

<form>
    <h2>Would you like a delightful little treat?</h2>
    <row>
        <button type="button" on:click={() => activeComponent.set(ZipForm)}>Yes</button>
        <button type="button" on:click={() => activeComponent.set(FirstNo)}>No</button>
    </row>
</form>