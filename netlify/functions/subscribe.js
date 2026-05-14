// Netlify serverless function: handle newsletter subscriptions
// Receives an email from the site, posts it to Buttondown's API,
// returns a success/error response. The API key is server-side only.

export default async (request, context) => {
  // Only accept POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Parse the body
  let email;
  try {
    const body = await request.json();
    email = body.email;
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Basic email validation
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Please enter a valid email address.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Get the API key from environment
  const apiKey = Netlify.env.get('BUTTONDOWN_API_KEY');
  if (!apiKey) {
    console.error('BUTTONDOWN_API_KEY is not set');
    return new Response(
      JSON.stringify({ error: 'Newsletter is temporarily unavailable.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Call Buttondown's API
  try {
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        type: 'unactivated',
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return new Response(
        JSON.stringify({ success: true, message: 'Check your inbox to confirm' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buttondown returned an error
    // Common case: already subscribed
    const errorMessage = data?.detail || data?.email_address?.[0] || 'Something went wrong. Please try again.';

    // Treat "already subscribed" as success-ish
    if (errorMessage.toLowerCase().includes('already')) {
      return new Response(
        JSON.stringify({ success: true, message: "You're already subscribed. Thanks." }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: response.status, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Buttondown API error:', err);
    return new Response(
      JSON.stringify({ error: 'Could not reach the newsletter service. Try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const config = {
  path: '/api/subscribe',
};
