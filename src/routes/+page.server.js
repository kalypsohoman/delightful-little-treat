import Stripe from 'stripe'
import { SECRET_STRIPE_KEY, DOMAIN } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function load() {
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    line_items: [
      {
        price: 'price_1OmgQmISUcKUfTQYDmpv1BIt',
        quantity: 1,
      },
    ],
    mode: 'payment'
  })

  return {
    clientSecret: session.client_secret
  }
}