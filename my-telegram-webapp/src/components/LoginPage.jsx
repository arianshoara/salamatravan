import { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useLanguage } from '../i18n/LanguageContext';
import { ui } from '../i18n/ui';

export default function LoginPage() {
  const { language } = useLanguage(); const t = ui[language];
  const [status, setStatus] = useState('');
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const endpoint = import.meta.env.VITE_AUTH_ENDPOINT;
  // A relative same-origin endpoint avoids sending identity tokens to arbitrary hosts.
  let configured = false;
  try { configured = Boolean(clientId && endpoint?.startsWith('/') && new URL(endpoint, window.location.origin).origin === window.location.origin); } catch { /* Invalid configuration keeps sign-in unavailable. */ }
  async function signIn(response) {
    setStatus(t.authLoading);
    try {
      if (!response.credential) throw new Error('Missing credential');
      const result = await fetch(endpoint, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: response.credential }), signal: AbortSignal.timeout(15000) });
      if (!result.ok || !result.headers.get('content-type')?.includes('application/json')) throw new Error('Invalid response');
      await result.json(); setStatus(t.authOk);
    } catch { setStatus(t.authError); }
  }
  return <section className="panel narrow"><h1>{t.login}</h1>{configured ? <GoogleOAuthProvider clientId={clientId}><GoogleLogin onSuccess={signIn} onError={() => setStatus(t.authError)} locale={language} /></GoogleOAuthProvider> : <p>{t.authUnavailable}</p>}<p role="status">{status}</p></section>;
}
