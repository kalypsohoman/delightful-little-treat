<script lang="ts">
    import { DontWantATreat, ZipForm, views } from "$lib";
</script>

<div></div>

<form>
    <h2>Would you like a delightful little treat?</h2>
    <row>
        <button type="button" on:click={() => views.push({component: ZipForm, props: null})}
            >Yes</button>
        <button type="button" on:click={() =>  views.push({component: DontWantATreat, props: null})}
            >No</button>
    </row>
</form>