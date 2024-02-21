<script lang="ts">
    import { ZIP_CODES } from "$lib/config";
	import type { MouseEventHandler } from "svelte/elements";

    let buttonText = "➜"

    // Uses RegEx to determine if the input is a zip code.
    // Check if the value consists of 5 digits OR 
    // 5 digits followed by a hyphen and 4 digits.
    function isZipCode(zip:string) {
        return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    }

    function validateZip() {
        // Determines if the input is a zip code
        if (!isZipCode(zip)) {
            buttonText = "I don't think that's a real zip code (｡_｡;)"
        // Determines if the input is contained within our area of available zip codes.
        } else if (!ZIP_CODES.includes(zip)) {
            buttonText = "Oh no! We can't deliver there right now. Sorry (¡｡_｡)"
        // Proceeds to the next view
        } else {
            handleSubmit();
        }
    }
    
    export let zip:string;
    export let handleSubmit:Function;
</script>

<form on:submit|preventDefault={validateZip}>
    <label for="zip">Zip:</label>
    <input name="zip" bind:value={zip}/>
    <button type="submit">{buttonText}</button>
</form>