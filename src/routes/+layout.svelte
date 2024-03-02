<script lang=ts>
    import { fly } from 'svelte/transition';
</script>

<div 
  class="page"
  in:fly={{ y: 200, duration: 500 }}
  out:fly={{ y: -200, duration: 500 }}
    >
  <slot />
</div>
