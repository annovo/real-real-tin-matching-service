# Real-Time TIN Matching Service - Project Structure

## Repository Structure

```
real-real-time-tin-matching-service/
├── index.html                 # Main game entry point
├── README.md                  # Project documentation
├── GAME_DESIGN.md            # Game design document
├── PROJECT_STRUCTURE.md      # This file
├── LICENSE                   # MIT License
├── .gitignore               # Git ignore file
├── package.json             # NPM dependencies (optional)
├── 
├── src/                     # Source code
│   ├── main.js              # Game initialization
│   ├── config.js            # Game configuration
│   ├── scenes/              # Phaser scenes
│   │   ├── PreloadScene.js  # Asset loading
│   │   ├── MenuScene.js     # Main menu
│   │   ├── GameScene.js     # Main gameplay
│   │   ├── ElectionScene.js # Voting interface
│   │   ├── PauseScene.js    # Pause overlay
│   │   └── GameOverScene.js # End game screen
│   ├── entities/            # Game objects
│   │   ├── Player.js        # Player character
│   │   ├── Box.js           # TIN boxes
│   │   ├── IRSMachine.js    # Processing machine
│   │   ├── ConveyorBelt.js  # Belt transport
│   │   └── Intern.js        # AI assistant
│   ├── systems/             # Game systems
│   │   ├── GameState.js     # Global game state
│   │   ├── Economy.js       # Money/happiness system
│   │   ├── ElectionSystem.js # Voting mechanics
│   │   ├── AudioManager.js  # Sound management
│   │   └── InputManager.js  # Keyboard handling
│   ├── ui/                  # User interface
│   │   ├── HUD.js           # Top bar UI
│   │   ├── ElectionPanel.js # Voting UI
│   │   ├── TutorialPanel.js # Game instructions
│   │   └── ProgressBar.js   # Loading/progress
│   └── utils/               # Utility functions
│       ├── Constants.js     # Game constants
│       ├── Helpers.js       # Common functions
│       └── TINGenerator.js  # Random TIN creation
│
├── assets/                  # Game assets
│   ├── images/              # Graphics
│   │   ├── sprites/         # Character/object sprites
│   │   │   ├── player.png   # Player sprite sheet
│   │   │   ├── boxes.png    # Box variations
│   │   │   ├── irs-machine.png
│   │   │   ├── conveyor.png
│   │   │   ├── intern.png
│   │   │   └── documents.png
│   │   ├── ui/              # Interface graphics
│   │   │   ├── buttons.png
│   │   │   ├── panels.png
│   │   │   ├── icons.png
│   │   │   └── fonts/
│   │   │       └── pixel-font.png
│   │   ├── backgrounds/     # Scene backgrounds
│   │   │   ├── office.png
│   │   │   ├── menu-bg.png
│   │   │   └── election-bg.png
│   │   └── effects/         # Visual effects
│   │       ├── particles.png
│   │       ├── glow.png
│   │       └── sparkles.png
│   ├── audio/               # Sound files
│   │   ├── music/           # Background music
│   │   │   ├── corporate-bg.mp3     # Main gameplay
│   │   │   ├── corporate-bg.ogg     # Firefox fallback
│   │   │   ├── election-theme.mp3   # Voting time
│   │   │   ├── election-theme.ogg
│   │   │   ├── menu-music.mp3       # Main menu
│   │   │   └── victory-theme.mp3    # CEO promotion
│   │   ├── sfx/             # Sound effects
│   │   │   ├── box-pickup.wav
│   │   │   ├── box-drop.wav
│   │   │   ├── machine-process.wav
│   │   │   ├── machine-complete.wav
│   │   │   ├── success-ding.wav
│   │   │   ├── failure-buzz.wav
│   │   │   ├── money-earn.wav
│   │   │   ├── promotion.wav
│   │   │   ├── election-start.wav
│   │   │   ├── vote-cast.wav
│   │   │   ├── tesla-purchase.wav
│   │   │   ├── happiness-drop.wav
│   │   │   ├── ui-click.wav
│   │   │   ├── ui-hover.wav
│   │   │   └── trash-throw.wav
│   │   └── ambient/         # Ambient sounds
│   │       ├── office-hum.wav
│   │       ├── conveyor-loop.wav
│   │       └── machine-idle.wav
│   └── data/                # Game data
│       ├── candidates.json  # Election candidate data
│       ├── levels.json      # Level progression data
│       ├── tin-patterns.json # TIN validation rules
│       └── dialogue.json    # Tutorial/flavor text
│
├── dist/                    # Build output (if using bundler)
│   ├── game.min.js         # Minified game code
│   └── assets/             # Optimized assets
│
└── tools/                  # Development tools (optional)
    ├── asset-optimizer.js  # Image/audio compression
    ├── sprite-packer.js    # Sprite sheet generation
    └── deploy.sh          # GitHub Pages deployment
```

## Key Files Description

### Core Game Files
- **index.html**: Entry point with Phaser setup and basic HTML structure
- **src/main.js**: Phaser game initialization and scene management
- **src/config.js**: Game configuration (resolution, physics, audio settings)

### Scene Architecture
- **PreloadScene**: Loads all assets with progress bar
- **MenuScene**: Title screen, high scores, settings
- **GameScene**: Main gameplay loop with all mechanics
- **ElectionScene**: Overlay for voting interface every 3 minutes
- **GameOverScene**: Results, promotion status, retry options

### Entity System
- **Player.js**: Movement, interaction, carrying capacity, level buffs
- **Box.js**: TIN containers with tracking IDs and document contents
- **IRSMachine.js**: Processing queue, timing, result generation
- **ConveyorBelt.js**: Box spawning and movement animation

### Game Systems
- **GameState.js**: Centralized state management (money, happiness, level, time)
- **Economy.js**: Payment calculations, Tesla purchases, promotion logic
- **ElectionSystem.js**: Candidate selection, voting, effect application
- **AudioManager.js**: Music transitions, SFX triggers, volume control

## Asset Organization

### Sprite Sheets
- **32x32 pixel sprites** for consistent pixel art style
- **Separate sheets** for characters, objects, UI elements
- **Animation frames** organized in horizontal strips

### Audio Hierarchy
- **Music**: Long-form background tracks (loop-enabled)
- **SFX**: Short impact sounds for immediate feedback
- **Ambient**: Environmental audio for immersion

### Data Files
- **JSON format** for easy editing and localization
- **Modular structure** allows easy content updates
- **Validation rules** for TIN patterns and candidate effects

## GitHub Pages Deployment

### Build Process
1. All assets served directly from repository
2. No build step required (pure JavaScript)
3. Optional: Minification for production
4. Automatic deployment via GitHub Actions

### Performance Considerations
- **Total size target**: <10MB for fast loading
- **Asset optimization**: Compressed images and audio
- **Lazy loading**: Non-critical assets loaded during gameplay
- **Caching**: Proper cache headers for repeat visits

## Development Workflow

### Phase 1: Core Setup
1. Basic HTML/Phaser structure
2. Asset loading system
3. Player movement and interaction

### Phase 2: Core Mechanics
1. Box processing workflow
2. IRS machine simulation
3. Basic economy system

### Phase 3: Systems Integration
1. Election system
2. Level progression
3. Audio integration

### Phase 4: Polish
1. Visual effects and animations
2. UI/UX improvements
3. Balance testing and optimization

This structure supports modular development, easy asset management, and efficient GitHub Pages hosting while maintaining clean separation of concerns.