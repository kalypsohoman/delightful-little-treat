
<script lang=ts>
    import {views, currentViewIndex} from '$lib';

</script>

{ #if $currentViewIndex === (views.length - 1) }
    <button class="back-button" on:click={currentViewIndex.reset}>⌂</button>
{ :else if $currentViewIndex !== 0}
    <button class="back-button" on:click={currentViewIndex.decrement}>←</button>
{ /if }

<slot />