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
const PROXIMITY_CHECK_INTERVAL = 150; // Check proximity every 150ms
const PROXIMITY_DISTANCE = 96; // Standard proximity distance for auto actions
const PLAYER_BOUNDARY_MARGIN_X = 45;
const PLAYER_BOUNDARY_MARGIN_Y_TOP = 100; // Character can't go beyond 100px from top
const PLAYER_BOUNDARY_MARGIN_Y_BOTTOM = 60; // Character can't go beyond 60px from bottom (10px bigger)

// Positioning/Layout  
const TILE_SIZE = 80;
const WALL_TILE_SPACING = 20;
const BELT_Y = 200;
const BELT_START_X = 100; // Belt start position (moved 100px left)
const IRS_MACHINE_X = 800; // Adjusted for new width
const IRS_MACHINE_Y = 400;
const IRS_MACHINE_2_X = 800; // Second machine position (under first machine)
const IRS_MACHINE_2_Y = 530;
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
const CARRIED_BOX_Y_OFFSET = -50;
const CARRIED_BOX_BASE_OFFSET = 0;

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
const VALID_BOX_TINT = 0x274e13; // Green
const INVALID_BOX_TINT = 0x831a1a; // Red  
const ZERO_CARD_TINT = 0x831a1a; // Red
const BRIBE_BORDER_TINT = 0xffff00; // Yellow

// Depth Values (Z-Index Map) - Floor at bottom, everything else above
const FLOOR_DEPTH = 0;             // Base layer - behind everything
const WALLPAPER_DEPTH = 1;         // Above floor
const WALL_LINING_DEPTH = 2;       // Above wallpaper
const VERTICAL_WALLS_DEPTH = 3;    // Above lining
const TOP_EDGE_DEPTH = 5;          // Above walls
const STATION_DEPTH = 6;           // Above floor and walls
const TIN_PAPER_DEPTH = 7;         // Above stations and text
const CARRIED_BOX_DEPTH = 9;       // Above TIN papers but below player
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
const AXBIT_LOGO_X = 370; // Position from left edge
const AXBIT_LOGO_Y = 70; // Position from top edge
const AXBIT_LOGO_SCALE = 0.15; // 1.5x bigger (0.1667 * 1.5 = 0.25)
const AXBIT_LOGO_DEPTH = 4; // Above walls, below other objects
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
let proximityCheckTimer = 0; // Timer for automatic pickup/drop actions
let irsMachine;
let irsMachine2;
let phone; // Phone sprite reference for tint updates
let processingBoxes = [];
let processingBoxes2 = []; // Processing boxes for second machine
let processingStatus;
let gameScene; // Reference to the current scene for adding objects
let returnStation;
let money = 0;
let gameStartTime;
let level = 0;
let happiness = 95; // Start at Junior's initial mood
let spaceCardIndex = 0; // Track which box to process next with SPACE
let gameIsPaused = false; // Track pause state
let pausedTime = 0; // Track how long game has been paused
let currentBeltPosition = 0; // Track next stop position on belt (resets when reaching end)
let currentMusicIndex = 0; // Track which music track is currently playing
const musicTracks = [
    { key: 'bgMusic1', file: 'Travis_eulogy.mp3', name: 'Eulogy' },
    { key: 'bgMusic2', file: 'The_Solution_Remastered.mp3', name: 'The Solution' },
    { key: 'bgMusic3', file: 'Empire_of_Vodka_Remastered.mp3', name: 'Empire of Vodka' },
    { key: 'bgMusic4', file: 'Quiet_Meeting_at_the_Bit.mp3', name: 'Quiet Meeting' }
];
let bribeIndex = 0; // Track which processing box to bribe next
let electionCount = 0; // Track number of elections held
let nextElectionTime = 30000; // 30 seconds in milliseconds
let isElectionActive = false; // Track if election is currently happening
let welcomeDialogActive = true; // Track if welcome dialog should be shown
let dialogStep = 1; // Track which dialog step we're on (1 = hired, 2 = responsibilities, 3 = one more thing)
let briberateText; // Reference to the bribe rate text displayed above the phone
let premiumProcessingDialogShown = false; // Track if premium processing dialog has been shown
let premiumProcessingDialogActive = false; // Track if premium processing dialog is currently active
let breachOfTrustDialogActive = false; // Track if breach of trust dialog is currently active
let promotionDialogActive = false; // Track if promotion dialog is currently active
let dialogQueue = []; // Queue for dialogs to prevent overlapping
let premiumProcessingUses = 0; // Track how many instant processing uses are available

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
    { name: 'Junior', initMood: 50, speedBonus: 0, carryCapacity: 1, irsSlots: 1, preValidated: false, moodGainRate: 5.0, moodLossRate: 1.0, spawnSpeedMultiplier: 0.95, bribeCost: 500 },
    { name: 'Mid', initMood: 35, speedBonus: 100, carryCapacity: 1, irsSlots: 2, preValidated: false, moodGainRate: 3.5, moodLossRate: 1.2, spawnSpeedMultiplier: 1.5, bribeCost: 1500 },
    { name: 'Senior', initMood: 25, speedBonus: 100, carryCapacity: 1, irsSlots: 2, preValidated: true, moodGainRate: 2.5, moodLossRate: 1.4, spawnSpeedMultiplier: 1.71, bribeCost: 5500 }
];

// Function to get current level info
function getCurrentLevel() {
    return levels[level];
}

// Function to update player sprite based on current state and level
function updatePlayerSprite() {
    // Get level suffix for sprite names
    const levelNames = ['Junior', 'Mid', 'Senior'];
    const levelSuffix = levelNames[level] || 'Junior';
    
    let spriteKey = `playerIdle${levelSuffix}`; // Default to idle
    
    if (playerState === 'walking-left') {
        spriteKey = walkFrame === 1 ? `playerWalk1Left${levelSuffix}` : `playerWalk2Left${levelSuffix}`;
    } else if (playerState === 'walking-right') {
        spriteKey = walkFrame === 1 ? `playerWalk1Right${levelSuffix}` : `playerWalk2Right${levelSuffix}`;
    }
    
    player.setTexture(spriteKey);
}

// Function to check for promotion or game win
function checkPromotion() {
    if (level === 2 && happiness >= 100) {
        // Win condition: Senior level with 100 mood
        showBreachOfTrustDialog();
        console.log('GAME WON: Senior level reached 100 mood');
        return true;
    } else if (level < levels.length - 1 && happiness >= 100) {
        level++;
        const newLevel = getCurrentLevel();
        happiness = newLevel.initMood; // Reset to new level's starting mood
        console.log(`PROMOTION! You are now ${newLevel.name}! Mood reset to ${happiness}.`);
        document.getElementById('level-display-value').textContent = `${newLevel.name}`;
        updateBribeDisplay(); // Update bribe rate display
        updateHappiness(0); // Update display without changing value
        
        // Show promotion dialog
        showPromotionDialog(newLevel.name);
        
        // Show second IRS machine when reaching Mid level or higher
        if (level >= 1) { // Mid = level 1, Senior = level 2
            irsMachine2.setVisible(true);
        }
        
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

// Function to show premium processing dialog (queue version)
function showPremiumProcessingDialog() {
    queueDialog('premium');
}

// Function to actually show premium processing dialog
function actuallyShowPremiumProcessingDialog() {
    const scene = game.scene.scenes[0];
    
    console.log("showPremiumProcessingDialog called - setting premiumProcessingDialogActive to true");
    // Pause the game while dialog is shown
    gameIsPaused = true;
    premiumProcessingDialogActive = true;
    
    // Create dialog background
    const dialogBg = scene.add.image(DIALOG_X, DIALOG_Y, 'dialog');
    dialogBg.setScale(DIALOG_SCALE);
    dialogBg.setDepth(DIALOG_DEPTH);
    
    // Subject text
    const subjectText = scene.add.text(DIALOG_X - 400 + 250, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Subject:', {
        fontSize: '32px',
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        fontWeight: '600'
    }).setOrigin(0, 0.5);
    subjectText.setDepth(DIALOG_DEPTH + 1);
    
    // "Premium Processing" text
    const premiumText = scene.add.text(DIALOG_X + 80, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Premium Processing', {
        fontSize: DIALOG_TITLE_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    premiumText.setDepth(DIALOG_DEPTH + 1);
    
    // Main dialog text
    const currentLevel = getCurrentLevel();
    const bribeCost = currentLevel.bribeCost;
    const dialogText = `Looks like you're doing well — nice work! You've probably noticed the IRS can be a bit… slow. Now that you've earned some trust, you're eligible for premium processing to speed things up.

It'll cost you extra ($${bribeCost}), but what a joy it is to get your results instantly and boost our OKRs! Just call (C) our government contact, Lois, and he'll enable premium processing for the next 5 TINs you submit.`;
    
    const mainText = scene.add.text(DIALOG_X, DIALOG_Y + DIALOG_TEXT_Y_OFFSET + 30, dialogText, {
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
    scene.premiumDialogUI = [dialogBg, subjectText, premiumText, mainText, acceptButton, buttonText];
}

// Function to close premium processing dialog
function closePremiumProcessingDialog() {
    const scene = game.scene.scenes[0];
    
    console.log("closePremiumProcessingDialog called - setting premiumProcessingDialogActive to false");
    if (scene.premiumDialogUI) {
        scene.premiumDialogUI.forEach(element => element.destroy());
        scene.premiumDialogUI = null;
    }
    
    // Resume game
    premiumProcessingDialogActive = false;
    gameIsPaused = false;
    
    console.log("Premium processing dialog closed, processing queue...");
    // Process next dialog in queue after a short delay to prevent same key press from dismissing next dialog
    setTimeout(() => {
        processDialogQueue();
    }, 100);
}

// Function to show Role Realignment dialog (game over) - no queue needed, game ends
function showRoleRealignmentDialog() {
    const scene = game.scene.scenes[0];
    
    // Pause the game permanently
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
    
    // "Role Realignment" text (same row as Subject, 60px to the right of center)
    const roleRealignmentText = scene.add.text(DIALOG_X + 80, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Role Realignment', {
        fontSize: DIALOG_TITLE_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    roleRealignmentText.setDepth(DIALOG_DEPTH + 1);
    
    // Main dialog text
    const dialogText = `Hey,

We've reviewed your recent contributions and, well… it's clear this isn't quite the harmonious synergy we were hoping for.

You gave it a shot, we watched closely, and unfortunately, you're just not the right fit. We'll have to let you go — but chin up! Every end is just a non-renewable beginning.

Best,
AxBit Leadership`;
    
    const mainText = scene.add.text(DIALOG_X, DIALOG_Y + DIALOG_TEXT_Y_OFFSET + 60, dialogText, {
        fontSize: DIALOG_TEXT_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'left',
        wordWrap: { width: DIALOG_TEXT_MAX_WIDTH }
    }).setOrigin(0.5);
    mainText.setDepth(DIALOG_DEPTH + 1);
    
    // No accept button - dialog cannot be dismissed
    // Store dialog elements (no cleanup needed since game is over)
    scene.roleRealignmentDialogUI = [dialogBg, subjectText, roleRealignmentText, mainText];
}

// Function to show Breach of Trust dialog (game won) (queue version)
function showBreachOfTrustDialog() {
    queueDialog('breach');
}

// Function to actually show Breach of Trust dialog (game won)
function actuallyShowBreachOfTrustDialog() {
    const scene = game.scene.scenes[0];
    
    // Pause the game while dialog is shown
    gameIsPaused = true;
    breachOfTrustDialogActive = true;
    
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
    
    // "Breach of Trust" text (same row as Subject, 60px to the right of center)
    const breachOfTrustText = scene.add.text(DIALOG_X + 80, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Breach of Trust', {
        fontSize: DIALOG_TITLE_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    breachOfTrustText.setDepth(DIALOG_DEPTH + 1);
    
    // Main dialog text
    const dialogText = `How could you? After everything we've done for you — the real-time systems, the TINs, the premium processing… and Lois.

And now you walk away? Just like that?

Well. Good luck (not really) with whatever it is you're off to do.
Please don't leave.

...Oh well, I suppose a new junior will be starting next week.`;
    
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
    scene.breachOfTrustDialogUI = [dialogBg, subjectText, breachOfTrustText, mainText, acceptButton, buttonText];
}

// Function to close Breach of Trust dialog and restart game
function closeBreachOfTrustDialog() {
    const scene = game.scene.scenes[0];
    
    // Clean up dialog elements
    if (scene.breachOfTrustDialogUI) {
        scene.breachOfTrustDialogUI.forEach(element => element.destroy());
        scene.breachOfTrustDialogUI = null;
    }
    
    // Reset dialog state
    breachOfTrustDialogActive = false;
    
    // Restart the game by reloading the page
    location.reload();
}

// Function to show promotion dialog (queue version)
function showPromotionDialog(levelName) {
    queueDialog('promotion', levelName);
}

// Function to actually show promotion dialog
function actuallyShowPromotionDialog(levelName) {
    const scene = game.scene.scenes[0];
    
    // Pause the game while dialog is shown
    gameIsPaused = true;
    promotionDialogActive = true;
    
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
    
    // "Promotion" text (same row as Subject, 60px to the right of center)
    const promotionText = scene.add.text(DIALOG_X + 80, DIALOG_Y + DIALOG_TITLE_Y_OFFSET - 100, 'Promotion', {
        fontSize: DIALOG_TITLE_FONT_SIZE,
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center',
        fontStyle: 'bold'
    }).setOrigin(0.5);
    promotionText.setDepth(DIALOG_DEPTH + 1);
    
    // Different text based on level
    let dialogText;
    if (levelName === 'Mid') {
        dialogText = `It's that time of year again — and you've earned it! You've worked hard, tackled those tricky TINs, and kept everything running in real time. Impressive!

Congratulations, you're now a Level II Engineer — and it shows. Look at you go, submitting two TINs at once like a pro!

But with greater speed comes greater responsibility. The stakes are higher now, and our patience is running thin. We've placed a lot of trust in you… so don't let us down.`;
    } else if (levelName === 'Senior') {
        dialogText = `Congratulations — you've ascended to Level III Engineer!

At this point, you can almost feel which TINs are valid. It's uncanny. No more waiting, no more guessing — just pure, instinctual TIN magic. We're impressed… and a little frightened.

But remember: with great power comes zero tolerance for mistakes. We trust you completely now — which means any failure will cut deep.

Don't break our hearts.`;
    }
    
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
    scene.promotionDialogUI = [dialogBg, subjectText, promotionText, mainText, acceptButton, buttonText];
}

// Function to close promotion dialog
function closePromotionDialog() {
    const scene = game.scene.scenes[0];
    
    // Clean up dialog elements
    if (scene.promotionDialogUI) {
        scene.promotionDialogUI.forEach(element => element.destroy());
        scene.promotionDialogUI = null;
    }
    
    // Resume game
    promotionDialogActive = false;
    gameIsPaused = false;
    
    console.log("Promotion dialog closed, processing queue...");
    // Process next dialog in queue after a short delay to prevent same key press from dismissing next dialog
    setTimeout(() => {
        processDialogQueue();
    }, 100);
}

// Function to add dialog to queue
function queueDialog(type, data = null) {
    console.log(`Queueing dialog: ${type}, queue length: ${dialogQueue.length}`);
    dialogQueue.push({ type, data });
    console.log(`Queue after adding: ${dialogQueue.length}`);
    processDialogQueue();
}

// Function to process dialog queue
function processDialogQueue() {
    console.log(`Processing dialog queue. Length: ${dialogQueue.length}`);
    console.log(`Dialog states - premium: ${premiumProcessingDialogActive}, promotion: ${promotionDialogActive}, breach: ${breachOfTrustDialogActive}, welcome: ${welcomeDialogActive}`);
    
    // Don't process if any dialog is currently active (exclude welcome dialog after game starts)
    if (premiumProcessingDialogActive || promotionDialogActive || breachOfTrustDialogActive) {
        console.log("Dialog currently active, not processing queue");
        return;
    }
    
    // Process next dialog in queue
    if (dialogQueue.length > 0) {
        const nextDialog = dialogQueue.shift();
        console.log(`Processing next dialog: ${nextDialog.type}`);
        
        switch (nextDialog.type) {
            case 'premium':
                actuallyShowPremiumProcessingDialog();
                break;
            case 'promotion':
                actuallyShowPromotionDialog(nextDialog.data);
                break;
            case 'breach':
                actuallyShowBreachOfTrustDialog();
                break;
        }
    } else {
        console.log("Queue is empty");
    }
}

// Function to switch to next music track
function switchMusic() {
    const scene = game.scene.scenes[0];
    
    // Stop current music
    if (scene.bgMusic && scene.bgMusic.isPlaying) {
        scene.bgMusic.stop();
    }
    
    // Move to next track
    currentMusicIndex = (currentMusicIndex + 1) % musicTracks.length;
    scene.bgMusic = scene.musicObjects[currentMusicIndex];
    
    // Start new music
    scene.bgMusic.play();
    
    const trackName = musicTracks[currentMusicIndex].name;
    console.log(`Music switched to: ${trackName}`);
}

// Function to update phone tint based on money and premium processing availability
function updatePhoneTint() {
    if (phone) {
        const currentLevel = getCurrentLevel();
        const bribeCost = currentLevel.bribeCost;
        
        if (premiumProcessingUses > 0) {
            // Apply grey tint when premium processing is already active
            phone.setTint(0x888888);
        } else if (money >= bribeCost) {
            // Remove tint (show original colors) when player has enough money and no active premium
            phone.clearTint();
        } else {
            // Apply grey tint when player doesn't have enough money
            phone.setTint(0x888888);
        }
    }
}

// Function to update premium processing display
function updatePremiumProcessingDisplay() {
    if (briberateText) {
        const currentLevel = getCurrentLevel();
        briberateText.setText(`$${currentLevel.bribeCost}`);
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
    
    // Update the in-game bribe rate text above the phone
    updatePremiumProcessingDisplay();
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
    const display = document.getElementById('happiness-display-value');
    
    // Color coding based on happiness level
    if (happiness >= 50) {
        display.src = "assets/images/ui/happy-mood.png"; 
        display.alt = "Happy Mood";
    } else if (happiness >= 0) {
        display.src = "assets/images/ui/neutral-mood.png"; 
        display.alt = "Neutral Mood";
    } else {
        display.src = "assets/images/ui/upset-mood.png"; 
        display.alt = "Upset Mood";
    }
    
    // Check for game over
    if (happiness <= -100) {
        showRoleRealignmentDialog();
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
    
    // Load phone image
    this.load.image('phone', 'assets/images/objects/phone.png');
    
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
    // Load character sprites for all levels
    // Junior level - black character
    this.load.image('playerIdleJunior', 'assets/images/character/black/front-facing.png');
    this.load.image('playerWalk1LeftJunior', 'assets/images/character/black/walk-1-left.png');
    this.load.image('playerWalk2LeftJunior', 'assets/images/character/black/walk-2-left.png');
    this.load.image('playerWalk1RightJunior', 'assets/images/character/black/walk-1-right.png');
    this.load.image('playerWalk2RightJunior', 'assets/images/character/black/walk-2-right.png');
    
    // Mid level - green character
    this.load.image('playerIdleMid', 'assets/images/character/green/front-facing.png');
    this.load.image('playerWalk1LeftMid', 'assets/images/character/green/walk-1-left.png');
    this.load.image('playerWalk2LeftMid', 'assets/images/character/green/walk-2-left.png');
    this.load.image('playerWalk1RightMid', 'assets/images/character/green/walk-1-right.png');
    this.load.image('playerWalk2RightMid', 'assets/images/character/green/walk-2-right.png');
    
    // Senior level - salmon character
    this.load.image('playerIdleSenior', 'assets/images/character/salmon/front-facing.png');
    this.load.image('playerWalk1LeftSenior', 'assets/images/character/salmon/walk-1-left.png');
    this.load.image('playerWalk2LeftSenior', 'assets/images/character/salmon/walk-2-left.png');
    this.load.image('playerWalk1RightSenior', 'assets/images/character/salmon/walk-1-right.png');
    this.load.image('playerWalk2RightSenior', 'assets/images/character/salmon/walk-2-right.png');
    
    // Load background music tracks
    for (let i = 0; i < musicTracks.length; i++) {
        this.load.audio(musicTracks[i].key, `assets/audio/music/${musicTracks[i].file}`);
    }
    
    // Load dialog UI
    this.load.image('dialog', 'assets/images/ui/dialog.png');
    this.load.image('button', 'assets/images/ui/button.png');
    this.load.image('axBitLogo', 'assets/images/ui/axBit-logo.png');
    
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
    // const debugLevel = prompt("DEBUG: Choose starting level (0=Junior, 1=Mid, 2=Senior) or press Cancel for Junior:");
    // if (debugLevel !== null && !isNaN(debugLevel)) {
    //     const chosenLevel = Math.max(0, Math.min(2, parseInt(debugLevel)));
    //     level = chosenLevel;
    //     happiness = levels[level].initMood;
    //     console.log(`DEBUG: Starting at ${levels[level].name} level with ${happiness} mood`);
    //     document.getElementById('level-display-value').textContent = `${levels[level].name}`;
    //     updateBribeDisplay(); // Update bribe rate display for debug level
    // }
    // Create tiled background with proper borders
    const tileSize = TILE_SIZE; // 80x80 tiles (5x bigger)
    const tilesX = Math.ceil(GAME_WIDTH / tileSize); // Number of tiles needed horizontally
    const tilesY = Math.ceil(GAME_HEIGHT / tileSize); // Number of tiles needed vertically
    
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
        
        // Add axbit logo on the wall
        try {
            const axbitLogo = this.add.image(AXBIT_LOGO_X, AXBIT_LOGO_Y, 'axBitLogo');
            axbitLogo.setScale(AXBIT_LOGO_SCALE);
            axbitLogo.setDepth(AXBIT_LOGO_DEPTH); 
        } catch (error) {
            console.warn('Axbit logo asset not found');
        }

          // Add window on the left wall
          try {
            const window = this.add.image(WINDOW_X, WINDOW_Y, 'window');
            window.setScale(WINDOW_SCALE);
            window.setDepth(WINDOW_DEPTH); // Above walls but below other objects
        } catch (error) {
            console.warn('Window asset not found');
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
        
    
    
    // Create player - character sprite at center (starts as Junior)
    player = this.add.image(PLAYER_START_X, PLAYER_START_Y, 'playerIdleJunior');
    player.setScale(PLAYER_SCALE);
    player.setDepth(PLAYER_DEPTH);
    
    // Create IRS Machine
    irsMachine = this.add.image(IRS_MACHINE_X, IRS_MACHINE_Y, 'irsMachine');
    irsMachine.setScale(IRS_MACHINE_SCALE);
    
    // Create second IRS Machine (initially hidden)
    irsMachine2 = this.add.image(IRS_MACHINE_2_X, IRS_MACHINE_2_Y, 'irsMachine');
    irsMachine2.setScale(IRS_MACHINE_SCALE);
    irsMachine2.setVisible(false); // Hidden until mid/senior level
    
    // Add phone 100px above the IRS machine
    phone = this.add.image(IRS_MACHINE_X - 14, IRS_MACHINE_Y - 120, 'phone');
    phone.setScale(IRS_MACHINE_SCALE * 0.35); // 2x smaller
    phone.setTint(0x888888); // Grey tint (default when no money)
    updatePhoneTint(); // Set initial tint based on starting money
    
    // Add bribe rate text above the phone
    const currentLevel = getCurrentLevel();
    briberateText = this.add.text(IRS_MACHINE_X - 13, IRS_MACHINE_Y - 155, `$${currentLevel.bribeCost}`, {
        fontSize: '16px',
        fill: '#000000',
        fontFamily: '"Jersey 15", sans-serif',
        align: 'center'
    }).setOrigin(0.5);
    briberateText.setDepth(STATION_DEPTH);
    
    
    
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
    // Initialize all music tracks
    this.musicObjects = [];
    for (let i = 0; i < musicTracks.length; i++) {
        this.musicObjects[i] = this.sound.add(musicTracks[i].key, { 
            volume: BACKGROUND_MUSIC_VOLUME, 
            loop: true 
        });
    }
    this.bgMusic = this.musicObjects[0]; // Start with first track (Eulogy)
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
    keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keys.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    keys.b = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
    keys.one = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    keys.two = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    keys.three = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
    keys.t = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T); // For testing elections
    keys.y = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y); // For dismissing dialogs
    keys.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC); // For dismissing dialogs
    keys.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R); // For cycling music
    
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
    
    // All boxes start from the same position (left side of belt)
    const beltY = this.beltY;
    const startX = this.beltLeftX + 40; // All boxes start from the same position
    
    // Using simple delta-based positioning system
    const paperY = beltY + PAPER_Y_OFFSET; // 10px higher than belt
    const box = this.add.image(startX, paperY, 'tinPaper');
    box.setScale(TIN_PAPER_SCALE); // 1.5x smaller
    // Use unique depth for each box to prevent text overlap (newer boxes on top)
    const boxDepth = TIN_PAPER_DEPTH + (boxIdCounter * 0.01);
    box.setDepth(boxDepth);
    
    // Add TIN number in the middle of the paper
    const boxId = boxIdCounter++;
    const tin = generateRandomTIN();
    const validity = determineTINValidity(tin); // Determine validity at spawn
    const label = this.add
      .text(startX, paperY, tin, {
        fontSize: "16px",
        fill: "#56422D",
        fontFamily: '"Jersey 15", sans-serif',
        align: "center",
      })
      .setOrigin(0.5);
    label.setDepth(boxDepth + 0.005); // Text slightly above this specific paper
    
    // Simple delta-based positioning: each box stops 60px back from the end
    let targetX = this.beltRightX - 55 - currentBeltPosition;
    
    // If we've reached the beginning of the belt, reset to end
    if (targetX < this.beltLeftX + 60) {
        currentBeltPosition = 0;
        targetX = this.beltRightX - 55;
    }
    
    // Increment position for next box
    currentBeltPosition += 60;
    
    // Calculate animation duration based on distance (slower speed)
    const distance = targetX - startX;
    const speed = 50; // pixels per second
    const slideTime = Math.max(500, (distance / speed) * 1000); // minimum 0.5 seconds
    
    this.tweens.add({
        targets: box,
        x: targetX,
        duration: slideTime,
        ease: 'Linear',
        onComplete: () => {
            // Stop movement when reaching target position
            const boxData = boxes.find(b => b.sprite === box);
            if (boxData) {
                boxData.isMoving = false;
                boxData.x = targetX;
                
                // No automatic loop-back needed with delta system
                // Boxes just stay at their assigned positions
            }
        }
    });
    
    this.tweens.add({
        targets: label,
        x: targetX,
        duration: slideTime,
        ease: 'Linear'
    });
    
    // Check if this box should be pre-validated (Senior level doesn't have pre-validation)
    // Check if this box should be pre-validated based on current level
    let isPreValidated = false;
    const currentLevel = levels[level];
    if (currentLevel && currentLevel.preValidated) {
        // 30% chance for pre-validated boxes at levels that support it
        isPreValidated = Math.random() < 0.3;
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
        endX: targetX // Store target position
    };
    
    // If pre-validated, show result immediately
    if (isPreValidated) {
        boxData.result = validity;
        boxData.assignedVia = 'prevalidated';
        
        if (validity === 1) {
            box.setTint(VALID_BOX_TINT); // Green tint for valid
            label.setStyle({ fill: '#000000' }); // Black text for validated TINs
        } else {
            box.setTint(INVALID_BOX_TINT); // Red tint for invalid
            label.setStyle({ fill: '#000000' }); // Black text for validated TINs
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
    
    // Change box tint and text color based on result
    if (result === 1) {
        boxToComplete.sprite.setTint(VALID_BOX_TINT); // Green tint for valid
        boxToComplete.label.setStyle({ fill: '#000000' }); // Black text for validated TINs
    } else {
        boxToComplete.sprite.setTint(INVALID_BOX_TINT); // Red tint for invalid
        boxToComplete.label.setStyle({ fill: '#000000' }); // Black text for validated TINs
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
    
    // Throw processed box in random direction with delta positioning
    const directions = ['left', 'bottom'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const randomDelta = 30 + Math.random() * 40; // 30-70px random distance
    
    let newX = boxToComplete.x;
    let newY = boxToComplete.y;
    
    switch (direction) {
        case 'right':
            newX += randomDelta;
            break;
        case 'left':
            newX -= randomDelta;
            break;
        case 'bottom':
            newY += randomDelta;
            break;
    }
    
    // Keep within screen bounds
    newX = Math.max(50, Math.min(newX, GAME_WIDTH - 50));
    newY = Math.max(50, Math.min(newY, GAME_HEIGHT - 50));
    
    // Update position in data and sprites
    boxToComplete.x = newX;
    boxToComplete.y = newY;
    boxToComplete.sprite.setPosition(newX, newY);
    boxToComplete.label.setPosition(newX, newY);
    
    // Set unique depth to prevent text overlap (use current boxIdCounter for uniqueness)
    const processedBoxDepth = TIN_PAPER_DEPTH + (boxIdCounter * 0.01);
    boxToComplete.sprite.setDepth(processedBoxDepth);
    boxToComplete.label.setDepth(processedBoxDepth + 0.005); // Text slightly above box
    boxIdCounter++; // Increment for next unique depth
    
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
        updatePhoneTint(); // Update phone tint based on new money amount
        
        // Check if player reached bribe cost for first time
        const currentLevel = getCurrentLevel();
        if (money >= currentLevel.bribeCost && !premiumProcessingDialogShown) {
            premiumProcessingDialogShown = true;
            console.log("Showing premium processing dialog - money:", money);
            showPremiumProcessingDialog();
        }
        
        updateHappiness(2); // Increase happiness for correct results
        console.log(`CORRECT! Box #${processedBox.id} TIN: ${processedBox.tin} - Player: ${playerResult}, Correct: ${correctResult}. Paid $${payment}. Mood +2.`);
    } else {
        // Wrong - no payment and happiness penalty
        updateHappiness(-10);
        console.log(`WRONG! Box #${processedBox.id} TIN: ${processedBox.tin} - Player: ${playerResult}, Correct: ${correctResult}. No payment. Mood -10.`);
    }
    
    // Update money display
    document.getElementById('money-display-value').textContent = `${money}`;
    
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
            updatePhoneTint(); // Update phone tint based on new money amount
            
            // Check if player reached bribe cost for first time
            const currentLevel = getCurrentLevel();
            if (money >= currentLevel.bribeCost && !premiumProcessingDialogShown) {
                premiumProcessingDialogShown = true;
                console.log("Showing premium processing dialog - money:", money);
                showPremiumProcessingDialog();
            }
            
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
    document.getElementById('money-display-value').textContent = `${money}`;
    
    console.log(`Submitted ${processedBoxes.length} boxes, earned $${totalEarned} total`);
}

// Function to process all unprocessed boxes
function processAllBoxes() {
    const maxSlots = getCurrentLevel().irsSlots;
    const unprocessedBoxes = carriedBoxes.filter(box => box.result === undefined);
    if (unprocessedBoxes.length === 0) return;
    
    // Check if player is near either IRS machine
    const distance1 = Phaser.Math.Distance.Between(player.x, player.y, irsMachine.x, irsMachine.y);
    const distance2 = Phaser.Math.Distance.Between(player.x, player.y, irsMachine2.x, irsMachine2.y);
    const nearMachine1 = distance1 <= INTERACTION_DISTANCE;
    const nearMachine2 = distance2 <= INTERACTION_DISTANCE && irsMachine2.visible;
    
    if (!nearMachine1 && !nearMachine2) return;
    
    // Determine which machine to use (prefer closest one)
    const useMachine2 = nearMachine2 && (!nearMachine1 || distance2 < distance1);
    const targetMachine = useMachine2 ? irsMachine2 : irsMachine;
    
    // Debug: show which machine is being used
    console.log(`Processing on machine ${useMachine2 ? '2' : '1'} at (${targetMachine.x}, ${targetMachine.y})`);
    
    // Use the correct processing array based on which machine is selected
    const targetProcessingArray = useMachine2 ? processingBoxes2 : processingBoxes;
    
    // Process up to available slots
    const availableSlots = maxSlots - targetProcessingArray.length;
    const boxesToProcess = Math.min(availableSlots, unprocessedBoxes.length);
    
    for (let i = 0; i < boxesToProcess; i++) {
        const boxToProcess = unprocessedBoxes[i];
        const index = carriedBoxes.indexOf(boxToProcess);
        carriedBoxes.splice(index, 1);
        
        targetProcessingArray.push(boxToProcess);
        
        // Position box in machine (stack them vertically)
        const slotIndex = targetProcessingArray.length - 1;
        const yOffset = PROCESSING_SLOT_BASE_Y + (slotIndex * PROCESSING_SLOT_SPACING);
        boxToProcess.sprite.setPosition(targetMachine.x, targetMachine.y + yOffset);
        boxToProcess.sprite.setScale(TIN_PAPER_SCALE); // Keep smaller size
        boxToProcess.sprite.setVisible(false); // Hide paper during processing
        boxToProcess.label.setPosition(targetMachine.x, targetMachine.y + yOffset); // Center text on paper
        boxToProcess.label.setScale(1.0);
        boxToProcess.label.setVisible(false); // Hide TIN text during processing
        
        // Create thinking dots animation above the IRS machine
        const thinkingDotsY = targetMachine.y + THINKING_DOTS_Y_OFFSET; // Position above IRS machine
        boxToProcess.thinkingDots = [];
        for (let dotIndex = 0; dotIndex < 3; dotIndex++) {
            const dot = gameScene.add.image(targetMachine.x + THINKING_DOTS_X_START_OFFSET + (dotIndex * THINKING_DOTS_SPACING), thinkingDotsY, 'thinkingDot');
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
        boxToProcess.x = targetMachine.x;
        boxToProcess.y = targetMachine.y + yOffset;
        
        console.log(`Started processing box #${boxToProcess.id} in slot ${slotIndex + 1}/${maxSlots}`);
        
        // Set processing timer for this box
        let processingTime;
        
        // Check if premium processing is available
        if (premiumProcessingUses > 0) {
            processingTime = 100; // Instant processing (100ms for visual effect)
            premiumProcessingUses--; // Use one premium processing
            updatePremiumProcessingDisplay(); // Update the display
            updatePhoneTint(); // Update phone tint when premium uses change
            console.log(`Premium processing used! ${premiumProcessingUses} uses remaining`);
        } else {
            processingTime = getProcessingTime(); // Normal processing time
        }
        
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
            targetBox.label.setStyle({ fill: '#000000' }); // Black text for validated TINs
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

// Function to enable premium processing for next 5 TINs
function bribeIRS() {
    // Don't allow bribing if premium processing is already active (unused uses remaining)
    if (premiumProcessingUses > 0) {
        console.log(`Premium processing already active! ${premiumProcessingUses} uses remaining.`);
        return;
    }
    
    // Calculate cost for premium processing
    const currentLevel = getCurrentLevel();
    const baseCost = currentLevel.bribeCost;
    
    if (money < baseCost) {
        console.log(`Not enough money for premium processing! Need $${baseCost}, have $${money}`);
        return;
    }
    
    // Pay the cost and enable 5 premium processing uses
    money -= baseCost;
    updatePhoneTint(); // Update phone tint based on new money amount
    premiumProcessingUses = 5;
    updatePremiumProcessingDisplay(); // Update the display
    
    console.log(`Premium processing enabled! Next ${premiumProcessingUses} TINs will be processed instantly for $${baseCost}`);
    
    // Update money display
    document.getElementById('money-display-value').textContent = `${money}`;
}

// Update function - main game loop
function update() {
    const currentTime = Date.now();
    // CRITICAL: Handle dialog dismissal FIRST before any other logic
    
    // Handle Y and ESC keys to dismiss welcome dialog
    if ((Phaser.Input.Keyboard.JustDown(keys.y) || Phaser.Input.Keyboard.JustDown(keys.esc)) && welcomeDialogActive) {
        console.log("Y/ESC pressed - closing welcome dialog");
        closeWelcomeDialog();
        return;
    }
    
    // Handle Y and ESC keys to dismiss premium processing dialog
    if (premiumProcessingDialogActive) {
        // Try different methods to detect Y and ESC keys press
        if (
          Phaser.Input.Keyboard.JustDown(keys.y) ||
          Phaser.Input.Keyboard.JustDown(keys.esc)
        ) {
          console.log("Y/ESC JustDown detected - closing dialog");
          closePremiumProcessingDialog();
          return;
        }
        
        // Alternative: Check if Y/ESC key was just pressed using different method
        if (
          (keys.y.isDown && !keys.y.wasDown) ||
          (keys.esc.isDown && !keys.esc.wasDown)
        ) {
          console.log("Y/ESC key state change detected - closing dialog");
          closePremiumProcessingDialog();
          return;
        }
        
        // Alternative: Use direct key event listening
        if (keys.y.isDown || keys.esc.isDown) {
            console.log("Y/ESC key is currently pressed - closing dialog");
            closePremiumProcessingDialog();
            return;
        }
    }
    
    // Handle Y and ESC keys to dismiss breach of trust dialog
    if (breachOfTrustDialogActive) {
        if (
          Phaser.Input.Keyboard.JustDown(keys.y) ||
          Phaser.Input.Keyboard.JustDown(keys.esc)
        ) {
          console.log("Y/ESC pressed - closing breach of trust dialog and restarting game");
          closeBreachOfTrustDialog();
          return;
        }
        
        // Alternative: Check if Y/ESC key was just pressed using different method
        if (
          (keys.y.isDown && !keys.y.wasDown) ||
          (keys.esc.isDown && !keys.esc.wasDown)
        ) {
          console.log("Y/ESC key state change detected - closing breach of trust dialog and restarting game");
          closeBreachOfTrustDialog();
          return;
        }
        
        // Alternative: Use direct key event listening
        if (keys.y.isDown || keys.esc.isDown) {
            console.log("Y/ESC key is currently pressed - closing breach of trust dialog and restarting game");
            closeBreachOfTrustDialog();
            return;
        }
    }
    
    // Handle Y and ESC keys to dismiss promotion dialog
    if (promotionDialogActive) {
        // Try different methods to detect Y and ESC keys press
        if (
          Phaser.Input.Keyboard.JustDown(keys.y) ||
          Phaser.Input.Keyboard.JustDown(keys.esc)
        ) {
          console.log("Y/ESC JustDown detected - closing promotion dialog");
          closePromotionDialog();
          return;
        }
        
        // Alternative: Check if Y/ESC key was just pressed using different method
        if (
          (keys.y.isDown && !keys.y.wasDown) ||
          (keys.esc.isDown && !keys.esc.wasDown)
        ) {
          console.log("Y/ESC key state change detected - closing promotion dialog");
          closePromotionDialog();
          return;
        }
        
        // Alternative: Use direct key event listening
        if (keys.y.isDown || keys.esc.isDown) {
            console.log("Y/ESC key is currently pressed - closing promotion dialog");
            closePromotionDialog();
            return;
        }
    }
    
    
    // Skip all game logic if paused (except during elections, results, and dialogs)
    if (gameIsPaused && !isElectionActive && !this.electionResultsUI && !welcomeDialogActive && !premiumProcessingDialogActive && !breachOfTrustDialogActive && !promotionDialogActive) {
        // This condition should normally not occur since we removed manual pause
        // but keeping it as a safety check
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
    
    // Skip player movement and interactions if any dialog is active
    if (welcomeDialogActive || premiumProcessingDialogActive || breachOfTrustDialogActive || promotionDialogActive) {
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
    
    
    // Automatic proximity-based actions (timer-based to prevent constant triggering)
    if (proximityCheckTimer <= 0) {
        // Priority 1: Submit processed boxes at return station
        const returnDistance = Phaser.Math.Distance.Between(player.x, player.y, returnStation.x, returnStation.y);
        const hasProcessedBox = carriedBoxes.some(box => box.result !== undefined);
        if (returnDistance <= PROXIMITY_DISTANCE && hasProcessedBox) {
            submitAllBoxes();
        }
        // Priority 2: Drop unprocessed boxes at IRS machines  
        else {
            const hasUnprocessedBox = carriedBoxes.some(box => box.result === undefined);
            
            // Check which machine is closest and if it's available
            const distance1 = Phaser.Math.Distance.Between(player.x, player.y, irsMachine.x, irsMachine.y);
            const distance2 = Phaser.Math.Distance.Between(player.x, player.y, irsMachine2.x, irsMachine2.y);
            const nearMachine1 = distance1 <= PROXIMITY_DISTANCE;
            const nearMachine2 = distance2 <= PROXIMITY_DISTANCE && irsMachine2.visible;
            
            // Check if specific machines are available (not actively processing)
            const machine1HasActiveProcessing = processingBoxes.some(box => box.result === undefined);
            const machine2HasActiveProcessing = processingBoxes2.some(box => box.result === undefined);
            const machine1Available = nearMachine1 && !machine1HasActiveProcessing;
            const machine2Available = nearMachine2 && !machine2HasActiveProcessing;
            
            // Process if any machine is available and we have unprocessed boxes
            if ((machine1Available || machine2Available) && hasUnprocessedBox) {
                processAllBoxes();
            }
            // Priority 3: Initial pickup from belt
            else {
                const maxCapacity = getCurrentLevel().carryCapacity;
                if (carriedBoxes.length < maxCapacity) {
                    pickupBox();
                }
            }
        }
        
        proximityCheckTimer = PROXIMITY_CHECK_INTERVAL; // Reset timer
    }
    proximityCheckTimer -= game.loop.delta; // Decrease timer each frame
    
    
    
    // Handle B key for 0-card shortcut
    if (Phaser.Input.Keyboard.JustDown(keys.b)) {
        use0Card();
    }
    
    // Handle C key for bribing IRS
    if (Phaser.Input.Keyboard.JustDown(keys.c)) {
        bribeIRS();
    }
    
    // Handle R key for cycling music
    if (Phaser.Input.Keyboard.JustDown(keys.r)) {
        switchMusic();
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
        box.sprite.setDepth(CARRIED_BOX_DEPTH); // Above belt boxes
        box.sprite.setVisible(true); // Make sure it's visible
        box.label.setPosition(player.x + offsetX, player.y + offsetY); // Center the text on the banner
        box.label.setScale(CARRIED_BOX_SCALE); // Smaller label too
        box.label.setDepth(CARRIED_BOX_DEPTH + 0.005); // Text slightly above carried box
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