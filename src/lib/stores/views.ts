import { writable } from "svelte/store";
import { type ComponentType } from "svelte";

export const activeComponent = writable<ComponentType | null>(null);