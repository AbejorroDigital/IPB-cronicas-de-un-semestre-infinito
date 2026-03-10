# IPB: Crónicas de un Semestre Infinito

> Juego de rol del IPB lengua y literatura

## Descripción

**IPB: Crónicas de un Semestre Infinito** es un juego de rol (RPG) narrativo ambientado en el Instituto Pedagógico de Barquisimeto, Venezuela. El objetivo es sobrevivir académicamente y mentalmente hasta el fin del semestre dentro del departamento de Lengua y Literatura, enfrentando obstáculos inspirados en la vida universitaria local, con un fuerte enfoque de humor negro y jerga barquisimetana.

El juego simula eventos y situaciones tragicómicas del entorno académico: apagones, burocracia, tareas titánicas, personajes emblemáticos (profesores, estudiantes, empleados), y mecánicas de supervivencia urbana. Las estadísticas del jugador incluyen niveles de cafeína, paciencia, batería, promedio, y el siempre presente factor “luz”.

## Características

- **Narrativa dinámica** basada en contexto y personajes con rasgos profundos.
- **Opciones de acción:** Tres a cuatro caminos posibles por turno.
- **Eventos aleatorios:** Desde cortes de luz hasta requisitos burocráticos y situaciones absurdas.
- **Inventario de supervivencia:** Objetos clave como pendrives infectados, carnet vencido, tostón de Salserín y más.
- **Humor negro y local:** El tono es constante, reflejando la jerga, el clima, y la cultura estudiantil barquisimetana.
- **Integración con Gemini AI:** Utiliza Google GenAI para generar la narrativa, respuestas y evolución del juego.

## Instalación

1. Clonar este repositorio:
```bash
git clone https://github.com/AbejorroDigital/IPB-cronicas-de-un-semestre-infinito.git
```
2. Instalar dependencias:
```bash
npm install
```
3. Configurar tu clave API de Gemini:
```env
GEMINI_API_KEY=TU_CLAVE_AQUI
```

## Uso

El juego puede iniciarse con la función `startNewGame` y avanzar mediante `sendPlayerChoice` desde el código principal en TypeScript. Cada turno genera una narrativa, muestra tus estadísticas actualizadas y ofrece opciones de decisión.  

Ejemplo de integración:
```typescript
import { startNewGame, sendPlayerChoice } from './src/path/to/game';

const firstTurn = await startNewGame();
// Mostrar narrativa y opciones
const nextTurn = await sendPlayerChoice('Opción elegida', firstTurn.estadisticas_actualizadas);
```

## Personajes principales (NPCs)

- Profa. Togliatti: La Guerrillera del Aula
- Profa. Zulena: La Esteta de la Palabra
- Profa. Mariela Pérez: La Guardiana de la Excelencia
- Prof. Eliomar: El Arquitecto Digital
- Adolfo y Miguel: Gestores de Fotocopias
- Salserín: Vendedor de chucherías

## Mecánicas

- Estadísticas: Cafeína, paciencia, batería, promedio, luz.
- Inventario: Objetos de supervivencia.
- Eventos aleatorios y contexto narrativo.

## Contribución

- Pull Requests y sugerencias bienvenidas.
- Reporta problemas en la sección de Issues.

## Licencia

Pendiente de definir (por favor añadir si aplica).

## Autor

GitHub: [AbejorroDigital](https://github.com/AbejorroDigital)
