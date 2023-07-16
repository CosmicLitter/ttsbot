import { localStorageStore } from "@skeletonlabs/skeleton";
import { writable, type Writable } from "svelte/store";
import type { ClientSettings, Voice } from "./types";


export const quoteStore: Writable<string> = writable("")

export const settingsStore: Writable<ClientSettings> = localStorageStore("settingsStore", {});

export const recentViewerStore: Writable<string[]> = writable([])

