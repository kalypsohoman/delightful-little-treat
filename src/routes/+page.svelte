<!--
TODO:
1. pressing button at end of logic sequence triggers confetti. 
2. Add address verification api in AddressForm.
3. Back button?
4. Issue form?
5. Notifications for when the treats are available.
6. Add applepay and google pay as options. maybe paypal.
-->

<script lang="ts">
    import { TREAT_COUNT , ZIP_CODES } from '$lib/config.js';
    import { onMount } from 'svelte'
    import { loadStripe } from '@stripe/stripe-js'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import { ZipForm, AddressForm, EmbeddedCheckout } from '$lib'
    
    const views = [
        "Would you like a delightful little treat?",
        "Let's see if we can bring you one. What neighborhood are you in?",
        "ZipForm",
        "Hooray! Tell us where to bring your delightful little treat!",
        "AddressForm",
        "StripeForm",
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
    let displayStripeForm = false;
    
    let address = {
        name: "",
        address: "",
        state: 'LA',
        zip: "70119"
    };

    function progressThroughResponses(){
       if (currentViewIndex >= 4) {
            makeConfetti();
            return;
       } else {
            dipsplayNextMessage();
       }
        // If the treats are not currently available.
            if (!TREAT_COUNT) {
        currentView = unavailableViews[0];
        }
        // Display the Zip Form
        if (currentView === "ZipForm") {
            displayZipForm = true;
        }
        // Display the Address Form
        if (currentView === "AddressForm") {
            displayAddressForm = true;
        }
        // Display the Stripe Payment Form
        if (currentView === "StripeForm") {
            displayStripeForm = true;
        }
    }

    function dipsplayNextMessage() {
        currentViewIndex += 1;
        currentView = views[currentViewIndex];
        displayZipForm = false;
        displayAddressForm = false;
    }

    // TODO
    function makeConfetti() {

    }

    // STRIPE SETUP
    export let data

    let stripe: any = null

    onMount(async () => {
        stripe = await loadStripe(PUBLIC_STRIPE_KEY)
    })
</script>

{#if displayZipForm}
    <ZipForm bind:zip={address.zip} handleSubmit={dipsplayNextMessage}/>
{:else if displayAddressForm}
    <AddressForm bind:address={address} handleSubmit={dipsplayNextMessage}/>
{:else if displayStripeForm}
    <EmbeddedCheckout {stripe} clientSecret={data.clientSecret}/>
{:else}
<EmbeddedCheckout {stripe} clientSecret={data.clientSecret}/>

    <button on:click={progressThroughResponses}>{currentView}</button>
{/if}