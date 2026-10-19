import React, { useState, useEffect } from 'react';
import { StudioTab, HistoryRecord, UserSettings } from './types';
import {
  getHistory,
  addHistoryRecord,
  deleteHistoryRecord,
  clearAllHistory,
  exportHistoryJSON,
  getStoredSettings,
  saveStoredSettings,
} from './services/storageService';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { ToastContainer, ToastMessage } from './components/Toast';
import { Dashboard } from './components/Dashboard';
import { CartoonStudio } from './components/CartoonStudio';
import { VideoStudio } from './components/VideoStudio';
import { ComedyStudio } from './components/ComedyStudio';
import { VoiceStudio } from './components/VoiceStudio';
import { ContentStudio } from './components/ContentStudio';
import { ViralStudio } from './components/ViralStudio';
import { HistoryView } from './components/HistoryView';
import { PricingView } from './components/PricingView';
import { SettingsView } from './components/SettingsView';
import { Sparkles, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<StudioTab>('dashboard');
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [settings, setSettings] = useState<UserSettings>(getStoredSettings());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCopyText = async (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      addToast(`Copied ${label} to clipboard!`, 'success');
    } catch {
      addToast(`Failed to copy ${label}`, 'error');
    }
  };

  const handleSaveToHistory = (
    tool: HistoryRecord['tool'],
    title: string,
    previewSnippet: string,
    fullData: any,
    inputSummary: string
  ) => {
    const newRecord = addHistoryRecord({
      tool,
      title,
      previewSnippet,
      inputSummary,
      fullData,
    });
    setHistory(getHistory());
    addToast(`Saved "${title.slice(0, 24)}..." to History!`, 'info');
  };

  const handleDeleteRecord = (id: string) => {
    const updated = deleteHistoryRecord(id);
    setHistory(updated);
    addToast('Item removed from history.', 'info');
  };

  const handleClearAllHistory = () => {
    clearAllHistory();
    setHistory([]);
    addToast('All history cleared.', 'info');
  };

  const handleExportJSON = () => {
    const jsonStr = exportHistoryJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `twintoon_creations_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('Exported history as JSON file.', 'success');
  };

  const handleSaveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  const handleSelectTab = (tab: StudioTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        historyCount={history.length}
      />

      {/* Main View Area */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            onSelectTab={handleSelectTab}
            recentHistory={history}
            onOpenHistoryItem={(item) => {
              setActiveTab(item.tool as StudioTab);
            }}
          />
        )}

        {activeTab === 'cartoon' && (
          <CartoonStudio
            onCopyText={handleCopyText}
            onSaveToHistory={(output, inputSummary) =>
              handleSaveToHistory(
                'cartoon',
                output.title,
                output.artStyleSummary,
                output,
                inputSummary
              )
            }
          />
        )}

        {activeTab === 'video' && (
          <VideoStudio
            onCopyText={handleCopyText}
            onSaveToHistory={(output, inputSummary) =>
              handleSaveToHistory(
                'video',
                output.title,
                output.logline,
                output,
                inputSummary
              )
            }
          />
        )}

        {activeTab === 'comedy' && (
          <ComedyStudio
            onCopyText={handleCopyText}
            onSaveToHistory={(output, inputSummary) =>
              handleSaveToHistory(
                'comedy',
                output.title,
                output.settingDescription,
                output,
                inputSummary
              )
            }
          />
        )}
        activeTab === 'voice' && (
          <VoiceStudio
            onCopyText={handleCopyText}
            onSaveToHistory={(output, inputSummary) =>
              handleSaveToHistory(
                'voice',
                output.title,
                output.deliveryNotes,
                output,
                inputSummary
              )
            }
          />
        )}

        {activeTab === 'content' && (
          <ContentStudio
            onCopyText={handleCopyText}
            onSaveToHistory={(output, inputSummary) =>
              handleSaveToHistory(
                'content',
                `Content Package (${output.hooks.length} Hooks)`,
                output.hooks[0]?.hook || 'Viral Content Kit',
                output,
                inputSummary
              )
            }
          />
        )}

        {activeTab === 'viral' && (
          <ViralStudio
            onCopyText={handleCopyText}
            onSaveToHistory={(output, inputSummary) =>
              handleSaveToHistory(
                'viral',
                `Viral Deck (${output.concepts.length} Concepts)`,
                output.concepts[0]?.title || 'Viral Concept Deck',
                output,
                inputSummary
              )
            }
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onDeleteRecord={handleDeleteRecord}
            onClearAll={handleClearAllHistory}
            onExportJSON={handleExportJSON}
            onCopyText={handleCopyText}
          />
        )}

        {activeTab === 'pricing' && <PricingView />}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            onSaveSettings={handleSaveSettings}
            historyCount={history.length}
            onClearHistory={handleClearAllHistory}
            onExportHistory={handleExportJSON}
            onShowToast={addToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-purple-500/10 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-500 mt-auto pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-300">TwinToon AI</span>
            <span className="text-slate-600">·</span>
            <span>Imagine It. Create It. Make It Go Viral.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => handleSelectTab('dashboard')} className="hover:text-purple-300">
              Studios
            </button>
            <button onClick={() => handleSelectTab('pricing')} className="hover:text-purple-300">
              Pricing Plans
            </button>
            <button onClick={() => handleSelectTab('history')} className="hover:text-purple-300">
              Local History
            </button>
            <button onClick={() => handleSelectTab('settings')} className="hover:text-purple-300">
              Settings
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Crafted for African & Global Animators</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline mx-0.5" />
          </div>
        </div>
      </footer>
      * Mobile Bottom Navigation Bar */}
      <MobileNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        historyCount={history.length}
      />
    </div>
  );
}
