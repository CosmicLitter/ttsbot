<script lang="ts">
	import type { MessageFeed } from "$lib/types";
	import { Avatar } from "@skeletonlabs/skeleton";
	import { onMount } from "svelte";
    import { Send, Mic } from 'lucide-svelte';

    let isRecording = false;
    let mediaRecorder: MediaRecorder | undefined;
    let chunks: BlobPart[] = [];
    let transcription: string = '';
    let recording: Blob | undefined;

    const startRecording = () => {
        console.log('startRecording Called')
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.addEventListener('dataavailable', (event) => {
                chunks.push(event.data);
                console.log(chunks)
            })
            mediaRecorder.addEventListener('stop', () => {
                const blob = new Blob(chunks, { type: 'audio/wave' });
                chunks = [];
                console.log(blob)
                recording = blob;
                sendRecording();
            });
            mediaRecorder?.start();
            isRecording = true;
        })
    }

    const stopRecording = () => {
        console.log('stopRecording Called')
        mediaRecorder?.stop();
        isRecording = false;
    }

    async function sendRecording() {
        const formData = new FormData();
        formData.append('audio', recording as Blob, 'recording.wav');
            console.log('send to server')
            console.log(formData)
            console.log(recording)
            const response = await fetch('/api/transcription', {
                method: 'POST',
                body: formData
        }).then((res) => res.json())

        transcription = response?.transcribedText;

        console.log(transcription)

        currentMessage = transcription

        return response
    }

    // const handleKeyDown = (event) => {
    //     if (event.ctrlKey && event.altKey && event.key === 'b') {
    //         startRecording();
    //     }
    // };

    // const handleKeyUp = (event) => {
    // if (event.key === 'b') {
    //     stopRecording();
    // }
    // };

    // window.addEventListener('keydown', handleKeyDown);
    // window.addEventListener('keyup', handleKeyUp);

    function scrollChatBottom(behavior?: ScrollBehavior): void {
        elemChat.scrollTo({ top: elemChat.scrollHeight, behavior })
       
    }

    function getCurrentTimestamp(): string {
		return new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

    function addMessage(): void {
        const newMessage = {
            id: messageFeed.length,
            host: true,
            avatar: 41,
            name: 'User',
            timestamp: getCurrentTimestamp(),
            message: currentMessage,
            color: 'variant-soft-primary'
        }
        messageFeed = [...messageFeed, newMessage]
        currentMessage = ''
        setTimeout(() => {
            scrollChatBottom('smooth')
        }, 0)
    }

    function onPromptKeydown(event: KeyboardEvent): void {
        if (['Enter'].includes(event.code) && !event.shiftKey) {
            event.preventDefault();
            addMessage();
        }
    }

    onMount(() => {
        scrollChatBottom()
    })


    let elemChat: HTMLElement
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam aliquam, nunc nisl aliquet nunc, vitae aliquam"

    let messageFeed: MessageFeed[] = []

    let currentMessage = ''
</script>

<!-- Chat -->
<div class="grid grid-row-[1fr_auto]">
    <!-- Conversation -->
    <section bind:this={elemChat} class="max-h-[500px] p-4 overflow-y-auto hide-scrollbar space-y-4">
        
        {#if messageFeed.length === 0}
            <div class="card p-4 variant-soft">
                <p class="text-center">Welcome to NPCBOT</p>
                <p class="text-center">You can add a bot to converse with by clicking the Add NPC button on the left</p>
                <p class="text-center">Start a conversation by typing in the box below</p>
            </div>
        {/if}
        {#each messageFeed as bubble}
            {#if bubble.host === true}
                <div class="grid grid-cols-[auto_1fr] gap-2">
                    <Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
                    <div class="card p-4 variant-soft rounded-tl-none space-y-2">
                        <header class="flex justify-between items-center">
                            <p class="font-bold">{bubble.name}</p>
                            <small class="opacity-50">{bubble.timestamp}</small>
                        </header>
                        <p>{bubble.message}</p>
                    </div>
                </div>
            {:else}
                <div class="grid grid-cols-[1fr_auto] gap-2">
                    <div class="card p-4 rounded-tr-none space-y-2 {bubble.color}">
                        <header class="flex justify-between items-center">
                            <p class="font-bold">{bubble.name}</p>
                            <small class="opacity-50">{bubble.timestamp}</small>
                        </header>
                        <p>{bubble.message}</p>
                    </div>
                    <Avatar src="https://i.pravatar.cc/?img={bubble.avatar}" width="w-12" />
                </div>
            {/if}
        {/each}
    </section>
    <!-- Prompt -->
    <section class="border-t border-surface-500 p-4">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <button 
                class={isRecording ? 'variant-filled-primary' : 'input-group-shim'} 
                on:click={isRecording ? stopRecording : startRecording}>
                <Mic />
            </button>
            <textarea
                bind:value={currentMessage}
                class="bg-transparent border-0 ring-0 min-h-[100px] resize-none outline-none"
                name="prompt"
                id="prompt"
                rows="1"
                on:keydown={onPromptKeydown}
            />
            <button class={currentMessage ? 'variant-filled-primary' : 'input-group-shim'} on:click={addMessage}>
                <Send />
            </button>
        </div>
    </section>
</div>
