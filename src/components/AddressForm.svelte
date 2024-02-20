<script lang="ts">

	let buttonText = "➜";

	type Address = {
		name: string;
		address: string;
		state: string;
		zip: string;
	}
	export let address: Address;

	function validateAddress() {
		handleSubmit();
    }

    export let handleSubmit:Function;
</script>


<form on:submit|preventDefault={validateAddress}>
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