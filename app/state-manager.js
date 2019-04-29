import STATE_EVENTS from './constants/state-events';

import { BootstrapState } from './states/bootstrap-state';
import { LaunchState } from './states/launch-state.js';
import { LoadingState } from './states/loading-state';
import { ExampleState } from './states/example-state';
import { GameoverState} from './states/gameover-state';
import { IntroState } from './states/intro-state';
import { StartMenuState } from './states/startmenu-state';
import { EndCreditsState } from './states/endCredits-state';
import { BattleState } from './states/battle-state';
import { AdState } from './states/ad-state';

export class StateManager {
    game = null;

    constructor(game) {
        this.game = game;
        this.setupStates();
        this.setupNativeListeners();
        this.setupListeners();
    }

    setupStates() {
        this.game.state.add('Bootstrap', BootstrapState);
        this.game.state.add('Launch', LaunchState);
        this.game.state.add('Loading', LoadingState);
        this.game.state.add('Intro',IntroState);
        this.game.state.add('StartMenu',StartMenuState);
        this.game.state.add('Game', ExampleState);
        this.game.state.add('Gameover',GameoverState);
        this.game.state.add('Battle',BattleState);
        this.game.state.add('EndCredits',EndCreditsState);
        this.game.state.add('Ad',AdState);
    }

    setupNativeListeners() {
        this.game.state.onStateChange.add((newState, oldState) => {
            
        });
    }

    setupListeners() {
        this.game.on(STATE_EVENTS.BOOTSTRAP_COMPLETED, () => {
            this.game.state.start('Launch');
        });

        // switch here between intro and game state during production

        this.game.on(STATE_EVENTS.LOADING_COMPLETED,() => {
            this.game.state.start('Intro')
        })

        // this.game.on(STATE_EVENTS.LOADING_COMPLETED, () => {
        //     this.game.state.start('Game');
        // });

        this.game.on(STATE_EVENTS.BEGIN_LOAD,() => {
            this.game.state.start('Loading');
        })
    }



    start() {
        this.game.state.start('Bootstrap');
    }
}
