// Real-Time TIN Matching Service - Game Logic
// Phase 1: Basic Foundation

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 960,
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

// List of obviously bad TINs that should always be invalid
const badTINs = ['000000000', '111111111', '999999999', '123456789'];

// Level system (starting with Junior)
const levels = [
    { name: 'Junior', threshold: 0, speedBonus: 0, carryCapacity: 1, irsSlots: 1, preValidated: false },
    { name: 'Mid', threshold: 500, speedBonus: 100, carryCapacity: 2, irsSlots: 1, preValidated: false },
    { name: 'Senior', threshold: 1200, speedBonus: 100, carryCapacity: 2, irsSlots: 2, preValidated: false },
    { name: 'Architect', threshold: 2500, speedBonus: 100, carryCapacity: 2, irsSlots: 2, preValidated: true },
    { name: 'CEO', threshold: 5000, speedBonus: 150, carryCapacity: 3, irsSlots: 3, preValidated: true }
];

// Function to get current level info
function getCurrentLevel() {
    return levels[level];
}

// Function to check for promotion
function checkPromotion() {
    if (level < levels.length - 1 && money >= levels[level + 1].threshold) {
        level++;
        const newLevel = getCurrentLevel();
        console.log(`PROMOTION! You are now ${newLevel.name}!`);
        document.getElementById('level-display').textContent = `Level: ${newLevel.name}`;
        return true;
    }
    return false;
}

// Function to format time display (MM:SS)
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Function to get current difficulty based on elapsed time
function getDifficulty() {
    const elapsedMinutes = (Date.now() - gameStartTime) / 60000;
    return Math.min(elapsedMinutes / 30, 1); // 0 to 1 over 30 minutes
}

// Function to get current spawn delay
function getSpawnDelay() {
    const difficulty = getDifficulty();
    return Math.max(2000, 5000 - (difficulty * 3000)); // 5s to 2s
}

// Function to get current processing time
function getProcessingTime() {
    const difficulty = getDifficulty();
    return Math.max(1000, 3000 - (difficulty * 2000)); // 3s to 1s
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
    
    // Load banner image for TIN boxes
    this.load.image('banner', 'assets/images/objects/banner_modern.png');
    
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
    // Create tiled background with proper borders
    const tileSize = 16; // 16x16 tiles
    const tilesX = Math.ceil(960 / tileSize); // Number of tiles needed horizontally (60 tiles)
    const tilesY = Math.ceil(720 / tileSize); // Number of tiles needed vertically (45 tiles)
    
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
                this.add.image(x * 16 + 8, y * 16 + 8, 'tiles', tiles.fill);
            }
        }
        
        // Second pass: Place border tiles on top
        for (let x = 0; x < tilesX; x++) {
            for (let y = 0; y < tilesY; y++) {
                let tileIndex = null;
                
                // Determine which border tile to use based on position
                if (x === 0 && y === 0) {
                    // Top-left corner
                    tileIndex = tiles.topLeft;
                } else if (x === tilesX - 1 && y === 0) {
                    // Top-right corner
                    tileIndex = tiles.topRight;
                } else if (x === tilesX - 1 && y === tilesY - 1) {
                    // Bottom-right corner
                    tileIndex = tiles.bottomRight;
                } else if (x === 0 && y === tilesY - 1) {
                    // Bottom-left corner
                    tileIndex = tiles.bottomLeft;
                } else if (y === 0) {
                    // Top edge
                    tileIndex = tiles.topEdge;
                } else if (x === tilesX - 1) {
                    // Right edge
                    tileIndex = tiles.rightEdge;
                } else if (y === tilesY - 1) {
                    // Bottom edge
                    tileIndex = tiles.bottomEdge;
                } else if (x === 0) {
                    // Left edge
                    tileIndex = tiles.leftEdge;
                }
                
                // Only place border tiles (skip interior)
                if (tileIndex !== null) {
                    this.add.image(x * 16 + 8, y * 16 + 8, 'tiles', tileIndex);
                }
            }
        }
        
        // Create vertical table for TIN boxes (positioned 32px away from border tiles)
        const tableStartX = 2; // Skip border tile (x=0) + 1 tile gap + 32px gap
        const tableStartY = 2; // Skip border tile (y=0) + 1 tile gap + 32px gap
        const tableLength = 18; // Longer table while maintaining 32px gaps
        
        // Table tile indices
        const tableTiles = {
            top: (1 - 1) * 27 + (6 - 1),    // Row 1, Col 6
            middle: (2 - 1) * 27 + (6 - 1), // Row 2, Col 6
            bottom: (3 - 1) * 27 + (6 - 1)  // Row 3, Col 6
        };
        
        // Store table position for box spawning
        this.tableX = tableStartX * 16 + 8 + 32 + 20;
        this.tableY = (tableStartY + tableLength - 1) * 16 + 8 + 32; // Bottom of table
        this.tableTopY = (tableStartY) * 16 + 8 + 32; // Top of table
        
        for (let y = 0; y < tableLength; y++) {
            let tileToUse;
            
            if (y === 0) {
                // First tile - top
                tileToUse = tableTiles.top;
            } else if (y === tableLength - 1) {
                // Last tile - bottom
                tileToUse = tableTiles.bottom;
            } else {
                // Middle tiles - 10 tiles
                tileToUse = tableTiles.middle;
            }
            
            const tableTile = this.add.image(tableStartX * 16 + 8 + 32 + 20, (tableStartY + y) * 16 + 8 + 32, 'tiles', tileToUse);
            tableTile.setScale(5);
            tableTile.texture.setFilter(Phaser.Textures.NEAREST); // Crisp pixel art scaling
        }
        
        console.log('Bordered tilemap and table created successfully');
    } else {
        // Fallback to solid background if tileset failed to load
        this.add.rectangle(480, 360, 960, 720, 0x2c3e50);
        console.log('Tileset failed to load, using solid background');
    }
    
    
    // Create player - dark green 57x57 rectangle at center (480, 360)
    player = this.add.rectangle(480, 360, 57, 57, 0x228B22);
    
    // Create IRS Machine - gray 154x116 rectangle at (780, 360)
    irsMachine = this.add.rectangle(780, 360, 154, 116, 0x666666);
    
    // Add IRS Machine label
    this.add.text(780, 324, 'IRS MACHINE', {
        fontSize: '14px',
        fill: '#ffffff',
        fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    // Add processing status text (initially hidden)
    processingStatus = this.add.text(780, 396, 'PROCESSING...', {
        fontSize: '12px',
        fill: '#ffff00',
        fontFamily: 'Arial'
    }).setOrigin(0.5);
    processingStatus.setVisible(false);
    
    // Create Return Station - blue 77x58 rectangle at (420, 660) - bottom of screen
    returnStation = this.add.rectangle(420, 660, 77, 58, 0x0066cc);
    
    // Add Return Station label
    this.add.text(420, 624, 'RETURN RESULTS', {
        fontSize: '12px',
        fill: '#ffffff',
        fontFamily: 'Arial'
    }).setOrigin(0.5);
    
    
    
    
    // Record game start time
    gameStartTime = Date.now();
    
    // Set up WASD key handlers
    keys = this.input.keyboard.createCursorKeys();
    keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keys.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keys.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keys.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    keys.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    keys.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Set up dynamic box spawning timer (updates every second)
    this.time.addEvent({
        delay: 1000, // Check every second
        callback: () => {
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
    
    // Calculate next position on table (stack boxes)
    const tableX = this.tableX;
    let spawnY = this.tableY;
    
    // Find gaps and stack boxes efficiently
    const boxesOnTable = boxes.filter(b => Math.abs(b.x - tableX) < 50);
    
    if (boxesOnTable.length > 0) {
        // Sort boxes by Y position (bottom to top)
        boxesOnTable.sort((a, b) => b.y - a.y);
        
        // Look for gaps between boxes (40px spacing)
        let foundGap = false;
        for (let i = 0; i < boxesOnTable.length - 1; i++) {
            const currentBox = boxesOnTable[i];
            const nextBox = boxesOnTable[i + 1];
            const gapSize = currentBox.y - nextBox.y;
            
            // If gap is larger than box height + some buffer, place box there
            if (gapSize > 80) {
                spawnY = currentBox.y - 40;
                foundGap = true;
                break;
            }
        }
        
        // If no gap found, check if we can stack on top
        if (!foundGap) {
            const topBox = boxesOnTable.reduce((highest, box) => box.y < highest.y ? box : highest);
            const nextY = topBox.y - 40;
            
            // If next position would go above table top, start from bottom again
            if (nextY < this.tableTopY) {
                spawnY = this.tableY; // Reset to bottom
            } else {
                spawnY = nextY; // Stack above the highest box
            }
        }
    }
    
    // Create banner image at calculated position
    const box = this.add.image(tableX, spawnY, 'banner');
    box.setScale(0.67); // 1.5x smaller (1/1.5 = 0.67)
    
    // Add TIN number in the middle of the banner
    const boxId = boxIdCounter++;
    const tin = generateRandomTIN();
    const validity = determineTINValidity(tin); // Determine validity at spawn
    const label = this.add.text(tableX, spawnY, tin, {
        fontSize: '16px',
        fill: '#000000',
        fontFamily: 'Arial',
        align: 'center'
    }).setOrigin(0.5);
    
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
        x: tableX,
        y: spawnY,
        spawnTime: Date.now(), // Track when box was created
        preValidated: isPreValidated
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
        
        // Hide the box and label
        nearestBox.sprite.setVisible(false);
        nearestBox.label.setVisible(false);
        
        // Store as carried box
        carriedBoxes.push(nearestBox);
        
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
    boxToDrop.sprite.setScale(0.67); // Keep smaller banner size
    boxToDrop.label.setVisible(true);
    boxToDrop.label.setScale(1.0); // Reset to normal size
    
    // Add back to boxes array
    boxes.push(boxToDrop);
    
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
    
    // Move processed box out of machine (to the right)
    boxToComplete.sprite.setPosition(irsMachine.x + 60, irsMachine.y + 24);
    boxToComplete.label.setPosition(irsMachine.x + 60, irsMachine.y + 24); // Center text on banner
    
    // Add to boxes array so player can pick it up
    boxToComplete.x = irsMachine.x + 60;
    boxToComplete.y = irsMachine.y + 24;
    boxes.push(boxToComplete);
    
    // Remove from processing array
    processingBoxes.splice(index, 1);
    
    // Update processing status
    if (processingBoxes.length === 0) {
        processingStatus.setVisible(false);
    } else {
        const maxSlots = getCurrentLevel().irsSlots;
        processingStatus.setText(`PROCESSING... (${processingBoxes.length}/${maxSlots})`);
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
        // Variable payment based on level
        let payment = 10; // Base payment
        if (level === 0) payment = 100; // Junior gets $100
        else if (level === 1) payment = 500; // Mid gets $500  
        else if (level >= 2) payment = 1000; // Senior+ gets $1000
        
        money += payment;
        console.log(`CORRECT! Box #${processedBox.id} TIN: ${processedBox.tin} - Player: ${playerResult}, Correct: ${correctResult}. Paid $${payment}`);
    } else {
        // Wrong - no payment
        console.log(`WRONG! Box #${processedBox.id} TIN: ${processedBox.tin} - Player: ${playerResult}, Correct: ${correctResult}. No payment.`);
    }
    
    // Update money display
    document.getElementById('money-display').textContent = `Money: $${money}`;
    
    // Check for promotion
    checkPromotion();
    
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
            // Variable payment based on level
            let payment = 10;
            if (level === 0) payment = 100; // Junior gets $100
            else if (level === 1) payment = 500; // Mid gets $500  
            else if (level >= 2) payment = 1000; // Senior+ gets $1000
            
            money += payment;
            totalEarned += payment;
            console.log(`CORRECT! Box #${box.id} TIN: ${box.tin} - Paid $${payment}`);
        } else {
            console.log(`WRONG! Box #${box.id} TIN: ${box.tin} - No payment`);
        }
        
        // Remove the box
        carriedBoxes.splice(i, 1);
        box.sprite.destroy();
        box.label.destroy();
    }
    
    // Update displays
    document.getElementById('money-display').textContent = `Money: $${money}`;
    checkPromotion();
    
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
        boxToProcess.sprite.setScale(0.67); // Keep smaller banner size
        boxToProcess.sprite.setVisible(true);
        boxToProcess.label.setPosition(irsMachine.x, irsMachine.y + yOffset); // Center text on banner
        boxToProcess.label.setScale(1.0);
        boxToProcess.label.setVisible(true);
        
        console.log(`Started processing box #${boxToProcess.id} in slot ${slotIndex + 1}/${maxSlots}`);
        
        // Set processing timer for this box
        setTimeout(() => {
            completeProcessing(boxToProcess);
        }, getProcessingTime());
    }
    
    // Show processing status if any boxes are processing
    if (processingBoxes.length > 0) {
        processingStatus.setText(`PROCESSING... (${processingBoxes.length}/${maxSlots})`);
        processingStatus.setVisible(true);
    }
}

// Function to use 0-card shortcut
function use0Card() {
    if (carriedBoxes.length === 0) return; // Need to be carrying a box
    
    // Use 0-card on first available box (processed or unprocessed)
    let targetBox = null;
    
    // First, try to find a box that can be reset (SPACE or pre-validated)
    for (let box of carriedBoxes) {
        if (box.result !== undefined && (box.assignedVia === 'space' || box.assignedVia === 'prevalidated')) {
            targetBox = box;
            break;
        }
    }
    
    // If no resettable box found, find first unprocessed box
    if (!targetBox) {
        for (let box of carriedBoxes) {
            if (box.result === undefined) {
                targetBox = box;
                break;
            }
        }
    }
    
    if (!targetBox) return; // No suitable boxes
    
    // Check if box already has a result
    if (targetBox.result !== undefined) {
        // Can reset SPACE assignments and pre-validated boxes, but not IRS machine results
        if (targetBox.assignedVia === 'space' || targetBox.assignedVia === 'prevalidated') {
            // Reset the box to unprocessed state
            targetBox.result = undefined;
            targetBox.assignedVia = undefined;
            targetBox.preValidated = false;
            targetBox.sprite.clearTint(); // Back to original color
            // Text remains unchanged, just clearing tint
            console.log(`Reset validation for box #${targetBox.id}`);
        } else {
            console.log(`Cannot reset IRS machine result for box #${targetBox.id}`);
        }
        return;
    }
    
    // Assign 0-card result
    targetBox.result = 0;
    targetBox.assignedVia = 'space';
    
    // Change appearance to show 0-card assignment
    targetBox.sprite.setTint(0xff0000); // Red tint
    
    console.log(`Used 0-card on box #${targetBox.id} TIN: ${targetBox.tin}`);
}

// Update function - main game loop
function update() {
    // Player movement with level bonus
    const baseSpeed = 200;
    const speedBonus = getCurrentLevel().speedBonus;
    const speed = baseSpeed + speedBonus;
    
    // Check WASD keys and move player
    if (keys.w.isDown) {
        player.y -= speed * this.sys.game.loop.delta / 1000;
    }
    if (keys.s.isDown) {
        player.y += speed * this.sys.game.loop.delta / 1000;
    }
    if (keys.a.isDown) {
        player.x -= speed * this.sys.game.loop.delta / 1000;
    }
    if (keys.d.isDown) {
        player.x += speed * this.sys.game.loop.delta / 1000;
    }
    
    // Keep player within world boundaries, away from border tiles
    // Player is 57x57 (29px radius), borders are 16px wide
    // Left/Right: 45px from edges, Top/Bottom: 53px from edges (extra 8px gap)
    player.x = Phaser.Math.Clamp(player.x, 45, 960 - 45);
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
        box.label.setPosition(box.x, box.y);
    }
    
    // Update game timer (show elapsed time)
    const elapsedSeconds = Math.floor((Date.now() - gameStartTime) / 1000);
    document.getElementById('timer-display').textContent = formatTime(elapsedSeconds);
    
    // Check for expired boxes
    const expirationTime = getBoxExpirationTime();
    const currentTime = Date.now();
    
    for (let i = boxes.length - 1; i >= 0; i--) {
        const box = boxes[i];
        
        // Skip if box is being processed or already processed
        if (processingBoxes.includes(box) || box.result !== undefined) continue;
        
        // Check if box has expired
        if (currentTime - box.spawnTime > expirationTime) {
            // Remove expired box
            box.sprite.destroy();
            box.label.destroy();
            boxes.splice(i, 1);
            console.log(`Box #${box.id} expired after ${Math.floor(expirationTime/1000)}s`);
        }
    }
}

// Initialize the game
game = new Phaser.Game(config);