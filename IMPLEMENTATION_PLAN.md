# Real-Time TIN Matching Service - Implementation Plan

## Step-by-Step Development Plan

### Phase 1: Core Foundation (Test Each Step)
1. **Basic Phaser Setup**
   - Simple HTML page with Phaser
   - Empty game scene that loads
   - Basic background and UI
   - **Test**: Game loads without errors

2. **Player Movement**
   - Green rectangle as player
   - WASD movement
   - Basic collision boundaries
   - **Test**: Player moves around smoothly

3. **Simple Box Spawning**
   - Brown rectangles as boxes
   - Spawn one box every 5 seconds on left side
   - Static boxes (no movement yet)
   - **Test**: Boxes appear regularly

4. **Basic Interaction**
   - Player can pick up boxes (E key)
   - Boxes follow player when carried
   - Player can drop boxes (Q key)
   - **Test**: Pick up and drop mechanics work

### Phase 2: Core Gameplay Loop
5. **IRS Machine**
   - Gray rectangle as machine
   - Player can deposit boxes
   - Machine processes for 3 seconds
   - Outputs simple result (1 or 0)
   - **Test**: Complete processing cycle works

6. **Money System**
   - Simple payment for correct results
   - Basic UI showing money
   - **Test**: Money increases when returning results

7. **Basic TIN Generation**
   - Simple random 9-digit numbers
   - 50% valid, 50% invalid (hardcoded rules)
   - **Test**: Results are consistent and make sense

### Phase 3: Game Progression
8. **Timer and Difficulty**
   - 30-minute game timer
   - Boxes spawn faster over time
   - **Test**: Game gets progressively harder

9. **Level System**
   - Simple level progression (Intern → Junior → Mid)
   - Basic buffs (speed, carry capacity)
   - **Test**: Promotions work correctly

10. **Happiness System**
    - Basic happiness meter
    - Penalties for mistakes/delays
    - **Test**: Happiness affects gameplay

### Phase 4: Advanced Features
11. **Election System (Simplified)**
    - 3 simple candidates
    - Basic voting every 5 minutes
    - Simple effects (speed up/down)
    - **Test**: Elections change gameplay

12. **Tesla System (Basic)**
    - Just one Tesla type
    - Simple influence boost
    - **Test**: Tesla purchases affect elections

### Phase 5: Polish & Balance
13. **Better Graphics**
    - Replace rectangles with simple sprites
    - Better UI design
    - **Test**: Game looks presentable

14. **Audio Integration**
    - Basic sound effects
    - Background music support
    - **Test**: Audio enhances experience

15. **Final Balancing**
    - Adjust timings, costs, difficulty
    - Bug fixes
    - **Test**: Game is fun and challenging

## Development Principles

### For Each Phase:
1. **Write minimal code** - Only what's needed for current feature
2. **Test immediately** - Make sure it works before moving on
3. **Debug thoroughly** - Fix issues before adding complexity
4. **Keep it simple** - Avoid over-engineering early features

### File Structure (Simplified):
```
├── index.html          # Single HTML file
├── src/
│   ├── game.js         # Main game logic (single file initially)
│   └── constants.js    # Game constants
└── README.md
```

### Starting Implementation:
- **One JavaScript file** for all game logic initially
- **Embedded data** (no external JSON files)
- **Colored rectangles** for all graphics
- **Console logs** for debugging
- **Minimal UI** (just text displays)

## Phase 1 Implementation Details

### Step 1: Basic Phaser Setup
```javascript
// Minimal Phaser config
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: { preload, create, update }
};

function preload() { /* Empty */ }
function create() { /* Basic background */ }
function update() { /* Empty game loop */ }
```

### Step 2: Player Movement
```javascript
// Simple player object
player = this.add.rectangle(400, 300, 32, 32, 0x00ff00);
// WASD input handling
// Basic movement without physics
```

### Step 3: Box Spawning
```javascript
// Array to store boxes
boxes = [];
// Timer to spawn boxes every 5 seconds
// Simple box creation function
```

This approach ensures we build a working game incrementally, testing each feature before adding complexity.