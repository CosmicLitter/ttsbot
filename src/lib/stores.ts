import { localStorageStore } from "@skeletonlabs/skeleton";
import { writable, type Writable } from "svelte/store";
import type { ClientSettings } from "./types";


export const quoteStore: Writable<string> = writable("")

export const settingsStore: Writable<ClientSettings> = localStorageStore("voiceSettingsStore", {});
