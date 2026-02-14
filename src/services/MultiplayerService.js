import Peer from 'peerjs';
import { store } from '../store';
import { setMultiplayerInfo } from '../store/multiplayerSlice';
import { startGame, addPlayer, playCardToBuildingPile, discardAndEndTurn, drawCards } from '../store/gameSlice';

class MultiplayerService {
    constructor() {
        this.peer = null;
        this.conn = null;
        this.isHost = false;
    }

    init(peerId = null) {
        if (this.peer) return;

        this.peer = new Peer(peerId, {
            debug: 2
        });

        this.peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            store.dispatch(setMultiplayerInfo({ peerId: id }));
        });

        this.peer.on('connection', (conn) => {
            if (this.isHost) {
                this.conn = conn;
                this.setupConnection();
                store.dispatch(setMultiplayerInfo({ connectedPeerId: conn.peer }));
            }
        });
    }

    connectToPeer(targetPeerId, playerName = 'Guest') {
        this.isHost = false;
        store.dispatch(setMultiplayerInfo({ isHost: false }));
        this.playerName = playerName;
        this.conn = this.peer.connect(targetPeerId);
        this.setupConnection();
    }

    setupConnection() {
        this.conn.on('open', () => {
            console.log('Connected to: ' + this.conn.peer);
            // CRITICAL: Set isMultiplayer to true immediately on connection!
            store.dispatch(setMultiplayerInfo({ connectedPeerId: this.conn.peer, isMultiplayer: true }));

            // If we are the guest, tell the host we joined
            if (!this.isHost) {
                this.sendData({ type: 'PLAYER_JOINED', payload: { name: this.playerName || 'Guest Friend' } });
            }
        });

        this.conn.on('data', (data) => {
            this.handleIncomingData(data);
        });
    }

    sendData(data) {
        if (this.conn && this.conn.open) {
            this.conn.send(data);
        }
    }

    handleIncomingData(data) {
        const { type, payload } = data;
        switch (type) {
            case 'PLAYER_JOINED':
                // Host receives this
                if (this.isHost) {
                    store.dispatch(addPlayer(payload.name));
                    // Send updated player list back to guest
                    const players = store.getState().game.players;
                    this.sendData({ type: 'UPDATE_PLAYERS', payload: players });
                }
                break;
            case 'UPDATE_PLAYERS':
                // Guest receives this
                store.dispatch({ type: 'game/syncPlayers', payload });
                break;
            case 'START_GAME':
                // Guest receives full state from host
                // CRITICAL: Ensure we are in multiplayer mode!
                store.dispatch(setMultiplayerInfo({ isMultiplayer: true }));
                store.dispatch({ type: 'game/syncState', payload });
                break;

            case 'PLAY_CARD':
                store.dispatch(playCardToBuildingPile(payload));
                break;
            case 'DISCARD':
                store.dispatch(discardAndEndTurn({ ...payload, force: true }));
                break;


            case 'DRAW_CARDS':
                store.dispatch(drawCards());
                break;

            case 'RESTART_GAME':
                store.dispatch({ type: 'game/resetGame' });
                window.location.reload();
                break;

            case 'SYNC_STATE':
                // Guest receives full state from host
                store.dispatch({ type: 'game/syncState', payload: payload });
                break;

            case 'REQUEST_SYNC':
                // Host receives this and re-sends full state
                if (this.isHost) {
                    const fullState = store.getState().game;
                    this.sendData({ type: 'SYNC_STATE', payload: fullState });
                }
                break;

            default:
                console.log('Unknown data type:', type);
        }
    }


    startHosting() {
        this.isHost = true;
        store.dispatch(setMultiplayerInfo({ isHost: true }));
        this.init();
    }
}

const instance = new MultiplayerService();
export default instance;
