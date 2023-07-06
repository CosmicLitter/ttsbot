<!-- <script lang="ts">
	import type { ChatCompletionRequestMessage } from "openai";
    import tmi from 'tmi.js'
    // const tmi = require('tmi.js');

    // Define configuration options
    const opts = {
    identity: {
        username: 'starfieldfacts',
        password: 'oauth:m5adngw3ca4dpmm76b29in0mpnax39'
    },
    channels: [
        'starfieldfacts'
    ]
    };

    // Create a client with our options
    const client = new tmi.client(opts);

    // Register our event handlers (defined below)
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);

    // Connect to Twitch:
    client.connect();

    // Called every time a message comes in
    async function onMessageHandler (target, context, msg, self) {
        if (self) { return; } // Ignore messages from the bot

        // Remove whitespace from chat message
        const commandName = msg.trim();

        // If the command is known, let's execute it
        if (commandName === '!starfieldfact') {
            console.log( "!starfieldfact was typed in chat" );
            starfield = await handleStarfieldFact();
            client.say(target, starfield);
           
        } else {
            console.log(`* Unknown command ${commandName}`);
        }
    }

    // Function called when the "dice" command is issued
    function rollDice () {
        const sides = 6;
        return Math.floor(Math.random() * sides) + 1;
    }

    // Called every time the bot connects to Twitch chat
    function onConnectedHandler (addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }

    let starfield: string

    let prompt: ChatCompletionRequestMessage[] = [
        {
            role: 'system',
            content: `Say random facts acting like Todd Howard keeping it to a short sentence or two. Todd Howard sometimes uses the phrases: "it just works", "I promise it's not fallout 76!", "we're not talking about it at this time", "a next-gen experience", "truly unique and special", "Bethesda game, you decide", "millions of players, but each having a unique experience", "you can play it however you want", "it's all about the player's freedom", "we're excited to share more details soon", "emergent gameplay", "be who you want to be", "our biggest, most ambitious project yet", and "I hope you all love it when you play it" during speech. Todd on infrequently ends his sentences with either ", fuck yea!", "Todd Howard OUT!" or nothing at all.`,
        },
    ]

    async function getStarfieldFact(prompt: ChatCompletionRequestMessage[]): Promise<string> {
        const response = await fetch('/api/starfieldfacts', {
            method: 'POST',
            body: JSON.stringify({
                messages: prompt
            })
        });
	const { fact }: { fact: string } = await response.json();

	return Promise.resolve(fact);
    }

    async function handleStarfieldFact() {
        const fact = await getStarfieldFact(prompt);
        console.log(fact);
        return fact
    }

    // ComfyJS.onCommand = async ( user, command, message, flags, extra ) => {
    //     if( command === "starfieldfact" ) {
    //         console.log( "!starfieldfact was typed in chat" );
    //         // starfield = await handleStarfieldFact();
    //         ComfyJS.Say( "starfieldfacts", "test response");
    //     }
    // }




</script>

<button class="btn variant-outline-primary" on:click={handleStarfieldFact}>Starfield Fact</button> -->