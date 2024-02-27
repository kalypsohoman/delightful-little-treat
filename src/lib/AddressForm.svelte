<script lang="ts">

	let buttonText = "➜";

	type Address = {
		name: string;
		address: string;
		state: string;
		zip: string;
	}
	export let address: Address;

	// Checks if the name is greater than length 0.
	// If yes, returns true.
	// If no, makes submit button prompt the user for an input
	// and returns false.
	function containsValidName (name:string) {
		if (name.length === 0) {
			buttonText = "Please tell us who to bring it to.";
			return false;
		} else {
			return true;
		}
	}

	let validationResponse = null;

    async function addressVerificationCall() {
        const response = await fetch('/api/validateAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address }),
        });

        if (response.ok) {
            validationResponse = await response.json();
        } else {
            console.error('Failed to validate address');
        }
    }

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
		if (containsValidName(address.name)){
			// Check if the address is valid.
			// These if statements are nested so the button text will alert
			// the user of an invalid name before an invalid address input. 
			if (containsValidAddress(address.address)){
				handleSubmit();
			}
		}
    }

    export let handleSubmit:Function;
</script>


<form on:submit|preventDefault={verifyForm}>
	<label for="name">Name:</label>
    <input id="name" bind:value={address.name}/>
	<label for="address">Address:</label>
    <input id="address" bind:value={address.address}/>
	<label for="state">State:</label>
	<p>{address.state}</p>
	<label for="zip">Zip:</label>
	<p>{address.zip}</p>
	<button type="submit">{buttonText}</button>
</form>