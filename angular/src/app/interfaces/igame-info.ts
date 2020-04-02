export interface IGameInfo {
    players: {
        username: string;
        points: number;
        played: boolean;
        playedCard: string;
        cardContent: string;
    }[];
    currentCzar: string;
}
