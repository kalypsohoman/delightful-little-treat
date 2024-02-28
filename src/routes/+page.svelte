<!--
TODO:
1. pressing button at end of logic sequence triggers confetti. 
2. Add address verification api in AddressForm.
3. Add tests.
4. Issue form?
5. Notifications for when the treats are available.
6. Add applepay and google pay as options. maybe paypal.
-->

<script lang="ts">

    import { NEXT_DELIVERY_DATE, TREAT_COUNT, DELIVERING_TODAY } from '$lib/config';
    import { onMount } from 'svelte'
    import { loadStripe } from '@stripe/stripe-js'
    import { PUBLIC_STRIPE_KEY } from '$env/static/public'
    import { formatDate } from 'date-fns';
    import { 
        ZipForm,
        AddressForm,
        EmbeddedCheckout,
        currentViewOverride,
        currentViewIndex,
        currentView } from '$lib'
        
    let address = {
        name: "Kapipso",
        address: "some place",
        state: 'LA',
        zip: "70119"
    };
   
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // If there is a next delivery date and it's in the future, concat the next date to the currentViewOverride.
    function showNextDeliverDate() {
        if (NEXT_DELIVERY_DATE && NEXT_DELIVERY_DATE > currentDate) {
            // Convert NEXT_DELIVERY_DATE to a string with 'Month + date' format
            const formattedNextDate = formatDate(NEXT_DELIVERY_DATE, 'MMMM do')
            // Concat a message to check back on the next delivery date onto the currentViewOverride
            currentViewOverride.update((text) => {
                console.log(text);
                return (text || '') + ` Check back in ${formattedNextDate}.`
            });
        }
    }
    function progressThroughResponses(){
        // If we're not delivering today
        if (!DELIVERING_TODAY) {
            currentViewOverride.set("Sorry but we can't bring you a treat right now.");
            showNextDeliverDate();
        // If we are delivering today
        } else if (DELIVERING_TODAY) {
            // If we already ran out of treats
            if (TREAT_COUNT === 0) {
                currentViewOverride.set("Sorry but we ran out of treats.");
                showNextDeliverDate();
            // If we still have treats
            } else if (TREAT_COUNT > 0) {
                currentViewOverride 
                currentViewIndex.increment();
            }
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
    <ZipForm bind:zip={address.zip} handleSubmit={progressThroughResponses}/>
{:else if $currentView === "AddressForm"}
    <AddressForm bind:address={address} handleSubmit={progressThroughResponses}/>
{:else if $currentView === "StripeForm"}
    <EmbeddedCheckout {stripe} clientSecret={data.clientSecret}/>
{:else}
    <button on:click={progressThroughResponses}>{$currentView}</button>
{/if}