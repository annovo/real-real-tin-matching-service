// Real-Time TIN Matching Service - Game Logic
// Phase 1: Basic Foundation

// ===== GAME CONSTANTS =====

// Display/Screen Dimensions
const GAME_WIDTH = 900; // Added 50px more
const GAME_HEIGHT = 720;
const PLAYER_START_X = 450; // Centered in new width
const PLAYER_START_Y = 360;

// Sprite Scales
const PLAYER_SCALE = 0.25;
const IRS_MACHINE_SCALE = 0.2;
const RETURN_STATION_SCALE = 0.2;
const PUT_HERE_TEXT_SCALE = 0.1;
const WALL_TILE_SCALE = 0.5;
const BELT_SCALE = 0.5;
const TIN_PAPER_SCALE = 0.67;
const THINKING_DOT_SMALL_SCALE = 0.5;
const THINKING_DOT_LARGE_SCALE = 0.6;
const CARRIED_BOX_SCALE = 0.6;

// Timing/Animation Values
const ANIMATION_SPEED = 300; // milliseconds between walk frames
const THINKING_DOT_ANIMATION_DELAY = 400;
const ELECTION_DELAY = 30000; // 30 seconds
const BOX_SPAWN_CHECK_INTERVAL = 1000;
const BOX_SLIDE_DURATION = 8000; // 8 seconds
const BACKGROUND_MUSIC_VOLUME = 0.5;
const BRIBE_SPEED_MULTIPLIER = 0.2; // 80% faster = 20% of original time

// Distance Thresholds
const PICKUP_DISTANCE = 60;
const INTERACTION_DISTANCE = 96;
const PLAYER_BOUNDARY_MARGIN_X = 45;
const PLAYER_BOUNDARY_MARGIN_Y_TOP = 100; // Character can't go beyond 100px from top
const PLAYER_BOUNDARY_MARGIN_Y_BOTTOM = 60; // Character can't go beyond 60px from bottom (10px bigger)

// Positioning/Layout  
const TILE_SIZE = 80;
const WALL_TILE_SPACING = 20;
const BELT_Y = 200;
const BELT_START_X = 100; // Belt start position (moved 100px left)
const IRS_MACHINE_X = 800; // Adjusted for new width
const IRS_MACHINE_Y = 300;
const RETURN_STATION_X = 420;
const RETURN_STATION_Y = 660;
const PUT_HERE_TEXT_X = 420;
const PUT_HERE_TEXT_Y = 610;
const BOX_SPAWN_OFFSET = 40;
const BOX_GAP_SIZE = 80;
const PAPER_Y_OFFSET = -10;
const PROCESSING_SLOT_BASE_Y = 24;
const PROCESSING_SLOT_SPACING = 30;
const THINKING_DOTS_Y_OFFSET = -60;
const THINKING_DOTS_X_START_OFFSET = -25;
const THINKING_DOTS_SPACING = 20;
const CARRIED_BOX_X_SPACING = 18;
const CARRIED_BOX_Y_OFFSET = -24;
const CARRIED_BOX_BASE_OFFSET = 24;

// Game Balance/Economy
const INITIAL_ELECTION_TIME = 30000;
const MAX_HAPPINESS = 100;
const MIN_HAPPINESS = -100;
const PROMOTION_THRESHOLD = 100;
const GAME_OVER_HAPPINESS = -100;
const VOTE_BONUS_PERCENTAGE = 20;
const GAME_DURATION_MINUTES = 30;
const BAD_TIN_GENERATION_CHANCE = 0.3;
const TIN_VALIDITY_CHANCE = 0.5;
const MAX_BOXES_LIMIT = 100;
const PRE_VALIDATION_CHANCE = 0.3;
const BASE_PLAYER_SPEED = 300;
const BRIBE_COST_MULTIPLIER_THRESHOLD = 2; // Senior level

// Payment amounts by level
const LEVEL_PAYMENTS = [100, 500, 1000];

// Colors (Tint Values)
const VALID_BOX_TINT = 0x00ff00; // Green
const INVALID_BOX_TINT = 0xff0000; // Red  
const ZERO_CARD_TINT = 0xff0000; // Red
const BRIBE_BORDER_TINT = 0xffff00; // Yellow

// Depth Values (Z-Index Map) - Floor at bottom, everything else above
const FLOOR_DEPTH = 0;             // Base layer - behind everything
const WALLPAPER_DEPTH = 1;         // Above floor
const WALL_LINING_DEPTH = 2;       // Above wallpaper
const VERTICAL_WALLS_DEPTH = 3;    // Above lining
const TOP_EDGE_DEPTH = 5;          // Above walls
const STATION_DEPTH = 6;           // Above floor and walls
const PLAYER_DEPTH = 10;           // Above stations and walls
const THINKING_DOTS_DEPTH = 11;    // Above player
const PAUSE_TEXT_DEPTH = 1000;     // UI layer
const ELECTION_UI_BACKGROUND_DEPTH = 2000;
const ELECTION_UI_TEXT_DEPTH = 2001;

// Font Sizes
const ELECTION_TITLE_FONT_SIZE = '32px';
const ELECTION_INSTRUCTIONS_FONT_SIZE = '18px';
const CANDIDATE_NAME_FONT_SIZE = '20px';
const CANDIDATE_DESCRIPTION_FONT_SIZE = '14px';
const RESULTS_TITLE_FONT_SIZE = '32px';
const VOTE_TEXT_FONT_SIZE = '18px';
const WINNER_TEXT_FONT_SIZE = '28px';
const TIN_TEXT_FONT_SIZE = '16px';
const PAUSE_TEXT_FONT_SIZE = '48px';

// Election UI Layout
const ELECTION_UI_X = 480;
const ELECTION_UI_Y = 360;
const ELECTION_UI_WIDTH = 600;
const ELECTION_UI_HEIGHT = 400;
const ELECTION_RESULTS_HEIGHT = 350;
const ELECTION_TITLE_Y = 200;
const ELECTION_INSTRUCTIONS_Y = 240;
const CANDIDATE_START_Y = 290;
const CANDIDATE_Y_SPACING = 60;

// Dialog UI Constants
const DIALOG_X = 450; // Center of 900px screen
const DIALOG_Y = 360; // Center of 720px screen
const DIALOG_SCALE = 0.40; // 20% bigger than previous 0.33 scale
const DIALOG_TITLE_Y_OFFSET = -50;
const DIALOG_TEXT_Y_OFFSET = -30;
const DIALOG_TEXT_FONT_SIZE = '18px'; // 12px * 1.5 = 18px
const DIALOG_TITLE_FONT_SIZE = '21px'; // 14px * 1.5 = 21px
const DIALOG_TEXT_MAX_WIDTH = 300;
const DIALOG_DEPTH = 3000;

// Processing Time Ranges
const MIN_SPAWN_DELAY = 2000; // 2 seconds
const MAX_SPAWN_DELAY = 5000; // 5 seconds
const MIN_PROCESSING_TIME = 2000; // 2 seconds  
const MAX_PROCESSING_TIME = 5000; // 5 seconds

// Wall Constants
const TOP_WALL_HEIGHT = 120; // 1.5x longer (80 * 1.5 = 120)
const WALL_LINING_HEIGHT = 10;
const TOP_WALL_Y_OFFSET = 10;
const VERTICAL_WALL_START_Y = 15; // Start vertical walls close to top edge to minimize gap
const WINDOW_X = 120; // Position from left edge (moved 50px more right)
const WINDOW_Y = 50; // Position from top edge (~50px from top)
const WINDOW_SCALE = 0.432; // 1.2x bigger again (0.36 * 1.2 = 0.432)
const WINDOW_DEPTH = 4; // Above walls but below other objects
const TABLES_X = GAME_WIDTH - 160; // Moved 20px to the right
const TABLES_Y = 95; // Moved up 5px more (was 100, now 95 from top edge)
const TABLES_SCALE = 0.6; // 2x bigger (was 0.3, now 0.6)
const TABLES_DEPTH = 5; // Above walls, visible on floor
const PLANT_X = 65; // Moved 5px more to the right
const PLANT_Y = GAME_HEIGHT - 100; // 100px from bottom
const CAT_X = PLANT_X + 70; // 70px to the right of the plant (50px more)
const CAT_Y = RETURN_STATION_Y - 20; // Slightly above the hole
const CAT_SCALE = 0.3; // Appropriate size
const CAT_DEPTH = 7; // Above stations
const CAT_ANIMATION_DELAY = 1000; // Switch between images every second
const PLANT_SCALE = 0.133; // 1.5x smaller (0.2 / 1.5 = 0.133)
const PLANT_DEPTH = 6; // Above stations
const WALLPAPER_FALLBACK_COLOR = 0x8B4513; // Brown color
const WALL_LINING_FALLBACK_COLOR = 0x654321; // Dark brown color
const WALL_TILE_FALLBACK_COLOR = 0x666666; // Gray color
const WINDOW_FALLBACK_COLOR = 0x87CEEB; // Light blue color
const TABLES_FALLBACK_COLOR = 0x8B4513; // Brown color
const CAT_FALLBACK_COLOR = 0x8B4513; // Brown color
const PLANT_FALLBACK_COLOR = 0x228B22; // Green color

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
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
let boxes = [];
let boxIdCounter = 1;
let carriedBoxes = [];
let irsMachine;
let processingBoxes = [];
let processingStatus;
let gameScene; // Reference to the current scene for adding objects
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
let welcomeDialogActive = true; // Track if welcome dialog should be shown
let dialogStep = 1; // Track which dialog step we're on (1 = hired, 2 = responsibilities, 3 = one more thing)

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

// Current election effects (set to default since elections are disabled)
let activeElectionEffects = {
    processingSpeed: 1.0,  // No speed change
    paymentBonus: 1.0,     // No payment bonus
    moodProtection: 1.0    // No mood protection
};

// Level system (mood-based progression)
const levels = [
    { name: 'Junior', initMood: 50, speedBonus: 0, carryCapacity: 1, irsSlots: 1, preValidated: false, moodGainRate: 5.0, moodLossRate: 1.0, spawnSpeedMultiplier: 0.95, bribeCost: 200 },
    { name: 'Mid', initMood: 35, speedBonus: 100, carryCapacity: 2, irsSlots: 1, preValidated: false, moodGainRate: 3.5, moodLossRate: 1.2, spawnSpeedMultiplier: 1.5, bribeCost: 500 },
    { name: 'Senior', initMood: 25, speedBonus: 100, carryCapacity: 2, irsSlots: 2, preValidated: false, moodGainRate: 2.5, moodLossRate: 1.4, spawnSpeedMultiplier: 1.71, bribeCost: 2000 }
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

// Function to check for promotion or game win
function checkPromotion() {
    if (level === 2 && happiness >= 100) {
        // Win condition: Senior level with 100 mood
        alert('VICTORY! You have reached maximum happiness as a Senior employee! You win!');
        console.log('GAME WON: Senior level reached 100 mood');
        return true;
    } else if (level < levels.length - 1 && happiness >= 100) {
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


// Function to show welcome dialog
function showWelcomeDialog() {
    const scene = game.scene.scenes[0];
    
    // Pause the game while dialog is shown
    gameIsPaused = true;
    
    // Create dialog background
    const dialogBg = scene.add.image(DIALOG_X, DIALOG_Y, 'dialog');
    dialogBg.setScale(DIALOG_SCALE);
    dialogBg.setDepth(DIALOG_DEPTH);
    
    // Subject text (250px from left, 1.5x bigger font)
    const subjectText = scene.add.text(DIALOG_X - 400 + 250, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Subject:', {
        fontSize: '32px', // 21px * 1.5 = 31.5px, rounded to 32px
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        fontWeight: '600'
    }).setOrigin(0, 0.5);
    subjectText.setDepth(DIALOG_DEPTH + 1);
    
    // "You're hired!" text (same row as Subject, 60px to the right of center)
    const hiredText = scene.add.text(DIALOG_X + 80, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'You\'re hired!', {
        fontSize: DIALOG_TITLE_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    hiredText.setDepth(DIALOG_DEPTH + 1);
    
    // Main dialog text
    const dialogText = `Congratulations! You've been hired by AxBit!

As you know, our company's mission is to uphold justice and integrity — and that includes verifying whether our customers' TINs are valid.

Our previous engineer, Mravis, built a system to perform real-time TIN matching. Fortunately for you, he was consumed by greed and left to pursue a "div-centering" career.

Now, you've been chosen to maintain this masterpiece. Good luck!`;
    
    const mainText = scene.add.text(DIALOG_X, DIALOG_Y + DIALOG_TEXT_Y_OFFSET + 60, dialogText, {
        fontSize: DIALOG_TEXT_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        wordWrap: { width: DIALOG_TEXT_MAX_WIDTH }
    }).setOrigin(0.5);
    mainText.setDepth(DIALOG_DEPTH + 1);
    
    // Accept button at bottom right corner of dialog
    const buttonX = DIALOG_X + 115; // 3px more to the left (118 - 3 = 115)
    const buttonY = DIALOG_Y + 154; // 4px more down (150 + 4 = 154)
    
    const acceptButton = scene.add.image(buttonX, buttonY, 'button');
    acceptButton.setScale(0.08); // Slightly smaller (0.1 reduced for 2px effect)
    acceptButton.setDepth(DIALOG_DEPTH + 1);
    
    // "Accept (Y)" text on the button
    const buttonText = scene.add.text(buttonX, buttonY, 'Accept (Y)', {
        fontSize: '14px',
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontWeight: 'bold'
    }).setOrigin(0.5);
    buttonText.setDepth(DIALOG_DEPTH + 2);
    
    // Store dialog elements for cleanup
    scene.welcomeDialogUI = [dialogBg, subjectText, hiredText, mainText, acceptButton, buttonText];
}

// Function to show responsibilities dialog
function showResponsibilitiesDialog() {
    const scene = game.scene.scenes[0];
    
    // Pause the game while dialog is shown
    gameIsPaused = true;
    
    // Create dialog background
    const dialogBg = scene.add.image(DIALOG_X, DIALOG_Y, 'dialog');
    dialogBg.setScale(DIALOG_SCALE);
    dialogBg.setDepth(DIALOG_DEPTH);
    
    // Subject text (same position as before)
    const subjectText = scene.add.text(DIALOG_X - 400 + 250, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Subject:', {
        fontSize: '32px', // 21px * 1.5 = 31.5px, rounded to 32px
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        fontWeight: '600'
    }).setOrigin(0, 0.5);
    subjectText.setDepth(DIALOG_DEPTH + 1);
    
    // "Your Responsibilities" text (same row as Subject, 50px to the right)
    const responsibilitiesText = scene.add.text(DIALOG_X + 80, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Your Responsibilities', {
        fontSize: DIALOG_TITLE_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    responsibilitiesText.setDepth(DIALOG_DEPTH + 1);
    
    // Main responsibilities text
    const dialogText = `To verify TINs, you must submit them to the IRS for matching. Once results are received, promptly share them with leadership.

Remember, our system operates in real time — speed is critical. API responses must stay under 30 seconds. If a TIN expires before it's processed, it vanishes forever… and an unhappy customer makes us very unhappy. When we're unhappy, your job may vanish too.

But deliver excellent work, and who knows — a promotion might be waiting for you in the next review cycle.`;
    
    const mainText = scene.add.text(DIALOG_X, DIALOG_Y + DIALOG_TEXT_Y_OFFSET + 60, dialogText, {
        fontSize: DIALOG_TEXT_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        wordWrap: { width: DIALOG_TEXT_MAX_WIDTH }
    }).setOrigin(0.5);
    mainText.setDepth(DIALOG_DEPTH + 1);
    
    // Accept button at bottom right corner of dialog
    const buttonX = DIALOG_X + 115;
    const buttonY = DIALOG_Y + 154;
    
    const acceptButton = scene.add.image(buttonX, buttonY, 'button');
    acceptButton.setScale(0.08);
    acceptButton.setDepth(DIALOG_DEPTH + 1);
    
    // "Accept (Y)" text on the button
    const buttonText = scene.add.text(buttonX, buttonY, 'Accept (Y)', {
        fontSize: '14px',
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontWeight: 'bold'
    }).setOrigin(0.5);
    buttonText.setDepth(DIALOG_DEPTH + 2);
    
    // Store dialog elements for cleanup
    scene.welcomeDialogUI = [dialogBg, subjectText, responsibilitiesText, mainText, acceptButton, buttonText];
}

// Function to show "One More Thing" dialog
function showOneMoreThingDialog() {
    const scene = game.scene.scenes[0];
    
    // Pause the game while dialog is shown
    gameIsPaused = true;
    
    // Create dialog background
    const dialogBg = scene.add.image(DIALOG_X, DIALOG_Y, 'dialog');
    dialogBg.setScale(DIALOG_SCALE);
    dialogBg.setDepth(DIALOG_DEPTH);
    
    // Subject text (same position as before)
    const subjectText = scene.add.text(DIALOG_X - 400 + 250, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Subject:', {
        fontSize: '32px', // 21px * 1.5 = 31.5px, rounded to 32px
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        fontWeight: '600'
    }).setOrigin(0, 0.5);
    subjectText.setDepth(DIALOG_DEPTH + 1);
    
    // "One More Thing" text (same row as Subject, 50px to the right)
    const oneMoreThingText = scene.add.text(DIALOG_X + 80, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'One More Thing', {
        fontSize: DIALOG_TITLE_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    oneMoreThingText.setDepth(DIALOG_DEPTH + 1);
    
    // Main dialog text
    const dialogText = `Ah, before we forget! Of course, we don't need to explain this to a professional like you — but some TINs are obviously invalid (e.g., 000000000). You can mark those as bad right away (B) to avoid overloading the government service.

However, if you submit incorrect results… we'll be very, very upset. And when we're upset — well, you know what happens.`;
    
    const mainText = scene.add.text(DIALOG_X, DIALOG_Y + DIALOG_TEXT_Y_OFFSET + 20, dialogText, {
        fontSize: DIALOG_TEXT_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        wordWrap: { width: DIALOG_TEXT_MAX_WIDTH }
    }).setOrigin(0.5);
    mainText.setDepth(DIALOG_DEPTH + 1);
    
    // Accept button at bottom right corner of dialog
    const buttonX = DIALOG_X + 115;
    const buttonY = DIALOG_Y + 154;
    
    const acceptButton = scene.add.image(buttonX, buttonY, 'button');
    acceptButton.setScale(0.08);
    acceptButton.setDepth(DIALOG_DEPTH + 1);
    
    // "Accept (Y)" text on the button
    const buttonText = scene.add.text(buttonX, buttonY, 'Accept (Y)', {
        fontSize: '14px',
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontWeight: 'bold'
    }).setOrigin(0.5);
    buttonText.setDepth(DIALOG_DEPTH + 2);
    
    // Store dialog elements for cleanup
    scene.welcomeDialogUI = [dialogBg, subjectText, oneMoreThingText, mainText, acceptButton, buttonText];
}

// Function to close welcome dialog
function closeWelcomeDialog() {
    const scene = game.scene.scenes[0];
    
    if (scene.welcomeDialogUI) {
        scene.welcomeDialogUI.forEach(element => element.destroy());
        scene.welcomeDialogUI = null;
    }
    
    // Check which dialog step we're on
    if (dialogStep === 1) {
        // Show responsibilities dialog next
        dialogStep = 2;
        showResponsibilitiesDialog();
        return;
    } else if (dialogStep === 2) {
        // Show one more thing dialog next
        dialogStep = 3;
        showOneMoreThingDialog();
        return;
    } else {
        // Close all dialogs and start game
        welcomeDialogActive = false;
        gameIsPaused = false;
        
        // Start the game timer now that dialogs are closed
        if (!gameStartTime) {
            gameStartTime = Date.now();
        }
        
        // Start background music now
        const gameScene = game.scene.scenes[0];
        if (gameScene.bgMusic && !gameScene.bgMusic.isPlaying) {
            gameScene.bgMusic.play();
        }
        
        console.log("All dialogs closed. Game started.");
    }
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

// Function to start an election - COMMENTED OUT FOR NOW
/*
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
*/

// ALL ELECTION FUNCTIONS COMMENTED OUT FOR NOW
/*
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
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Instructions
    const instructions = scene.add.text(480, 240, 'Press 1, 2, or 3 to vote:', {
        fontSize: '18px',
        fill: '#ffff00',
        fontFamily: '"Jersey 15", sans-serif',
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
            fontFamily: '"Jersey 15", sans-serif',
            align: 'center'
        }).setOrigin(0.5).setDepth(2001);
        
        // Candidate description
        const descText = scene.add.text(480, y + 20, candidate.description, {
            fontSize: '14px',
            fill: '#cccccc',
            fontFamily: '"Jersey 15", sans-serif',
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
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Show who player voted for
    const voteText = scene.add.text(480, 300, `You voted for: ${votedCandidate.name}`, {
        fontSize: '18px',
        fill: '#cccccc',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Winner announcement with color based on if player's choice won
    const winnerColor = winner === votedCandidate ? '#00ff00' : '#ff8800';
    const winnerText = scene.add.text(480, 340, `${winner.name} WINS!`, {
        fontSize: '28px',
        fill: winnerColor,
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Effect description
    const effectText = scene.add.text(480, 380, winner.description, {
        fontSize: '18px',
        fill: '#ffff00',
        fontFamily: '"Jersey 15", sans-serif',
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
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center'
    }).setOrigin(0.5).setDepth(2001);
    
    // Instructions
    const instructions = scene.add.text(480, 450, 'Press P to continue', {
        fontSize: '18px',
        fill: '#ffffff',
        fontFamily: '"Jersey 15", sans-serif',
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
*/

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
    const baseDelay = Math.max(MIN_SPAWN_DELAY, MAX_SPAWN_DELAY - (difficulty * 3000)); // 5s to 2s
    const levelMultiplier = getCurrentLevel().spawnSpeedMultiplier;
    return baseDelay / levelMultiplier; // Faster spawn at higher levels
}

// Function to get current processing time
function getProcessingTime() {
    const difficulty = getDifficulty();
    const baseTime = Math.max(MIN_PROCESSING_TIME, MAX_PROCESSING_TIME - (difficulty * 3000)); // 5s to 2s
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
    // Removed unused tileset loading
    
    // Load TIN paper image for TIN boxes
    this.load.image('tinPaper', 'assets/images/objects/tin-paper.png');
    
    // Load IRS machine image
    this.load.image('irsMachine', 'assets/images/objects/irs-machine.png');
    
    // Load thinking dot for processing animation
    this.load.image('thinkingDot', 'assets/images/effects/thinking-dot.png');
    
    // Load wall assets
    this.load.image('wallpaper', 'assets/images/backgrounds/wallpaper.png');
    this.load.image('wallLining', 'assets/images/backgrounds/wall-lining.png');
    this.load.image('window', 'assets/images/objects/window.png');
    this.load.image('tables', 'assets/images/objects/tables.png');
    this.load.image('plant', 'assets/images/objects/plant.png');
    
    // Load cat assets
    this.load.image('catLay1', 'assets/images/character/cat/cat-sleep-1.png');
    this.load.image('catLay2', 'assets/images/character/cat/cat-sleep-2.png');
    
    // Load results station image
    this.load.image('resultsStation', 'assets/images/objects/the-hole.png');
    
    // Load put here text for results station
    this.load.image('putHereText', 'assets/images/objects/put-here-txt.png');
    
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
    
    // Load character sprites
    this.load.image('playerIdle', 'assets/images/character/green/front-facing.png');
    this.load.image('playerWalk1Left', 'assets/images/character/green/walk-1-left.png');
    this.load.image('playerWalk2Left', 'assets/images/character/green/walk-2-left.png');
    this.load.image('playerWalk1Right', 'assets/images/character/green/walk-1-right.png');
    this.load.image('playerWalk2Right', 'assets/images/character/green/walk-2-right.png');
    
    // Load background music
    this.load.audio('bgMusic', 'assets/audio/music/Travis_eulogy.mp3');
    
    // Load dialog UI
    this.load.image('dialog', 'assets/images/ui/dialog.png');
    this.load.image('button', 'assets/images/ui/button.png');
    
    // No need for external font loading script
    
    // Add error event listeners
    this.load.on('loaderror', function (event) {
        console.log('Load error:', event);
        if (event.src.includes('wallpaper.png')) {
            console.error('Failed to load wallpaper.png asset!');
        }
        if (event.src.includes('wall-lining.png')) {
            console.error('Failed to load wall-lining.png asset!');
        }
    });
    
    this.load.on('complete', function () {
        console.log('Loading complete');
    });
}

// Create function - sets up the game world
function create() {
    // Store scene reference for use in other functions
    gameScene = this;
    
    // DEBUG: Level selection at start
    const debugLevel = prompt("DEBUG: Choose starting level (0=Junior, 1=Mid, 2=Senior) or press Cancel for Junior:");
    if (debugLevel !== null && !isNaN(debugLevel)) {
        const chosenLevel = Math.max(0, Math.min(2, parseInt(debugLevel)));
        level = chosenLevel;
        happiness = levels[level].initMood;
        console.log(`DEBUG: Starting at ${levels[level].name} level with ${happiness} mood`);
        document.getElementById('level-display').textContent = `Level: ${levels[level].name}`;
        document.getElementById('happiness-display').textContent = `Mood: ${happiness}`;
        updateBribeDisplay(); // Update bribe rate display for debug level
    }
    // Create tiled background with proper borders
    const tileSize = TILE_SIZE; // 80x80 tiles (5x bigger)
    const tilesX = Math.ceil(GAME_WIDTH / tileSize); // Number of tiles needed horizontally
    const tilesY = Math.ceil(GAME_HEIGHT / tileSize); // Number of tiles needed vertically
    
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
    
    // Create the game world
        
        // First pass: Place floor tiles everywhere
        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                const floorTile = this.add.image(x * tileSize + tileSize/2, y * tileSize + tileSize/2, 'floorTile');
                floorTile.setDisplaySize(80, 80);
                floorTile.setDepth(FLOOR_DEPTH);
            }
        }
        
        // Add top edge border first (for collision) - keep original small scale
        const smallTileSpacing = WALL_TILE_SPACING;
        const smallTilesX = Math.ceil(GAME_WIDTH / smallTileSpacing) + 2;
        for (let x = 0; x < smallTilesX; x++) {
            const xPos = x * smallTileSpacing + 10;
            const topTile = this.add.image(xPos, 0, 'wallTileTop');
            topTile.setScale(WALL_TILE_SCALE);
            topTile.setDepth(TOP_EDGE_DEPTH); // Above floor and vertical walls
        }
        
        // Create wallpaper wall behind the top edge
        const tilesPerRow = Math.ceil(GAME_WIDTH / TILE_SIZE);
        
        // Create wallpaper tiles starting from just below the top edge
        for (let x = 0; x < tilesPerRow; x++) {
            const wallpaperX = x * TILE_SIZE + TILE_SIZE/2;
            const wallpaperY = TOP_WALL_HEIGHT/2 + TOP_WALL_Y_OFFSET; // Center the wallpaper vertically
            
            // Try to create wallpaper, fallback to colored rectangle if asset missing
            try {
                const wallpaperTile = this.add.image(wallpaperX, wallpaperY, 'wallpaper');
                wallpaperTile.setDisplaySize(TILE_SIZE, TOP_WALL_HEIGHT);
                wallpaperTile.setDepth(WALLPAPER_DEPTH);
            } catch (error) {
                console.warn('Wallpaper asset not found, using fallback rectangle');
                const fallbackWall = this.add.rectangle(wallpaperX, wallpaperY, TILE_SIZE, TOP_WALL_HEIGHT, WALLPAPER_FALLBACK_COLOR);
                fallbackWall.setDepth(WALLPAPER_DEPTH);
            }
        }
        
        // Add wall lining at the bottom of the wallpaper
        const liningY = TOP_WALL_HEIGHT + TOP_WALL_Y_OFFSET;
        for (let x = 0; x < tilesPerRow; x++) {
            const liningX = x * TILE_SIZE + TILE_SIZE/2;
            
            // Try to create lining, fallback to colored rectangle if asset missing
            try {
                const liningTile = this.add.image(liningX, liningY, 'wallLining');
                liningTile.setDisplaySize(TILE_SIZE, WALL_LINING_HEIGHT);
                liningTile.setDepth(WALL_LINING_DEPTH);
            } catch (error) {
                console.warn('Wall lining asset not found, using fallback rectangle');
                const fallbackLining = this.add.rectangle(liningX, liningY, TILE_SIZE, WALL_LINING_HEIGHT, WALL_LINING_FALLBACK_COLOR);
                fallbackLining.setDepth(WALL_LINING_DEPTH);
            }
        }
        
        // Add bottom edge border with wall tiles
        // Reuse smallTileSpacing and smallTilesX from above
        for (let x = 0; x < smallTilesX; x++) {
            const xPos = x * smallTileSpacing + 10;
            const bottomTile = this.add.image(xPos, GAME_HEIGHT, 'wallTileBottom');
            bottomTile.setScale(WALL_TILE_SCALE);
        }
        
        // Add left edge border with wall tiles
        const verticalTileSpacing = WALL_TILE_SPACING;
        const verticalTilesY = Math.ceil(GAME_HEIGHT / verticalTileSpacing) + 2;
        
        for (let y = 0; y < verticalTilesY; y++) { // Start from y=0, use z-index to handle overlap
            const yPos = y * verticalTileSpacing;
            try {
                const leftTile = this.add.image(0, yPos, 'wallTileLeft');
                leftTile.setScale(1.0); // Make larger and more visible
                leftTile.setDepth(VERTICAL_WALLS_DEPTH);
            } catch (error) {
                console.warn('Left wall tile asset not found, using fallback');
                const fallbackLeft = this.add.rectangle(0, yPos, WALL_TILE_SPACING, WALL_TILE_SPACING, WALL_TILE_FALLBACK_COLOR);
                fallbackLeft.setDepth(VERTICAL_WALLS_DEPTH);
            }
        }
        
        // Add right edge border with wall tiles - start below top edge
        for (let y = 0; y < verticalTilesY; y++) { // Start from y=0, use z-index to handle overlap
            const yPos = y * verticalTileSpacing;
            try {
                const rightTile = this.add.image(GAME_WIDTH, yPos, 'wallTileRight');
                rightTile.setScale(1.0); // Make larger and more visible
                rightTile.setDepth(VERTICAL_WALLS_DEPTH);
            } catch (error) {
                console.warn('Right wall tile asset not found, using fallback');
                const fallbackRight = this.add.rectangle(GAME_WIDTH, yPos, WALL_TILE_SPACING, WALL_TILE_SPACING, WALL_TILE_FALLBACK_COLOR);
                fallbackRight.setDepth(VERTICAL_WALLS_DEPTH);
            }
        }
        
        // Add window on the left wall
        try {
            const window = this.add.image(WINDOW_X, WINDOW_Y, 'window');
            window.setScale(WINDOW_SCALE);
            window.setDepth(WINDOW_DEPTH); // Above walls but below other objects
        } catch (error) {
            console.warn('Window asset not found, using fallback');
            const fallbackWindow = this.add.rectangle(WINDOW_X, WINDOW_Y, 60, 80, WINDOW_FALLBACK_COLOR);
            fallbackWindow.setDepth(WINDOW_DEPTH);
        }
        
        // Add tables on the left side, aligned with wall lining
        try {
            const tables = this.add.image(TABLES_X, TABLES_Y, 'tables');
            tables.setScale(TABLES_SCALE);
            tables.setDepth(TABLES_DEPTH); // Above floor and walls
        } catch (error) {
            console.warn('Tables asset not found, using fallback');
            const fallbackTables = this.add.rectangle(TABLES_X, TABLES_Y, 100, 60, TABLES_FALLBACK_COLOR);
            fallbackTables.setDepth(TABLES_DEPTH);
        }
        
        // Add plant near bottom left
        try {
            const plant = this.add.image(PLANT_X, PLANT_Y, 'plant');
            plant.setScale(PLANT_SCALE);
            plant.setDepth(PLANT_DEPTH); // Above floor and walls
        } catch (error) {
            console.warn('Plant asset not found, using fallback');
            const fallbackPlant = this.add.rectangle(PLANT_X, PLANT_Y, 40, 60, PLANT_FALLBACK_COLOR);
            fallbackPlant.setDepth(PLANT_DEPTH);
        }
        
        // Create horizontal belt for TIN boxes
        const beltStartX = BELT_START_X; // Start position from left
        const beltY = BELT_Y; // Y position for belt
        const beltScale = BELT_SCALE; // Scale for belt pieces
        
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
        
    
    
    // Create player - character sprite at center
    player = this.add.image(PLAYER_START_X, PLAYER_START_Y, 'playerIdle');
    player.setScale(PLAYER_SCALE);
    player.setDepth(PLAYER_DEPTH);
    
    // Create IRS Machine
    irsMachine = this.add.image(IRS_MACHINE_X, IRS_MACHINE_Y, 'irsMachine');
    irsMachine.setScale(IRS_MACHINE_SCALE);
    
    
    // Create Return Station
    returnStation = this.add.image(RETURN_STATION_X, RETURN_STATION_Y, 'resultsStation');
    returnStation.setScale(RETURN_STATION_SCALE);
    returnStation.setDepth(STATION_DEPTH);
    
    // Add "put here" text above the hole
    const putHereText = this.add.image(PUT_HERE_TEXT_X, PUT_HERE_TEXT_Y, 'putHereText');
    putHereText.setScale(PUT_HERE_TEXT_SCALE);
    putHereText.setDepth(STATION_DEPTH);
    
    // Add cat near the hole with alternating animation
    try {
        this.cat = this.add.image(CAT_X, CAT_Y, 'catLay1');
        this.cat.setScale(CAT_SCALE);
        this.cat.setDepth(CAT_DEPTH);
        
        // Create alternating animation between cat images
        this.catCurrentFrame = 1;
        this.catAnimationTimer = this.time.addEvent({
            delay: CAT_ANIMATION_DELAY,
            callback: () => {
                if (this.cat) {
                    this.catCurrentFrame = this.catCurrentFrame === 1 ? 2 : 1;
                    this.cat.setTexture(`catLay${this.catCurrentFrame}`);
                }
            },
            loop: true
        });
    } catch (error) {
        console.warn('Cat assets not found, using fallback');
        const fallbackCat = this.add.rectangle(CAT_X, CAT_Y, 40, 30, 0x8B4513); // Brown color
        fallbackCat.setDepth(CAT_DEPTH);
    }
    
    
    
    
    // Don't record game start time yet - wait for dialog to be dismissed
    // gameStartTime will be set in closeWelcomeDialog()
    
    // Initialize bribe display
    updateBribeDisplay();
    
    // Show welcome dialog if this is the first time
    if (welcomeDialogActive) {
        showWelcomeDialog();
    }
    
    // Create background music (but don't start it yet - wait for dialog to be dismissed)
    this.bgMusic = this.sound.add('bgMusic', { 
        volume: BACKGROUND_MUSIC_VOLUME, 
        loop: true 
    });
    // Music will be started in closeWelcomeDialog()
    
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
    keys.y = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y); // For dismissing dialogs
    
    // Set up dynamic box spawning timer (updates every second)
    this.time.addEvent({
        delay: BOX_SPAWN_CHECK_INTERVAL, // Check every second
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
    const paperY = beltY + PAPER_Y_OFFSET; // 10px higher than belt
    const box = this.add.image(startX, paperY, 'tinPaper');
    box.setScale(TIN_PAPER_SCALE); // 1.5x smaller
    
    // Add TIN number in the middle of the paper
    const boxId = boxIdCounter++;
    const tin = generateRandomTIN();
    const validity = determineTINValidity(tin); // Determine validity at spawn
    const label = this.add.text(startX, paperY, tin, {
        fontSize: '16px',
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center'
    }).setOrigin(0.5);
    
    // Animate the paper sliding to the end of the belt
    const endX = this.beltRightX - 40;
    const slideTime = BOX_SLIDE_DURATION; // Time to traverse the belt
    
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
    
    // Check if this box should be pre-validated (Senior level doesn't have pre-validation)
    let isPreValidated = false;
    // Pre-validation removed since no levels have it anymore
    
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
            box.setTint(VALID_BOX_TINT); // Green tint for valid
        } else {
            box.setTint(INVALID_BOX_TINT); // Red tint for invalid
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
    let nearestDistance = PICKUP_DISTANCE; // Max pickup distance
    
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
    boxToDrop.sprite.setScale(TIN_PAPER_SCALE); // Keep smaller size
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
    if (distance > INTERACTION_DISTANCE) return;
    
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
        boxToComplete.sprite.setTint(VALID_BOX_TINT); // Green tint for valid
    } else {
        boxToComplete.sprite.setTint(INVALID_BOX_TINT); // Red tint for invalid
    }
    
    // Show TIN text and paper again after processing
    boxToComplete.label.setVisible(true);
    boxToComplete.sprite.setVisible(true);
    
    // Clean up thinking dots animation
    if (boxToComplete.thinkingAnimation) {
        boxToComplete.thinkingAnimation.destroy();
        boxToComplete.thinkingAnimation = null;
    }
    if (boxToComplete.thinkingDots) {
        boxToComplete.thinkingDots.forEach(dot => dot.destroy());
        boxToComplete.thinkingDots = null;
    }
    
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
    if (distance > INTERACTION_DISTANCE) return;
    
    // Get the correct result (predetermined validity)
    const correctResult = processedBox.validity;
    const playerResult = processedBox.result;
    
    // Check if player's result matches correct result
    if (playerResult === correctResult) {
        // Variable payment based on level (no happiness multiplier)
        let payment = 10; // Base payment
        if (level === 0) payment = 100; // Junior gets $100
        else if (level === 1) payment = 500; // Mid gets $500  
        else if (level >= 2) payment = 1000; // Senior gets $1000
        
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
    if (distance > INTERACTION_DISTANCE) return;
    
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
            else if (level >= 2) payment = 1000; // Senior gets $1000
            
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
    if (distance > INTERACTION_DISTANCE) return;
    
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
        const yOffset = PROCESSING_SLOT_BASE_Y + (slotIndex * PROCESSING_SLOT_SPACING);
        boxToProcess.sprite.setPosition(irsMachine.x, irsMachine.y + yOffset);
        boxToProcess.sprite.setScale(TIN_PAPER_SCALE); // Keep smaller size
        boxToProcess.sprite.setVisible(false); // Hide paper during processing
        boxToProcess.label.setPosition(irsMachine.x, irsMachine.y + yOffset); // Center text on paper
        boxToProcess.label.setScale(1.0);
        boxToProcess.label.setVisible(false); // Hide TIN text during processing
        
        // Create thinking dots animation above the IRS machine
        const thinkingDotsY = irsMachine.y + THINKING_DOTS_Y_OFFSET; // Position above IRS machine
        boxToProcess.thinkingDots = [];
        for (let dotIndex = 0; dotIndex < 3; dotIndex++) {
            const dot = gameScene.add.image(irsMachine.x + THINKING_DOTS_X_START_OFFSET + (dotIndex * THINKING_DOTS_SPACING), thinkingDotsY, 'thinkingDot');
            dot.setScale(THINKING_DOT_SMALL_SCALE); // Default small size
            dot.setVisible(true); // Show all dots at once
            boxToProcess.thinkingDots.push(dot);
        }
        
        // Start ripple effect animation
        let currentDot = 0;
        boxToProcess.thinkingAnimation = gameScene.time.addEvent({
            delay: THINKING_DOT_ANIMATION_DELAY, // Change ripple delay
            callback: () => {
                // Reset all dots to small size
                boxToProcess.thinkingDots.forEach(dot => dot.setScale(THINKING_DOT_SMALL_SCALE));
                // Make current dot bigger
                boxToProcess.thinkingDots[currentDot].setScale(THINKING_DOT_LARGE_SCALE);
                currentDot = (currentDot + 1) % 3;
            },
            loop: true
        });
        
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
            targetBox.sprite.setTint(ZERO_CARD_TINT); // Red tint
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
    
    // Calculate cost with 2x multiplier for Senior level
    const currentLevel = getCurrentLevel();
    const baseCost = currentLevel.bribeCost;
    const multiplier = level >= 2 ? 2 : 1; // Senior pays 2x
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
        targetBox.bribeBorder.lineStyle(4, BRIBE_BORDER_TINT); // Yellow border, 4px thick
        
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
    const acceleratedTime = remaining * BRIBE_SPEED_MULTIPLIER; // 80% faster = 20% of original time
    
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
    // Handle Y key to dismiss welcome dialog
    if (Phaser.Input.Keyboard.JustDown(keys.y) && welcomeDialogActive) {
        closeWelcomeDialog();
        return;
    }
    
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
    
    // Skip all game logic if paused (except during elections, results, and welcome dialog)
    if (gameIsPaused && !isElectionActive && !this.electionResultsUI && !welcomeDialogActive) {
        // Show pause indicator
        if (!this.pauseText) {
            this.pauseText = this.add.text(480, 360, 'PAUSED\nPress P to Resume', {
                fontSize: PAUSE_TEXT_FONT_SIZE,
                fill: '#ffffff',
                fontFamily: '"Jersey 15", sans-serif',
                align: 'center',
                backgroundColor: '#000000',
                padding: { x: 20, y: 20 }
            }).setOrigin(0.5);
            this.pauseText.setDepth(PAUSE_TEXT_DEPTH); // Ensure it's on top
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
    
    // Handle voting keys (1, 2, 3) - COMMENTED OUT
    /*
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
    */
    
    // Skip player movement and interactions if welcome dialog is active
    if (welcomeDialogActive) {
        return;
    }
    
    // Player movement with level bonus
    const baseSpeed = BASE_PLAYER_SPEED; // Increased from 200 (1.5x faster)
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
    player.x = Phaser.Math.Clamp(player.x, PLAYER_BOUNDARY_MARGIN_X, GAME_WIDTH - PLAYER_BOUNDARY_MARGIN_X);
    player.y = Phaser.Math.Clamp(player.y, PLAYER_BOUNDARY_MARGIN_Y_TOP, GAME_HEIGHT - PLAYER_BOUNDARY_MARGIN_Y_BOTTOM);
    
    
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
    
    // Handle T key for testing elections (dev shortcut) - COMMENTED OUT
    /*
    if (Phaser.Input.Keyboard.JustDown(keys.t) && !isElectionActive) {
        console.log("DEBUG: Triggering test election");
        startElection();
    }
    */
    
    
    // Update carried boxes position (show as small banners following player)
    for (let i = 0; i < carriedBoxes.length; i++) {
        const box = carriedBoxes[i];
        const offsetX = CARRIED_BOX_BASE_OFFSET + (i * CARRIED_BOX_X_SPACING); // Stack them horizontally
        const offsetY = CARRIED_BOX_Y_OFFSET;
        
        box.sprite.setPosition(player.x + offsetX, player.y + offsetY);
        box.sprite.setScale(CARRIED_BOX_SCALE); // Make it smaller when carried
        box.sprite.setVisible(true); // Make sure it's visible
        box.label.setPosition(player.x + offsetX, player.y + offsetY); // Center the text on the banner
        box.label.setScale(CARRIED_BOX_SCALE); // Smaller label too
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
    // Election timing check - COMMENTED OUT
    /*
    const currentGameTime = Date.now() - gameStartTime - pausedTime;
    if (!isElectionActive && currentGameTime >= nextElectionTime) {
        startElection();
    }
    */
    
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