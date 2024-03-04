<script lang="ts">
	import { InitialView, views, noTreatClicked, StripeCheckout } from '$lib';
	import DontWantATreat from '$lib/views/DontWantATreat.svelte';
    
    // Initialize the InitialView by adding it to the views array
    views.push({ id: "InitialView", component: InitialView, props: null })


    // Scrolls to new page whenever they're inserted
    function scrollToNewPage(node: HTMLDivElement, elementId: string) {
        const element = document.getElementById(elementId); 
        element?.scrollIntoView({ behavior: 'smooth' });
        
        return {
			destroy(){} // the node has been removed from the DOM}
        }
    }
</script>

<div class="main">
    {#if $noTreatClicked}
        <div class="page" id={"InitialView"}>
            <InitialView />
        </div>
        <div class="page" id={"DontWantATreat"} use:scrollToNewPage={"DontWantATreat"}>
            <DontWantATreat/>
        </div>
    {:else}
        {#each $views as { id, component, props }}
            <div class="page" id={id} use:scrollToNewPage={id}>
                <svelte:component this={component} {...props} />
            </div>
        {/each}
    {/if}
</div>