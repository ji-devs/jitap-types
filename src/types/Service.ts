import { JiTap } from "./JiTap";
import { TinyTap } from "./TinyTap";

import * as t from 'io-ts';

//REMEMBER TO CREATE BOTH THE OBJECT AND THE INTERFACE!

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
        query: t.interface({
            value: t.string
        }),
        response: t.interface({
            pong: t.string
        }),
    }

    export const GetSessionJwt = {
        endpoint: "get-upload-jwt",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string
        }),
        
        response: t.string 
    }

    export const GetSignedUrl = {
        endpoint: "get-signed-url",
        query: t.partial({
            sessionJwt: t.string, //really required, but blank is invalid anyway
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
        query: t.interface({ 
            sessionJwt: t.string,
            url: t.string,
        }),

        response: t.string 
    }


    export const QueueScreenshot = {
        endpoint: "queue-screenshot",
        query: t.interface({
            sessionJwt: t.string,
        }),
    }

    export const QueuePublishGame = {
        endpoint: "queue-publish-game",
        query: t.interface({
            userId: t.string, 
            gameId: t.string,
            userToken: t.string, 
            old_token: t.string, 
            new_token: t.string, 
            title: t.string,
            description: t.string,
            isPublic: t.boolean,
            isEditable: t.boolean,
            categoryId: t.number,
            ageId: t.number,
            languageId: t.number,
        })
    }

    export const PublishGame = {
        endpoint: "publish-game",
        query: t.interface({
            publishJwt: t.string,
        }),
        response: t.interface({
            jsonUrl: t.string
        })
    }

    export const GetPlayerMeta = {
        endpoint: "get-player-meta",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string
        }),
        //response - only at compiletime 
    }

    export const GetPublishMeta = {
        endpoint: "get-publish-meta",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
        //response - only at compiletime 
    }

    export const CreateGame = {
        endpoint: "create-game",
        query: t.interface({
            userId: t.string,
            title: t.string,
        }),
        response: t.string
    }

    export const DeleteGame = {
        endpoint: "delete-game",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
    }

    export const DuplicateGame = {
        endpoint: "duplicate-game",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            title: t.string,
        }),
        response: t.string
    }

    export const CreateSlide = {
        endpoint: "create-slide",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
        response: JiTap.SlideInfo 
    }

    export const DeleteSlide = {
        endpoint: "delete-slide",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string,
        }),
    }

    export const SetSlideHidden = {
        endpoint: "set-slide-hidden",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string,
            isHidden: t.boolean
        }),
    }

    export const SetSlideActivity = {
        endpoint: "set-slide-activity",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string,
            activityKind: t.number
        }),
    }
    export const DuplicateSlide= {
        endpoint: "duplicate-slide",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string,
        }),
        response: JiTap.SlideInfo
    }

    export const ReorderSlides = {
        endpoint: "reorder-slides",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            oldIndex: t.string,
            newIndex: t.string,
        }),
        response: t.array(JiTap.SlideInfo)
    }

    export const ListGames = {
        endpoint: "list-games",
        query: t.interface({
            userId: t.string,
            sortBy: t.string,
            sortDir: t.string
        }),
        response: t.array(JiTap.Game)
    }

    export const GetGame = {
        endpoint: "get-game",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
        response: JiTap.Game 
    }

    export const GameModified = {
        endpoint: "game-modified",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
        response: t.number 
    }

    export const SlideModified = {
        endpoint: "slide-modified",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            slideId: t.string,
        }),
        response: t.number 
    }

    export const PublishModified = {
        endpoint: "publish-modified",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
        }),
        response: t.number 
    }

    export const UpdateGameTitle = {
        endpoint: "update-game-title",
        query: t.interface({
            userId: t.string,
            gameId: t.string,
            title: t.string,
        }),
    }

    export interface PingPong {
        Query: t.TypeOf<typeof PingPong.query>;
        Body?: null; 
        Response: t.TypeOf<typeof PingPong.response>;
    }

    export interface GetSessionJwt {
        Query: t.TypeOf<typeof GetSessionJwt.query>;
        Body?: null; 
        Response: t.TypeOf<typeof GetSessionJwt.response>;
    }
    export interface GetSignedUrl {
        Query: t.TypeOf<typeof GetSignedUrl.query>;
        Body?: null; 
        Response: t.TypeOf<typeof GetSignedUrl.response>;
    }
    export interface CopyUrl {
        Query: t.TypeOf<typeof CopyUrl.query>;
        Body?: null; 
        Response: t.TypeOf<typeof CopyUrl.response>;
    }
    export interface QueueScreenshot {
        Query: t.TypeOf<typeof QueueScreenshot.query>;
        Body?: null; 
        Response?: null; 
    }

    export interface QueuePublishGame {
        Query: t.TypeOf<typeof QueuePublishGame.query>;
        Body?: null; 
        Response?: null; 
    }

    export interface PublishGame {
        Query: t.TypeOf<typeof PublishGame.query>;
        Body?: null; 
        Response: t.TypeOf<typeof PublishGame.response>;
    }


    export interface GetPlayerMeta {
        Query?: t.TypeOf<typeof GetPlayerMeta.query>;
        Body?: null; 
        Response: TinyTap.Game 
    }

    export interface GetPublishMeta {
        Query?: t.TypeOf<typeof GetPublishMeta.query>;
        Body?: null; 
        Response: any; 
    }

    export interface CreateGame {
        Query: t.TypeOf<typeof CreateGame.query>;
        Body?: null; 
        Response: t.TypeOf<typeof CreateGame.response>;
    }

    export interface DeleteGame {
        Query: t.TypeOf<typeof DeleteGame.query>;
        Body?: null; 
        Response?: null; 
    }

    export interface DuplicateGame {
        Query: t.TypeOf<typeof DuplicateGame.query>;
        Body?: null; 
        Response: t.TypeOf<typeof DuplicateGame.response>;
    }

    export interface CreateSlide {
        Query: t.TypeOf<typeof CreateSlide.query>;
        Body?: null; 
        Response: t.TypeOf<typeof CreateSlide.response>;
    }

    export interface DeleteSlide {
        Query: t.TypeOf<typeof DeleteSlide.query>;
        Body?: null; 
        Response?: null; 
    }

    export interface SetSlideHidden {
        Query: t.TypeOf<typeof SetSlideHidden.query>;
        Body?: null; 
        Response?: null; 
    }

    export interface SetSlideActivity {
        Query: t.TypeOf<typeof SetSlideActivity.query>;
        Body?: null; 
        Response?: null; 
    }

    export interface DuplicateSlide {
        Query: t.TypeOf<typeof DuplicateSlide.query>;
        Body?: null; 
        Response: t.TypeOf<typeof DuplicateSlide.response>;
    }

    export interface ReorderSlides {
        Query: t.TypeOf<typeof ReorderSlides.query>;
        Body?: null; 
        Response: t.TypeOf<typeof ReorderSlides.response>;
    }

    export interface ListGames {
        Query: t.TypeOf<typeof ListGames.query>;
        Body?: null; 
        Response: t.TypeOf<typeof ListGames.response>;
    }

    export interface GetGame {
        Query: t.TypeOf<typeof GetGame.query>;
        Body?: null; 
        Response: t.TypeOf<typeof GetGame.response>;
    }

    export interface GameModified {
        Query: t.TypeOf<typeof GameModified.query>;
        Body?: null; 
        Response: t.TypeOf<typeof GameModified.response>;
    }

    export interface SlideModified {
        Query: t.TypeOf<typeof SlideModified.query>;
        Body?: null; 
        Response: t.TypeOf<typeof SlideModified.response>;
    }
    export interface PublishModified {
        Query: t.TypeOf<typeof PublishModified.query>;
        Body?: null; 
        Response: t.TypeOf<typeof PublishModified.response>;
    }

    export interface UpdateGameTitle {
        Query: t.TypeOf<typeof UpdateGameTitle.query>;
        Body?: null; 
        Response?: null; 
    }
    export interface KeepAlive {
        Query?: null; 
        Body?: null; 
        Response: t.TypeOf<typeof KeepAlive.response>;
    }
}
