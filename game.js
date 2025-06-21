// Real-Time TIN Matching Service - Game Logic
// Phase 1: Basic Foundation

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 1152,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#34495e',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Game variables
let game;
let player;
let keys;

// Character animation state
let playerState = 'idle'; // 'idle', 'walking-left', 'walking-right'
let lastDirection = 'left'; // 'left', 'right' - default to left
let walkFrame = 1; // 1 or 2 for walk animation frames
let animationTimer = 0; // Timer for animation frame switching
const ANIMATION_SPEED = 300; // milliseconds between walk frames
let boxes = [];
let boxIdCounter = 1;
let carriedBoxes = [];
let irsMachine;
let processingBoxes = [];
let processingStatus;
let returnStation;
let money = 0;
let gameStartTime;
let level = 0;
let happiness = 50; // Start at Junior's initial mood
let spaceCardIndex = 0; // Track which box to process next with SPACE
let gameIsPaused = false; // Track pause state
let pausedTime = 0; // Track how long game has been paused
let bribeIndex = 0; // Track which processing box to bribe next
let electionCount = 0; // Track number of elections held
let nextElectionTime = 30000; // 30 seconds in milliseconds
let isElectionActive = false; // Track if election is currently happening

// List of obviously bad TINs that should always be invalid
const badTINs = ['000000000', '111111111', '999999999', '123456789'];

// Election candidates with their effects
const candidates = [
    {
        name: "Speed Sally",
        description: "Faster IRS processing",
        effect: "processingSpeed",
        value: 0.7 // 30% faster processing (multiply by 0.7)
    },
    {
        name: "Money Mike", 
        description: "Higher payments",
        effect: "paymentBonus",
        value: 1.5 // 50% more money (multiply by 1.5)
    },
    {
        name: "Chill Charlie",
        description: "Slower mood loss",
        effect: "moodProtection", 
        value: 0.5 // 50% less mood loss (multiply by 0.5)
    }
];

// Current election effects
let activeElectionEffects = {
    processingSpeed: 1.0,
    paymentBonus: 1.0,
    moodProtection: 1.0
};

// Level system (mood-based progression)
const levels = [
    { name: 'Junior', initMood: 50, speedBonus: 0, carryCapacity: 1, irsSlots: 1, preValidated: false, moodGainRate: 5.0, moodLossRate: 1.0, spawnSpeedMultiplier: 0.95, bribeCost: 200 },
    { name: 'Mid', initMood: 35, speedBonus: 100, carryCapacity: 2, irsSlots: 1, preValidated: false, moodGainRate: 3.5, moodLossRate: 1.2, spawnSpeedMultiplier: 1.5, bribeCost: 500 },
    { name: 'Senior', initMood: 25, speedBonus: 100, carryCapacity: 2, irsSlots: 2, preValidated: false, moodGainRate: 2.5, moodLossRate: 1.4, spawnSpeedMultiplier: 1.71, bribeCost: 2000 },
    { name: 'Architect', initMood: 10, speedBonus: 100, carryCapacity: 2, irsSlots: 2, preValidated: true, moodGainRate: 1.0, moodLossRate: 1.6, spawnSpeedMultiplier: 2.0, bribeCost: 5000 },
    { name: 'CEO', initMood: 0, speedBonus: 150, carryCapacity: 3, irsSlots: 3, preValidated: true, moodGainRate: 0.2, moodLossRate: 1.8, spawnSpeedMultiplier: 2.0, bribeCost: 5000 }
];

// Function to get current level info
function getCurrentLevel() {
    return levels[level];
}

// Function to update player sprite based on current state
function updatePlayerSprite() {
    let spriteKey = 'playerIdle'; // Default to idle
    
    if (playerState === 'walking-left') {
        spriteKey = walkFrame === 1 ? 'playerWalk1Left' : 'playerWalk2Left';
    } else if (playerState === 'walking-right') {
        spriteKey = walkFrame === 1 ? 'playerWalk1Right' : 'playerWalk2Right';
    }
    
    player.setTexture(spriteKey);
}

// Function to check for promotion
function checkPromotion() {
    if (level < levels.length - 1 && happiness >= 100) {
        level++;
        const newLevel = getCurrentLevel();
        happiness = newLevel.initMood; // Reset to new level's starting mood
        console.log(`PROMOTION! You are now ${newLevel.name}! Mood reset to ${happiness}.`);
        document.getElementById('level-display').textContent = `Level: ${newLevel.name}`;
        updateBribeDisplay(); // Update bribe rate display
        updateHappiness(0); // Update display without changing value
        return true;
    }
    return false;
}

// Function to update bribe rate display highlighting
function updateBribeDisplay() {
    // Remove current-level class from all levels
    const briberLevels = document.querySelectorAll('.bribe-level');
    briberLevels.forEach(el => el.classList.remove('current-level'));
    
    // Add current-level class to current level
    const currentLevelElement = document.querySelector(`[data-level="${level}"]`);
    if (currentLevelElement) {
        currentLevelElement.classList.add('current-level');
    }
}

// Function to update happiness and display
function updateHappiness(change) {
    // Apply level-based mood change rates
    const currentLevel = getCurrentLevel();
    let actualChange = change;
    
    if (change > 0) {
        actualChange = change * currentLevel.moodGainRate; // Positive changes get harder at higher levels
    } else if (change < 0) {
        actualChange = change * currentLevel.moodLossRate * activeElectionEffects.moodProtection; // Apply election mood protection to negative changes
    }
    
    happiness = Math.max(-100, Math.min(100, happiness + actualChange));
    
    // Update display with color coding
    const display = document.getElementById('happiness-display');
    display.textContent = `Mood: ${Math.round(happiness)}`;
    
    // Color coding based on happiness level
    if (happiness >= 50) {
        display.style.color = '#00ff00'; // Green for happy
    } else if (happiness >= 0) {
        display.style.color = '#00ffff'; // Cyan for neutral
    } else if (happiness >= -50) {
        display.style.color = '#ffff00'; // Yellow for unhappy
    } else {
        display.style.color = '#ff0000'; // Red for very unhappy
    }
    
    // Check for game over
    if (happiness <= -100) {
        alert('GAME OVER: Your mood has reached rock bottom! You have been fired.');
        // Could implement proper game over screen here
    }
    
    // Check for promotion
    checkPromotion();
    
    console.log(`Happiness changed by ${actualChange.toFixed(1)} (from ${change}), now at ${happiness.toFixed(1)}`);
}

// Function to start an election
function startElection() {
    if (isElectionActive) return; // Already in election
    
    isElectionActive = true;
    electionCount++;
    
    // Pause the game during election
    gameIsPaused = true;
    
    console.log(`ELECTION #${electionCount} STARTING! Game paused for voting.`);
    
    // Show election UI (we'll create this)
    showElectionUI();
}

// Function to show election UI
function showElectionUI() {
    const scene = game.scene.scenes[0];
    
    // Create election background
    const electionBg = scene.add.rectangle(480, 360, 600, 400, 0x000000, 0.8);
    electionBg.setDepth(2000);
    
    // Election title
    const title = scene.add.text(480, 200, `ELECTION #${electionCount}`, {
        fontSize: '32px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Instructions
    const instructions = scene.add.text(480, 240, 'Press 1, 2, or 3 to vote:', {
        fontSize: '18px',
        fill: '#ffff00',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Store UI elements for cleanup
    scene.electionUI = [electionBg, title, instructions];
    
    // Candidate options
    for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        const y = 290 + (i * 60);
        
        // Candidate number and name
        const candidateText = scene.add.text(480, y, `${i + 1}. ${candidate.name}`, {
            fontSize: '20px',
            fill: '#00ff00',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5).setDepth(2001);
        
        // Candidate description
        const descText = scene.add.text(480, y + 20, candidate.description, {
            fontSize: '14px',
            fill: '#cccccc',
            fontFamily: 'Arial',
            align: 'center'
        }).setOrigin(0.5).setDepth(2001);
        
        // Add candidate text elements to cleanup list
        scene.electionUI.push(candidateText, descText);
    }
}

// Function to vote for a candidate
function vote(candidateIndex) {
    if (!isElectionActive) return;
    if (candidateIndex < 0 || candidateIndex >= candidates.length) return;
    
    const votedCandidate = candidates[candidateIndex];
    console.log(`You voted for ${votedCandidate.name}.`);
    
    // Calculate election results with weighted chances
    // Base chance: 33.33% each (1/3)
    // Player's vote adds 20% to their candidate's chance
    let chances = [33.33, 33.33, 33.33]; // Base chances
    chances[candidateIndex] += 20; // Add 20% to voted candidate
    
    // Normalize to ensure total is 100%
    const total = chances.reduce((sum, chance) => sum + chance, 0);
    chances = chances.map(chance => (chance / total) * 100);
    
    // Determine winner based on weighted random selection
    const random = Math.random() * 100;
    let cumulative = 0;
    let winnerIndex = 0;
    
    for (let i = 0; i < chances.length; i++) {
        cumulative += chances[i];
        if (random <= cumulative) {
            winnerIndex = i;
            break;
        }
    }
    
    const winner = candidates[winnerIndex];
    console.log(`Election result: ${winner.name} won! (You voted for ${votedCandidate.name})`);
    console.log(`Final chances were: ${chances.map((c, i) => `${candidates[i].name}: ${c.toFixed(1)}%`).join(', ')}`);
    
    // Apply the winner's effects
    applyElectionEffects(winner);
    
    // Close election voting UI and show results
    closeElectionVoting();
    showElectionResults(winner, votedCandidate);
    
    // Schedule next election
    nextElectionTime = (Date.now() - gameStartTime - pausedTime) + 30000; // 30 seconds from now
}

// Function to apply election effects
function applyElectionEffects(winner) {
    // Reset all effects to default
    activeElectionEffects = {
        processingSpeed: 1.0,
        paymentBonus: 1.0,
        moodProtection: 1.0
    };
    
    // Apply winner's effect
    activeElectionEffects[winner.effect] = winner.value;
    
    console.log(`Election effects applied: ${winner.effect} = ${winner.value}`);
    console.log(`Current effects: Processing Speed x${activeElectionEffects.processingSpeed}, Payment Bonus x${activeElectionEffects.paymentBonus}, Mood Protection x${activeElectionEffects.moodProtection}`);
}

// Function to close election voting UI only
function closeElectionVoting() {
    const scene = game.scene.scenes[0];
    if (scene.electionUI) {
        scene.electionUI.forEach(element => element.destroy());
        scene.electionUI = null;
    }
}

// Function to show election results
function showElectionResults(winner, votedCandidate) {
    const scene = game.scene.scenes[0];
    
    // Create results background
    const resultsBg = scene.add.rectangle(480, 360, 600, 350, 0x000000, 0.9);
    resultsBg.setDepth(2000);
    
    // Results title
    const title = scene.add.text(480, 260, `ELECTION #${electionCount} RESULTS`, {
        fontSize: '32px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Show who player voted for
    const voteText = scene.add.text(480, 300, `You voted for: ${votedCandidate.name}`, {
        fontSize: '18px',
        fill: '#cccccc',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Winner announcement with color based on if player's choice won
    const winnerColor = winner === votedCandidate ? '#00ff00' : '#ff8800';
    const winnerText = scene.add.text(480, 340, `${winner.name} WINS!`, {
        fontSize: '28px',
        fill: winnerColor,
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Effect description
    const effectText = scene.add.text(480, 380, winner.description, {
        fontSize: '18px',
        fill: '#ffff00',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Effect details
    let effectDetails = "";
    if (winner.effect === "processingSpeed") {
        effectDetails = `IRS processing is now ${Math.round((1 - winner.value) * 100)}% faster`;
    } else if (winner.effect === "paymentBonus") {
        effectDetails = `Payments increased by ${Math.round((winner.value - 1) * 100)}%`;
    } else if (winner.effect === "moodProtection") {
        effectDetails = `Mood loss reduced by ${Math.round((1 - winner.value) * 100)}%`;
    }
    
    const detailsText = scene.add.text(480, 410, effectDetails, {
        fontSize: '16px',
        fill: '#cccccc',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Instructions
    const instructions = scene.add.text(480, 450, 'Press P to continue', {
        fontSize: '18px',
        fill: '#ffffff',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Store results UI elements
    scene.electionResultsUI = [resultsBg, title, voteText, winnerText, effectText, detailsText, instructions];
}

// Function to close election completely
function closeElection() {
    isElectionActive = false;
    
    // Resume the game after election
    gameIsPaused = false;
    
    const scene = game.scene.scenes[0];
    if (scene.electionResultsUI) {
        scene.electionResultsUI.forEach(element => element.destroy());
        scene.electionResultsUI = null;
    }
    
    console.log("Election ended. Game resumed.");
}

// Removed happiness multiplier - mood no longer affects payment

// Function to format time display (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to get current difficulty based on elapsed time
function getDifficulty() {
    const elapsedMinutes = (Date.now() - gameStartTime - pausedTime) / 60000;
    return Math.min(elapsedMinutes / 30, 1); // 0 to 1 over 30 minutes
}

// Function to get current spawn delay
function getSpawnDelay() {
    const difficulty = getDifficulty();
    const baseDelay = Math.max(2000, 5000 - (difficulty * 3000)); // 5s to 2s
    const levelMultiplier = getCurrentLevel().spawnSpeedMultiplier;
    return baseDelay / levelMultiplier; // Faster spawn at higher levels
}

// Function to get current processing time
function getProcessingTime() {
    const difficulty = getDifficulty();
    const baseTime = Math.max(2000, 5000 - (difficulty * 3000)); // 5s to 2s
    return baseTime * activeElectionEffects.processingSpeed; // Apply election effect
}

// Function to get box expiration time (adaptive based on game pace)
function getBoxExpirationTime() {
    const spawnDelay = getSpawnDelay();
    const processingTime = getProcessingTime();
    
    // Give player time for: pickup + process + return + buffer
    // Formula: 3x spawn delay + 2x processing time + 5s buffer
    return (spawnDelay * 3) + (processingTime * 2) + 5000;
}

// Function to generate a random TIN
function generateRandomTIN() {
    // 30% chance of generating a bad TIN for testing
    if (Math.random() < 0.3) {
        return badTINs[Math.floor(Math.random() * badTINs.length)];
    }
    
    // Generate random 9-digit TIN
    let tin = '';
    for (let i = 0; i < 9; i++) {
        tin += Math.floor(Math.random() * 10);
    }
    return tin;
}

// Function to determine TIN validity at spawn time
function determineTINValidity(tin) {
    // Obviously bad TINs are always invalid
    if (badTINs.includes(tin)) {
        return 0; // Invalid
    }
    
    // Other TINs have 50% chance of being valid (assigned randomly at spawn)
    return Math.random() < 0.5 ? 1 : 0;
}

// Preload function - loads assets
function preload() {
    // Try multiple path variations to find the correct one
    console.log('Attempting to load tileset...');
    
    // Try different paths
    this.load.image('testTiles1', './assets/images/tiles/roguelikeIndoor_transparent.png');
    this.load.image('testTiles2', '/assets/images/tiles/roguelikeIndoor_transparent.png');
    this.load.image('testTiles3', 'assets/images/tiles/roguelikeIndoor_transparent.png');
    
    // Load tileset with 16x16 tiles and 1px spacing 
    this.load.spritesheet('tiles', 'assets/images/tiles/roguelikeIndoor_transparent.png', {
        frameWidth: 16,
        frameHeight: 16,
        margin: 0,      // No margin at edges
        spacing: 1      // 1px between tiles
    });
    
    // Load TIN paper image for TIN boxes
    this.load.image('tinPaper', 'assets/images/objects/tin-paper.png');
    
    // Load IRS machine image
    this.load.image('irsMachine', 'assets/images/objects/irs-machine.png');
    
    // Load results station image
    this.load.image('resultsStation', 'assets/images/objects/results.png');
    
    // Load belt images
    this.load.image('beltLeft', 'assets/images/objects/belt-left.png');
    this.load.image('beltMiddle', 'assets/images/objects/belt-middle.png');
    this.load.image('beltRight', 'assets/images/objects/belt-right.png');
    
    // Load floor tile
    this.load.image('floorTile', 'assets/images/tiles/floor-tile.png');
    
    // Load wall tiles
    this.load.image('wallTileTop', 'assets/images/backgrounds/wall-tile-1.png');
    this.load.image('wallTileBottom', 'assets/images/backgrounds/wall-tile-1.png');
    this.load.image('wallTileLeft', 'assets/images/backgrounds/wall-vertical.png');
    this.load.image('wallTileRight', 'assets/images/backgrounds/wall-vertical.png');
    this.load.image('wallTileLeftTopCorner', 'assets/images/backgrounds/wall-tile-left-top-corner.png');
    
    // Load character sprites
    this.load.image('playerIdle', 'assets/images/character/green/front-facing.png');
    this.load.image('playerWalk1Left', 'assets/images/character/green/walk-1-left.png');
    this.load.image('playerWalk2Left', 'assets/images/character/green/walk-2-left.png');
    this.load.image('playerWalk1Right', 'assets/images/character/green/walk-1-right.png');
    this.load.image('playerWalk2Right', 'assets/images/character/green/walk-2-right.png');
    
    // Load background music
    this.load.audio('bgMusic', 'assets/audio/music/Travis_eulogy.mp3');
    
    // Add error event listeners
    this.load.on('loaderror', function (event) {
        console.log('Load error:', event);
    });
    
    this.load.on('complete', function () {
        console.log('Loading complete');
    });
}

// Create function - sets up the game world
function create() {
    // DEBUG: Level selection at start
    const debugLevel = prompt("DEBUG: Choose starting level (0=Junior, 1=Mid, 2=Senior, 3=Architect, 4=CEO) or press Cancel for Junior:");
    if (debugLevel !== null && !isNaN(debugLevel)) {
        const chosenLevel = Math.max(0, Math.min(4, parseInt(debugLevel)));
        level = chosenLevel;
        happiness = levels[level].initMood;
        console.log(`DEBUG: Starting at ${levels[level].name} level with ${happiness} mood`);
        document.getElementById('level-display').textContent = `Level: ${levels[level].name}`;
        document.getElementById('happiness-display').textContent = `Mood: ${happiness}`;
        updateBribeDisplay(); // Update bribe rate display for debug level
    }
    // Create tiled background with proper borders
    const tileSize = 80; // 80x80 tiles (5x bigger)
    const tilesX = Math.ceil(1152 / tileSize); // Number of tiles needed horizontally
    const tilesY = Math.ceil(720 / tileSize); // Number of tiles needed vertically
    
    // Tile indices (converted from 1-based row/col to 0-based array index)
    // Formula: index = (row - 1) * 27 + (col - 1)
    const tiles = {
        topLeft: (14 - 1) * 27 + (13 - 1),      // Row 14, Col 13 (-1)
        topEdge: (18 - 1) * 27 + (11 - 1),      // Row 18, Col 11 (-1)  
        topRight: (14 - 1) * 27 + (14 - 1),     // Row 14, Col 14 (-1)
        rightEdge: (15 - 1) * 27 + (14 - 1),    // Row 15, Col 14 (-1)
        bottomRight: (17 - 1) * 27 + (14 - 1),  // Row 17, Col 14 (-1)
        bottomEdge: (18 - 1) * 27 + (11 - 1),   // Row 18, Col 11 (-1)
        bottomLeft: (17 - 1) * 27 + (13 - 1),   // Row 17, Col 13 (-1)
        leftEdge: (15 - 1) * 27 + (13 - 1),     // Row 15, Col 13 (-1)
        fill: 24                                 // Original floor tile (index 24)
    };
    
    // Check if tileset loaded properly
    if (this.textures.exists('tiles')) {
        console.log('Creating bordered tilemap...');
        
        // First pass: Place floor tiles everywhere
        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                this.add.image(x * tileSize + tileSize/2, y * tileSize + tileSize/2, 'floorTile').setDisplaySize(80, 80);
            }
        }
        
        // Add left top corner piece
        const cornerTile = this.add.image(0, 0, 'wallTileTop');
        cornerTile.setScale(0.5); // 2x smaller, same as top tiles
        
        // Add top edge border with wall tiles (smaller and connected, skip corner area)
        const smallTileSpacing = 20; // Even smaller spacing to connect tiles
        const smallTilesX = Math.ceil(1152 / smallTileSpacing) + 2; // Extra tiles to ensure coverage
        for (let x = 0; x < smallTilesX; x++) {
            const xPos = x * smallTileSpacing + 10;
            // Skip the corner area (first 20px to avoid overlap with scaled corner)
            if (xPos > 20) {
                const topTile = this.add.image(xPos, 0, 'wallTileTop');
                topTile.setScale(0.5); // 2x smaller
            }
        }
        
        // Add bottom edge border with wall tiles (smaller and connected, same as top)
        for (let x = 0; x < smallTilesX; x++) {
            const xPos = x * smallTileSpacing + 10;
            const bottomTile = this.add.image(xPos, 720, 'wallTileBottom');
            bottomTile.setScale(0.5); // 2x smaller, same as top tiles
        }
        
        // Add left edge border with wall tiles (start right after corner)
        const verticalTileSpacing = 20; // Same spacing as horizontal tiles
        const verticalTilesY = Math.ceil(720 / verticalTileSpacing) + 2;
        for (let y = 1; y < verticalTilesY; y++) { // Start from y=1 to connect to corner
            const yPos = y * verticalTileSpacing;
            const leftTile = this.add.image(0, yPos, 'wallTileLeft');
            leftTile.setScale(0.5); // 2x smaller to match other tiles
        }
        
        // Add right edge border with wall tiles (smaller spacing)
        for (let y = 0; y < verticalTilesY; y++) {
            const yPos = y * verticalTileSpacing + 10;
            const rightTile = this.add.image(1152, yPos, 'wallTileRight');
            rightTile.setScale(0.5); // 2x smaller to match other tiles
        }
        
        
        // Create horizontal belt for TIN boxes
        const beltStartX = 200; // Start position from left
        const beltY = 200; // Y position for belt
        const beltScale = 0.5; // Scale for belt pieces
        
        // Create belt: left + 4 middle + right
        const beltLeft = this.add.image(beltStartX, beltY, 'beltLeft');
        beltLeft.setScale(beltScale);
        
        const beltMiddle1 = this.add.image(beltStartX + 80, beltY, 'beltMiddle');
        beltMiddle1.setScale(beltScale);
        
        const beltMiddle2 = this.add.image(beltStartX + 160, beltY, 'beltMiddle');
        beltMiddle2.setScale(beltScale);
        
        const beltMiddle3 = this.add.image(beltStartX + 240, beltY, 'beltMiddle');
        beltMiddle3.setScale(beltScale);
        
        const beltMiddle4 = this.add.image(beltStartX + 320, beltY, 'beltMiddle');
        beltMiddle4.setScale(beltScale);
        
        const beltRight = this.add.image(beltStartX + 400, beltY, 'beltRight');
        beltRight.setScale(beltScale);
        
        // Store belt position for box spawning (center of belt)
        this.beltX = beltStartX + 200; // Center of the belt
        this.beltY = beltY;
        this.beltLeftX = beltStartX;
        this.beltRightX = beltStartX + 400;
        
        console.log('Bordered tilemap and table created successfully');
    } else {
        // Fallback to solid background if tileset failed to load
        this.add.rectangle(480, 360, 960, 720, 0x2c3e50);
        console.log('Tileset failed to load, using solid background');
    }
    
    
    // Create player - character sprite at center (576, 360) 
    player = this.add.image(576, 360, 'playerIdle');
    player.setScale(0.25); // Scale down the character sprite (2x smaller)
    
    // Create IRS Machine - image at (1000, 300)
    irsMachine = this.add.image(1000, 300, 'irsMachine');
    irsMachine.setScale(0.2); // 5x smaller
    
    
    // Create Return Station - results image at (420, 660) - bottom of screen
    returnStation = this.add.image(420, 660, 'resultsStation');
    returnStation.setScale(0.2); // Scale down the results station to visible size
    
    
    
    
    // Record game start time
    gameStartTime = Date.now();
    
    // Initialize bribe display
    updateBribeDisplay();
    
    // Create and start background music
    this.bgMusic = this.sound.add('bgMusic', { 
        volume: 0.5, 
        loop: true 
    });
    this.bgMusic.play();
    
    // Set up page visibility API to pause/resume music when tab is active/inactive
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Tab is now hidden - pause music
            this.bgMusic.pause();
        } else {
            // Tab is now visible - resume music
            this.bgMusic.resume();
        }
    });
    
    // Set up WASD key handlers
    keys = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keys.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keys.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    keys.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keys.p = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    keys.b = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    keys.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    keys.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    keys.three = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    keys.t = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T); // For testing elections
    
    // Set up dynamic box spawning timer (updates every second)
    this.time.addEvent({
        delay: 1000, // Check every second
        callback: () => {
            if (gameIsPaused) return; // Don't spawn when paused
            
            // Check if it's time to spawn based on dynamic delay
            if (!this.lastSpawnTime) this.lastSpawnTime = Date.now();
            if (Date.now() - this.lastSpawnTime >= getSpawnDelay()) {
                spawnBox.call(this);
                this.lastSpawnTime = Date.now();
            }
        },
        callbackScope: this,
        loop: true
    });
    
}

// Function to spawn a new box
function spawnBox() {
    // Don't spawn if we have 100 boxes already
    if (boxes.length >= 100) {
        return;
    }
    
    // Calculate next position on belt (place boxes horizontally)
    const beltY = this.beltY;
    let spawnX = this.beltLeftX + 40; // Start slightly right of belt left
    
    // Find gaps and place boxes along the belt
    const boxesOnBelt = boxes.filter(b => Math.abs(b.y - beltY) < 50);
    
    if (boxesOnBelt.length > 0) {
        // Sort boxes by X position (left to right)
        boxesOnBelt.sort((a, b) => a.x - b.x);
        
        // Look for gaps between boxes (40px spacing)
        let foundGap = false;
        for (let i = 0; i < boxesOnBelt.length - 1; i++) {
            const currentBox = boxesOnBelt[i];
            const nextBox = boxesOnBelt[i + 1];
            const gapSize = nextBox.x - currentBox.x;
            
            // If gap is larger than box width + some buffer, place box there
            if (gapSize > 80) {
                spawnX = currentBox.x + 40;
                foundGap = true;
                break;
            }
        }
        
        // If no gap found, check if we can place at the end
        if (!foundGap) {
            const rightmostBox = boxesOnBelt.reduce((rightmost, box) => box.x > rightmost.x ? box : rightmost);
            const nextX = rightmostBox.x + 40;
            
            // If next position would go beyond belt right, start from left again
            if (nextX > this.beltRightX - 40) {
                spawnX = this.beltLeftX + 40; // Reset to left
            } else {
                spawnX = nextX; // Place right of the rightmost box
            }
        }
    }
    
    // Create TIN paper image at start of belt (always spawn at left)
    const startX = this.beltLeftX + 40;
    const paperY = beltY - 10; // 10px higher than belt
    const box = this.add.image(startX, paperY, 'tinPaper');
    box.setScale(0.67); // 1.5x smaller (1/1.5 = 0.67)
    
    // Add TIN number in the middle of the paper
    const boxId = boxIdCounter++;
    const tin = generateRandomTIN();
    const validity = determineTINValidity(tin); // Determine validity at spawn
    const label = this.add.text(startX, paperY, tin, {
        fontSize: '16px',
        fill: '#000000',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);
    
    // Animate the paper sliding to the end of the belt
    const endX = this.beltRightX - 40;
    const slideTime = 8000; // 8 seconds to traverse the belt
    
    this.tweens.add({
        targets: box,
        x: endX,
        duration: slideTime,
        ease: 'Linear',
        onComplete: () => {
            // Stop movement when reaching the end
            const boxData = boxes.find(b => b.sprite === box);
            if (boxData) {
                boxData.isMoving = false;
            }
        }
    });
    
    this.tweens.add({
        targets: label,
        x: endX,
        duration: slideTime,
        ease: 'Linear'
    });
    
    // Check if this box should be pre-validated (for Architect+)
    let isPreValidated = false;
    if (getCurrentLevel().preValidated && Math.random() < 0.3) { // 30% chance for Architect+
        isPreValidated = true;
    }
    
    // Store box data
    const boxData = {
        id: boxId,
        tin: tin,
        validity: validity, // Store the predetermined validity
        sprite: box,
        label: label,
        x: startX,
        y: paperY,
        spawnTime: Date.now(), // Track when box was created
        preValidated: isPreValidated,
        isBribed: false, // Track if this box has been bribed during processing
        isMoving: true, // Track if box is sliding on belt
        endX: endX // Store target position
    };
    
    // If pre-validated, show result immediately
    if (isPreValidated) {
        boxData.result = validity;
        boxData.assignedVia = 'prevalidated';
        
        if (validity === 1) {
            box.setTint(0x00ff00); // Green tint for valid
        } else {
            box.setTint(0xff0000); // Red tint for invalid
        }
        
        // Keep original TIN text, just use color for validation result
        console.log(`Pre-validated box #${boxId} spawned with result: ${validity}`);
    }
    
    boxes.push(boxData);
    
    console.log(`Spawned box #${boxId} with TIN: ${tin}, validity: ${validity}, total boxes: ${boxes.length}`);
}

// Function to find nearest box within 60px
function findNearestBox() {
    let nearestBox = null;
    let nearestDistance = 60; // Max pickup distance
    
    for (let box of boxes) {
        const distance = Phaser.Math.Distance.Between(player.x, player.y, box.x, box.y);
        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestBox = box;
        }
    }
    
    return nearestBox;
}

// Function to pick up a box
function pickupBox() {
    const maxCapacity = getCurrentLevel().carryCapacity;
    if (carriedBoxes.length >= maxCapacity) return; // At capacity
    
    const nearestBox = findNearestBox();
    if (nearestBox) {
        // Remove from boxes array
        const index = boxes.indexOf(nearestBox);
        boxes.splice(index, 1);
        
        // Stop any belt animation
        if (nearestBox.isMoving) {
            nearestBox.isMoving = false;
            // Stop the tweens
            const scene = game.scene.scenes[0];
            scene.tweens.killTweensOf(nearestBox.sprite);
            scene.tweens.killTweensOf(nearestBox.label);
        }
        
        // Hide the box and label
        nearestBox.sprite.setVisible(false);
        nearestBox.label.setVisible(false);
        
        // Store as carried box
        carriedBoxes.push(nearestBox);
        
        // Reset space card index when picking up boxes
        spaceCardIndex = 0;
        
        console.log(`Picked up box #${nearestBox.id} (${carriedBoxes.length}/${maxCapacity})`);
    }
}

// Function to drop carried box (drops the last one picked up)
function dropBox() {
    if (carriedBoxes.length === 0) return; // Not carrying anything
    
    const boxToDrop = carriedBoxes.pop(); // Remove last box
    
    // Place box at player's current position
    boxToDrop.x = player.x;
    boxToDrop.y = player.y;
    boxToDrop.sprite.setPosition(player.x, player.y);
    boxToDrop.label.setPosition(player.x, player.y); // Center text on banner
    
    // Show the box and label again
    boxToDrop.sprite.setVisible(true);
    boxToDrop.sprite.setScale(0.67); // Keep smaller size
    boxToDrop.label.setVisible(true);
    boxToDrop.label.setScale(1.0); // Reset to normal size
    
    // Add back to boxes array
    boxes.push(boxToDrop);
    
    // Reset space card index when dropping boxes
    if (carriedBoxes.length > 0) {
        spaceCardIndex = spaceCardIndex % carriedBoxes.length;
    } else {
        spaceCardIndex = 0;
    }
    
    console.log(`Dropped box #${boxToDrop.id} (${carriedBoxes.length} remaining)`);
}

// Function to process a box in the IRS machine (legacy single-box function - kept for compatibility)
function processBox() {
    if (carriedBoxes.length === 0) return; // Need to carry a box
    
    // Check if player is near IRS machine (within 96px)
    const distance = Phaser.Math.Distance.Between(player.x, player.y, irsMachine.x, irsMachine.y);
    if (distance > 96) return;
    
    // Use the multi-box processing function instead
    processAllBoxes();
}

// Function to complete processing and generate result
function completeProcessing(boxToComplete) {
    if (!boxToComplete) return;
    
    // Find the box in processing array
    const index = processingBoxes.findIndex(box => box === boxToComplete);
    if (index === -1) return;
    
    // IRS machine returns the predetermined validity
    const result = boxToComplete.validity;
    boxToComplete.result = result;
    boxToComplete.assignedVia = 'irs'; // Mark as IRS machine result
    
    // Change box tint based on result
    if (result === 1) {
        boxToComplete.sprite.setTint(0x00ff00); // Green tint for valid
    } else {
        boxToComplete.sprite.setTint(0xff0000); // Red tint for invalid
    }
    
    // Keep original TIN text, just use color for validation result
    
    console.log(`Processing complete: Box #${boxToComplete.id} TIN: ${boxToComplete.tin} = ${result}`);
    
    // Keep processed box in current position (don't move it)
    // The box stays where it was when processing started
    
    // Add to boxes array so player can pick it up
    boxes.push(boxToComplete);
    
    // Remove from processing array
    processingBoxes.splice(index, 1);
    
    // Clean up bribe border if it exists
    if (boxToComplete.bribeBorder) {
        boxToComplete.bribeBorder.destroy();
        boxToComplete.bribeBorder = null;
    }
    
}

// Function to submit processed box for payment
function submitBox() {
    // Find first processed box
    let processedBox = null;
    let processedIndex = -1;
    for (let i = 0; i < carriedBoxes.length; i++) {
        if (carriedBoxes[i].result !== undefined) {
            processedBox = carriedBoxes[i];
            processedIndex = i;
            break;
        }
    }
    
    if (!processedBox) return; // No processed boxes
    
    // Check if player is near return station (within 96px)
    const distance = Phaser.Math.Distance.Between(player.x, player.y, returnStation.x, returnStation.y);
    if (distance > 96) return;
    
    // Get the correct result (predetermined validity)
    const correctResult = processedBox.validity;
    const playerResult = processedBox.result;
    
    // Check if player's result matches correct result
    if (playerResult === correctResult) {
        // Variable payment based on level (no happiness multiplier)
        let payment = 10; // Base payment
        if (level === 0) payment = 100; // Junior gets $100
        else if (level === 1) payment = 500; // Mid gets $500  
        else if (level >= 2) payment = 1000; // Senior+ gets $1000
        
        // Apply election payment bonus effect
        payment = Math.round(payment * activeElectionEffects.paymentBonus);
        
        money += payment;
        updateHappiness(2); // Increase happiness for correct results
        console.log(`CORRECT! Box #${processedBox.id} TIN: ${processedBox.tin} - Player: ${playerResult}, Correct: ${correctResult}. Paid $${payment}. Mood +2.`);
    } else {
        // Wrong - no payment and happiness penalty
        updateHappiness(-10);
        console.log(`WRONG! Box #${processedBox.id} TIN: ${processedBox.tin} - Player: ${playerResult}, Correct: ${correctResult}. No payment. Mood -10.`);
    }
    
    // Update money display
    document.getElementById('money-display').textContent = `Money: $${money}`;
    
    // Remove the submitted box from carried boxes
    carriedBoxes.splice(processedIndex, 1);
    processedBox.sprite.destroy();
    processedBox.label.destroy();
    
    console.log(`Total money: $${money}`);
}

// Function to submit all processed boxes for payment
function submitAllBoxes() {
    const processedBoxes = carriedBoxes.filter(box => box.result !== undefined);
    if (processedBoxes.length === 0) return;
    
    // Check if player is near return station
    const distance = Phaser.Math.Distance.Between(player.x, player.y, returnStation.x, returnStation.y);
    if (distance > 96) return;
    
    let totalEarned = 0;
    
    // Process each box
    for (let i = carriedBoxes.length - 1; i >= 0; i--) {
        const box = carriedBoxes[i];
        if (box.result === undefined) continue; // Skip unprocessed boxes
        
        const correctResult = box.validity;
        const playerResult = box.result;
        
        if (playerResult === correctResult) {
            // Variable payment based on level (no happiness multiplier)
            let payment = 10;
            if (level === 0) payment = 100; // Junior gets $100
            else if (level === 1) payment = 500; // Mid gets $500  
            else if (level >= 2) payment = 1000; // Senior+ gets $1000
            
            // Apply election payment bonus effect
            payment = Math.round(payment * activeElectionEffects.paymentBonus);
            
            money += payment;
            totalEarned += payment;
            updateHappiness(2); // Increase happiness for correct results
            console.log(`CORRECT! Box #${box.id} TIN: ${box.tin} - Paid $${payment}. Mood +2.`);
        } else {
            updateHappiness(-10);
            console.log(`WRONG! Box #${box.id} TIN: ${box.tin} - No payment. Mood -10.`);
        }
        
        // Remove the box
        carriedBoxes.splice(i, 1);
        box.sprite.destroy();
        box.label.destroy();
    }
    
    // Update displays
    document.getElementById('money-display').textContent = `Money: $${money}`;
    
    console.log(`Submitted ${processedBoxes.length} boxes, earned $${totalEarned} total`);
}

// Function to process all unprocessed boxes
function processAllBoxes() {
    const maxSlots = getCurrentLevel().irsSlots;
    const unprocessedBoxes = carriedBoxes.filter(box => box.result === undefined);
    if (unprocessedBoxes.length === 0) return;
    
    // Check if player is near IRS machine
    const distance = Phaser.Math.Distance.Between(player.x, player.y, irsMachine.x, irsMachine.y);
    if (distance > 96) return;
    
    // Process up to available slots
    const availableSlots = maxSlots - processingBoxes.length;
    const boxesToProcess = Math.min(availableSlots, unprocessedBoxes.length);
    
    for (let i = 0; i < boxesToProcess; i++) {
        const boxToProcess = unprocessedBoxes[i];
        const index = carriedBoxes.indexOf(boxToProcess);
        carriedBoxes.splice(index, 1);
        
        processingBoxes.push(boxToProcess);
        
        // Position box in machine (stack them vertically)
        const slotIndex = processingBoxes.length - 1;
        const yOffset = 24 + (slotIndex * 30);
        boxToProcess.sprite.setPosition(irsMachine.x, irsMachine.y + yOffset);
        boxToProcess.sprite.setScale(0.67); // Keep smaller size
        boxToProcess.sprite.setVisible(true);
        boxToProcess.label.setPosition(irsMachine.x, irsMachine.y + yOffset); // Center text on paper
        boxToProcess.label.setScale(1.0);
        boxToProcess.label.setVisible(true);
        
        // Update box data position
        boxToProcess.x = irsMachine.x;
        boxToProcess.y = irsMachine.y + yOffset;
        
        console.log(`Started processing box #${boxToProcess.id} in slot ${slotIndex + 1}/${maxSlots}`);
        
        // Set processing timer for this box
        const processingTime = getProcessingTime();
        boxToProcess.processingStartTime = Date.now();
        boxToProcess.originalProcessingTime = processingTime;
        
        setTimeout(() => {
            completeProcessing(boxToProcess);
        }, processingTime);
    }
    
}

// Function to use 0-card shortcut
function use0Card() {
    if (carriedBoxes.length === 0) return; // Need to be carrying a box
    
    // Reset index if it's out of bounds
    if (spaceCardIndex >= carriedBoxes.length) {
        spaceCardIndex = 0;
    }
    
    // Find next changeable box starting from current index
    let attempts = 0;
    while (attempts < carriedBoxes.length) {
        const targetBox = carriedBoxes[spaceCardIndex];
        
        // Check if this box can be changed
        if (targetBox.result !== undefined) {
            // Can only reset SPACE assignments, not pre-validated or IRS machine results
            if (targetBox.assignedVia === 'space') {
                // Reset the box to unprocessed state
                targetBox.result = undefined;
                targetBox.assignedVia = undefined;
                targetBox.preValidated = false;
                targetBox.sprite.clearTint(); // Back to original color
                console.log(`Reset validation for box #${targetBox.id} (index ${spaceCardIndex})`);
                
                // Move to next box for next SPACE press
                spaceCardIndex = (spaceCardIndex + 1) % carriedBoxes.length;
                return;
            } else if (targetBox.assignedVia === 'prevalidated') {
                console.log(`Cannot change pre-validated result for box #${targetBox.id} (index ${spaceCardIndex})`);
            } else {
                console.log(`Cannot reset IRS machine result for box #${targetBox.id} (index ${spaceCardIndex})`);
            }
        } else {
            // Assign 0-card result to this unprocessed box
            targetBox.result = 0;
            targetBox.assignedVia = 'space';
            targetBox.sprite.setTint(0xff0000); // Red tint
            console.log(`Used 0-card on box #${targetBox.id} (index ${spaceCardIndex})`);
            
            // Move to next box for next SPACE press
            spaceCardIndex = (spaceCardIndex + 1) % carriedBoxes.length;
            return;
        }
        
        // Move to next box and try again
        spaceCardIndex = (spaceCardIndex + 1) % carriedBoxes.length;
        attempts++;
    }
    
    console.log("No boxes available for 0-card assignment");
}

// Function to bribe IRS for faster processing (cycles through boxes individually)
function bribeIRS() {
    const scene = game.scene.scenes[0]; // Get the main scene
    if (processingBoxes.length === 0) {
        console.log("No boxes being processed to bribe for");
        return;
    }
    
    // Reset bribe index if it's out of bounds
    if (bribeIndex >= processingBoxes.length) {
        bribeIndex = 0;
    }
    
    // Find next unbribed box starting from current bribe index
    let attempts = 0;
    let targetBox = null;
    
    while (attempts < processingBoxes.length) {
        const candidateBox = processingBoxes[bribeIndex];
        
        if (!candidateBox.isBribed) {
            targetBox = candidateBox;
            break;
        }
        
        // Move to next box and try again
        bribeIndex = (bribeIndex + 1) % processingBoxes.length;
        attempts++;
    }
    
    if (!targetBox) {
        console.log("All processing boxes have already been bribed");
        return;
    }
    
    // Calculate cost with 2x multiplier for Senior+ levels
    const currentLevel = getCurrentLevel();
    const baseCost = currentLevel.bribeCost;
    const multiplier = level >= 2 ? 2 : 1; // Senior+ pay 2x
    const totalCost = baseCost * multiplier;
    
    if (money < totalCost) {
        console.log(`Not enough money to bribe! Need $${totalCost}, have $${money}`);
        return;
    }
    
    // Pay the bribe cost
    money -= totalCost;
    targetBox.isBribed = true;
    
    // Add yellow border graphics to show bribed status
    if (!targetBox.bribeBorder) {
        targetBox.bribeBorder = scene.add.graphics();
        targetBox.bribeBorder.lineStyle(4, 0xffff00); // Yellow border, 4px thick
        
        // Get banner dimensions (assuming banner is scaled to 0.67)
        const bannerWidth = targetBox.sprite.width * 0.67;
        const bannerHeight = targetBox.sprite.height * 0.67;
        
        // Draw rectangle border around the banner
        targetBox.bribeBorder.strokeRect(
            targetBox.sprite.x - bannerWidth/2, 
            targetBox.sprite.y - bannerHeight/2, 
            bannerWidth, 
            bannerHeight
        );
    }
    
    // Calculate remaining processing time and speed it up by 80%
    const elapsed = Date.now() - targetBox.processingStartTime;
    const remaining = targetBox.originalProcessingTime - elapsed;
    const acceleratedTime = remaining * 0.2; // 80% faster = 20% of original time
    
    // Clear the old timeout and set a new faster one
    setTimeout(() => {
        if (processingBoxes.includes(targetBox)) {
            completeProcessing(targetBox);
        }
    }, Math.max(100, acceleratedTime)); // Minimum 100ms
    
    console.log(`Bribed IRS for $${totalCost}! Box #${targetBox.id} (index ${bribeIndex}) processing accelerated by 80%`);
    
    // Move to next box for next bribe
    bribeIndex = (bribeIndex + 1) % processingBoxes.length;
    
    // Update money display
    document.getElementById('money-display').textContent = `Money: $${money}`;
}

// Update function - main game loop
function update() {
    // Handle pause toggle and election results
    if (Phaser.Input.Keyboard.JustDown(keys.p)) {
        // Check if we're showing election results
        if (this.electionResultsUI) {
            closeElection();
            return;
        }
        
        // Normal pause toggle
        gameIsPaused = !gameIsPaused;
        if (gameIsPaused) {
            this.pauseStartTime = Date.now();
            console.log("Game PAUSED");
        } else {
            pausedTime += Date.now() - this.pauseStartTime;
            console.log("Game RESUMED");
        }
    }
    
    // Skip all game logic if paused (except during elections and results)
    if (gameIsPaused && !isElectionActive && !this.electionResultsUI) {
        // Show pause indicator
        if (!this.pauseText) {
            this.pauseText = this.add.text(480, 360, 'PAUSED\nPress P to Resume', {
                fontSize: '48px',
                fill: '#ffffff',
                fontFamily: 'Arial',
                align: 'center',
                backgroundColor: '#000000',
                padding: { x: 20, y: 20 }
            }).setOrigin(0.5);
            this.pauseText.setDepth(1000); // Ensure it's on top
        }
        return;
    } else {
        // Remove pause indicator
        if (this.pauseText) {
            this.pauseText.destroy();
            this.pauseText = null;
        }
    }
    
    // If showing election results, skip other game logic
    if (this.electionResultsUI) {
        return;
    }
    
    // Handle voting keys (1, 2, 3) - allow during elections even when paused
    if (isElectionActive) {
        if (Phaser.Input.Keyboard.JustDown(keys.one)) {
            vote(0);
        }
        if (Phaser.Input.Keyboard.JustDown(keys.two)) {
            vote(1);
        }
        if (Phaser.Input.Keyboard.JustDown(keys.three)) {
            vote(2);
        }
        
        // If game is paused for election, skip other game logic
        if (gameIsPaused) {
            return;
        }
    }
    
    // Player movement with level bonus
    const baseSpeed = 300; // Increased from 200 (1.5x faster)
    const speedBonus = getCurrentLevel().speedBonus;
    const speed = baseSpeed + speedBonus;
    
    // Track if player is moving
    let isMoving = false;
    let movingLeft = false;
    let movingRight = false;
    
    // Check WASD keys and move player
    if (keys.w.isDown) {
        player.y -= speed * this.sys.game.loop.delta / 1000;
        isMoving = true;
    }
    if (keys.s.isDown) {
        player.y += speed * this.sys.game.loop.delta / 1000;
        isMoving = true;
    }
    if (keys.a.isDown) {
        player.x -= speed * this.sys.game.loop.delta / 1000;
        isMoving = true;
        movingLeft = true;
        lastDirection = 'left';
    }
    if (keys.d.isDown) {
        player.x += speed * this.sys.game.loop.delta / 1000;
        isMoving = true;
        movingRight = true;
        lastDirection = 'right';
    }
    
    // Update player state based on movement
    if (!isMoving) {
        playerState = 'idle';
    } else if (movingLeft) {
        playerState = 'walking-left';
    } else if (movingRight) {
        playerState = 'walking-right';
    } else {
        // Moving up/down only - use last direction for walking animation
        playerState = lastDirection === 'left' ? 'walking-left' : 'walking-right';
    }
    
    // Update animation timer and frame
    if (isMoving) {
        animationTimer += this.sys.game.loop.delta;
        if (animationTimer >= ANIMATION_SPEED) {
            walkFrame = walkFrame === 1 ? 2 : 1; // Toggle between 1 and 2
            animationTimer = 0;
        }
    }
    
    // Update player sprite
    updatePlayerSprite();
    
    // Keep player within world boundaries, away from border tiles
    // Player is 57x57 (29px radius), borders are 16px wide
    // Left/Right: 45px from edges, Top/Bottom: 53px from edges (extra 8px gap)
    player.x = Phaser.Math.Clamp(player.x, 45, 1152 - 45);
    player.y = Phaser.Math.Clamp(player.y, 53, 720 - 53);
    
    
    // Handle E key for pickup OR processing OR submission
    if (Phaser.Input.Keyboard.JustDown(keys.e)) {
        // Check if near return station first (for processed boxes)
        const returnDistance = Phaser.Math.Distance.Between(player.x, player.y, returnStation.x, returnStation.y);
        const hasProcessedBox = carriedBoxes.some(box => box.result !== undefined);
        if (returnDistance <= 96 && hasProcessedBox) {
            // Submit ALL processed boxes
            submitAllBoxes();
        } else {
            // Check if near IRS machine (for processing)
            const machineDistance = Phaser.Math.Distance.Between(player.x, player.y, irsMachine.x, irsMachine.y);
            const hasUnprocessedBox = carriedBoxes.some(box => box.result === undefined);
            const maxSlots = getCurrentLevel().irsSlots;
            if (machineDistance <= 96 && processingBoxes.length < maxSlots && hasUnprocessedBox) {
                // Process ALL unprocessed boxes
                processAllBoxes();
            } else {
                // Try to pick up (if not at capacity)
                const maxCapacity = getCurrentLevel().carryCapacity;
                if (carriedBoxes.length < maxCapacity) {
                    pickupBox();
                }
            }
        }
    }
    
    // Handle Q key for drop
    if (Phaser.Input.Keyboard.JustDown(keys.q)) {
        dropBox();
    }
    
    // Handle SPACE key for 0-card shortcut
    if (Phaser.Input.Keyboard.JustDown(keys.space)) {
        use0Card();
    }
    
    // Handle B key for bribing IRS
    if (Phaser.Input.Keyboard.JustDown(keys.b)) {
        bribeIRS();
    }
    
    // Handle T key for testing elections (dev shortcut)
    if (Phaser.Input.Keyboard.JustDown(keys.t) && !isElectionActive) {
        console.log("DEBUG: Triggering test election");
        startElection();
    }
    
    
    // Update carried boxes position (show as small banners following player)
    for (let i = 0; i < carriedBoxes.length; i++) {
        const box = carriedBoxes[i];
        const offsetX = 24 + (i * 18); // Stack them horizontally
        const offsetY = -24;
        
        box.sprite.setPosition(player.x + offsetX, player.y + offsetY);
        box.sprite.setScale(0.6); // Make it smaller when carried
        box.sprite.setVisible(true); // Make sure it's visible
        box.label.setPosition(player.x + offsetX, player.y + offsetY); // Center the text on the banner
        box.label.setScale(0.6); // Smaller label too
        box.label.setVisible(true);
    }
    
    // Update box positions for non-physics boxes
    for (let box of boxes) {
        // If box is moving on belt, sync position with sprite
        if (box.isMoving) {
            box.x = box.sprite.x;
            box.y = box.sprite.y;
            
            // Check if box reached the end
            if (box.x >= box.endX - 5) {
                box.isMoving = false;
            }
        }
        box.label.setPosition(box.x, box.y);
    }
    
    // Update game timer (show elapsed time excluding paused time)
    const elapsedSeconds = Math.floor((Date.now() - gameStartTime - pausedTime) / 1000);
    document.getElementById('timer-display').textContent = formatTime(elapsedSeconds);
    
    // Check for election time
    const currentGameTime = Date.now() - gameStartTime - pausedTime;
    if (!isElectionActive && currentGameTime >= nextElectionTime) {
        startElection();
    }
    
    // Check for expired boxes
    const expirationTime = getBoxExpirationTime();
    const currentTime = Date.now();
    
    for (let i = boxes.length - 1; i >= 0; i--) {
        const box = boxes[i];
        
        // Skip if box is being processed or already processed
        if (processingBoxes.includes(box) || box.result !== undefined) continue;
        
        // Check if box has expired (account for paused time)
        const boxAge = currentTime - box.spawnTime - (box.pausedDuringLife || 0);
        if (boxAge > expirationTime) {
            // Remove expired box and penalize happiness
            box.sprite.destroy();
            box.label.destroy();
            boxes.splice(i, 1);
            updateHappiness(-5);
            console.log(`Box #${box.id} expired after ${Math.floor(expirationTime/1000)}s. Mood -5.`);
        }
    }
}

// Initialize the game
game = new Phaser.Game(config);