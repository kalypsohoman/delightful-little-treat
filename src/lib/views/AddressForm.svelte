<script lang="ts">
	import { name, address, state, zip, activeComponent, EmbeddedCheckout } from '$lib';

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
				activeComponent.set(EmbeddedCheckout);
			}
		}
    }
</script>


<form on:submit|preventDefault={verifyForm}>
	<label for="name">Name:</label>
    <input id="name" bind:value={inputName}/>
	<label for="address">Address:</label>
    <input id="address" bind:value={inputAddress}/>
	<label for="state">State:</label>
	<p>{$state}</p>
	<label for="zip">Zip:</label>
	<p>{$zip}</p>
	<button type="submit">{buttonText}</button>
</form>