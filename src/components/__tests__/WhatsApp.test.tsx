import React from 'react';
import { render, screen } from '@testing-library/react';
import * as fc from 'fast-check';
import WhatsAppFloatingButton from '../WhatsAppFloatingButton';
import WhatsAppCTA from '../WhatsAppCTA';

/**
 * Property 10: WhatsApp links have security attributes
 *
 * For any rendered WhatsApp link element (WhatsAppFloatingButton or WhatsAppCTA),
 * the element SHALL have `target="_blank"` and `rel="noopener noreferrer"` attributes.
 *
 * **Validates: Requirements 9.7**
 */

/** Arbitrary for phone numbers: digits only, 10-15 chars */
const phoneArb = fc.stringOf(fc.constantFrom('0', '1', '2', '3', '4', '5', '6', '7', '8', '9'), {
  minLength: 10,
  maxLength: 15,
});

/** Arbitrary for non-empty printable messages */
const messageArb = fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0);

describe('Feature: doctor-search-symptoms, Property 10: WhatsApp links have security attributes', () => {
  afterEach(() => {
    // Clean up rendered DOM between iterations
  });

  it('WhatsAppFloatingButton always has target="_blank" and rel="noopener noreferrer"', () => {
    fc.assert(
      fc.property(phoneArb, fc.option(messageArb, { nil: undefined }), (phone, msg) => {
        const { unmount } = render(
          <WhatsAppFloatingButton phoneNumber={phone} defaultMessage={msg} />,
        );

        const el = screen.getByTestId('whatsapp-floating-button');
        expect(el).toHaveAttribute('target', '_blank');
        expect(el).toHaveAttribute('rel', 'noopener noreferrer');

        unmount();
      }),
      { numRuns: 100 },
    );
  });

  it('WhatsAppCTA always has target="_blank" and rel="noopener noreferrer"', () => {
    fc.assert(
      fc.property(phoneArb, messageArb, fc.option(messageArb, { nil: undefined }), (phone, msg, label) => {
        const { unmount } = render(
          <WhatsAppCTA phoneNumber={phone} message={msg} label={label} />,
        );

        const el = screen.getByTestId('whatsapp-cta');
        expect(el).toHaveAttribute('target', '_blank');
        expect(el).toHaveAttribute('rel', 'noopener noreferrer');

        unmount();
      }),
      { numRuns: 100 },
    );
  });

  it('WhatsAppFloatingButton href starts with https://wa.me/', () => {
    fc.assert(
      fc.property(phoneArb, fc.option(messageArb, { nil: undefined }), (phone, msg) => {
        const { unmount } = render(
          <WhatsAppFloatingButton phoneNumber={phone} defaultMessage={msg} />,
        );

        const el = screen.getByTestId('whatsapp-floating-button') as HTMLAnchorElement;
        expect(el.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//);

        unmount();
      }),
      { numRuns: 100 },
    );
  });

  it('WhatsAppCTA href starts with https://wa.me/', () => {
    fc.assert(
      fc.property(phoneArb, messageArb, (phone, msg) => {
        const { unmount } = render(
          <WhatsAppCTA phoneNumber={phone} message={msg} />,
        );

        const el = screen.getByTestId('whatsapp-cta') as HTMLAnchorElement;
        expect(el.getAttribute('href')).toMatch(/^https:\/\/wa\.me\//);

        unmount();
      }),
      { numRuns: 100 },
    );
  });
});
