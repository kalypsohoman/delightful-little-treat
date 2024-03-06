import { redirect } from '@sveltejs/kit';
import { canSeeCheckoutConfirmation } from '$lib';

export function load() {

    let attemptRedirect;
    
    // if canSeeCheckoutConfirmation is false, set attemptRedirect to true
    canSeeCheckoutConfirmation.subscribe(val => {
        attemptRedirect = !val;
    });
    
    // if attemptRedirect is false, redirect to the main page
    if(attemptRedirect){
        throw redirect(308, '/');
    }
}