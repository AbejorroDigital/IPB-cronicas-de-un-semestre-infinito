import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StatsPanel } from './StatsPanel';
import { startNewGame, sendPlayerChoice } from '../services/geminiService';
import { GameTurn, ChatMessage } from '../types';
import { Loader2, Send } from 'lucide-react';

export function GameUI() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [currentTurn, setCurrentTurn] = useState<GameTurn | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initGame();
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, currentTurn, isLoading]);

  const initGame = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const turn = await startNewGame();
      setCurrentTurn(turn);
      setHistory([{ role: 'model', content: turn.narrativa, turnData: turn }]);
    } catch (err: any) {
      setError(err.message || 'Error al iniciar el juego. Revisa tu conexión y API Key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChoice = async (choice: string) => {
    if (!currentTurn || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: choice };
    setHistory(prev => [...prev, userMessage]);
    setCurrentTurn(null);
    setIsLoading(true);
    setError(null);

    try {
      const nextTurn = await sendPlayerChoice(choice, currentTurn.estadisticas_actualizadas);
      setHistory(prev => [...prev, { role: 'model', content: nextTurn.narrativa, turnData: nextTurn }]);
      setCurrentTurn(nextTurn);
    } catch (err: any) {
      setError(err.message || 'Error al procesar tu elección.');
      // Revert state if possible or show error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar Stats */}
      {currentTurn && (
        <StatsPanel 
          stats={currentTurn.estadisticas_actualizadas} 
          inventory={currentTurn.inventario_actualizado} 
        />
      )}

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col relative h-full">
        {/* Header */}
        <header className="bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-emerald-400 font-mono tracking-tighter">
            IPB: Crónicas del Semestre Infinito
          </h1>
          <p className="text-zinc-400 text-sm">Misión: Survival Pedagógico</p>
        </header>

        {/* Narrative History */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
          {history.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl rounded-2xl p-5 ${
                msg.role === 'user' 
                  ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-100' 
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-300 leading-relaxed'
              }`}>
                {msg.role === 'user' && <div className="text-xs text-emerald-400 mb-1 font-mono uppercase tracking-wider">Tu Elección</div>}
                {msg.role === 'model' && <div className="text-xs text-indigo-400 mb-2 font-mono uppercase tracking-wider">Narrador</div>}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center gap-3 text-zinc-400">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                <span className="font-mono text-sm animate-pulse">El destino decide...</span>
              </div>
            </motion.div>
          )}

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm">
              <p className="font-bold mb-1">Error Crítico:</p>
              <p>{error}</p>
              <button 
                onClick={initGame}
                className="mt-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded text-red-300 transition-colors"
              >
                Reiniciar Partida
              </button>
            </div>
          )}
        </div>

        {/* Choices Area */}
        <AnimatePresence>
          {currentTurn && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="bg-zinc-900 border-t border-zinc-800 p-4 md:p-6"
            >
              <h3 className="text-sm font-mono text-zinc-400 mb-4 uppercase tracking-wider">¿Qué vas a hacer?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentTurn.opciones.map((opcion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChoice(opcion)}
                    className="group relative text-left p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-emerald-900/30 hover:border-emerald-500/50 transition-all duration-200 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start gap-3 relative z-10">
                      <span className="font-mono text-emerald-500 font-bold mt-0.5">{idx + 1}.</span>
                      <span className="text-zinc-200 group-hover:text-emerald-100 transition-colors">{opcion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
