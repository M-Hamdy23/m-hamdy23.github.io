# MohamedHamdy — Full Contribution History
**Repository:** nutrien-driver-training (Bitbucket: myriadglobalmedia)  
**Author Email:** mohamedhamdy231995@gmail.com  
**Total Commits:** 540 (local + remote branches)  
**Active Period:** November 14, 2022 – May 7, 2023  

---

## Table of Contents
1. [Phase 1 — UI & Core Infrastructure (Nov 2022)](#phase-1--ui--core-infrastructure-nov-2022)
2. [Phase 2 — Vehicle & World Systems (Nov–Dec 2022)](#phase-2--vehicle--world-systems-novdec-2022)
3. [Phase 3 — TM2 Railroad Crossing & Task System (Dec 2022)](#phase-3--tm2-railroad-crossing--task-system-dec-2022)
4. [Phase 4 — TM4 Tote Snap & Inventory System (Dec 2022)](#phase-4--tm4-tote-snap--inventory-system-dec-2022)
5. [Phase 5 — Recovery, AI & Camera Systems (Jan 2023)](#phase-5--recovery-ai--camera-systems-jan-2023)
6. [Phase 6 — Vehicle Lights & Audio (Jan–Feb 2023)](#phase-6--vehicle-lights--audio-janfeb-2023)
7. [Phase 7 — Vehicle Variations & Environment (Feb 2023)](#phase-7--vehicle-variations--environment-feb-2023)
8. [Phase 8 — World Vehicles & Spawner (Feb–Mar 2023)](#phase-8--world-vehicles--spawner-febmar-2023)
9. [Phase 9 — Bug Fixes & Controls Changes (Mar 2023)](#phase-9--bug-fixes--controls-changes-mar-2023)
10. [Phase 10 — TM2 Weather, Traffic & Tutorial Fixes (Mar 2023)](#phase-10--tm2-weather-traffic--tutorial-fixes-mar-2023)
11. [Phase 11 — On-Rails Driving System (Apr 2023)](#phase-11--on-rails-driving-system-apr-2023)
12. [Phase 12 — Camera View & Hints UX (Apr 2023)](#phase-12--camera-view--hints-ux-apr-2023)
13. [Phase 13 — TM4 Phase 2 Full Build (Apr–May 2023)](#phase-13--tm4-phase-2-full-build-aprmay-2023)
14. [Summary](#summary)

---

## Phase 1 — UI & Core Infrastructure (Nov 2022)

### Loading Screen & Scene Manager
| SHA | Date | Message |
|-----|------|---------|
| `1f0eb027` | 2022-11-14 | resize splashImage from 8k to 1080p |
| `1a85a9b0` | 2022-11-14 | make script to run code when state changed instead onEnable |
| `f9a41ac4` | 2022-11-14 | Make a copy for scene manager, and loading screen |
| `3e76033a` | 2022-11-14 | remove text and add loading image |
| `fc20197a` | 2022-11-14 | fix scene manager reference in all CheckBoxTemplate in Module selection |
| `6bcec740` | 2022-11-14 | fix scene manager reference in BeginAssessmentButton Variant |
| `ad4a41be` | 2022-11-14 | fix scene manager reference in BeginButton Variant |
| `ef9fd35e` | 2022-11-14 | fix scene manager reference in DemoButton Variant |
| `3dc7fd82` | 2022-11-15 | add Shared background in Main_UI prefab |
| `d364caf1` | 2022-11-15 | Make loading screen prefab using NUDT_ViewLoading prefab |
| `9460490e` | 2022-11-15 | fix scene manager reference in exit_Btn |

### Pause Menu & Game UI
| SHA | Date | Message |
|-----|------|---------|
| `ef839703` | 2022-11-15 | copy Game Scene content Prefabs from shift core |
| `da48b31f` | 2022-11-15 | remove View_PauseMenu and View_GameDefault from NUDT Views prefab |
| `5ab8bdd5` | 2022-11-15 | set background image to NUDT_PauseMenu prefab |
| `1a900598` | 2022-11-15 | remove settings_view from Core and use settings from NUDT |
| `688e7add` | 2022-11-15 | Make background fill screen in pause prefab |
| `a4e0e0e4` | 2022-11-15 | add InGame Background |
| `e0815878` | 2022-11-15 | make ingame background disable by default |
| `34fb9682` | 2022-11-15 | Put new GameUI in TrainingModules |
| `0c63228a` | 2022-11-15 | Make a copy from TrainingModule to make another TrainingModules |
| `cc1f3b46` | 2022-11-15 | Make assessment use Game UI |

### Settings & Audio
| SHA | Date | Message |
|-----|------|---------|
| `3deee6a1` | 2022-11-16 | update Shift Core to get SFx and vo player |
| `0b16c961` | 2022-11-16 | make a copy for sfx and vo collection from shift core |
| `fb1b6018` | 2022-11-16 | add sound icon to Resources |
| `04ac38b1` | 2022-11-16 | set panel image that contain all settings |
| `7be6439f` | 2022-11-16 | set sound icon and adjust text position for sliders |
| `f5e25b58` | 2022-11-16 | Set Shift Core on Fix-SoundController branch |
| `d0218256` | 2022-11-16 | Make a copy from Audio Controller |
| `165d5bc7` | 2022-11-16 | add audioController to main scene Managers prefab |
| `d03ce85d` | 2022-11-16 | Add volume slider Control Component |
| `1b06ba4f` | 2022-11-17 | disable slider background from settings menu |
| `7703c20e` | 2022-11-18 | fix missing scene in editor build settings |
| `ecd944bc` | 2022-11-18 | Set Shift Core to latest main branch Commit to solve build error |
| `d800c077` | 2022-11-22 | Merge remote-tracking branch 'origin/main' into feature/NUDT-29-settings-menu |
| `03b604e6` | 2022-11-21 | Change and fire event when traffic lights changed only one time |

---

## Phase 2 — Vehicle & World Systems (Nov–Dec 2022)

### Camera & Vehicle Change System
| SHA | Date | Message |
|-----|------|---------|
| `2889a0d8` | 2022-11-22 | shift core to main branch |
| `f7055f10` | 2022-11-22 | add cinemachine |
| `0ccdfd62` | 2022-11-22 | make exampleScene |
| `19a2e6a7` | 2022-11-23 | basic Vehicles Change Behaviour |
| `a325e3bb` | 2022-11-23 | rename objects in scene |
| `32b34256` | 2022-11-23 | remove Change Camera scriptable event, Add CameraSystem nameSpace, Add Unity events for camera transition states |
| `e6d4da0e` | 2022-11-23 | Add Inside CameraTarget Component To control Cam Target |
| `b50a8c96` | 2022-11-23 | separate Spawner and Change class, make prefabs |
| `e105c7d6` | 2022-11-24 | set Shift Core in SelectablesGroup, make OnDisable Function Remove onsubmit listener instead of destroy game object |

### Pause System
| SHA | Date | Message |
|-----|------|---------|
| `7bf8af45` | 2022-11-24 | Pause System |
| `741a5027` | 2022-11-25 | add IsGamePaused Property and set it from pauseSystem |
| `99dcf538` | 2022-11-25 | Implement IGamePausable and IPauseable on VehicleController |
| `f8d81f19` | 2022-11-25 | add track to example scene |
| `448227ac` | 2022-11-25 | Add Pause System Prefab to TrainingModules Scenes and assessment Scene |
| `33283b37` | 2022-11-25 | make pause system get pausableObjects before pause to get new instantiated objects |
| `45c95c1d` | 2022-11-25 | implement IGamePausable on trafficLights Script |
| `cf2a980f` | 2022-11-26 | add pausegame and unpausegame event to settings panel |
| `224b18e3` | 2022-11-26 | add pausegame and unpausegame event to controls panel |

### Vehicle Pool & Spawner
| SHA | Date | Message |
|-----|------|---------|
| `3b841f3b` | 2022-11-26 | put inside camera in high pos |
| `12632f2c` | 2022-11-26 | add object pool for vehicles Spawner |
| `011fd02d` | 2022-11-28 | Remove VehiclesChangeHandlerPrefab |
| `8a28ee0b` | 2022-11-28 | Change singleton access modifier |
| `a1a08f6f` | 2022-11-28 | Rename VehiclesSpawner To VehicleModelSpawner |
| `b11697a0` | 2022-11-28 | Make Truck Model prefab variant and add insideCameraTarget to it |
| `bc1ac13e` | 2022-11-28 | fix VehicleModelSpawner reference in Scene |
| `68923541` | 2022-11-28 | Make Truck Prefab |
| `220757b4` | 2022-11-28 | Rename ChangeVehicle to ChangeVehicleModel |
| `4a52e7e4` | 2022-11-28 | Rename VehicleChangeHandler to VehicleModelChangeHandler |
| `c209083d` | 2022-11-28 | Rename Variable Names |
| `9e3e8b9d` | 2022-11-28 | fix missing function reference |
| `0dcf50f7` | 2022-11-28 | make ChangeVehicleComponent |
| `47590693` | 2022-11-29 | Add outsideCameraTarget in TruckVehicle prefab To follow |

### Vehicle Transition Track Piece
| SHA | Date | Message |
|-----|------|---------|
| `2bea535d` | 2022-11-29 | Create TrackPieceTrigger For OnEnter and OnExit Trigger |
| `01d4c937` | 2022-11-29 | Add OnTrackPieceEnter and Exit Action To TrackPiece Script |
| `8b2ad7ff` | 2022-11-29 | Create TransitionTrackPieceBase |
| `914ea87b` | 2022-11-29 | Create VehicleTransitionTrackPiece Behaviour |
| `aca277c9` | 2022-11-30 | Create PR_Base Prefabs |
| `fa0f84d9` | 2022-11-30 | Make TrackPieces Fix Window to fix TrackPiece to make them prefab variant from _PR_Base prefab |
| `5e860f80` | 2022-11-30 | Merge remote-tracking branch 'origin/main' into feature/NUDT-295-vehicle-transition-track-piece |

---

## Phase 3 — TM2 Railroad Crossing & Task System (Dec 2022)

### Weather & Day/Night Transition
| SHA | Date | Message |
|-----|------|---------|
| `451b4566` | 2022-12-01 | Make All road prefab variant from _PR_Base prefab |
| `65f976eb` | 2022-12-01 | fix Area2 trackPieces references and behaviour |
| `db0e74de` | 2022-12-01 | fix RoadPiece_AllPieceScene trackPieces positions |
| `927d7651` | 2022-12-01 | Fix DemonstrationScene.unity trackPieces positions |
| `04416949` | 2022-12-01 | fix track controller tracks references |
| `f6f4d702` | 2022-12-01 | fix playerVehicle example trackcontroller references |
| `1e96e9e5` | 2022-12-01 | fix Area track references |
| `6a801377` | 2022-12-01 | add namespace NUDT.WeatherSystem, Fix setWeather function and make it take float variable instead of int |
| `91a5ad99` | 2022-12-01 | Create WeatherTransitionTrackPiece behaviour |
| `7c11d213` | 2022-12-01 | Create WeatherTransitionTrackPieceEditor to make custom inspector for easy use |
| `73356c5e` | 2022-12-02 | Add init value for fog and rain in weather controller |
| `22cffa06` | 2022-12-02 | Fix outSide camera target in Camera Manager |
| `1a501163` | 2022-12-02 | Add example Scene for weather and vehicle transition |
| `f56ee40b` | 2022-12-02 | handle if weather not found in scene throw error |
| `370251de` | 2022-12-02 | Create DayNightTransitionTrackPiece |
| `8036e2f0` | 2022-12-02 | make folder for daynight system and create scriptable events and texthandle for example scene |
| `d83cd247` | 2022-12-02 | add dayNight transition to example scene |
| `b6ad0d39` | 2022-12-05 | update TrackController with references |
| `381b846d` | 2022-12-05 | Merge remote-tracking branch 'origin/main' into feature/NUDT-7-tm2-level-railroad-crossing-first |

### TM2 Railroad Crossing Level
| SHA | Date | Message |
|-----|------|---------|
| `bc831aa4` | 2022-12-06 | RailRoad Area base |
| `d95e2b0c` | 2022-12-06 | add dialogue controller, change area spawned, add task 1 |
| `326921c7` | 2022-12-06 | add intersection road track with railway props on it |
| `0b164063` | 2022-12-06 | add task 1 |
| `83c7ef5e` | 2022-12-06 | add warning lights and animate it for railroad crossing |
| `7ddeb79e` | 2022-12-07 | add weather track transition, add task advancer to start and finish task2 |
| `5da741d6` | 2022-12-07 | adjust scene names and remove unused objects |
| `d6f70ce6` | 2022-12-07 | Merge remote-tracking branch 'origin/main' into feature/NUDT-7-tm2-level-railroad-crossing-first |
| `da569d1e` | 2022-12-07 | Add onSetSpeed event and Set speed function for controlling vehicle speed without reference vehicle |
| `81810a50` | 2022-12-07 | fix pause and un-pause vehicle weird behaviour |
| `61364dcc` | 2022-12-07 | Add new vehicle to TM2 |
| `c979daa1` | 2022-12-07 | rename and separate each task state |
| `9525d54d` | 2022-12-07 | set inside and outside camera look at target |

### TM2 Speed & Controls
| SHA | Date | Message |
|-----|------|---------|
| `77ac6013` | 2022-12-12 | Fix Pressing brakes with space bar after pressing the gas button |
| `070c48a6` | 2022-12-12 | Fix straight lane collider to fix issue Brakes hint doesn't show |
| `c92eae3b` | 2022-12-12 | Add Force stop event to truck to force stop when enter track piece |
| `c8b7d2dd` | 2022-12-13 | add LeanTouch+ asset to the project |
| `77c0b579` | 2022-12-13 | add camera left and right rotation by using mouse click and drag to control camera |
| `9f05f419` | 2022-12-13 | Fix Speed shouldn't be able to be changed during hints, currently can hold 'W' key to do this |
| `a29880bb` | 2022-12-13 | Speed should have a maximum |
| `0d98b665` | 2022-12-13 | Create new lean behaviour to fix camera rotate left and right by moving target object in x and y axis |
| `89c73adb` | 2022-12-14 | add pause game and unpause game event on hint dialog to pause game when opened and unpause when closed |
| `af0f8122` | 2022-12-15 | make action queue to store actions from UI when game is paused to do it when game resumes |
| `36bbed29` | 2022-12-15 | save action for gas and accelerate and decelerate and set speed |
| `551482fa` | 2022-12-15 | tm2 work well with new pause and unpause hint but issue with max speed |
| `ff118635` | 2022-12-15 | add OnChangeMuteTruckInputs to mute and unmute player inputs from keyboard |
| `d36c69a2` | 2022-12-15 | fix problem with break and speed by disabling player inputs that in training player should not change velocity |
| `2b0fcd17` | 2022-12-14 | Fixed: If the player is driving too slowly, when they press brakes they won't have enough momentum to reach the trigger for the second hint/stage |

---

## Phase 4 — TM4 Tote Snap & Inventory System (Dec 2022)

### TM4 Initialization & Tote Fall
| SHA | Date | Message |
|-----|------|---------|
| `eb06d585` | 2022-12-16 | init TM4 and add replace new systems with temp one or old one |
| `91737851` | 2022-12-16 | fix problem with pickup truck that can't detect triggers |
| `a1d9193c` | 2022-12-16 | fix force break for vehicle |
| `a632e6b9` | 2022-12-16 | create initial area for tote snap |
| `4faea009` | 2022-12-16 | remove track pieces behaviours |
| `f2bebbce` | 2022-12-16 | start task 1 when truck enters intersection area |
| `14a72a9e` | 2022-12-19 | fix pickup truck stuck on the beginning of level |
| `0bfb716e` | 2022-12-19 | destroy unused vehicle model |
| `6f176c88` | 2022-12-19 | make camera outside |
| `4bdaa84a` | 2022-12-19 | make start area a bit short |
| `3a39c083` | 2022-12-19 | Add force to tote to make it fall when task activated |
| `6bfcc9c9` | 2022-12-19 | make all tote fall with different direction |
| `bbef595a` | 2022-12-19 | tote fall and popup appear to use break |

### Hazard Lights & Call Button (HUD)
| SHA | Date | Message |
|-----|------|---------|
| `c8ed67e8` | 2022-12-19 | add hazard lights task |
| `31f57c62` | 2022-12-19 | rename task states |
| `81f8f7e2` | 2022-12-20 | Add Call Button to HUD |
| `5209098a` | 2022-12-20 | Add hazard lights to HUD |
| `d2961156` | 2022-12-20 | rename activity name and fix next task bug |
| `501f4544` | 2022-12-20 | Add hazard lights and call button to HUD Logic and make events fired when pressed |
| `5fabb1dd` | 2022-12-20 | fix task name and hooked functions |
| `1ee1da1a` | 2022-12-20 | add hazard lights notify text and adjust hazard lights tasks |
| `b267e668` | 2022-12-20 | Add Call channels task |
| `faab5238` | 2022-12-20 | adjust next task and notify time |
| `994d350b` | 2022-12-20 | add place your warning triangles or flares task |
| `b29733a4` | 2022-12-20 | add Flag off the area that contains the tote (Hi Viz) task |
| `c683f59c` | 2022-12-20 | add inventory button to HUD |

### Inventory System (DotWeen, Object Placer)
| SHA | Date | Message |
|-----|------|---------|
| `1f079837` | 2022-12-21 | make inventory UI |
| `457f247a` | 2022-12-21 | add dotween asset |
| `29ac3445` | 2022-12-21 | do tween dll |
| `c8315bc5` | 2022-12-21 | create open and close logic |
| `05d819b7` | 2022-12-21 | make example scene, add flare and warning sprite, add logic to create slots from slots data |
| `6f681fbd` | 2022-12-21 | fire event with inventorySlot data when inventory slot clicked |
| `119e99da` | 2022-12-21 | remove name space from inventory slot script |
| `8ac7f792` | 2022-12-21 | create scriptable object for inventory item and one inventory items list |
| `63ef0fca` | 2022-12-22 | make object placer, add new camera for placer state, connect object placer with inventory slot clicked |
| `f97e445f` | 2022-12-22 | comment toggle key |
| `02baa7dd` | 2022-12-22 | add movement with right click and move mouse to placer camera to place object anywhere |
| `01a76440` | 2022-12-22 | fix camera transition from placer camera to other cameras |
| `7ef1c0ff` | 2022-12-22 | fix activity for inventory task |
| `b0e2e750` | 2022-12-22 | add event fired when inventory opened and inventory closed |
| `1e01d745` | 2022-12-22 | make new activity for object placer items |
| `61d3e8f4` | 2022-12-22 | adjust object placer and inventory slots to fire object activity when item spawned |
| `b2e2e85b` | 2022-12-22 | add flare_objectPlaced and warningTriangle_objectPlaced to task activity |
| `17fd3b4e` | 2022-12-23 | Make Object Placed Activity |
| `a8d6976e` | 2022-12-23 | flare structure prefab |
| `b5d6116f` | 2022-12-23 | connect inventory task with object placer activity |
| `4398d0b2` | 2022-12-23 | add open and close inventory event, add them to inventory task, make inventory task close inventory when task complete |
| `bf0b5fdf` | 2022-12-23 | fix camera placer target |
| `c639b6d1` | 2022-12-23 | make object list disable by default |
| `d8ed8a82` | 2022-12-23 | Fix placer camera move with car, connect flag area task with inventory and object placer |

---

## Phase 5 — Recovery, AI & Camera Systems (Jan 2023)

### World Vehicle AI Spawner
| SHA | Date | Message |
|-----|------|---------|
| `3beb5a2e` | 2022-12-26 | change scroll sensitivity |
| `18c15f8a` | 2022-12-26 | fix Dragging mouse up or down for camera causes it to go left/right |
| `ff6f3ef1` | 2022-12-28 | world vehicle spawner |
| `123e731e` | 2022-12-28 | fix AI traffic editor |
| `8f67345d` | 2022-12-28 | Merge remote-tracking branch 'origin/main' into NUDT-56-vehicle-behaviours-first-pass |
| `7a82f40e` | 2022-12-28 | Merge remote-tracking branch 'origin/main' into feature/NUDT-319-implement-tote-snap-first-pass |
| `baf9999b` | 2022-12-28 | make car get nearest waypoint to move from there |
| `53e59e1d` | 2022-12-28 | Merge remote-tracking branch 'origin/main' into NUDT-56-vehicle-behaviours-first-pass |
| `3ca456e5` | 2022-12-29 | Fix AI controller Initialization when not have Traffic system |
| `e5473389` | 2022-12-29 | fix wheel positions |
| `2bf5b756` | 2022-12-29 | fix AI path find nearest waypoint if it's behind the vehicle |
| `1fdf9808` | 2022-12-29 | add way points to some of road pieces |
| `28badef1` | 2022-12-31 | make prefab for 3rd vehicle |
| `f64ddc31` | 2022-12-31 | make car move to next traffic system |
| `4b67085f` | 2022-12-31 | Merge remote-tracking branch 'origin/main' into NUDT-56-vehicle-behaviours-first-pass |

### Segment & Track System
| SHA | Date | Message |
|-----|------|---------|
| `24082a3e` | 2023-01-03 | create a new world vehicle that moves with a set of waypoints instead of traffic system |
| `e6ae117f` | 2023-01-03 | remove draw gizmos |
| `80e481d5` | 2023-01-03 | rearrange scripts folders and fix car behaviour when not have segment |
| `9a2781bd` | 2023-01-03 | make editor for segments |
| `4d516d4f` | 2023-01-03 | Fix TM4 |
| `81a83104` | 2023-01-03 | Merge branch 'bugfix/NUDT-319-implement-tote-snap-first-pass-Fix' into NUDT-56-vehicle-behaviours-first-pass |
| `f4eae94e` | 2023-01-03 | fix restructuring segment |
| `3a682d80` | 2023-01-03 | connect segments with same number of lanes correctly |
| `1473ca56` | 2023-01-04 | add holdable button script to buttons |
| `f7a9226e` | 2023-01-04 | Merge remote-tracking branch 'origin/bugfix/NUDT-319...' |
| `5fdf49ff` | 2023-01-04 | separate segments update function from track pieces and connect them by unity event |
| `418891b1` | 2023-01-04 | fix intersection connection |
| `141ebe7a` | 2023-01-04 | fix connection from 2 lane to 4 lane |
| `a76e0610` | 2023-01-05 | fix connection lanes from 4 to 2 and make it connect dynamic with any number of lanes |
| `6266940a` | 2023-01-05 | add waypoints to some of Track Pieces |
| `5121309c` | 2023-01-05 | add waypoints to the rest of Track Pieces |
| `74088de8` | 2023-01-06 | remove unused code |
| `0f14cd0a` | 2023-01-06 | world spawner that spawn cars for each track |
| `f906418e` | 2023-01-06 | world spawner spawn vehicles with correct rotation and make car despawn to pool when reach destinations |
| `007bc77b` | 2023-01-06 | Merge remote-tracking branch 'origin/main' into NUDT-56-vehicle-behaviours-first-pass |
| `f0af91bd` | 2023-01-06 | fix spawned car position that make it fall or stuck on ground |
| `634271f2` | 2023-01-08 | Handle World vehicles spawn and movement and intersection behaviour |

### Camera Transitions & Recovery
| SHA | Date | Message |
|-----|------|---------|
| `58a8d301` | 2023-01-09 | Start and pause and unpause and gamepause and gameunpaused behaviour |
| `852e5ff7` | 2023-01-09 | mute login view when menumenu scene loaded from pause menu exit button |
| `28f75c81` | 2023-01-09 | Make Camera Transition TrackPiece and make editor for it and make example Scene |
| `13d0c770` | 2023-01-09 | Merge remote-tracking branch 'origin/main' into NUDT-56-vehicle-behaviours-first-pass |
| `4aea1f45` | 2023-01-10 | fix The player can no longer reach the main menu after using an in-game exit button |
| `f46c8756` | 2023-01-10 | the exit button on the end of the level still takes player to the login screen |
| `881d85ca` | 2023-01-10 | fix inside camera movement |
| `295b24a0` | 2023-01-10 | fix the offline menu is very briefly showed to the player |
| `7ad3c80f` | 2023-01-10 | Fix Player shouldn't be able to right click drag while in 3rd person to affect 1st person camera view |
| `a6be5141` | 2023-01-10 | Fix When switching to first person, the camera should just be facing the front |
| `137f2953` | 2023-01-11 | Player recover State |
| `745f252b` | 2023-01-11 | Merge remote-tracking branch 'origin/main' into feature/NUDT-336-gameplay-behavior-recover-play-state |
| `0c2bcd3a` | 2023-01-12 | add start with velocity function to vehicleMotor |
| `3e3f4026` | 2023-01-12 | detect if player falls below y=-5 and make playerRecovery save last track and velocity |
| `d2025b54` | 2023-01-12 | fix player spawn weird behaviour |
| `2b55d5f0` | 2023-01-13 | Detect Unrecoverable Area |
| `118bb3e7` | 2023-01-13 | remove debug |
| `af2a25e7` | 2023-01-13 | Separate pause events: make 1 for spawner and other for AI cars |
| `1560c32c` | 2023-01-13 | set pause AI car active |
| `4d77254b` | 2023-01-13 | do some refactor |
| `5caba055` | 2023-01-13 | make spawn wait 1 second if it can't spawn car because of existing cars in each segment |
| `7776a250` | 2023-01-14 | When AI cars are paused, they stay in the same place but keep wiggling as if trying to move |
| `8945597c` | 2023-01-14 | fix car stucking in intersection |
| `8d00f897` | 2023-01-14 | fix recovery when the player is spinning at a high speed |
| `b6f7fb32` | 2023-01-14 | the truck can hang off the edge of the map, it's unrecoverable |
| `e7c962fe` | 2023-01-16 | reset camera pos when recovery |
| `9a751564` | 2023-01-17 | Spawn with world vehicle with specific Direction and spawn Interval |
| `4dd18fa9` | 2023-01-17 | fix level data |
| `394a5ce5` | 2023-01-17 | new example scene for direction |
| `b7476562` | 2023-01-17 | Merge remote-tracking branch 'origin/main' into feature/NUDT-336-gameplay-behavior-recover-play-state |
| `b1dbfcd7` | 2023-01-17 | add spawn only number of vehicles and do some refactor |
| `dc1f977a` | 2023-01-17 | add option to spawn only number of vehicles and stop or continue spawning |
| `01011bb5` | 2023-01-17 | removed meta |
| `55a652de` | 2023-01-18 | custom spawn position |
| `b85cf43b` | 2023-01-18 | made spawn position enum to choose spawn position at start/middle/end of road piece |
| `b62e2cd0` | 2023-01-18 | make camera on drivers seat |
| `ebf986a1` | 2023-01-18 | fix camera damping to fix weird camera move when up and down |
| `35f70ff2` | 2023-01-19 | add If unity editor for gizmos |
| `9dedac16` | 2023-01-19 | editor |
| `10c94538` | 2023-01-19 | add missing segments |
| `c0c9f286` | 2023-01-19 | add vehicle variations scene with 2 vehicle |
| `bdb79659` | 2023-01-19 | add missing tag |
| `d46f84d3` | 2023-01-19 | make x damping to 0 |
| `a834d5b5` | 2023-01-19 | add recovery with last speed option |
| `2ff1f514` | 2023-01-19 | enable recovery with last speed on TM1, TM2, TM4 and TM6 |
| `f0d49110` | 2023-01-20 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-411-missing-unrecoverable-tag-after-merge |
| `cac7598d` | 2023-01-20 | fix recovery speed becomes 0 after fall before reach second track piece |

---

## Phase 6 — Vehicle Lights & Audio (Jan–Feb 2023)

### Vehicle Lights System
| SHA | Date | Message |
|-----|------|---------|
| `b4025c71` | 2023-01-25 | make front low and high light |
| `28b9a5ab` | 2023-01-26 | add flashing Functionality |
| `c1b37aa5` | 2023-01-26 | add lights to semitruck |
| `d2ff5c4b` | 2023-01-26 | add hazard lights to semitruck |
| `50999ec0` | 2023-01-26 | fix null references |
| `8f7cd698` | 2023-01-26 | add lights to pickup truck and make buttons to switch vehicles |
| `81a78884` | 2023-01-26 | property drawer for vehicle Light source |
| `9278ee1b` | 2023-01-26 | drawer for vehiclelights |
| `3ed4e9ae` | 2023-01-26 | automatic enable player vehicle light with day night cycle |
| `67f49e5f` | 2023-01-26 | Merge remote-tracking branch 'origin/main' into NUDT-393-player-vehicle-create-scene-to-test-all-variations |
| `97d57a9a` | 2023-01-26 | fix Camera position can't move with right click in this scene |
| `f7436003` | 2023-01-27 | The vehicles need to switch to first person before it goes uphill |
| `02d14e11` | 2023-01-27 | make railwayCrossing arm move up and down depend on state |
| `680166cf` | 2023-01-27 | make train move forward and backward |
| `b4424d56` | 2023-01-27 | add 3rd vehicle temp model and add it to scene |
| `ab4ae787` | 2023-01-27 | add turning left and turning right between the vehicle changes |
| `056e1a37` | 2023-01-27 | add mute inputs event for modules on enable |
| `d9841f11` | 2023-01-30 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-414 |
| `596b5392` | 2023-01-30 | add start & stop at a traffic light then drive a little more then do the railway part |
| `b9cdf300` | 2023-01-31 | fix vehicle movement on start bug |
| `df9ca465` | 2023-01-31 | fix bounces |
| `8ded4abf` | 2023-01-31 | Merge remote-tracking branch 'origin/main' into NUDT-417-railroad-crossing |
| `89f9a771` | 2023-01-31 | Railway Light Handler |
| `41d0a249` | 2023-01-31 | Railway Cross Arms |
| `e16923f3` | 2023-01-31 | Add Train Layer |
| `fd14d258` | 2023-01-31 | Railway Crossing Controller |
| `fdaba45f` | 2023-02-01 | Merge remote-tracking branch 'origin/main' into NUDT-417-railroad-crossing |
| `e2a4f1fe` | 2023-02-01 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-414 |
| `f44ee5e5` | 2023-02-01 | disable left and right in beginning of tasks |
| `43c41191` | 2023-02-01 | disable left and right in beginning of tasks TM1 |
| `af360dfd` | 2023-02-01 | fix camera transition |
| `9fa76775` | 2023-02-01 | Merge remote-tracking branch 'origin/main' into feature/NUDT-253-vehicle-light-system |
| `40f14dac` | 2023-02-01 | make 2 buttons for switch camera inside and outside |
| `359e5d0b` | 2023-02-01 | Merge branch 'feature/NUDT-253-vehicle-light-system' of bitbucket.org... |
| `16c7d73e` | 2023-02-02 | add particle to make it more visible |
| `0b37e49a` | 2023-02-03 | make object placer place object on its own target holder only |
| `5d8243c3` | 2023-02-03 | fix object place bug, add game object setter |
| `515ae45c` | 2023-02-03 | Merge remote-tracking branch 'origin/main' into NUDT-441-tm4-tote-snap-functionality |
| `582a0f18` | 2023-02-03 | make target holder follow object position, fix TM4 object |
| `dafe053c` | 2023-02-03 | remove target Tag |
| `545b748a` | 2023-02-03 | Merge remote-tracking branch 'origin/main' into feature/NUDT-253-vehicle-light-system |
| `bfc8d2f6` | 2023-02-03 | make hazard light not conflict with signal left and signal right |
| `d36e1189` | 2023-02-03 | add light glow and add gameobject light source type to be set active/deactive depend on light state |
| `c4213c16` | 2023-02-03 | add light glow to pickup truck |
| `17217028` | 2023-02-06 | fix target holder position for warning and flare |
| `93db91b9` | 2023-02-06 | fix camera placement |
| `fb1e7b12` | 2023-02-06 | update material |
| `4a26c7f3` | 2023-02-06 | Merge remote-tracking branch 'origin/main' into feature/NUDT-253-vehicle-light-system |
| `f0f87d50` | 2023-02-07 | add mute to settings buttons |
| `80775cc8` | 2023-02-07 | Add Engine Sound |
| `a4147937` | 2023-02-07 | add engine sound for AI Cars |
| `460c5726` | 2023-02-07 | add sedan car to spawner |
| `8fa975e4` | 2023-02-07 | fix area segments connections |
| `627c58e3` | 2023-02-07 | make example scene |
| `f4c7b2b9` | 2023-02-07 | update shift |
| `5ef09406` | 2023-02-08 | Merge remote-tracking branch 'origin/main' into NUDT-435-vehicle-behaviors-p2-add-audio |
| `070b06a9` | 2023-02-08 | make example scene have more than one vehicle |

---

## Phase 7 — Vehicle Variations & Environment (Feb 2023)

### New Vehicle Models
| SHA | Date | Message |
|-----|------|---------|
| `e39c026b` | 2023-02-08 | semitruck and 4axleTanker |
| `3f167a2b` | 2023-02-08 | tanker vehicle part |
| `3ed676c5` | 2023-02-08 | Add SemiTruckWithTankerTrailer |
| `42751f96` | 2023-02-09 | fix problem with center of mass and wheels |
| `c7e7755f` | 2023-02-09 | adjust vehicle y |
| `1b0ebf1e` | 2023-02-09 | Fix TM1 Name |
| `6b6ce79f` | 2023-02-10 | Merge remote-tracking branch 'origin/main' into feature/NUDT-253-vehicle-light-system |
| `f1be339a` | 2023-02-10 | example scene |
| `1b23f67c` | 2023-02-11 | Merge remote-tracking branch 'origin/main' into feature/NUDT-253-vehicle-light-system |
| `481d1c1a` | 2023-02-11 | Merge remote-tracking branch 'origin/main' into NUDT-434-vehicle-behaviors-p2-add-lighting |
| `3ecf21cf` | 2023-02-11 | Merge remote-tracking branch 'origin/feature/NUDT-253-vehicle-light-system' into NUDT-434 |
| `533e78a4` | 2023-02-11 | signal when turning left or right |
| `e09155e4` | 2023-02-11 | make cars react to day night cycle |
| `09df92a7` | 2023-02-11 | break lights |
| `62433378` | 2023-02-11 | Sedan Lights |
| `09ad7f71` | 2023-02-11 | Rename Scene |
| `3fa3e9de` | 2023-02-13 | Fix tutorial problem |
| `daf70f9c` | 2023-02-13 | Merge remote-tracking branch 'origin/feature/NUDT-253-vehicle-light-system' into NUDT-434 |
| `8e358188` | 2023-02-13 | toggle light button |
| `1a61ae43` | 2023-02-13 | fix old loading screen |
| `1509a050` | 2023-02-13 | Fix "Begin Assessment" button takes you to explainer |
| `5cec76e8` | 2023-02-13 | add Buttons Sound |
| `df485234` | 2023-02-13 | add button sound to gameplay |
| `2ca9f53c` | 2023-02-13 | add audio for tutorial |
| `478f1bb3` | 2023-02-13 | add buttons audio for explainer |
| `ef84d6e0` | 2023-02-14 | trigger the signal lights |
| `6d002a03` | 2023-02-14 | Merge remote-tracking branch 'origin/main' into feature/NUDT-253-vehicle-light-system |
| `f1132847` | 2023-02-15 | blend skybox |
| `e1b2e060` | 2023-02-15 | make transition to 3 |
| `81022a93` | 2023-02-16 | fix sound for buttons |
| `55a56175` | 2023-02-16 | Merge remote-tracking branch 'origin/main' into NUDT-540-ui-button-click-audio |
| `b8ced5e4` | 2023-02-16 | Merge remote-tracking branch 'origin/main' into NUDT-505-env-world |
| `301da5f2` | 2023-02-16 | Brake, start Engine, Engine Sound |
| `fd2b1699` | 2023-02-17 | add sounds |
| `6dd3fdd2` | 2023-02-17 | Merge remote-tracking branch 'origin/main' into NUDT-505-env-world |
| `0bd1e2bb` | 2023-02-17 | Merge remote-tracking branch 'origin/main' into NUDT-424-player-vehicle-add-the-remainin |
| `fa5825d5` | 2023-02-18 | steering animation and steering wheel animation also |
| `1f13d19e` | 2023-02-18 | fade out and pitch value depend on vehicle speed |
| `c7244fe9` | 2023-02-19 | shippingWithContainer and TandamAmmoina |
| `337466a6` | 2023-02-20 | Merge remote-tracking branch 'origin/main' into NUDT-424-player-vehicle-add-the-remainin |
| `1213aef1` | 2023-02-21 | Merge remote-tracking branch 'origin/main' into NUDT-424-player-vehicle-add-the-remainin |
| `c61d3d78` | 2023-02-21 | FlotbedTrailer Part, PickupTruckWithFlotbedTrailer, PickupTruckWithTandemAmmonia |
| `ca9eb737` | 2023-02-21 | Vehicle Variation Scene with current Vehicles |
| `7e1c6970` | 2023-02-21 | add popup Sound to all Diag |
| `83ab02a3` | 2023-02-21 | Change Buttons Colors |
| `c7a5af59` | 2023-02-21 | Fix UI steering left and right |
| `ce84e228` | 2023-02-21 | make popup volume 0.215 |
| `143ea9f1` | 2023-02-21 | fix error |
| `ab72778d` | 2023-02-22 | add Ambulance, MiniVan, SchoolBus and New Sedan |
| `069e7428` | 2023-02-22 | Remove Missing Prefabs |
| `a51fe1c5` | 2023-02-22 | Merge remote-tracking branch 'origin/main' into NUDT-424-player-vehicle-add-the-remainin |

### Environment & Fog System (NUDT-505)
| SHA | Date | Message |
|-----|------|---------|
| `5577b752` | 2023-02-22 | Fertilizer Truck |
| `70e25471` | 2023-02-22 | Light position |
| `52791af6` | 2023-02-22 | add fertilizer Truck Area |
| `f89dcf9b` | 2023-02-22 | fix recovery bug |
| `a7f72646` | 2023-02-22 | Merge remote-tracking branch 'origin/main' into NUDT-505-env-world |
| `499c00d6` | 2023-02-23 | azure assets |
| `6d369abf` | 2023-02-23 | Make DayNight Cycle Use Azure Asset |
| `f50f511c` | 2023-02-23 | example |
| `9de057ac` | 2023-02-24 | make new weather controller that work with Azure |
| `fa927372` | 2023-02-24 | controller |
| `3cbbf472` | 2023-02-24 | weather slider transition |
| `54b862ef` | 2023-02-24 | Merge remote-tracking branch 'origin/main' into NUDT-505-env-world |
| `7d206cdf` | 2023-02-24 | Add to Tutorial Scene |
| `7ff93057` | 2023-02-24 | add azure skybox |
| `f2bc84cc` | 2023-02-24 | TM1 |
| `5c35a8a4` | 2023-02-24 | add camera follow |
| `46b847cb` | 2023-02-24 | Add To TM And Assessment Scene And ExampleVehicleVariation |
| `ff4e01c4` | 2023-02-24 | add time controller to Demonstration scene |
| `5ded1509` | 2023-02-24 | Change Glass and Fence |
| `a106b8c4` | 2023-02-24 | fog values |
| `737ed7a7` | 2023-02-24 | remove unused namespaces |
| `004ce836` | 2023-02-27 | configurable fog |
| `6ae3288e` | 2023-02-27 | values |
| `7808bd83` | 2023-02-27 | set new values for fog |
| `3dcc0e15` | 2023-02-27 | move asset to 3rd party folder |
| `2f2ad17d` | 2023-02-28 | fix Pickup Truck Mirror |
| `cd4201c8` | 2023-02-28 | remove demo scene button |
| `69f15b26` | 2023-02-28 | environment audio added to sfx group |
| `e47b21d0` | 2023-02-28 | Merge remote-tracking branch 'origin/main' into NUDT-505-env-world |

---

## Phase 8 — World Vehicles & Spawner (Feb–Mar 2023)

### World Vehicle Spawn Behaviour
| SHA | Date | Message |
|-----|------|---------|
| `6dafd6dc` | 2023-02-28 | fix Player has to see explainer every time |
| `cff3f9c1` | 2023-03-01 | make inside look at camera separate for each vehicle, adjust it for each vehicle, adjust inside camera near plane value |
| `0a568c9f` | 2023-03-01 | fix null reference |
| `7411b468` | 2023-03-01 | allow cache |
| `b120fefd` | 2023-03-01 | fix tutorial loading problem and change start button to continue button |
| `fcc2fb69` | 2023-03-01 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-522 |
| `2ba5a53b` | 2023-03-02 | add start vehicle spawn after click continue button |
| `55bf62c9` | 2023-03-02 | fix world vehicle game pause and unpause problem after adding to scene |
| `9b729b62` | 2023-03-02 | fix segment connection duplicate |
| `dc03a201` | 2023-03-02 | raise start world spawner after click continue button |
| `b253337d` | 2023-03-02 | fix straight 4 lane segments positions |
| `cf0d529d` | 2023-03-02 | add world player spawner to managers prefab |
| `01d8eabb` | 2023-03-02 | add new behaviour to allow world vehicle spawn depend on player sight range and spawn range |
| `c4362466` | 2023-03-03 | Merge remote-tracking branch 'origin/main' into NUDT-573-world-vehicles-fix-vehicles-spawns-in-Scenarios |
| `497da1a5` | 2023-03-03 | Check TM1, TM2, TM3, TM4 |
| `d61530fc` | 2023-03-03 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-522 |
| `b806ad9e` | 2023-03-03 | remove cache |
| `8a2f2ee1` | 2023-03-03 | change start to continue |
| `5bc88deb` | 2023-03-03 | make camera manager set look at object |
| `adb4b759` | 2023-03-03 | TM6 |
| `ed713558` | 2023-03-03 | Merge remote-tracking branch 'origin/main' into NUDT-573 |

### Bug Fixes & Stability
| SHA | Date | Message |
|-----|------|---------|
| `ebdb1d8f` | 2023-03-08 | player recovery after stuck with cars after 5s, AI try to steer before crash with player |
| `d4620d22` | 2023-03-08 | disable hint box in loading screen |
| `43e3bd4b` | 2023-03-08 | fix halo |
| `428c8d6d` | 2023-03-08 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-654-class-b-fix-street-light-halo |
| `f85c98b9` | 2023-03-09 | The tires spawn infinitely and its animations |
| `60d5e53f` | 2023-03-09 | Make car spawn only in front of player and despawn when it becomes behind player and not in player sight |
| `29ac8b7b` | 2023-03-09 | make cheat panel for NUDT |
| `35f4a4e1` | 2023-03-09 | Update Version Text |
| `385a063d` | 2023-03-09 | add button to clear all player prefs |
| `79f61934` | 2023-03-09 | Make car spawn only in front of player and despawn when it becomes behind player and not in player sight |
| `ffedcb88` | 2023-03-09 | The tires spawn infinitely and its animations |
| `4f1db366` | 2023-03-11 | controls |
| `c0361fe3` | 2023-03-11 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-654-class-b-fix-street-light-halo |
| `62ff8ce9` | 2023-03-11 | make lights auto turn off and on |
| `8b47d8be` | 2023-03-11 | Fix Camera turning when start with mirror |
| `2185ef0d` | 2023-03-14 | fix recovery |
| `ff073f67` | 2023-03-14 | fix trees materials |
| `0f187ac1` | 2023-03-14 | disable unity environment fog |
| `11ff46ce` | 2023-03-14 | Merge remote-tracking branch 'origin/main' into NUDT-668 |
| `39583b5b` | 2023-03-14 | fix light problem |
| `74d655c5` | 2023-03-14 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-654-class-b-fix-street-light-halo |
| `6670d77e` | 2023-03-14 | fog settings |

---

## Phase 9 — Bug Fixes & Controls Changes (Mar 2023)

| SHA | Date | Message |
|-----|------|---------|
| `0653d0d3` | 2023-03-17 | fix Player no longer gets recovered for being off road for too long and make new logic for it and fix player recovery state register |

---

## Phase 10 — TM2 Weather, Traffic & Tutorial Fixes (Mar 2023)

### TM2 Weather / Time
| SHA | Date | Message |
|-----|------|---------|
| `e1291d6b` | 2023-03-20 | TM2 change time and weather on enable |
| `679e177a` | 2023-03-22 | Weather and time |
| `712c7abf` | 2023-03-22 | fix rain |
| `c79cb5f1` | 2023-03-22 | Merge remote-tracking branch 'origin/feature/NUDT-480-tm2-v2' into NUDT-481 |

### Traffic Lights Fix
| SHA | Date | Message |
|-----|------|---------|
| `1c7bc3e3` | 2023-03-22 | enable new traffic light |
| `1a81bc3e` | 2023-03-22 | force state to Red |
| `d386fdd4` | 2023-03-22 | fix traffic in 1.prefab |
| `d65d1e3e` | 2023-03-22 | fix 2.prefab traffic lights |
| `87cbb7a2` | 2023-03-22 | fix traffic for railroad prefab |
| `7e14c18f` | 2023-03-22 | Merge remote-tracking branch 'origin/feature/NUDT-480-tm2-v2' into bugfix/NUDT-597 |

### Hints & Task Logic
| SHA | Date | Message |
|-----|------|---------|
| `3eb76ee8` | 2023-03-23 | make task 3 hide task2 Hint |
| `296132cc` | 2023-03-23 | make task stop at traffic fire completed event |
| `31aa54ef` | 2023-03-23 | make Triggers: TM-1 → Task (3) stop-at-traffic-lights listen to traffic task complete |
| `d221d735` | 2023-03-24 | remove unused editor terrain namespace |
| `bec96918` | 2023-03-24 | Merge remote-tracking branch 'origin/feature/NUDT-480-tm2-v2' into bugfix/NUDT-718 |
| `19399643` | 2023-03-27 | enable road extension |
| `c8f5f9da` | 2023-03-27 | Fix Camera movement |
| `33c49e8e` | 2023-03-28 | put indicator for gas and break tasks |
| `9052fa27` | 2023-03-28 | fix break twice problem |
| `2cf99c96` | 2023-03-29 | fix camera problem |
| `58d01ff6` | 2023-03-29 | stop when recovery and UI indicator for gas button |
| `b40352bf` | 2023-03-29 | Merge remote-tracking branch 'origin/feature/NUDT-480-tm2-v2' into NUDT-742 |
| `8624cd88` | 2023-03-29 | guide user at traffic lights |
| `cd5ea5c9` | 2023-03-30 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-751 |
| `8865a5e9` | 2023-03-30 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-563 |
| `e6d6350b` | 2023-03-31 | Merge branch 'bugfix/NUDT-563' of bitbucket.org... |
| `b5a9044e` | 2023-03-30 | add my changes again |
| `30fe6261` | 2023-03-30 | re-enable AI Vehicle for TM1 |
| `fca14cc7` | 2023-04-03 | fix camera problem |
| `8465b5d1` | 2023-04-03 | Merge remote-tracking branch 'origin/main' into bugfix/NUDT-563 |

---

## Phase 11 — On-Rails Driving System (Apr 2023)

| SHA | Date | Message |
|-----|------|---------|
| `b3d58acb` | 2023-04-06 | first pass for onrails |
| `cf82a724` | 2023-04-07 | Merge remote-tracking branch 'origin/main' into NUDT-759-on-rails |
| `22c726b1` | 2023-04-07 | fix track problems |
| `789df427` | 2023-04-07 | add on rails option to settings |
| `90501a34` | 2023-04-07 | Make VehicleOnRailsController work with isOnRails variable |
| `52a2f683` | 2023-04-07 | make default value is true |
| `a8e569ae` | 2023-04-07 | add isOnRails variable to MouseSteer |
| `b9a072b0` | 2023-04-07 | fix turn left position, make steering lerp = 2 |
| `5f139e77` | 2023-04-07 | set truck on its lane in TM1 |
| `5384ef37` | 2023-04-07 | fix null reference for waypointsSegments |
| `fafb6715` | 2023-04-10 | change lerp to movetowards |
| `346b309a` | 2023-04-10 | Merge remote-tracking branch 'origin/main' into NUDT-759-on-rails |

---

## Phase 12 — Camera View & Hints UX (Apr 2023)

### Recovery & Camera Bugs
| SHA | Date | Message |
|-----|------|---------|
| `f0b37079` | 2023-04-13 | Fix Not recovered if I am stuck in something while player is moving |
| `1db067f5` | 2023-04-14 | stop camera from moving in Y axis |
| `c849dc27` | 2023-04-14 | Make camera return to center after release right click |
| `830bbf58` | 2023-04-14 | Merge remote-tracking branch 'origin/main' into NUDT-808 |
| `19e1ac76` | 2023-04-14 | .gitattributes to make merging prefabs and scenes easy |
| `3eb24ab9` | 2023-04-14 | fix recovery on pause game and pause truck |
| `25d18c7a` | 2023-04-17 | Make tutorial hints that require input without continue button; fix overlapping hints bug |
| `4955c9cc` | 2023-04-17 | Merge remote-tracking branch 'origin/main' into NUDT-818 |
| `ad1e8868` | 2023-04-17 | disable TM1 hints continue button that require input |
| `0c15ee50` | 2023-04-17 | Merge remote-tracking branch 'origin/main' into NUDT-818 |
| `cec755d5` | 2023-04-17 | reduce sensitivity |
| `b7d8c356` | 2023-04-17 | Merge remote-tracking branch 'origin/main' into NUDT-808 |
| `ded13783` | 2023-04-17 | fix TM1 center hint |
| `6a724e44` | 2023-04-18 | force UI layer to HUD |

---

## Phase 13 — TM4 Phase 2 Full Build (Apr–May 2023)

### TM4 Core Tasks & Evaluation
| SHA | Date | Message |
|-----|------|---------|
| `9606ad21` | 2023-04-18 | make light settings, adjust some tasks |
| `94a8dd12` | 2023-04-19 | adjust old tasks |
| `86fe104d` | 2023-04-19 | Merge remote-tracking branch 'origin/main' into NUDT-588 |
| `690663e4` | 2023-04-20 | add UI Indicator and adjust some tasks |
| `d0b36560` | 2023-04-20 | change hints requiring user input to hints without button |
| `dcfea575` | 2023-04-20 | add enable-only call, hazardlights & inventory events; make TM4 separate prefab tasks |
| `f548e970` | 2023-04-20 | Merge remote-tracking branch 'origin/main' into NUDT-588 |
| `4753a68e` | 2023-04-20 | add start section |
| `d6144783` | 2023-04-25 | fix TM4 tasks and hints |
| `12ce55ad` | 2023-04-26 | TM4 tasks |
| `eaa5e420` | 2023-04-26 | complete tutorial tasks |
| `aa56aaf1` | 2023-04-26 | tote snap hazard test |
| `ecc6e1cb` | 2023-04-27 | evaluation system for TM4 |
| `52e27a03` | 2023-04-27 | fix some bugs with evaluation |
| `e83fa17f` | 2023-04-27 | fix problem with totes targets and hint duration |
| `64a2ec80` | 2023-04-28 | fix look at |
| `d3723793` | 2023-04-28 | make hints stay longer, remove traffic light tutorial from TM4 |
| `e03a4f50` | 2023-04-28 | fix hints and tasks time |
| `d5449fc7` | 2023-04-28 | add use brakes hint |
| `486e9afe` | 2023-04-28 | fix inventory button animation goes off the screen |
| `0aad6fcb` | 2023-05-01 | change target opaque square to indicator sprite |
| `edc47286` | 2023-05-01 | add SFX for placed objects |
| `02b46a8f` | 2023-05-01 | fix: player can place things outside of the green opaque square |
| `1669fd83` | 2023-05-01 | fix target indication |
| `c2b38b74` | 2023-05-02 | add indicator for inventory slots |
| `0675e3ae` | 2023-05-02 | Display warnings if driver fails to act safely |
| `731b2078` | 2023-05-02 | shouldn't be able to avoid the indicated area in the first guided part TM4 |
| `3ceab47c` | 2023-05-02 | reduce delay between hints |
| `57d64cac` | 2023-05-02 | fix call button indicator |
| `0cbf3107` | 2023-05-02 | The warning triangle is barely visible at the size that it is |
| `4e838d92` | 2023-05-02 | fix warning triangle isn't orange |
| `547b230b` | 2023-05-03 | telling them to start driving again |
| `845b298d` | 2023-05-03 | fix failing the order |
| `215872c0` | 2023-05-03 | Merge branch 'NUDT-588' of bitbucket.org... |
| `9b773f28` | 2023-05-04 | fix Starting position of TM4 — buildings blocking player's view |
| `0089ba44` | 2023-05-04 | force player onto the area they are supposed to pull over on |
| `00f7106e` | 2023-05-04 | fix AI vehicles disappearing in front of the player |
| `5f27b7f9` | 2023-05-04 | fix TM4 steps order |
| `c9933fc9` | 2023-05-05 | use hi-viz flag |
| `ba412eb5` | 2023-05-05 | tell user to click inventory item and then place it |
| `f896e127` | 2023-05-05 | add measure arrow |
| `5682f87b` | 2023-05-07 | Add code comments |

---

## Summary

### By the Numbers

| Metric | Value |
|--------|-------|
| **Total commits** | **540** |
| **First commit** | November 14, 2022 |
| **Last commit** | May 7, 2023 |
| **Active duration** | ~6 months |
| **Average commits/month** | ~90 |

### Work Areas Breakdown

| Area | Approx. Commits | Key Contribution |
|------|----------------|------------------|
| **UI & Core Infrastructure** | ~40 | Loading screen, scene manager, pause menu, settings, audio |
| **Vehicle & World Systems** | ~80 | Camera/vehicle change system, object pool, pause system, transition track pieces |
| **TM2 Railroad Crossing & Task System** | ~60 | Weather transitions, day/night cycle, railroad crossing scene, speed/control logic |
| **TM4 Tote Snap & Inventory** | ~55 | Tote fall mechanics, hazard lights, call button, full DoTween inventory UI, object placer |
| **Recovery, AI & Camera Systems** | ~70 | Player recovery state, unrecoverable zones, AI world vehicle spawning, segment connections |
| **Vehicle Lights & Audio** | ~60 | Vehicle light system, signal lights, hazard lights, glow, engine/button audio |
| **Vehicle Variations & Environment** | ~55 | New vehicles (SemiTruck, Tanker, School Bus, Ambulance), Azure sky/fog, environment audio |
| **World Vehicles & Spawner** | ~35 | Player-sight-based spawning, pause/unpause bug fixes, cheat panel, stability fixes |
| **Bug Fixes (Controls Changes era)** | ~5 | Recovery off-road logic rework |
| **TM2 Weather, Traffic & Tutorial** | ~25 | TM2 weather on enable, traffic light fixes, task trigger logic, gas/brake UI indicators |
| **On-Rails Driving System** | ~12 | Full `VehicleOnRailsController`, `isOnRails` toggle, MoveTowards steering |
| **Camera View & Hints UX** | ~15 | Y-axis fix, center-on-release, hint overlap fix, sensitivity reduction |
| **TM4 Phase 2 Full Build** | ~42 | Complete TM4 tutorial — evaluation, tote/inventory indicators, warnings, hi-viz flag, task order |

### Key Technical Achievements

1. **Full TM4 Tutorial Phase 2** — Built from scratch including a complete evaluation system, inventory/object placement with DoTween animations, SFX, area enforcement, and driver warning system.

2. **On-Rails Driving System** — Implemented `VehicleOnRailsController` with configurable settings toggle and `MouseSteer` integration to constrain vehicle to track.

3. **World Vehicle AI Spawner** — Built a complete sight-range and spawn-range based vehicle spawner with object pooling, segment-based routing, pause/unpause support, and intersection handling.

4. **Player Recovery System** — Developed a multi-case recovery system including off-road detection, unrecoverable zone tagging, spinning/stuck detection, pause-during-recovery, and velocity preservation on recovery.

5. **Weather & Day/Night Transition** — Created the `WeatherTransitionTrackPiece` and `DayNightTransitionTrackPiece` components with custom editors and Azure Sky integration.

6. **Vehicle Light System** — Built a full vehicle lighting system supporting signal lights, hazard lights, headlights (low/high), brake lights, glow effects, and day/night auto-switching.

7. **Inventory System** — Built the complete inventory UI with DoTween, object placer camera, scriptable item data, slot indicators, and placement area enforcement.

8. **Pause System** — Designed and implemented a generic `IGamePausable` pause architecture adopted across vehicles, AI, traffic lights, and spawners.

