# TIN Matching Service - Development TODO

## Phase 1: Foundation (Test Each Step)

### ✅ COMPLETED

**Step 1.1: Basic HTML + Phaser Setup**

- [x] Create index.html with Phaser CDN
- [x] Create minimal game.js with empty Phaser config
- [x] Test: Game loads without errors, shows empty canvas

**Step 1.2: Add Player**

- [x] Add green 32x32 rectangle as player at center (400, 300)
- [x] Test: Green square appears in center

**Step 1.3: Player Movement**

- [x] Add WASD key handlers in create()
- [x] Implement movement in update() (200px/second speed)
- [x] Add world boundaries (stay within 800x600)
- [x] Test: Player moves smoothly with WASD, can't leave screen

**Step 1.4: Basic Box Spawning**

- [x] Create boxes array
- [x] Add spawnBox() function (brown 32x32 rectangle)
- [x] Set timer to spawn box every 5 seconds at (50, 300)
- [x] Add simple ID labels to boxes
- [x] Add box limit: maximum 100 boxes on screen (stop spawning when limit reached)
- [x] Test: Boxes appear every 5 seconds on left side, stops at 100 boxes

**Step 1.5: Pick Up/Drop Mechanics**

- [x] Add E key handler for interaction
- [x] Implement distance-based collision detection (< 50px)
- [x] Create pickupBox() function (remove from world, store in inventory)
- [x] Show carried box as small rectangle following player
- [x] Add Q key handler for dropBox()
- [x] Test: Can pick up boxes with E, drop with Q

## Phase 2: Core Game Loop

**Step 2.1: IRS Machine**

- [x] Add gray 64x48 rectangle at (650, 300) with "IRS MACHINE" label
- [x] Add interaction when player with box approaches machine
- [x] Create processBox() function with 3-second timer
- [x] Show "PROCESSING..." status during timer
- [x] Generate random result (0 or 1) after 3 seconds
- [x] Change box color (green=1, red=0) and show result number
- [x] Test: Player can submit boxes, see processing, get results

**Step 2.2: TIN Data Generation**

- [x] Add tin property to each box (9-digit string)
- [x] Generate random TINs for each box
- [x] Create list of obviously bad TINs: 000000000, 111111111, 999999999, 123456789
- [x] Create simple TIN validation logic:
  - Obviously bad TINs → always return 0 (invalid)
  - Other TINs → 50% chance of being valid (random)
- [x] Test: Obviously bad TINs always fail, others are random 50/50

**Step 2.3: Result Return Station**

- [x] Add blue 64x48 rectangle at (650, 450) with "RETURN RESULTS" label
- [x] Allow player to submit processed boxes (with 0 or 1 results)
- [x] Check if player's result matches actual TIN validity
- [x] Test: Player can return processed boxes to get payment

**Step 2.4: 0-Card Shortcut System**

- [x] Add SPACE key handler for "Use 0-card"
- [x] When player presses SPACE while carrying box, automatically assign result=0
- [x] Mark box as "assigned via SPACE" (track how result was assigned)
- [x] Change box color to red and show "0" label (bypassing IRS machine)
- [x] Add SPACE toggle: if box already has 0-result from SPACE, pressing SPACE again resets to no result
- [x] Reset functionality ONLY works for SPACE-assigned results (not IRS machine results)
- [x] Player can then submit processed box directly to Return Station
- [x] Test: Player can assign 0-card with SPACE, toggle it off with SPACE again, but cannot reset IRS results

**Step 3.1: Timer and Difficulty**

- [x] Add 30-minute game timer (display in top-right)
- [x] Increase box spawn rate over time (start 5s, decrease to 2s minimum)
- [x] Decrease IRS processing time over time (start 3s, decrease to 1s minimum)
- [x] Add box expiration system based on game pace
- [x] Test: Game gets progressively harder over time

### ✅ COMPLETED

**Step 3.2: Level System**

- [x] Add level variable (start at 0 = Junior, removed Intern)
- [x] Define promotion thresholds: Junior($0), Mid($500), Senior($1200), Architect($2500), CEO($5000)
- [x] Display current level in top-center
- [x] Add level buffs: Junior(+speed), Mid(+carry 2 boxes +speed), Senior(+IRS slots +speed), Architect(+pre-validated boxes), CEO(+carry 3 boxes +more speed)
- [x] Multi-box carrying system implemented
- [x] IRS slots system implemented (Senior: 2 slots, CEO: 3 slots)
- [x] Test: Player can earn promotions and get buffs

### ✅ COMPLETED

**Step 3.3: Happiness System**

- [x] Add happiness variable (start at 0, range -100 to +100)
- [x] Add happiness meter display with color coding
- [x] Penalize happiness for wrong results (-10), missed deadlines (-5)
- [x] Happiness affects payment multiplier (0.1x to 2.0x range) → CHANGED: No longer affects payment
- [x] Game over if happiness reaches -100
- [x] Test: Mistakes affect happiness and earnings

**Step 3.4: Enhanced Systems**

- [x] Convert to mood-based level progression (100 mood = promotion)
- [x] Add level-specific mood gain/loss rates and starting moods
- [x] Implement individual box bribing system (B key)
- [x] Add pause system (P key) with proper time tracking
- [x] Create UI panels for controls and bribe rates
- [x] Add debug level selection for testing

### ✅ COMPLETED: Character Replacement System

**Step 4.1: Character Sprite System** ✅

- [x] **Load character sprite images** - Added all sprite files to preload function
  - front-facing.png (idle state)
  - walk-1-left.png, walk-2-left.png (left walk frames)
  - walk-right-1.png, walk-right-2.png (right walk frames)
- [x] **Add character state tracking** - Created variables for movement state and direction
- [x] **Replace player rectangle** - Switched from rectangle to front-facing.png sprite
- [x] **Create walking animation system** - Implemented frame alternation (walk-1 <-> walk-2)
- [x] **Add movement direction detection** - Detects left/right movement in update function
- [x] **Implement sprite switching logic** - Changes sprites based on movement state
- [x] **Add animation timing system** - Controls walk frame speed (300ms intervals)
- [x] **Handle state persistence** - Remembers last direction when idle, defaults to left
- [x] **Test all animations** - All transitions working properly

**Additional Improvements:**

- [x] **Character scaling** - Made character 2x smaller (scale 0.25)
- [x] **Results station upgrade** - Replaced rectangle with results.png image
- [x] **Results station scaling** - Properly sized results station (scale 0.2)

### 🔄 CURRENT TASK: Environment & UI Improvements

**Step 4.2: Environment Enhancement**

- [ ] **Add wallpapers** - Load and apply background wallpaper textures
- [ ] **Add plants** - Place decorative plant objects in the environment
- [ ] **Add windows** - Add window elements to enhance the office atmosphere
- [ ] **Add collision boundaries** - Prevent character overlap with game objects:
  - Belt collision detection
  - IRS machine collision boundaries
  - Results station collision areas
- [ ] **Add UI elements** - Implement game interface components
  - Health/mood display improvements
  - Money counter enhancements
  - Level indicator styling
  - Control hints/tooltips
  - Progress indicators
- [ ] **Improve TIN processing workflow** - Enhanced IRS machine behavior:
  - TINs disappear when processed by IRS machine
  - Processed TINs spawn back slightly below the machine
  - Add progress bar for processing status
  - Additional UI for double processing (multiple slots)
  - TINs numbers should not overlap onto each other
  - Add dialog for level change
  - Add dialog for game over
  - Allow dismissing dialogs on esc press
  - Add guide / help icon somewhere?
  - TINs should be spit out in slightly different directions
  - Chnage good/bad tin colors

## Phase 4: Advanced Features

**Step 4.1: Election System (Simplified)** ✅

- [x] Add 3 simple candidates with basic effects
- [x] Trigger elections every 3 minutes (for testing)
- [x] Simple voting interface (press 1, 2, or 3)
- [x] Apply winner's effects (processing speed, payment bonus, mood protection)
- [x] Test: Elections change gameplay meaningfully (T key for testing)

**Step 4.2: Tesla System (Basic)**

- [ ] Unlock after 3rd election
- [ ] Add one Tesla type ($500, +25% election influence)
- [ ] Simple purchase interface
- [ ] Test: Tesla purchases affect election outcomes

## Development Rules

1. **One step at a time** - Don't move to next until current works
2. **Test everything** - Each step must be verified working
3. **Keep it simple** - Minimal code, no over-engineering
4. **Debug first** - Fix issues before adding features
5. **Single file** - Keep everything in game.js initially

## File Structure (Minimal)

```
├── index.html      # Basic HTML + Phaser CDN
├── game.js         # All game logic (single file)
└── TODO.md         # This file
```

## Current Status: READY FOR STEP 4.1

Steps 1.1-3.4 COMPLETED: Core game + Timer/Difficulty + Level System + Happiness System + Enhanced Features!

✅ **Fully Working Features:**

- Mood-based promotions (Junior → CEO) with individual starting moods and gain/loss rates
- Multi-box carrying, IRS processing slots, pre-validated boxes for higher levels
- Individual box bribing system with level-specific costs and 2x multiplier for Senior+
- Pause system with proper time tracking for all game mechanics
- Complete UI with control explanations and bribe rate displays
- Debug level selection for testing

Ready to implement Step 4.1: Election System (Simplified)

---

_Update this file after each completed step_
