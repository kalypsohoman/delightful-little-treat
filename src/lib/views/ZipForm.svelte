<script lang="ts">
	import { AddressForm, zip, views, ZIP_CODES } from "$lib";

    let buttonText = "➜"

    // Uses RegEx to determine if the input is a zip code.
    // Check if the value consists of 5 digits OR 
    // 5 digits followed by a hyphen and 4 digits.
    function isZipCode(zip:string) {
        return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    }

    function validateZip() {
        console.log(inputZip)
        // Determines if the input is a zip code
        if (!isZipCode(inputZip)) {
            buttonText = "I don't think that's a real zip code (｡_｡;)"
        // Determines if the input is contained within our area of available zip codes.
        } else if (!ZIP_CODES.includes(inputZip)) {
            buttonText = "Oh no! We can't deliver there right now. Sorry (¡｡_｡)"
        // Proceeds to the next view
        } else {
            zip.set(inputZip)
            views.push({ id: "AddressForm", component: AddressForm, props: null })
        }
    }
    
    let inputZip:string = $zip
</script>

<form on:submit|preventDefault={validateZip}>
    <h2>Let's see if we can bring you one.</h2>
    <label for="zip">Zip:</label>
    <input name="zip" bind:value={inputZip}/>
    <button type="submit">{buttonText}</button>
</form>