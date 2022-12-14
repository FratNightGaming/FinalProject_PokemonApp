import { User } from "./user";

export interface PokemonRanking
{
    // Generated by https://quicktype.io
    id:           number;
    userId:       number;
    userRank:     number;
    pokemonApiid: number;
    sprite:string;
    name: string;
    types:string;
    originalGame:string;

    //why is user necessary if we have access to userID? At same time, how do I display user information?
    //user:         User;
}