import { writable, derived } from "svelte/store";

// Array of different display options for the user to see as they go through the app
export const views:Array<string> = [
    "Would you like a delightful little treat?",
    "Let's see if we can bring you one. What neighborhood are you in?",
    "ZipForm",
    "Hooray! Tell us where to bring your delightful little treat!",
    "AddressForm",
    "StripeForm",
    "Your treat should be there in about an hour! Yay!"
];

// Array of error messages when the treats aren't available :c
export const unavailableViews:Array<string> = [
    "Sorry but we can't bring you a treat right now.",
    "Oh no! We can't get to your neighborhood right now :c"
]

// Create a viewIndex object with some useful methods for navigating through the views.
// Uses svelte's native store syntax
function createViewIndex() {
	const { subscribe, set, update } = writable<number>(0);

	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset: () => set(0)
	};
}

export const currentViewIndex = createViewIndex();

// Create an override variable to display the unavailable views
export const currentViewOverride = writable<string | null>(null)

// Creates a currentView variable that is dependent on currentViewOverride and
// currentViewIndex using svelte's store derived method.
export const currentView = derived(
    [currentViewIndex, currentViewOverride],
	([$currentViewIndex, $currentViewOverride]) => {
        if($currentViewOverride !== null) {
            return $currentViewOverride;
        } else {
            return views[$currentViewIndex];
        }
    }
);