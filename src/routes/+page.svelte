<script>
    import { TREATS_AVAILABLE , ZIP_CODES } from '$lib/config.js';


    const messages = [
        "I would like a tasty treat",
        "If you're close we can bring you one.",
        "What's your zip?",
        "Hooray! Tell us where to bring your delightful little treat!",
        "Your treat should be there in about an hour! Yay!"
    ]
    let currentMessageIndex = 0;
    let currentMessage = messages[currentMessageIndex];
    let selectedZipCode = '';
    function showNextMessage(){
        // If the treats are not currently available.
        if (!TREATS_AVAILABLE) {
            currentMessage = "Sorry but we can't bring you a treat right now.";
        // If we cannot deliver to the zip code.
        } else if (selectedZipCode === 'I dont see my zip') {
            currentMessage = "Oh no! We can't deliver to your area :c";
        }
        // If the treats are available, proceed through the messages
        currentMessageIndex += 1;
        currentMessage = messages[currentMessageIndex];
    }
</script>

<button on:click={showNextMessage}>{currentMessage}</button>
<p>TREATS_AVAILABLE: {TREATS_AVAILABLE}</p>
<p>currentMessage: {currentMessage}</p>
<p>currentMessageIndex: {currentMessageIndex}</p>