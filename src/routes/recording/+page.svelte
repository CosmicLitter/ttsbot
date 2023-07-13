<script lang="ts">

    let isRecording = false;
    let mediaRecorder: MediaRecorder | undefined;
    let chunks: BlobPart[] = [];
    let transcription: string = '';
    let recording: Blob | undefined;

// Bind hotkey to function that triggers button click event
// document.addEventListener('keydown', function(event) {
//     if (event.ctrlKey && event.altKey && event.key === 'b') {
//         document.getElementById('myButton').click();
//     }
// });




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
        console.log('Hello')
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

        return response
    }
</script>

<button class="btn variant-filled-surface rounded-sm" id="myButton" on:click={isRecording ? stopRecording : startRecording}>
    {isRecording ? 'Stop Recording' : 'Start Recording'}
</button>

<br />
{transcription}