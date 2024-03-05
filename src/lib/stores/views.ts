import { writable } from "svelte/store";
import { type ComponentType } from "svelte";

// Define a boolean to keep track of if the user clicked that they dont want a treat
export let noTreatClicked = writable<boolean>(false);

// Define a boolean to check if the user can access the CheckoutConfirmation view
export let canSeeCheckoutConfirmation = writable<boolean>(false);

// Define a generic type for props
type SvelteProps = Record<string, any> | null;

// Define the 'View' type
export type View = {
  id: string,
  component: ComponentType,
  props: SvelteProps
};

// Set up a function to create a views array with custom methods
function createViewArray() {
	const { subscribe, set, update } = writable<View[]>([]);

	return {
		subscribe,
		push: (newView: View) => {
            update(currentViews => {
                // Check if newView is already in currentViews to prevent duplicates
                if (!currentViews.some(view => view.id === newView.id)) {
                    return [...currentViews, newView];
                }
                return currentViews; // Return currentViews unchanged if newView is already included
            });
        },
        pop: () => update(currentViews => currentViews.slice(0, -1)),
		reset: () => update(currentViews => currentViews.slice(0, 1))
	};
}

export const views = createViewArray();