import { NextRequest, NextResponse } from 'next/server';

/**
 * Stub endpoint for newsletter / lead capture.
 *
 * TODO when Klaviyo/Mailchimp account is created:
 *   - Add KLAVIYO_API_KEY to env vars
 *   - Replace the console.log below with a real POST to:
 *     https://a.klaviyo.com/api/v2/list/{LIST_ID}/subscribe
 *
 * For now this just logs to the server console — useful to verify the form
 * works end-to-end without committing to a specific provider yet.
 */
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // ----- Klaviyo integration (uncomment when ready) -----
    // const KLAVIYO_KEY = process.env.KLAVIYO_API_KEY;
    // const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID;
    // if (KLAVIYO_KEY && KLAVIYO_LIST_ID) {
    //   await fetch(`https://a.klaviyo.com/api/v2/list/${KLAVIYO_LIST_ID}/subscribe`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'api-key': KLAVIYO_KEY,
    //     },
    //     body: JSON.stringify({
    //       profiles: [{ email, $source: 'lensmind-site-launch' }],
    //     }),
    //   });
    // }

    console.log('[Lensmind] New subscriber:', email, new Date().toISOString());

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Lensmind] Subscribe error:', err);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
