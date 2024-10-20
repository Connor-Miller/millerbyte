export type TacoPolish = {
    polishName: string;
    formulaName: string;
    retired: string;
    limitedEdition: string;
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
    opened: string;
    swatched: string;
    location: string;
}