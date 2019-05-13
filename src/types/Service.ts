import { JiTap } from "./JiTap";
import { TinyTap } from "./TinyTap";

import * as t from 'io-ts';

//Typescript exports are all below and automatic from io-ts definitions

export module Service {
    export const KeepAlive = {
        endpoint: "keep-alive",
        response: t.interface({
            old: t.number,
            curr: t.number
        })
    }

    export const PingPong = {
        endpoint: "ping",
        request: t.interface({
            value: t.string
        }),
        response: t.interface({
            pong: t.string
        }),
    }

    export const GetUploadJwt = {
        endpoint: "get-upload-jwt",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string
        }),
        
        response: t.string 
    }

    export const GetSignedUrl = {
        endpoint: "get-signed-url",
        request: t.partial({
            uploadJwt: t.string, //really required, but blank is invalid anyway
            contentType: t.string,
            contentMd5: t.string,
            filename: t.string 
        }),
        response: t.interface({ 
            exists: t.boolean,
            url: t.string, 
            filename: t.string 
        })
    }

    export const CopyUrl = {
        endpoint: "copy-url",
        request: t.interface({ 
            uploadJwt: t.string,
            url: t.string,
        }),

        response: t.string 
    }


    export const QueueScreenshot = {
        endpoint: "queue-screenshot",
        request: t.interface({
            uploadJwt: t.string,
        }),
    }

    export const MakeScreenshot = {
        endpoint: "make-screenshot",
        request: t.interface({
            uploadJwt: t.string,
        }),
        response: t.string 
    }

    export const GetPlayerMeta = {
        endpoint: "get-player-meta",
        request: t.interface({
            payload: t.string,
        }),
        //response - only at compiletime 
    }

    export const CreateGame = {
        endpoint: "create-game",
        request: t.interface({
            userId: t.string,
            title: t.string,
        }),
        response: t.string
    }

    export const DeleteGame = {
        endpoint: "delete-game",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
    }

    export const DuplicateGame = {
        endpoint: "duplicate-game",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
            title: t.string,
        }),
        response: t.string
    }

    export const CreateSlide = {
        endpoint: "create-slide",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
        response: t.string 
    }

    export const DeleteSlide = {
        endpoint: "delete-slide",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string,
        }),
    }

    export const DuplicateSlide= {
        endpoint: "duplicate-slide",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string,
        }),
        response: t.string
    }

    export const ReorderSlides = {
        endpoint: "reorder-slides",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
            oldIndex: t.string,
            newIndex: t.string,
        }),
        response: t.array(t.string)
    }

    export const ListGames = {
        endpoint: "list-games",
        request: t.interface({
            userId: t.string,
        }),
        response: t.array(JiTap.Game)
    }

    export const GetGame = {
        endpoint: "get-game",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
        response: JiTap.Game 
    }

    export const UpdateGameTitle = {
        endpoint: "update-game-title",
        request: t.interface({
            userId: t.string,
            gameId: t.string,
            title: t.string,
        }),
    }

    export interface PingPong {
        Request: t.TypeOf<typeof PingPong.request>;
        Response: t.TypeOf<typeof PingPong.response>;
    }

    export interface GetUploadJwt {
        Request: t.TypeOf<typeof GetUploadJwt.request>;
        Response: t.TypeOf<typeof GetUploadJwt.response>;
    }
    export interface GetSignedUrl {
        Request: t.TypeOf<typeof GetSignedUrl.request>;
        Response: t.TypeOf<typeof GetSignedUrl.response>;
    }
    export interface CopyUrl {
        Request: t.TypeOf<typeof CopyUrl.request>;
        Response: t.TypeOf<typeof CopyUrl.response>;
    }
    export interface MakeScreenshot {
        Request: t.TypeOf<typeof MakeScreenshot.request>;
        Response: t.TypeOf<typeof MakeScreenshot.response>;
    }

    export interface GetPlayerMeta {
        Request: t.TypeOf<typeof GetPlayerMeta.request>;
        Response: TinyTap.Game 
    }


    export interface CreateGame {
        Request: t.TypeOf<typeof CreateGame.request>;
        Response: t.TypeOf<typeof CreateGame.response>;
    }

    export interface DeleteGame {
        Request: t.TypeOf<typeof DeleteGame.request>;
        Response?: null; 
    }

    export interface DuplicateGame {
        Request: t.TypeOf<typeof DuplicateGame.request>;
        Response: t.TypeOf<typeof DuplicateGame.response>;
    }

    export interface CreateSlide {
        Request: t.TypeOf<typeof CreateSlide.request>;
        Response: t.TypeOf<typeof CreateSlide.response>;
    }

    export interface DeleteSlide {
        Request: t.TypeOf<typeof DeleteSlide.request>;
        Response?: null; 
    }

    export interface DuplicateSlide {
        Request: t.TypeOf<typeof DuplicateSlide.request>;
        Response: t.TypeOf<typeof DuplicateSlide.response>;
    }

    export interface ReorderSlides {
        Request: t.TypeOf<typeof ReorderSlides.request>;
        Response: t.TypeOf<typeof ReorderSlides.response>;
    }

    export interface ListGames {
        Request: t.TypeOf<typeof ListGames.request>;
        Response: t.TypeOf<typeof ListGames.response>;
    }


    export interface GetGame {
        Request: t.TypeOf<typeof GetGame.request>;
        Response: t.TypeOf<typeof GetGame.response>;
    }

    export interface UpdateGameTitle {
        Request: t.TypeOf<typeof UpdateGameTitle.request>;
        Response?: null; 
    }
    export interface KeepAlive {
        Request?: null; 
        Response: t.TypeOf<typeof KeepAlive.response>;
    }
}
