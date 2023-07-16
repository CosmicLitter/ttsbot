<script lang="ts">
	import { getVoices } from "$lib/shared";
	import { settingsStore } from "$lib/stores";
	import { modalStore } from "@skeletonlabs/skeleton";

    let openAiApiKey = $settingsStore.apiKeys?.openAi;
    let elevenLabsApiKey = $settingsStore.apiKeys?.elevenLabs;

    console.log($settingsStore)

    $: apiKeys = {
        openAi: openAiApiKey,
        elevenLabs: elevenLabsApiKey
    }

    function updateSettings() {
        settingsStore.update(settings => {
            return {
                ...settings,
                apiKeys
            };
        }); 

        console.log('getting voices')
		getVoices($settingsStore.apiKeys?.elevenLabs ?? '');
        modalStore.close();
        location.reload();
    }

    const clearSettings = () => {
        localStorage.removeItem("voiceSettingsStore");
        localStorage.removeItem("settingsStore");
        modalStore.close();
        location.reload();
    }
</script>

<div class="card p-8 rounded-sm flex flex-col w-[420px]">
    <div class="flex justify-between items-center">
        <span class="text-2xl">
            <h1>Settings</h1>
        </span>
        <button class="btn variant-soft-primary rounded-lg p-2" on:click={clearSettings}>Clear Settings</button>
    </div>
    <hr class="!border-2 mb-2"/>
    <span>ElevenLabs API Key:</span>
    <input class="input my-2 p-1 rounded-sm outline-none" type='password' bind:value={elevenLabsApiKey}/>
    <span>OpenAI API Key:</span>
    <input class="input my-2 p-1 rounded-sm outline-none" type='password' bind:value={openAiApiKey}/>
    <slot />
    <hr class="!border-2 my-2"/>
    <button class="btn variant-glass-success rounded-sm" on:click={updateSettings}>Save</button>
</div>