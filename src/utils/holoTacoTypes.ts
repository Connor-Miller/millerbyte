export type TacoPolish = {
    polishname: string;
    formulaname: string;
    retired: string;
    limitededition: string;
    releaseDate: Date;
    collectionName: string;
}
export type TacoCollector = {
    name: string;
    email: string;
    lastLoginDate: Date;
    joinDate: Date;
}
export type TacoBottle = {
    bottleId: string;
    polishName: string;
    ownerEmail: string;
    isOpened: boolean;
    isSwatched: boolean;
    location: string;
}