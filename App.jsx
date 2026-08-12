import React, { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import TestSelector from './components/TestSelector.jsx';
import TestInfoScreen from './components/TestInfoScreen.jsx';
import UnlockScreen from './components/UnlockScreen.jsx';
import TestEngine from './components/TestEngine.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';
import { ACCESS_CODES } from './config.js';
import { QUESTION_POOLS } from './questions.js';

const STORAGE_KEY = 'mocklab_access_granted';

// view: landing | categories | testInfo | unlock | test | results
export default function App() {
  const [view, setView] = useState('landing');
  const [institution, setInstitution] = useState(null);
  const [category, setCategory] = useState(null);
  const [result, setResult] = useState(null);
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  function unlockWithCode(code) {
    const normalized = (code || '').trim().toUpperCase();
    const isValid = ACCESS_CODES.some((c) => c.toUpperCase() === normalized);
    if (isValid) {
      setUnlocked(true);
      try {
        localStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // localStorage unavailable (private browsing etc.) — unlock still
        // works for this session via React state.
      }
      return true;
    }
    return false;
  }

  function selectInstitution(inst) {
    setInstitution(inst);
    setView('categories');
  }

  function selectCategory(cat) {
    setCategory(cat);
    setView('testInfo');
  }

  function startTest() {
    setView('test');
  }

  // Build the resolved test object (sections with actual questions pulled
  // from the pools named in config.js) right before the test engine needs it.
  function buildResolvedTest() {
    return {
      title: `${institution.name} \u2014 ${category.name}`,
      timeLimitMinutes: category.officialMinutes,
      sections: category.sections.map((s) => ({
        key: s.key,
        label: s.label,
        questions: QUESTION_POOLS[s.pool] || [],
      })),
    };
  }

  function handleTestSubmit(testResult) {
    setResult(testResult);
    setView('results');
  }

  return (
    <>
      {view === 'landing' && <LandingPage onSelectInstitution={selectInstitution} />}

      {view === 'categories' && institution && (
        <TestSelector
          institution={institution}
          unlocked={unlocked}
          onSelectCategory={selectCategory}
          onBack={() => setView('landing')}
        />
      )}

      {view === 'testInfo' && institution && category && (
        <TestInfoScreen
          institution={institution}
          category={category}
          unlocked={unlocked}
          onStart={startTest}
          onUnlock={() => setView('unlock')}
          onBack={() => setView('categories')}
        />
      )}

      {view === 'unlock' && (
        <UnlockScreen
          onUnlock={(code) => {
            const ok = unlockWithCode(code);
            if (ok) setView('testInfo');
            return ok;
          }}
          onBack={() => setView('testInfo')}
        />
      )}

      {view === 'test' && institution && category && (
        <TestEngine
          test={buildResolvedTest()}
          onSubmit={handleTestSubmit}
          onExit={() => setView('testInfo')}
        />
      )}

      {view === 'results' && result && (
        <ResultsScreen
          result={result}
          onRetake={() => setView('test')}
          onBackToTests={() => setView('categories')}
          onBackHome={() => setView('landing')}
        />
      )}
    </>
  );
}
