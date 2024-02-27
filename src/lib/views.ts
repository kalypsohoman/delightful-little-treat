import { writable } from "svelte/store";

export const views:Array<string> = [
    "Would you like a delightful little treat?",
    "Let's see if we can bring you one. What neighborhood are you in?",
    "ZipForm",
    "Hooray! Tell us where to bring your delightful little treat!",
    "AddressForm",
    "StripeForm",
    "Your treat should be there in about an hour! Yay!"
];

export const unavailableViews:Array<string> = [
    "Sorry but we can't bring you a treat right now.",
    "Oh no! We can't get to your neighborhood right now :c"
]

function createViewIndex() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}

export const currentViewIndex = createViewIndex();