<!--
TODO:
1. pressing button at end of logic sequence triggers confetti. 
2. Pressing what's your zip brings down zipcode input.
3. Pressing horray brings up address form.
4. Filling out address form brings up stripe payment.
5. Back button?
6. Issue form?
-->

<script lang="ts">
    import { TREATS_AVAILABLE , ZIP_CODES } from '$lib/config.js';
    import AddressForm from '../components/AddressForm.svelte'
	import ZipForm from '../components/ZipForm.svelte';
    
    const views = [
        "Would you like a delightful little treat?",
        "Let's see if we can bring you one. What neighborhood are you in?",
        "ZipForm",
        "Hooray! Tell us where to bring your delightful little treat!",
        "AddressForm",
        "Your treat should be there in about an hour! Yay!"
    ];

    const unavailableViews = [
        "Sorry but we can't bring you a treat right now.",
        "Oh no! We can't get to your neighborhood right now :c"
    ]

    let currentViewIndex = 0;
    let currentView = views[currentViewIndex];
    let displayZipForm = false;
    let displayAddressForm = false;
    
    let address = {
        name: "",
        addressLineOne: "",
        addressLineTwo: "",
        state: "LA",
        zip: "70119"
    };

    function progressThroughResponses(){
        console.log("progressThroughResponses", currentView)
       if (currentViewIndex >= 4) {
            makeConfetti();
            return;
       } else {
            dipsplayNextMessage();
       }
        // If the treats are not currently available.
            if (!TREATS_AVAILABLE) {
        currentView = unavailableViews[0];
        }
        // Display the Zip Form
        if (currentView === "ZipForm") {
            displayZipForm = true;
        }
        // Display the Address Form
        if (currentView === "Hooray! Tell us where to bring your delightful little treat!") {
            displayAddressForm = true;
        }
    }

    function dipsplayNextMessage() {
        currentViewIndex += 1;
        currentView = views[currentViewIndex];
        displayZipForm = false;
        displayAddressForm = false;
    }

    // $: currentView = views[currentViewIndex];


    // Ensure immediate UI updates after changing displayZipForm
    $: {
        console.log("displayZipForm:", displayZipForm); // Debugging output
    }

    // TODO
    function makeConfetti() {

    }
</script>

{#if displayZipForm}
    <ZipForm bind:zip={address.zip} handleSubmit={dipsplayNextMessage}/>
    <p> currentViewIndex = {currentViewIndex}</p>
{:else if displayAddressForm}
    <AddressForm {...address}/>
{:else}
    <button on:click={progressThroughResponses}>{currentView}</button>
{/if}