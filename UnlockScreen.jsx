import React, { useState } from 'react';
import { PAYMENT_INFO } from '../config.js';

export default function UnlockScreen({ onUnlock, onBack }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const waMessage = encodeURIComponent(
    `Hi MockLab, I've paid Rs. ${PAYMENT_INFO.price} for a mock test access code. Sharing my payment screenshot now.`
  );
  const waLink = `https://wa.me/${PAYMENT_INFO.whatsappNumber}?text=${waMessage}`;

  function handleSubmit(e) {
    e.preventDefault();
    const ok = onUnlock(code);
    if (!ok) setError('That code doesn\u2019t look right. Double-check it and try again.');
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-16 text-white font-body sm:px-10">
      <div className="mx-auto w-full max-w-xl">
        <button onClick={onBack} className="text-sm text-slate-500 transition hover:text-white">
          &larr; Back
        </button>

        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          Unlock All Tests
        </h1>
        <p className="mt-2 font-display text-xl font-bold text-emerald-400">
          Rs. {PAYMENT_INFO.price}
        </p>

        <div className="mt-8 border-t border-slate-800">
          <Row label="JazzCash" value={PAYMENT_INFO.walletNumber} />
          <Row label="Easypaisa" value={PAYMENT_INFO.walletNumber} />
          <Row label="NayaPay" value={PAYMENT_INFO.walletNumber} />
          <Row label="WhatsApp (send receipt)" value={PAYMENT_INFO.walletNumber} />
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold transition hover:border-emerald-400"
        >
          Open WhatsApp
        </a>

        <form onSubmit={handleSubmit} className="mt-10">
          <label className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Access Code
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              autoFocus
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter code"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className="rounded-lg bg-emerald-500 px-6 py-3 font-display font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Unlock
            </button>
          </div>
          {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
        </form>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-3.5">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="font-display font-bold tabular-nums">{value}</span>
    </div>
  );
}
