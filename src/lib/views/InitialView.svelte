<script lang="ts">
    import { DontWantATreat, ZipForm, views, noTreatClicked } from "$lib";
</script>

<div></div>

<form>
    <h2>Would you like a delightful little treat?</h2>
    <row>
        <button type="button" 
            on:click={() => {
                noTreatClicked.set(false);
                views.push({ id: "ZipForm", component: ZipForm, props: null});
            }}
            >Yes</button>
        <button type="button" on:click={() => {noTreatClicked.set(true)}}>No</button>
    </row>
</form>