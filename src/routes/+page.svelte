<script lang="ts">
	import { InitialView, views } from '$lib';
    views.push({ id: "InitialView", component: InitialView, props: null })

    // Scrolls to new page whenever they're inserted
    function scrollToNewPage(node: HTMLDivElement, elementId: string) {
        const element = document.getElementById(elementId); 
        element?.scrollIntoView({ behavior: 'smooth' });
        
        return {
			destroy() {
				// the node has been removed from the DOM
			}
        }
    }
</script>

{#each $views as { id, component, props }}
    <div class="page" id={id} use:scrollToNewPage={id}>
        <svelte:component this={component} {...props} />
    </div>
{/each}