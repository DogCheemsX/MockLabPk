import React from 'react';
import Chevron from './Chevron.jsx';

// Step 2: shows the streams/categories for whichever institution was picked
// on the landing screen (e.g. NTS NAT -> Pre-Engineering, Pre-Medical, ...).
export default function TestSelector({ institution, unlocked, onSelectCategory, onBack }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 px-6 py-16 text-white font-body sm:px-10">
      <div className="mx-auto w-full max-w-xl">
        <button onClick={onBack} className="text-sm text-slate-500 transition hover:text-white">
          &larr; Back
        </button>

        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {institution.name}
        </h1>

        <div className="mt-10 border-t border-slate-800">
          {institution.categories.map((cat) => {
            const isLocked = !cat.free && !unlocked;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className="flex w-full items-center justify-between gap-4 border-b border-slate-800 py-5 text-left transition hover:bg-slate-900 hover:px-2"
              >
                <span className="text-lg font-medium">{cat.name}</span>
                <span className="flex shrink-0 items-center gap-2">
                  {isLocked && (
                    <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-300">
                      Locked
                    </span>
                  )}
                  <Chevron />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
