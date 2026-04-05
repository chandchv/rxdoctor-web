import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export interface EmailCaptureFormProps {
  valueProposition?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = 'rxdoctor_captured_emails';

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function storeEmail(email: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const emails: string[] = raw ? JSON.parse(raw) : [];
    emails.push(email);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(emails));
  } catch (err) {
    console.warn('localStorage unavailable:', err);
  }
}

const EmailCaptureForm: React.FC<EmailCaptureFormProps> = ({
  valueProposition = 'Get health tips and doctor recommendations in your inbox',
}) => {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!isValidEmail(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    storeEmail(email);
    setSuccess(true);
    setEmail('');
  };

  return (
    <div data-testid="email-capture-form" className="w-full max-w-xl mx-auto text-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-blue-400" />
        <p className="text-gray-300 text-sm">{valueProposition}</p>
      </div>

      {success ? (
        <p
          data-testid="email-success"
          className="text-green-400 font-semibold text-sm"
        >
          Thanks for subscribing! We'll keep you updated.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-start">
          <div className="flex-1 w-full">
            <input
              data-testid="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {validationError && (
              <p
                data-testid="email-error"
                className="text-red-400 text-xs mt-1 text-left"
              >
                {validationError}
              </p>
            )}
          </div>
          <button
            data-testid="email-submit"
            type="submit"
            className="min-h-[44px] min-w-[44px] px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
};

export default EmailCaptureForm;
