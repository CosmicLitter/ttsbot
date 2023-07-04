import { writable, type Writable } from "svelte/store";


export const quoteStore: Writable<string> = writable("")