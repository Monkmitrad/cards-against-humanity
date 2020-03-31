export interface IGameInfo {
    players: {
        username: string;
        points: number;
        played: boolean;
    }[];
    currentCzar: string;
}
