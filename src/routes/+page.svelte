<!--
TODO:
1. pressing button at end of logic sequence triggers confetti. 
2. Pressing what's your zip brings down zipcode input.
3. Pressing horray brings up address form.
4. Filling out address form brings up stripe payment.
5. Back button?
6. Issue form?
-->

<script>
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
    let displayZipUnavailable = false;
    let address = {
        name: "",
        addressLineOne: "",
        addressLineTwo: "",
        state: "LA",
        zip: "a"
    };

    function progressThroughResponses(){
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
        // If the treats are available, proceed through the views
       if (currentViewIndex >= 4) {
            makeConfetti();
            return;
       } else {
            dipsplayNextMessage();
       }
    }

    function dipsplayNextMessage() {
        currentViewIndex += 1;
        currentView = views[currentViewIndex];
    }

    function handleZipCheck() {
        if (ZIP_CODES.includes(address.zip)){
            displayZipForm = false;
        } else {
            displayZipUnavailable = true;
        }
    }

    // TODO
    function makeConfetti() {

    }
</script>

{#if displayZipForm}
    <ZipForm bind:zip={address.zip}/>
    <p>zip code: {address.zip}</p>
{:else if displayAddressForm}
    <AddressForm address={address}/>
{:else}
    <button on:click={progressThroughResponses}>{currentView}</button>
{/if}