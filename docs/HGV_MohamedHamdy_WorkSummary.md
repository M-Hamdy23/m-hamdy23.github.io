# Mohamed Hamdy – Work Summary
**Nutrien Driver Training (Unity)**
**Timeframe:** November 14, 2022 – May 7, 2023
**Total commits:** ~540 | **Files touched:** ~2,524 (including assets & meta) | **Custom C# scripts authored:** 80+

---

## 🗂️ Overview

Mohamed built the majority of the core gameplay systems for this Unity-based driver-training simulation. Work spans 7 months across ~20 feature/bugfix branches, covering vehicle behaviour, AI traffic, camera systems, training module logic, UI, and environment integration.

---

## 🏗️ Systems Built From Scratch

### 1. Pause System (`Assets/Scripts/Systems/PauseSystem/`)
- Designed `IGamePausable` and `IPausable` interfaces
- `PauseSystem` MonoBehaviour uses reflection (`FindObjectsOfType + OfType<>`) to discover all pausable objects at runtime before each pause, so newly spawned objects are included
- Implemented the interfaces on `VehicleController` and `TrafficLights`
- Wired pause/unpause Unity Events into the Settings and Controls UI panels

---

### 2. World Vehicle / AI Traffic System (`Assets/Scripts/Systems/WorldVehicleSystem/`)
This is the largest system built. AI cars populate the world around the player.

- **`WorldVehicleSpawner`** – spawns vehicles at road-piece positions; only spawns in front of the player within a configurable sight range; despawns when the car moves behind the player
- **`WorldVehicleController`** – moves AI cars along waypoint segments, handles intersection yielding
- **`WorldVehicleSensor`** – detects obstacles and other vehicles ahead; steers AI to avoid crashing into the player
- **`SegmentsHolder`**, **`WaypointSegment`**, **`AIWaypoint`** – waypoint graph used by both AI vehicles and the on-rails system
- **`SegmentsPathHelper`** – connects road segments together dynamically, handles 2-lane ↔ 4-lane connections
- **`SmartRoadPiece`** – marks road pieces with segment metadata
- **Object pooling** (`ObjectPool`) for vehicle instances
- Configurable: spawn interval, spawn count limit, spawn position (start/middle/end of road piece), directional spawning
- Integrated pause/unpause so AI cars freeze (not wiggle) when game is paused
- Fixed AI cars getting stuck in intersections

---

### 3. Track System (`Assets/Scripts/Systems/Track System/`)
A linear level-layout system where the road is composed of modular "track pieces":

- **`TrackPiece`** – base road segment with enter/exit actions
- **`TrackPieceTrigger`** – collider-based trigger that fires `OnEnter`/`OnExit` events
- **`TransitionTrackPieceBase`** – abstract base for all transition behaviours
- **`VehicleTransitionTrackPiece`** – swaps the player's vehicle model when crossing a track boundary
- **`WeatherTransitionTrackPiece`** – smoothly changes weather (fog density, rain) on entry; has a custom inspector (`WeatherTransitionTrackPieceEditor`)
- **`DayNightTransitionTrackPiece`** – transitions sky time-of-day at track boundaries
- **`CameraTransitionTrackPiece`** – forces camera mode change (inside/outside) at specific track points; has a custom inspector
- **`TrackController`** – manages the ordered sequence of track pieces
- **`LevelTrackDataSO`** – ScriptableObject to store per-level track layout data
- **`TrackPiecesFixWindowEditor`** – Unity Editor utility window that batch-converts all road prefabs into variants of a `_PR_Base` prefab

---

### 4. Player Recovery System (`Assets/Scripts/Systems/PlayerRecover/`)
Handles all edge cases where the player gets into an unrecoverable state:

- **`PlayerRecoverState`** – saves last good position, velocity, and angular velocity on every valid track piece; teleports the player back with `startWithVelocity` so they don't come to a dead stop
- **`DetectUnrecoverablePlayArea`** – fires recovery if player falls below `y = -5`, if off-road for too long, or if spinning at high speed
- Recovery after getting stuck against AI cars for 5 seconds
- Camera resets to forward on recovery
- Option: "recover with last speed" so in-training modules the truck resumes its previous speed
- Integrated with pause: recovery doesn't fire while game is paused

---

### 5. Vehicle Lights System (`Assets/Scripts/PlayerVehicleInput/Core/VehicleLights/`)
Full lighting system for player vehicles:

- `VehicleLights`, `VehicleLight`, `VehicleLightSource`, `VehicleLightsManager`, `LightsManager`
- Light types: **low beam**, **high beam**, **brake lights**, **turn signal left/right**, **hazard lights**
- Hazard lights correctly don't conflict with turn signals (separate state logic)
- Light sources can be Unity `Light` components *or* game objects that activate/deactivate
- Particle-system glow effects for headlights
- Lights automatically turn on/off based on day/night cycle
- Custom property drawers (`VehicleLightsDrawer`, `VehicleLightSourceDrawer`) for clean Inspector UI
- Applied to: Sedan, Semi-truck, Pickup Truck

---

### 6. Camera System (`Assets/Scripts/PlayerVehicleInput/Core/Camera/`)
Multi-mode camera with smooth transitions:

- **`CameraManager`** – single entry point to switch between inside, outside, and placer camera modes
- **`InsideCameraTarget`** / **`OutsideCameraTarget`** / **`PlacerCameraTarget`** / **`InsideLookAtCameraTarget`** – per-vehicle camera anchor points
- **`TransitionCamera`** – Cinemachine-based smooth blend between states
- **Right-click drag** to look around (LeanTouch+ integration); camera snaps back to center on mouse release
- Camera locked from Y-axis drift
- Fixed: camera damping causing weird vertical movement; 3rd-person camera polluting 1st-person view; camera not facing forward when switching to 1st person

---

### 7. Vehicle Change System (`Assets/Scripts/PlayerVehicleInput/Core/VehiclesChange/`)
Supports multiple vehicle types in a single level:

- `VehiclesChangeHandler` / `VehicleModelChangeHandler` / `VehicleModelSpawner` / `ChangeVehicleModel`
- Vehicles are spawned on demand and returned to an object pool
- Vehicles included: Pickup Truck, Semi-Truck, 4-Axle Tanker, Semi+Tanker Trailer, Flatbed Trailer, Pickup+Flatbed, Pickup+Tandem Ammonia, Shipping Container Truck, Ambulance, MiniVan, School Bus, Sedan
- Turning left/right animations play during vehicle transitions

---

### 8. On-Rails Driving Mode
- **`VehicleOnRailsController`** – auto-steers the vehicle along the road's waypoint graph using `Vector3.Cross` to compute steering angle; player only controls gas/brake
- `MouseSteer.isOnRails` toggle to enable/disable
- On-rails option exposed in the Settings menu

---

### 9. Inventory & Object Placement System (`Assets/Scripts/Inventory/`)
Used in TM4 for placing safety equipment (warning triangles, flares, Hi-Viz flag):

- **`InventorySlot`** / **`InventorySlots`** / **`InventoryUIHandler`** / **`InventorySlotUIHandler`** – UI slots populated from a ScriptableObject list
- **`ObjectPlacer`** – switches to a dedicated "placer camera" when an inventory item is selected; player pans with right-click to aim, then places the object at the target
- **`TargetHolder`** – a visual green indicator that follows a world position and snaps placed objects
- **`TargetPlaceTag`** / **`PivotHelper`** – constrain placement to valid zones only
- **`ActivityObjectPlaced`** / **`ActivityObjectListChecker`** / **`ClickInventorySlotChecker`** – activity checkers that feed into the task system
- **`GameObjectSetter`** – activates/deactivates specific GameObjects on inventory events
- Events: `InventoryOpened`, `InventoryClosed`, `SlotClicked`, `ObjectPlaced`
- DOTween used for inventory panel open/close animation

---

### 10. Training Module 4 (TM4) – Breakdown Scenario
Full guided + free-drive breakdown training sequence:

- **Narrative:** Tote falls off truck → player must stop safely, activate hazard lights, call dispatch, place warning triangles/flares, flag the area with Hi-Viz
- **`TM4StopAreaHandler`** – detects if player tries to drive past the designated pull-over zone and forces them back
- **`TaskListAdvancerWithReset`** – steps through tasks with optional reset when re-entering
- **`ObjectPlacedChecker`** / **`DestroyObjectPlaced`** / **`SpecificActivityChecker`** – verify each safety step is completed
- **`TrainCrossingEvaluation`** – shows warnings/failures if the player skips safety steps or acts unsafely
- UI indicators on inventory slots and on the gas/brake buttons
- Hint system with configurable delays and no "Continue" button for non-input hints
- "Cannot avoid the indicated area" enforcement in guided portion

---

### 11. Training Module 2 (TM2) – Traffic Light + Railroad Crossing
- **`RailwayCrossing`** – state machine for the crossing gate sequence
- **`RailwayCrossingArms`** – animates gate arms up/down
- **`RailwayLightHandler`** – flashing red warning lights
- **`TrainMotor`** – moves train forward and backward on trigger
- Task flow: stop at traffic light → guided brake practice → drive to crossing → react to crossing
- Weather and time-of-day automatically set on module enable

---

### 12. Weather System (`Assets/Scripts/Systems/Weather System/`)
- **`WeatherController`** – controls fog density, rain particle system, and sky time of day via Azure[Sky]
- **`WeatherTransition`** – smooth linear interpolation between weather presets
- **`PSController`** – wrapper for rain particle system
- Configurable fog colour (black or atmospheric)
- Custom `FogSettingsDrawer` for the Inspector

---

### 13. Day/Night Cycle (`Assets/Scripts/Systems/Day-Night Cycle/`)
- Integrated **Azure[Sky] Dynamic Skybox** asset to replace the original skybox blender
- **`SkyboxBlender`** – blends between two skybox materials by time-of-day value
- **`DayNightTextHandle`** – displays current time as formatted text in UI
- Vehicle lights auto-activate based on sky darkness threshold

---

### 14. Vehicle Audio (`Assets/Scripts/PlayerVehicleInput/Core/Audio/`)
- **`VehicleAudioManager`** – engine start sound, engine loop (pitch + volume scale with speed), brake screech
- Steering wheel 3D mesh animates in sync with actual steering angle
- Engine sounds also applied to AI world vehicles

---

### 15. UI Systems (`Assets/Scripts/UI/`)
- `LoginView` and `SplashView` (resize splash image from 8K to 1080p)
- `Game_UIManager` / `HUD_UIManager` – in-game and HUD state management
- `UI_OnRailsArea` – shows steering restriction UI during on-rails sections
- Settings menu: volume sliders (SFX, VO), mute buttons
- `ButtonsSoundHandler` – plays SFX on every UI button click
- Cheat panel for QA: clear PlayerPrefs, force version text, etc.
- Loading screen built from Shift Core's `NUDT_ViewLoading` prefab
- Fixed "Begin Assessment takes you to explainer" and "player sees explainer every time" bugs

---

## 🐛 Key Bug Fixes

| Issue | Fix |
|---|---|
| Player stuck on TM1 load | Disabled conflicting player inputs at start |
| Brakes hint not triggering | Fixed straight-lane trigger collider size |
| Speed changeable during hints | Input muted while hint is open |
| AI cars wiggle when paused | Set cars active=false while paused |
| AI car tires spawning infinitely | Fixed spawner loop logic |
| Recovery not triggering off-road | New detection logic; re-registered after scene merge |
| Recovery speed → 0 after fall | Save/restore velocity on recovery |
| Camera shaking on mirror start | Fixed damping values |
| Street light halo artifacts | Fixed light component settings |
| Player can place objects outside zone | Constrained `ObjectPlacer` to own `TargetHolder` only |
| 3rd person drag affecting 1st person view | Guarded with camera-mode check |
| Player has to see explainer every time | Added caching/PlayerPrefs flag |
| Exit button took to login instead of menu | Fixed scene manager references |
| Hazard lights conflicted with turn signals | Separate boolean state per light type |
| AI cars spawn in front of player (visible pop-in) | Spawn only behind player FOV, despawn behind |

---

## 📦 Third-Party Assets Integrated

| Asset | Purpose |
|---|---|
| **Azure[Sky] Dynamic Skybox** | Day/night cycle & weather sky |
| **LeanTouch / LeanTouch+** | Right-click camera drag, swipe, pinch |
| **DOTween** | UI animations (inventory, hints) |
| **Cinemachine** | Camera transitions |
| **NWH Vehicle Physics 2** | Underlying vehicle physics |
| **EasyRoads3D** | Road mesh generation |

---

## 📁 File Count Summary

| Category | Files |
|---|---|
| Custom C# Scripts (authored/modified) | ~80 |
| Third-party plugin scripts (added to project) | ~150 |
| Unity scenes / prefabs / materials | ~2,290 |
| **Total unique files across all commits** | **~2,524** |
