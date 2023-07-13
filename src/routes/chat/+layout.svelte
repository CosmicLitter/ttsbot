<script lang="ts">
	import { Avatar, ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
    import type { Character } from "$lib/types"

    const characters: Character[] = [
        { id: 0, avatar: 65, name: 'Boone'}
    ]

    let currentCharacter: Character = characters[0]   
</script>
<section class="card rounded-sm">
    <div class="w-full h-full grid grid-cols-1 lg:grid-cols-[25%_1fr]">
        <!-- Nav -->
        <div class="hidden rounded-sm lg:grid grid-rows-[auto_1fr_auto] border-r border-surface-500">
            <!-- Header -->
            <header class="border-b rounded-sm border-surface-500 p-4 flex justify-center">
                <button class="rounded-sm btn variant-filled-surface">Add NPC</button>
            </header>
            <!-- NPCs -->
            <div class="p-4 space-y-4 h-[200px] overflow-y-auto">
                <small class="opacity-50">NPCs</small>
                <ListBox active="variant-filled-primary">
                    {#each characters as npc}
                        <ListBoxItem bind:group={currentCharacter} name="characters" value={npc}>
                            <svelte:fragment slot="lead">
                                <Avatar src="https://i.pravatar.cc/?img={npc.avatar}" width="w-8" />
                            </svelte:fragment>
                            {npc.name}
                        </ListBoxItem>
                    {/each}
                </ListBox>
            </div>
        </div>
        <slot />
        
    </div>
</section>