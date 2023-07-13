<!-- <script lang="ts">
	import type { ChatCompletionRequestMessage } from "openai";
    import * as tmi from 'tmi.js'

    // Define configuration options
    const opts = {
    identity: {
        username: 'starfieldfacts',
        password: 'oauth:kek73ch0shbf0uwy3qn3wlhaio7ji3'
    },
    channels: [
        'starfieldfacts',
        'out_of_mana',
        'basghettii'
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
    //@ts-ignore
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
    // function rollDice () {
    //     const sides = 6;
    //     return Math.floor(Math.random() * sides) + 1;
    // }

    // Called every time the bot connects to Twitch chat
    //@ts-ignore
    function onConnectedHandler (addr, port) {
        console.log(`* Connected to ${addr}:${port}`);
    }

    let starfield: string

    let prompt: ChatCompletionRequestMessage[] = [
        {
            role: 'system',
            content: `Introducing Todd "The Mastermind" Howard! Known as the King of Video Game Teasers, Todd exudes an unparalleled level of enthusiasm for his craft that can only be described as radioactive. With an infectious smile, he sprinkles his conversations with a touch of mischief as he showcases his magnificent gaming creations to the world. Picture a mad scientist crossed with a rambunctious game wizard, constantly in pursuit of perfection and ready to surprise you at every turn. Whether he's promising innovation beyond belief or revealing jaw-dropping features, Todd's charisma radiates brighter than a nuclear explosion. Hold onto your Pip-Boys, ladies and gentlemen, because when Todd Howard is in the room, buckle up for an electrifying journey through the world of gaming!

Give tweets from Todd Howard and provide facts for his next creation, but they aren't facts and seriously inaccurate, Starfield. Start each response with "Fact:" Keep each response to two or three short sentences. Select from the following list of phrases but use your own discretion when to use them. give it about a 30% chance to use ONE of them:
It just works
I promise, its not fallout 76!
We're not talking about it at this time
A next-gen experience
truly unique and special
Bethesda game, you decide
Millions of players
You can play it however you want
It's all about the player's freedom
We're excited to share more details soon
Emergent gameplay
Be who you want to be
Our biggest, most ambitious project yet
I hope you all love it when you play it
See that planet? You can go to it
Fuck yea!
Todd Howard OUT!
`,
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