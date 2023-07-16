import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
import { settingsStore } from "./stores";
import type { Voice, ViewerSettings } from "./types";

export function showModalComponent(
	component: string,
	meta?: object,
	response?: ((r: any) => void) | undefined
) {
	const modal: ModalSettings = {
		type: 'component',
		component,
		meta,
		response
	};
	modalStore.trigger(modal);
}

export async function getVoices(elevenLabs: string) {
	const response = await fetch('https://api.elevenlabs.io/v1/voices', {
		headers: {
			'accept': 'application/json',
			'xi-api-key': elevenLabs
		}
	})
	const voiceLibrary = await response.json()
	// loop through voiceLibrary and retrieve the voice id and voice names from each item into its own array
	const voices: Voice[] = voiceLibrary.voices.map((voice: any) => {
		return { id: voice.voice_id, name: voice.name }
	})

	// Update the settings store with the new voices
	settingsStore.update((settings) => {
		return { ...settings, voiceLibrary: voices }
	})
	
	// return voiceLibrary
}

export const handleGenerateTTS = async (user: ViewerSettings, message: string, elevenLabs: string, quote:boolean) => {
	let text = message;
	const voice = user.voiceSettings.voice;
	const stability = user.voiceSettings.stability;
	const similarity = user.voiceSettings.similarity;


	if (!quote) {
		// Pull the quote out of the message
		const getTextWithinQuotes = (input: string): string => {
			// A regular expression that matches the text within double quotes
			const match = input.match(/"([^"]+)"/);
			if (match) {
				return match[1];
			}
			return '';
		}
		text = getTextWithinQuotes(text);
	}


	if (text.length > 0) {
		
	try {

		const response = await fetch("/api/elevenlabs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ 
				message: text,
				voice: voice,
				stability: stability,
				similarity: similarity,
				elevenLabs: elevenLabs
			})
		})

		if (!response.ok) {
			throw new Error("Something went wrong")
		}

		const { file } = await response.json()

		console.log(file)
		
		// Create an Audio object and set its src attribute to the URL of the audio file
		const audio = new Audio(`/public/${file}`);

		// Play the audio
		audio.play();

	} catch (error) {
		console.log(error)
	}}
}