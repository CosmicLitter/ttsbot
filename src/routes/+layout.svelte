<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import { AppShell, AppBar, Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import ClientSettings from '$lib/Modals/ClientSettings.svelte';
	import ComfyJS, { type OnMessageFlags } from "comfy.js"
	import { onMount, onDestroy } from "svelte"
	import { quoteStore, recentViewerStore, settingsStore } from '$lib/stores';
	import { Settings, Zap, ZapOff } from 'lucide-svelte';
	import * as tmi from 'tmi.js'
	import { getVoices, handleGenerateTTS, showModalComponent } from '$lib/shared';

	const elevenLabs = $settingsStore.apiKeys?.elevenLabs ?? '';	

	const modalComponentRegistry: Record<string, ModalComponent> = {
		ClientSettings: { ref: ClientSettings },
	}

	async function modalSettings() {
		showModalComponent('ClientSettings')
	}

	let channel = $settingsStore?.channel;

	let client = new tmi.client({
		channels: [
			channel || ''
		]
	})

	let viewers: string[] = [];

	$: ignoreQuote = $settingsStore.ignoreQuote ?? false;

	const connectChannel = () => {
		// client.connect()
		
		settingsStore.update(settings => {
			return {
				...settings,
				channel: channel?.toLowerCase() ?? ''
			};
		});
		location.reload();
	}
	

	onMount(() => {
		if (channel) {
			client.connect()
			console.log(`* Connected to ${channel}`)
			connected = true;
		}
    })


	client.on('connected', (address, port) => {
		console.log(`* Connected to ${address}:${port}`)
		
	})


	// let onJoin = (channel: string, username: string, self: boolean) => {
	// 	if (username.includes("justinfan")) {
	// 		return;
	// 	}
	// 	console.log(`${username} has joined the channel.`);
	// 	viewers.push(username);
	// 	recentViewerStore.update(viewers => {
	// 		return [...viewers, username];
	// 	});
	// };

	// client.on('join', onJoin);

    onDestroy(() => {
		// client.removeListener('join', onJoin);
		if (channel) {
			client.disconnect()
			console.log('disconnected')
			connected = false;
		}
    })

	let lastMessage = "";

	// function randomChance() {
	// 	if (Math.random() < ($settingsStore.rReadingChance ?? 0.1)) {
	// 		console.log("Selected!")
	// 		readWinner(lastMessage)
	// 	}	
	// }


	// Verify that the bot is connected to twitch chat
	let connected = false;
	// ComfyJS.onConnected = () => {
	// 	connected = true;
	// }
	
	// Track if the bot's message has a quote
	let noQuote = false;

	client.on('message', (channel, tags, message, self) => {
		// console.log(`${tags['display-name']}: ${message}`)
		lastMessage = message;
		// message = `${tags['display-name']}: ${message}`
		// if ($settingsStore.rReading == true) {
		// 	randomChance()
		// }
		if (tags['display-name'] && !viewers.includes(tags['display-name'])) {
			viewers.push(tags['display-name']);
			recentViewerStore.update(viewers => {
				return [...viewers, tags['display-name']].filter(name => name !== undefined) as string[];
			});
		}
		// viewerSettings will be undefined if no matching viewer is found
		const viewerSettings = $settingsStore.usersVoice?.voiceWhitelist?.find(viewer => viewer.viewerName === tags['display-name']);
			if (viewerSettings) {
				handleGenerateTTS(viewerSettings, message, elevenLabs, ignoreQuote)
			}

	})

	// const readWinner = async (message: string) => {
	// 	if (message) {
	// 		const voice = $settingsStore.voice;
	// 		const stability = $settingsStore.stability;
	// 		const similarity = $settingsStore.similarity;

	// 		try {
    //         const response = await fetch("/api/elevenlabs", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({ 
    //                 message: lastMessage,
    //                 voice: voice,
	// 				stability: stability,
	// 				similarity: similarity
    //             })
    //         })

    //         if (!response.ok) {
    //             throw new Error("Something went wrong")
    //         }

    //         const { file } = await response.json()
            
	// 		// Create an Audio object and set its src attribute to the URL of the audio file
	// 		const audio = new Audio(`/public/${file}`);

	// 		// Play the audio
	// 		audio.play();

	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}

	// }

</script>

<Modal components={modalComponentRegistry}/>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotDefault="place-self-center">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase"><a href="/">QuoteBot</a></strong>
			</svelte:fragment>
			<!-- <div class="btn-group rounded-sm">
				<a href="/quote" class="btn variant-filled-surface p-2 rounded-sm"> Quote </a>
				<a href="/chat" class="btn variant-filled-surface p-2 rounded-sm"> Chat </a>
			</div> -->
			<svelte:fragment slot="trail">
				<div class="input-group grid-cols-[auto_1fr_auto] rounded-sm input-group-divider">
					<span class="px-2 flex items-center">
						{#if connected}
							<Zap color="green" size={16} />
						{:else}
							<ZapOff color="red" size={16} />
						{/if}
						<!-- <ZapOff color="red" size={16} /> -->
					</span>
					<input class="input rounded-sm" type="text" spellcheck="false" placeholder="Channel to Connect to..." bind:value={channel}/>
					<button class="btn variant-filled-surface rounded-sm" on:click={connectChannel}>Connect</button>
				</div>
				<!-- {#if connected}
					<Zap color="green" />
				{:else}
					<ZapOff color="red" />
				{/if} -->
				<button class="btn {!$settingsStore.apiKeys ? 'animate-pulse' : ''}" on:click={modalSettings}>
					{#if !$settingsStore.apiKeys}
						<Settings size={32} color="#EAB308" />
					{:else}
						<Settings size={32}/>
					{/if}
				</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="p-8">
		<slot />
	</div>

</AppShell>