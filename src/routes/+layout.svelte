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
	import { quoteStore } from '$lib/stores';

	onMount(() => {
        // Specify the channel to connect to
        ComfyJS.Init( "basghettii" );
    })

    onDestroy(() => {
        ComfyJS.Disconnect();
		connected = false;
    })

	// Check if comfy is connected
	let connected = false;
	ComfyJS.onConnected = () => {
		connected = true;
	}

	let noQuote = false;

	// Listen for the user Streamlabs for the quote
	ComfyJS.onChat = ( user: string, message: string, flags: OnMessageFlags, self: boolean, extra: any ) => {
		console.log(user, message)
		
		if( user === "Streamlabs" ) {
			// Pull the quote out of the message
			const extractQuote = (input: string): string | null => {
				const match = input.match(/"([^"]+)"/);  // A regular expression that matches the text within double quotes
				// if match is null set noQuote to true
				if (!match) {
					noQuote = true;
				}
				return match ? match[1] : null;          // Return the quote or null if a quote is not found for some reason
			};
		
			let quote = (extractQuote(message));
			console.log(quote)

			//write the quote to the quote store
			if (quote) {
				quoteStore.set(quote);
			}
			// only call handleGenerateTTS if noQuote is false
			if (!noQuote) {
				handleGenerateTTS();
				noQuote = false;
			}
		}
    }
    
    const handleGenerateTTS = async () => {
        const text = $quoteStore;
        const voice = "21m00Tcm4TlvDq8ikWAM"

        try {
            const response = await fetch("/api/elevenlabs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    message: text,
                    voice: voice
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
				<!-- <a
					class="btn btn-sm variant-ghost-surface"
					href="https://discord.gg/EXqV7W8MtY"
					target="_blank"
					rel="noreferrer"
				>
					Discord
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a> -->
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<!-- <audio autoplay src="/public/audio/01cskq.mp3"></audio> -->
	<div class="p-8">
			<slot />
	</div>
</AppShell>
