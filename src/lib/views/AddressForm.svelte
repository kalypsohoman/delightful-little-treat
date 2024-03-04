<script lang="ts">
	import { name, address, state, zip, StripeCheckout, views } from '$lib';
	import { onMount } from 'svelte'
	import { loadStripe, type Stripe } from '@stripe/stripe-js'
	import { PUBLIC_STRIPE_KEY } from '$env/static/public'

	let buttonText = "➜";
	let inputName = $name;
	let inputAddress = $address;

	// Checks if the name is greater than length 0.
	function containsValidName (name:string) {
		if (name.length === 0) {
			buttonText = "Please tell us who to bring it to.";
			return false;
		} else {
			return true;
		}
	}

	// let stripe: Stripe | null = null

	// onMount(async () => {
	// 	stripe = await loadStripe(PUBLIC_STRIPE_KEY)
	// })

	// let validationResponse = null;

    // async function addressVerificationCall() {
    //     const response = await fetch('/api/validateAddress', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ address }),
    //     });

    //     if (response.ok) {
    //         validationResponse = await response.json();
    //     } else {
    //         console.error('Failed to validate address');
    //     }
    // }

	//Checks if the address is greater than length 0.
	function containsValidAddress(address:string) {
		if (address.length === 0) {
			buttonText = "Please tell us where to bring it to.";
			return false;
		} else {
			return true;
		}
	}

	function verifyForm() {
		// Check if the name is valid
		if (containsValidName(inputName)){
			// Check if the address is valid.
			// These if statements are nested so the button text will alert
			// the user of an invalid name before an invalid address input. 
			if (containsValidAddress(inputAddress)){
				views.push({id: "StripeCheckout", component: StripeCheckout, props: null})
			}
		}
    }
</script>


<form on:submit|preventDefault={verifyForm}>
	<h2>Yay! We can deliver to you. Tell us where to bring the treat!</h2>
	<label for="name">Name:</label>
    <input id="name" autocomplete="name" bind:value={inputName}/>
	<label for="address">Address:</label>
    <input id="address" autocomplete="street-address" bind:value={inputAddress}/>
	<label for="state">State:</label>
	<input disabled={true} id="state" value={$state}/>
	<label for="zip">Zip:</label>
	<input disabled={true} id="zip" value={$zip}/>
	<button type="submit">{buttonText}</button>
</form>