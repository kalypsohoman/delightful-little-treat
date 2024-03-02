import { writable } from "svelte/store";
import { type ComponentType } from "svelte";

// Define a generic type for props
type SvelteProps = Record<string, any> | null;

// Define the 'View' type
export type View = {
  component: ComponentType;
  props: SvelteProps;
};

// Set up a function to create a views array with custom methods
function createViewArray() {
	const { subscribe, set, update } = writable<View[]>([]);

	return {
		subscribe,
		push: (newView: View) => update(currentViews => [...currentViews, newView]),
        pop: () => update(currentViews => currentViews.slice(0, -1)),
		reset: () => update(currentViews => currentViews.slice(0, 1))
	};
}

export const views = createViewArray();