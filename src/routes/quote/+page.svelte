<script lang="ts">
	import { quoteStore } from "$lib/stores";
    
</script>


<div class="card p-1 rounded-sm">
<!-- <button class="btn variant-outline-primary" on:click={handleGenerateTTS}>Test</button> -->
{#if $quoteStore}
    <blockquote class="blockquote text-2xl">{$quoteStore}</blockquote>
{:else} 
    No quote yet
{/if}
</div>
