<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import ComfyJS, { type OnMessageFlags } from "comfy.js"
	import { onMount, onDestroy } from "svelte"
	import { quoteStore, settingsStore } from '$lib/stores';

	onMount(() => {
        // Specify the channel to connect to
		if ($settingsStore.channel)
        	ComfyJS.Init( $settingsStore.channel);
    })

    onDestroy(() => {
        ComfyJS.Disconnect();
		connected = false;
    })



	// Verify that the bot is connected to twitch chat
	let connected = false;
	ComfyJS.onConnected = () => {
		connected = true;
	}
	
	// Track if the bot's message has a quote
	let noQuote = false;


	// Listen for the user Streamlabs for the quote
	ComfyJS.onChat = ( user: string, message: string, flags: OnMessageFlags, self: boolean, extra: any ) => {
		console.log(user, message)
		
		if( user === $settingsStore.quoteUser && connected ) {
			// if settingstore ignorequote is true, set the quoteStore to the message
			if ($settingsStore.ignoreQuote) {
				quoteStore.set(message);
			} else {
				// Pull the quote out of the message
				const extractQuote = (input: string): string | null => {
					// A regular expression that matches the text within double quotes
					const match = input.match(/"([^"]+)"/);
					
					// if there is no quote set noQuote to true
					if (!match) {
						noQuote = true;
					}
					return match ? match[1] : null;
				};
			
				let quote = (extractQuote(message));
				console.log(quote)
	
				//If a quote is found, set the quoteStore to the quote
				if (quote) {
					quoteStore.set(quote);
				}
			}

			// Call the handleGenerateTTS function only if noQuote is false, otherwise reset the boolean. This logic can be cleaned up
			if (noQuote) {
				noQuote = false;
			} else {
				handleGenerateTTS();
			}
		}
    }
    
	// Call the ElevenLabs API to generate the TTS
    const handleGenerateTTS = async () => {
        const text = $quoteStore;
        const voice = $settingsStore.voice;
		const stability = $settingsStore.stability;
		const similarity = $settingsStore.similarity;

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
					similarity: similarity
                })
            })

            if (!response.ok) {
                throw new Error("Something went wrong")
            }

            const { file } = await response.json()
            
			// Create an Audio object and set its src attribute to the URL of the audio file
			const audio = new Audio(`/public/${file}`);

			// Play the audio
			audio.play();

        } catch (error) {
            console.log(error)
        }
    }

</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotDefault="place-self-center">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase"><a href="/">QuoteBot</a></strong>
			</svelte:fragment>
			<div class="btn-group rounded-sm">
				<a href="/quote" class="btn variant-filled-surface p-2 rounded-sm"> Quote </a>
				<button class="btn variant-filled-surface p-2 rounded-sm" disabled> Chat? </button>
			</div>
			<svelte:fragment slot="trail">
				Connected: {connected}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="p-8">
		<slot />
	</div>
</AppShell>