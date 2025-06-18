# TIN Matching Service - Development TODO

## Phase 1: Foundation (Test Each Step)

### ✅ COMPLETED
- None yet (starting fresh)

### 🔄 CURRENT TASK
**Step 1.1: Basic HTML + Phaser Setup**
- [ ] Create index.html with Phaser CDN
- [ ] Create minimal game.js with empty Phaser config
- [ ] Test: Game loads without errors, shows empty canvas

### 📋 NEXT STEPS (In Order)

**Step 1.2: Add Player**
- [ ] Add green 32x32 rectangle as player at center (400, 300)
- [ ] Test: Green square appears in center

**Step 1.3: Player Movement**
- [ ] Add WASD key handlers in create()
- [ ] Implement movement in update() (200px/second speed)
- [ ] Add world boundaries (stay within 800x600)
- [ ] Test: Player moves smoothly with WASD, can't leave screen

**Step 1.4: Basic Box Spawning**
- [ ] Create boxes array
- [ ] Add spawnBox() function (brown 32x32 rectangle)
- [ ] Set timer to spawn box every 5 seconds at (50, 300)
- [ ] Add simple ID labels to boxes
- [ ] Add box limit: maximum 100 boxes on screen (stop spawning when limit reached)
- [ ] Test: Boxes appear every 5 seconds on left side, stops at 100 boxes

**Step 1.5: Pick Up/Drop Mechanics**
- [ ] Add E key handler for interaction
- [ ] Implement distance-based collision detection (< 50px)
- [ ] Create pickupBox() function (remove from world, store in inventory)
- [ ] Show carried box as small rectangle following player
- [ ] Add Q key handler for dropBox()
- [ ] Test: Can pick up boxes with E, drop with Q

## Phase 2: Core Game Loop

**Step 2.1: IRS Machine**
- [ ] Add gray 64x48 rectangle at (650, 300) with "IRS MACHINE" label
- [ ] Add interaction when player with box approaches machine
- [ ] Create processBox() function with 3-second timer
- [ ] Show "PROCESSING..." status during timer
- [ ] Generate random result (0 or 1) after 3 seconds
- [ ] Change box color (green=1, red=0) and show result number
- [ ] Test: Player can submit boxes, see processing, get results

**Step 2.2: TIN Data Generation**
- [ ] Add tin property to each box (9-digit string)
- [ ] Generate random TINs for each box
- [ ] Create list of obviously bad TINs: 000000000, 111111111, 999999999, 123456789
- [ ] Create simple TIN validation logic:
  - Obviously bad TINs → always return 0 (invalid)
  - Other TINs → 50% chance of being valid (random)
- [ ] Test: Obviously bad TINs always fail, others are random 50/50

**Step 2.3: Result Return Station**
- [ ] Add blue 64x48 rectangle at (650, 450) with "RETURN RESULTS" label
- [ ] Allow player to submit processed boxes (with 0 or 1 results)
- [ ] Check if player's result matches actual TIN validity
- [ ] Test: Player can return processed boxes to get payment

**Step 2.4: 0-Card Shortcut System**
- [ ] Add SPACE key handler for "Use 0-card" 
- [ ] When player presses SPACE while carrying box, automatically assign result=0
- [ ] Mark box as "assigned via SPACE" (track how result was assigned)
- [ ] Change box color to red and show "0" label (bypassing IRS machine)
- [ ] Add SPACE toggle: if box already has 0-result from SPACE, pressing SPACE again resets to no result
- [ ] Reset functionality ONLY works for SPACE-assigned results (not IRS machine results)
- [ ] Player can then submit processed box directly to Return Station
- [ ] Test: Player can assign 0-card with SPACE, toggle it off with SPACE again, but cannot reset IRS results

**Step 2.5: Money System**
- [ ] Add money variable (start at $0)
- [ ] Add money display in top-left corner
- [ ] Pay $10 for correct results, $0 for wrong results
- [ ] Show payment feedback (+$10 or +$0)
- [ ] Test: Money increases only for correct submissions

**Step 2.6: TIN Labels**
- [ ] Show TIN number on box labels (small text above each box)
- [ ] Test: Each box displays its TIN number clearly

## Phase 3: Game Progression

**Step 3.1: Timer and Difficulty**
- [ ] Add 30-minute game timer (display in top-right)
- [ ] Increase box spawn rate over time (start 5s, decrease to 2s minimum)
- [ ] Decrease IRS processing time over time (start 3s, decrease to 1s minimum)
- [ ] Test: Game gets progressively harder over time

**Step 3.2: Level System**
- [ ] Add level variable (start at 0 = Intern)
- [ ] Define promotion thresholds: Junior($500), Mid($1200), Senior($2500), Architect($5000), CEO($10000)
- [ ] Display current level in top-center
- [ ] Add level buffs: Junior(+speed), Mid(+carry 2 boxes), Senior(+IRS slots)
- [ ] Test: Player can earn promotions and get buffs

**Step 3.3: Happiness System**
- [ ] Add happiness variable (start at 0, range -100 to +100)
- [ ] Add happiness meter display
- [ ] Penalize happiness for wrong results (-10), missed deadlines (-5)
- [ ] Happiness affects payment multiplier (negative = less money)
- [ ] Game over if happiness reaches -100
- [ ] Test: Mistakes affect happiness and earnings

## Phase 4: Advanced Features

**Step 4.1: Election System (Simplified)**
- [ ] Add 3 simple candidates with basic effects
- [ ] Trigger elections every 10 minutes (for testing)
- [ ] Simple voting interface (press 1, 2, or 3)
- [ ] Apply winner's effects (speed up/down, payment changes)
- [ ] Test: Elections change gameplay meaningfully

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

## Current Status: WAITING FOR CONFIRMATION
Ready to implement Step 1.1: Basic HTML + Phaser Setup

---
*Update this file after each completed step*