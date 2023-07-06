<script lang="ts">
	import { RangeSlider, SlideToggle } from "@skeletonlabs/skeleton";
	import type { Voice } from "$lib/types";
	import { settingsStore } from "$lib/stores";

	let channel = $settingsStore.channel;
	let quoteUser = $settingsStore.quoteUser;
	let ignoreQuote = false;


	const voiceMap: Record<string, Voice> = {
		"Rachel": {
			name: "Rachel",
			id: "21m00Tcm4TlvDq8ikWAM"
		},
		"Domi": {
			name: "Domi",
			id: "AZnzlk1XvdvUeBnXmlld"
		},
		"Bella": {
			name: "Bella",
			id: "EXAVITQu4vr4xnSDxMaL"
		},
		"Antoni": {
			name: "Antoni",
			id: "ErXwobaYiN019PkySvjV"
		},
		"Elli": {
			name: "Elli",
			id: "MF3mGyEYCl7XYWbV9V6O"
		},
		"Josh": {
			name: "Josh",
			id: "TxGEqnHWrfWFTfGW9XjX"
		},
		"Arnold": {
			name: "Arnold",
			id: "VR6AewLTigWG4xSOukaG"
		},
		"Adam": {
			name: "Adam",
			id: "pNInz6obpgDQGcFmaJgB"
		},
		"Sam": {
			name: "Sam",
			id: "yoZ06aMxZJJ28mfd3POQ"
		}
	}

	let voice = $settingsStore.voice;
  	let stability = $settingsStore.stability;
  	let similarity = $settingsStore.similarity;

	$: settingsStore.update(settings => {
    	return {
			...settings,
			voice,
			stability,
			similarity
		};
  	});
	
	function handleToggle() {
		return () => {
			settingsStore.update(settings => {
				return {
					...settings,
					ignoreQuote
				};
			});
		}
	}

	// const voiceSettings: VoiceSettings = {
	// 	stability: 0.30,
	// 	similarity: 0.30
	// };
</script>

<div class="container h-full space-x-4 mx-auto flex justify-center items-center">
	<div class="space-y-3 card p-4 rounded-sm text-center flex flex-col items-center">
		<span class="text-xl">Channel</span>
		<span class="text-sm">For now, page will need a refresh to connect.</span>
		<span class="text-sm">Reload the page after setting</span>
		<div class="flex flex-row">
			<input class="input rounded-sm" type="text" bind:value={channel} />
			<button class="btn { $settingsStore.channel ? 'variant-filled-success' : 'variant-filled-surface' } rounded-sm" on:click={() => settingsStore.update(settings => {
				return {
					...settings,
					channel
				};
			})}>Set</button>
		</div>
		<span class="text-xl">Quote User</span>
		<div class="flex flex-row">
			<input class="input rounded-sm" type="text" bind:value={quoteUser} />
			<button class="btn { $settingsStore.quoteUser ? 'variant-filled-success' : 'variant-filled-surface' } rounded-sm" on:click={() => settingsStore.update(settings => {
				return {
					...settings,
					quoteUser
				};
			})}>Set</button>
		</div>
		
	</div>
	<div class="space-y-3 card p-4 rounded-sm text-center flex flex-col items-center">
		<span class="text-xl">Voice</span>
		<select bind:value={voice} class="select rounded-sm">
			{#each Object.keys(voiceMap) as voiceName}
				<option value={voiceMap[voiceName].id}>{voiceMap[voiceName].name}</option>
			{/each}
		</select>
		<RangeSlider name="stability-slider" min={0} max={1} step={0.01} bind:value={stability}>
			<div class="flex justify-between items-center">
				<div class="font-bold">Stability:</div>
				<div class="text-xs">{stability}</div>
			</div>
		</RangeSlider>
		<RangeSlider name="similarity-slider" min={0} max={1} step={0.01} bind:value={similarity}>
			<div class="flex justify-between items-center">
				<div class="font-bold">Similarity:</div>
				<div class="text-xs">{similarity}</div>
			</div>
		</RangeSlider>
		<hr />
		<span class="text-sm">enable to read FULL message</span>
		<div class="flex flex-row space-x-4">
			<SlideToggle name="ignoreQuote" bind:checked={ignoreQuote} on:change={handleToggle()} size="sm" />
			<span>Ignore Quote </span>
		</div>
		<!-- {$settingsStore.voice}
		{$settingsStore.stability}
		{$settingsStore.similarity} -->
	</div>
</div>
	

