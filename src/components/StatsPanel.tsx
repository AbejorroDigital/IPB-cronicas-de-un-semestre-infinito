import React from 'react';
import { Coffee, Battery, Brain, GraduationCap, Lightbulb, LightbulbOff, Backpack } from 'lucide-react';
import { GameState } from '../types';

interface StatsPanelProps {
  stats: GameState;
  inventory: string[];
}

export function StatsPanel({ stats, inventory }: StatsPanelProps) {
  return (
    <div className="w-full md:w-80 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col gap-8 text-zinc-100 h-full overflow-y-auto">
      <div>
        <h2 className="text-xl font-bold mb-6 font-mono tracking-tight text-emerald-400">
          ESTADO VITAL
        </h2>
        <div className="space-y-4">
          <StatBar icon={<Coffee className="w-5 h-5 text-amber-600" />} label="Cafeína/Chimó" value={stats.cafeina} max={100} color="bg-amber-600" />
          <StatBar icon={<Brain className="w-5 h-5 text-pink-500" />} label="Paciencia Pedagógica" value={stats.paciencia} max={100} color="bg-pink-500" />
          <StatBar icon={<Battery className="w-5 h-5 text-emerald-500" />} label="Batería Celular" value={stats.bateria} max={100} color="bg-emerald-500" />
          
          <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-sm">Promedio</span>
            </div>
            <span className="font-mono font-bold text-blue-400">{stats.promedio}/20</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
            <div className="flex items-center gap-3">
              {stats.luz ? (
                <Lightbulb className="w-5 h-5 text-yellow-400" />
              ) : (
                <LightbulbOff className="w-5 h-5 text-zinc-500" />
              )}
              <span className="font-medium text-sm">Estado de Luz</span>
            </div>
            <span className={`font-mono font-bold ${stats.luz ? 'text-yellow-400' : 'text-zinc-500'}`}>
              {stats.luz ? 'HAY LUZ' : 'SIN LUZ'}
            </span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 font-mono tracking-tight flex items-center gap-2 text-indigo-400">
          <Backpack className="w-5 h-5" />
          INVENTARIO
        </h2>
        <ul className="space-y-2">
          {inventory.length === 0 ? (
            <li className="text-zinc-500 text-sm italic">Mochila vacía...</li>
          ) : (
            inventory.map((item, i) => (
              <li key={i} className="text-sm bg-zinc-800/50 p-2 rounded border border-zinc-700/50 flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span className="leading-tight">{item}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function StatBar({ icon, label, value, max, color }: { icon: React.ReactNode, label: string, value: number, max: number, color: string }) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100));
  
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <span className="font-mono text-xs text-zinc-400">{value}/{max}</span>
      </div>
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
