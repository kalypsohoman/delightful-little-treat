import { writable } from "svelte/store";

export const name = writable<string>("Kapipso");
export const address = writable<string>("somewhere");
export const state = writable<string>("LA");
export const zip = writable<string>("70119");


