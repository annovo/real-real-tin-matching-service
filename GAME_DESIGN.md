# Real-Time TIN Matching Service - Game Design Document

## Core Concept
A satirical bureaucratic processing simulator where players work as a TIN validation clerk, processing tax forms while navigating corporate politics through strategic voting and "Tesla purchases."

## Game Flow

### Main Loop
1. **Box Arrival**: Boxes arrive on conveyor belt containing TIN/Name sheets
2. **Processing**: Extract documents, feed to IRS machine separately
3. **Validation**: Machine outputs 1 (valid) or 0 (invalid) after processing time
4. **Return**: Match result to original box (labeled with tracking ID), get paid
5. **Shortcuts**: Obviously bad TINs can be returned immediately with 0-cards
6. **Elections**: Every 3 minutes, vote for candidates affecting game mechanics

## Timing & Difficulty Progression

### 30-Minute Game Structure
- **Total Duration**: 30 minutes
- **Elections**: 10 total (every 3 minutes)
- **Difficulty Scaling**: Increases after each election

### Core Timings
- **IRS Processing Time**: 4.0s → 1.5s (decreases 0.2s per election)
- **Box Arrival Rate**: Every 8s → 2s (decreases 0.3s per election)  
- **Result Return Window**: 15 seconds before happiness penalty
- **Grace Period**: 3 seconds between penalty triggers

## Economy System

### Base Economics
- **Correct Result Payment**: $10 base
- **Happiness Multiplier**: 1.0x - 2.5x (affects payment)
- **Wrong Result Penalty**: -$20, -10 happiness (scales with level)
- **Timeout Penalty**: -5 happiness
- **Excessive Trash Penalty**: -3 happiness per box

### Promotion Levels
| Level | Title | Money Required | Buff |
|-------|-------|----------------|------|
| 0 | Intern | $0 | Base abilities |
| 1 | Junior | $500 | +25% movement speed |
| 2 | Mid | $1,200 | Carry 2 boxes + 2 IRS slots |
| 3 | Senior | $2,500 | AI intern assistant |
| 4 | Architect | $5,000 | Bad TIN detection (glowing) |
| 5 | CEO | $10,000 | **VICTORY STATE** |

## Voting & Tesla System

### Election Mechanics
- **Frequency**: Every 3 minutes
- **Base Influence**: 33.33% chance per candidate
- **Player Vote**: +5% influence
- **Tesla Unlock**: Election #3 (9 minutes)

### Tesla Influence System
| Model | Cost | Influence Boost |
|-------|------|----------------|
| Model S | $800 | +15% |
| Model X | $2,000 | +25% |
| Cybertruck | $5,000 | +80% |

### Candidate Pool (10 Total)
*3 random candidates appear each election*

**1. "Efficiency Expert" Thompson**
- Positive: -0.5s IRS processing time
- Negative: Box arrival rate +30% faster

**2. "Worker Advocate" Martinez**  
- Positive: +5s result return window
- Negative: -$2 per correct result payment

**3. "Tech Innovator" Chen**
- Positive: +1 IRS processing slot
- Negative: 10% chance of machine "glitch" (random failures)

**4. "Budget Hawk" Johnson**
- Positive: +$5 payment per correct result
- Negative: Fires intern assistant (Levels 3-4 only), -25% movement speed for others

**5. "Safety Inspector" Williams**
- Positive: Boxes never break/auto-trash
- Negative: -1 carry capacity, must process boxes one at a time

**6. "Celebration Coordinator" Davis**
- Positive: +50% happiness recovery rate
- Negative: Player gets "drunk" on victory: -40% movement speed for 60 seconds

**7. "Supply Chain Manager" Rodriguez**
- Positive: Box arrival rate -25% slower (breathing room)
- Negative: IRS processing time +1.5s (bureaucracy increases)

**8. "Quality Assurance Director" Brown**
- Positive: Bad TIN detection works 100% (vs 80% normally at Level 4)
- Negative: Wrong results penalty doubled (-$40, -20 happiness)

**9. "Union Representative" Garcia**
- Positive: Immunity to first 3 happiness penalties per election cycle
- Negative: All payments delayed by 10 seconds (bureaucratic processing)

**10. "Cost Cutting Specialist" Lee**
- Positive: Tesla prices reduced by 30%
- Negative: Boxes use cheap materials: 15% chance to auto-break every 20 seconds

### Additional Candidate Effect Ideas

**Environmental Effects:**
- **"Green Initiative"**: Solar panels cause IRS machine to randomly shut down for 3 seconds
- **"Modernization Effort"**: All UI elements randomly shuffle positions for 30 seconds

**Psychological Effects:**
- **"Motivational Speaker"**: Screen shakes with "encouraging" messages, harder to click precisely  
- **"Stress Management"**: Calming music plays but processing sounds are muted (harder to track completion)

**Economic Manipulation:**
- **"Inflation Fighter"**: All costs increase by 50% but payments stay same
- **"Tax Reform"**: Random boxes now require double verification (process twice)

**Chaos Candidates:**
- **"Disruptor"**: Box labels become harder to read (scrambled text)
- **"Change Agent"**: Controls randomly swap (W becomes S, etc.) for 45 seconds

## Game States

### Win Conditions
- **Primary**: Reach CEO level ($10,000)
- **Secondary**: Survive 30 minutes without firing

### Lose Conditions
- **Happiness**: Below -100
- **Bankruptcy**: Negative money balance
- **Time**: 30 minutes elapsed without CEO promotion

### Happiness System
- **Base**: 0 (neutral)
- **Range**: -100 (fired) to +100 (maximum bonus)
- **Recovery**: +2 happiness per correct result when below 0
- **Decay**: -1 happiness per 30 seconds when above +50

## Controls & Interface

### Keyboard Controls
- **WASD**: Movement
- **E**: Interact/Pick up
- **Q**: Drop/Throw away
- **SPACE**: Use 0-card shortcut
- **1-3**: Vote for candidates during elections

### UI Elements
- **Top Bar**: Money, Happiness meter, Level, Timer
- **Processing Queue**: Shows boxes in IRS machine
- **Tracking Board**: Box IDs with status
- **Election Panel**: Candidate info and voting (appears every 3 min)

## Technical Requirements

### Browser Compatibility
- HTML5 Canvas for rendering
- Keyboard event handling
- Local storage for high scores
- Responsive design for various screen sizes

### Performance Targets
- 60 FPS gameplay
- <100ms input latency
- <5MB total game size
- Works on GitHub Pages static hosting

## Art Style

### Visual Design
- **Style**: 2D pixel art
- **Resolution**: 16x16 or 32x32 pixel sprites
- **Color Palette**: Limited retro palette (16-32 colors)
- **UI**: Clean, functional design with corporate aesthetic

### Asset Requirements
- Player character sprites (5 frames walk cycle)
- Box/document sprites
- IRS machine animation
- UI elements and icons
- Background tiles

## Audio Design

### Sound Effects
- Box arrival/pickup sounds
- IRS machine processing/completion
- Success/failure feedback
- UI click sounds
- Election announcement

### Music
- Background corporate/elevator music
- Election theme
- Success/failure stingers

## Balancing Notes

### Difficulty Curve
- **Minutes 0-6**: Learning phase, slow pace
- **Minutes 6-15**: Steady ramp-up, introduce complexity
- **Minutes 15-24**: High pressure, multiple mechanics
- **Minutes 24-30**: Maximum difficulty, clutch gameplay

### Risk/Reward Balance
- Tesla purchases should feel meaningful but not mandatory
- 0-card shortcuts should be tempting but risky
- Elections should create strategic decisions, not random events
- Level progression should feel earned and impactful

## Success Metrics

### Player Engagement
- Average session time: 25+ minutes
- Completion rate: 40%+ reach Senior level
- Replay rate: 30%+ play multiple sessions

### Gameplay Balance
- Tesla usage: 60%+ players purchase at least one
- Election participation: 80%+ players vote consistently
- Mistake rate: 10-15% wrong results (creates tension without frustration)