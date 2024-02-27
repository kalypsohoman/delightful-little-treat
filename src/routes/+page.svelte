<!--
TODO:
1. pressing button at end of logic sequence triggers confetti. 
2. Add address verification api in AddressForm.
3. Fix unavailable views bug.
4. Issue form?
5. Notifications for when the treats are available.
6. Add applepay and google pay as options. maybe paypal.
-->

<script lang="ts">

    import { TREAT_COUNT , ZIP_CODES } from '$lib/config';
    import { onMount } from 'svelte'
    import { loadStripe } from '@stripe/stripe-js'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import { 
        ZipForm,
        AddressForm,
        EmbeddedCheckout,
        views,
        unavailableViews,
        currentViewIndex,
        currentView } from '$lib'
        
    let address = {
        name: "",
        address: "",
        state: 'LA',
        zip: "70119"
    };

    function progressThroughResponses(){
       if ($currentViewIndex >= 4) {
            makeConfetti();
            return;
       } else {
            currentViewIndex.increment();
       }
        // If the treats are not currently available.
            if (!TREAT_COUNT) {
        $currentView = unavailableViews[0];
        }
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

{#if ($currentView === "ZipForm")}
    <ZipForm bind:zip={address.zip} handleSubmit={currentViewIndex.increment}/>
{:else if $currentView === "AddressForm"}
    <AddressForm bind:address={address} handleSubmit={currentViewIndex.increment}/>
{:else if $currentView === "StripeForm"}
    <EmbeddedCheckout {stripe} clientSecret={data.clientSecret}/>
{:else}
    <button on:click={progressThroughResponses}>{$currentView}</button>
{/if}