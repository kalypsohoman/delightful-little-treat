<script lang="ts">
    import { DontWantATreat, ZipForm, activeComponent } from "$lib";
</script>

<form>
    <h2>Would you like a delightful little treat?</h2>
    <row>
        <button type="button" on:click={() => activeComponent.set(ZipForm)}>Yes</button>
        <button type="button" on:click={() => activeComponent.set(DontWantATreat)}>No</button>
    </row>
</form>