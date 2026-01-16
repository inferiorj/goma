import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
];

export default function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    try {
      // MyMemory is a free API that doesn't require a key for basic usage
      const res = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=${sourceLang}|${targetLang}`
      );
      const data = await res.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      setTranslatedText('Error: Failed to fetch translation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col items-center p-6 sm:p-12 font-sans text-zinc-900">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-zinc-200">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Quick Translate
        </h1>

        <div className="space-y-6">
          {/* Language Selectors */}
          <div className="flex items-center gap-4">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="flex-1 p-2 bg-zinc-100 rounded-lg border border-zinc-300 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
            <span className="text-zinc-400">→</span>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="flex-1 p-2 bg-zinc-100 rounded-lg border border-zinc-300 outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input Area */}
          <textarea
            className="w-full h-40 p-4 rounded-xl border border-zinc-200 bg-zinc-50 resize-none focus:outline-hidden focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-zinc-400"
            placeholder="Enter text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          {/* Action Button */}
          <button
            onClick={handleTranslate}
            disabled={loading || !inputText}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-98 disabled:opacity-50 disabled:active:scale-100 transition-all cursor-pointer"
          >
            {loading ? 'Translating...' : 'Translate Text'}
          </button>

          {/* Result Display */}
          {translatedText && (
            <div className="mt-8 animate-in fade-in slide-in-from-top-2">
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                Translation:
              </h2>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 min-h-[100px]">
                {translatedText}
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="mt-6 text-zinc-400 text-sm italic">
        Powered by MyMemory API
      </p>
    </main>
  );
}
