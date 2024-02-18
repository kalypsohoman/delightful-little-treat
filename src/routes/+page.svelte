<!--
TODO:
1. pressing button at end of logic sequence triggers confetti 
2. Pressing what's your zip brings down zipcode input.
3. Pressing horray brings up address form.
4. Filling out address form brings up stripe payment.
5. Back button?
6. Issue form?
-->

<script>
    import { TREATS_AVAILABLE , ZIP_CODES } from '$lib/config.js';

    const messages = [
        "Would you like a delightful little treat?",
        "If you're close we can bring you one.",
        "What's your zip?",
        "Hooray! Tell us where to bring your delightful little treat!",
        "Your treat should be there in about an hour! Yay!"
    ];
    let currentMessageIndex = 0;
    let currentMessage = messages[currentMessageIndex];
    let displayZipForm = false;
    let displayAddressForm = false;
    let address = {
        name: "",
        addressLineOne: "",
        addressLineTwo: "",
        state: "",
        zip: ""
    };

    function showNextMessage(){
        // If the treats are not currently available.
        if (!TREATS_AVAILABLE) {
            currentMessage = "Sorry but we can't bring you a treat right now.";
        }
        //If the user is being asked for a zip code, bring up a zip code menu
        if (currentMessage === "What's your zip?") {
            displayZipForm = true;
        }
        // If the treats are available, proceed through the messages
       if (currentMessageIndex >= 4) {
            makeConfetti();
            return;
       } else {
            currentMessageIndex += 1;
            currentMessage = messages[currentMessageIndex];
       }

    }

    // TODO
    function makeConfetti() {

    }
</script>

{#if displayZipForm}
    <input bind:value={address.zip} />
{:else if displayAddressForm}
    <input bind:value={address.name}>
    <input bind:value={address.addressLineOne}>
    <input bind:value={address.addressLineTwo}>
    <input bind:value={address.state}>
    <input bind:value={address.zip}>
{:else}
    <button on:click={showNextMessage}>{currentMessage}</button>
{/if}