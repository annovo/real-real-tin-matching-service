# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a satirical HTML5/JavaScript game called "Real-Time TIN Matching Service" - a bureaucratic processing simulator where players work as a TIN validation clerk, processing tax forms while navigating corporate politics through strategic voting and "Tesla purchases."

**Built with:** Phaser.js game framework, vanilla JavaScript, HTML5 Canvas
**Target Platform:** Web browsers via GitHub Pages static hosting
**Development Status:** Planning phase - no implementation files exist yet, only documentation

## Project Architecture

### Core Game Loop
1. **Box Processing**: Boxes arrive on conveyor belt containing TIN/Name documents
2. **Validation**: Extract documents, feed to IRS machine for processing (4.0s → 1.5s over time)
3. **Results**: Machine outputs 1 (valid) or 0 (invalid) 
4. **Payment**: Match result to original box, get paid ($10 base with happiness multiplier)
5. **Elections**: Every 3 minutes, vote for candidates affecting game mechanics
6. **Tesla System**: Purchase Tesla vehicles to influence election outcomes

### File Structure Design (Planned)
```
├── index.html              # Game entry point with Phaser setup
├── src/
│   ├── main.js            # Phaser initialization and scene management
│   ├── config.js          # Game configuration
│   ├── scenes/            # Phaser scenes (Menu, Game, Election, etc.)
│   ├── entities/          # Game objects (Player, Box, IRSMachine, etc.)
│   ├── systems/           # Game systems (GameState, Economy, Elections, Audio)
│   ├── ui/                # User interface components
│   └── utils/             # Utility functions and constants
├── assets/                # Game assets (images, audio, data files)
└── docs/                  # Design documents
```

## Development Approach

### Implementation Strategy
- **Incremental Development**: Build working features step-by-step, testing each phase
- **Single File Start**: Begin with one `game.js` file, refactor into modules later
- **Colored Rectangles**: Use simple shapes initially, add sprites later
- **Minimal Dependencies**: Phaser.js via CDN, no build process initially

### Development Phases
1. **Foundation**: Basic Phaser setup, player movement, box spawning
2. **Core Loop**: IRS machine processing, money system, TIN validation
3. **Progression**: Timer, difficulty scaling, level system, happiness meter
4. **Advanced**: Election system, Tesla purchases, candidate effects
5. **Polish**: Graphics, audio, balancing, visual effects

## Key Game Mechanics

### Timing System
- **Game Duration**: 30 minutes total
- **Elections**: Every 3 minutes (10 total elections)
- **Box Spawn Rate**: 8s → 2s (decreases 0.3s per election)
- **IRS Processing**: 4.0s → 1.5s (decreases 0.2s per election)
- **Result Window**: 15 seconds before happiness penalty

### Economic System
- **Promotion Levels**: Intern($0) → Junior($500) → Mid($1200) → Senior($2500) → Architect($5000) → CEO($10000)
- **Level Buffs**: Movement speed, carry capacity, IRS slots, AI assistant, bad TIN detection
- **Tesla Models**: Model S($800, +15%), Model X($2000, +25%), Cybertruck($5000, +80%)

### Election Candidates (10 total, 3 appear per election)
Each candidate has positive and negative effects on gameplay mechanics like processing time, payment rates, movement speed, etc.

## Development Commands

Since no implementation exists yet, standard commands will be:
- **Start Development**: Create `index.html` and `game.js` files
- **Test Locally**: Open `index.html` in browser (no build process needed)
- **Deploy**: Push to GitHub Pages (static hosting)

## Testing Strategy

Each development step must be verified working before proceeding:
- **Visual Tests**: Player movement, box spawning, UI updates
- **Interaction Tests**: Pick up/drop mechanics, machine processing
- **System Tests**: Money calculations, level progression, election effects
- **Balance Tests**: Difficulty curve, timing, candidate effects

## Code Style Guidelines

- **ES6+ JavaScript**: Use modern JavaScript features
- **Phaser 3 Patterns**: Follow Phaser.js best practices for scenes and game objects
- **Modular Design**: Separate concerns into logical modules
- **Clean Architecture**: GameState for central state management
- **Performance**: Target 60 FPS, <100ms input latency, <5MB total size
- **Constants Over Magic Numbers**: ALWAYS use named constants instead of hardcoded numbers. All numeric values (positions, scales, timings, distances, colors, etc.) must be defined as const variables at the top of the file with descriptive names. This improves maintainability and makes the code self-documenting.

## Assets & Content

- **Visual Style**: 2D pixel art, 32x32 sprites, limited retro color palette
- **Audio**: Corporate/elevator music, election themes, UI sound effects
- **Data Files**: JSON format for candidates, levels, TIN patterns, dialogue
- **Asset Organization**: Separate folders for sprites, UI, backgrounds, effects

## Important Implementation Notes

- **Tesla System**: Unlocks after election #3 (9 minutes into game)
- **0-Card Shortcuts**: Players can immediately mark TINs as invalid (SPACE key)
- **Happiness System**: Ranges from -100 (fired) to +100, affects payment multiplier
- **Win Condition**: Reach CEO level ($10,000) within 30 minutes
- **Lose Conditions**: Happiness below -100, negative money, or time expires

Current development status can be tracked in `TODO.md` which contains detailed step-by-step implementation tasks.