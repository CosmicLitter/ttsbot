<script lang="ts">
	import { Avatar, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
    import type { Character } from "$lib/types"
    import { X } from "lucide-svelte";
	import { showModalComponent } from "$lib/shared";

    const characters: Character[] = [
        { id: 0, name: 'Boone', prompt: 'testing'}
    ]

    let currentCharacter: Character = characters[0]   

    const removeCharacter = (character: Character) => {
        console.log(character)
    }

</script>
<section class="card rounded-sm">
    <div class="w-full h-full grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <!-- Nav -->
        <div class="hidden rounded-sm lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500">
            <!-- Header -->
            <header class="border-b rounded-sm border-surface-500 p-4 flex justify-center">
                <button class="rounded-sm btn variant-filled-surface" on:click={()=> showModalComponent('NPCSettings')}>Add NPC</button>
            </header>
            <!-- NPCs -->
            <div class="p-4 space-y-4 h-[200px] overflow-y-auto">
                <small class="opacity-50">NPCs</small>
                <ListBox active="variant-filled-primary" rounded="rounded-sm">
                    {#each characters as npc}
                        <div class="input-group grid-cols-[1fr_auto] rounded-sm">
                            <ListBoxItem bind:group={currentCharacter} name="characters" value={npc}>
                                <!-- <svelte:fragment slot="lead">
                                    <Avatar src="https://i.pravatar.cc/?img={npc.avatar}" width="w-8" />
                                </svelte:fragment> -->
                                {npc.name}
                            </ListBoxItem>
                            <button class="btn btn-small input-group-shim rounded-sm" on:click={() => removeCharacter(npc)}><X color="#EAB308" /></button>
                        </div>
                    {/each}
                </ListBox>
            </div>
        </div>
        <slot />
        
    </div>
</section>