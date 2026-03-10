export interface GameState {
  cafeina: number;
  paciencia: number;
  bateria: number;
  promedio: number;
  luz: boolean;
}

export interface GameTurn {
  narrativa: string;
  opciones: string[];
  estadisticas_actualizadas: GameState;
  inventario_actualizado: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  turnData?: GameTurn;
}
