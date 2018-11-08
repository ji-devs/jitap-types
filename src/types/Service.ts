import { JiTap } from "./JiTap";
import { TinyTap } from "./TinyTap";
import * as $ from 'sanctuary-def';

export module Service {

    export type Api = Partial<{
        Endpoint: string;
        Request: any;
        Response: any;
    }>

    export const PingPong:Api = {
        Endpoint: "ping",
        Request: $.RecordType ({
            value: $.String
        }),
        Response: $.RecordType ({
            pong: $.String
        }),
    }

    export interface PingPong extends Api {
        Request: {
            value: string;
        }
        Response: {
            pong: string;
        }
    }

    export const GetSignedUrl:Api = {
        Endpoint: "get-signed-url",
        Request: $.RecordType({
            uploadJwt: $.String,
            contentType: $.Nullable($.String), 
            contentMd5: $.Nullable($.String),
            filename: $.Nullable($.String),
        }),
        Response: $.RecordType({
            exists: $.Boolean,
            url: $.String,
            filename: $.String,
        })
    }


    export interface GetSignedUrl {
        Endpoint: "get-signed-url";
        Request: {
            uploadJwt: string;
            contentType?: string; 
            contentMd5?: string;
            filename?: string;
        }
        Response: {
            exists: boolean;
            url: string;
            filename: string;
        }
    }

    export const CopyUrl:Api = {
        Endpoint: "copy-url",
        Request: $.RecordType({
            uploadJwt: $.String,
            url: $.String,
        }),

        Response: $.RecordType({
            url: $.String
        })
    }

    export interface CopyUrl {
        Endpoint: "copy-url";
        Request: {
            uploadJwt: string;
            url: string;
        }
        Response: {
            url: string
        }
    }


    export const MakeScreenshot:Api = {
        Endpoint: "make-screenshot",
        Request: $.RecordType({
            uploadJwt: $.String,
        }),
        Response: $.RecordType({
            url: $.String
        })
    }

    export interface MakeScreenshot {
        Endpoint: "make-screenshot";
        Request: {
            uploadJwt: string;
        }
        Response: {
            url: string
        }
    }

    export const CreateGame:Api = {
        Endpoint: "create-game",
        Request: $.RecordType({
            userId: $.String,
            title: $.String,
        }),
        Response: $.String
    }

    export interface CreateGame {
        Endpoint: "create-game";
        Request: {
            userId: string;
            title: string;
        };
        Response: string;
    }

    export const CreateSlide:Api = {
        Endpoint: "create-slide",
        Request: $.RecordType({
            userId: $.String,
            gameId: $.String,
        }),
        Response: $.String 
    }

    export interface CreateSlide {
        Endpoint: "create-slide";
        Request: {
            userId: string;
            gameId: string;
        };
        Response: string;
    }

    export const ListGames:Api = {
        Endpoint: "list-games",
        Request: $.RecordType({
            userId: $.String,
        }),
        Response: $.Array(JiTap.Game)
    }

    export interface ListGames {
        Endpoint: "list-games";
        Request: {
            userId: string;
        };
        Response: Array<JiTap.Game>
    }

    export const GetGame:Api = {
        Endpoint: "get-game",
        Request: $.RecordType({
            userId: $.String,
            gameId: $.String,
        }),
        Response: JiTap.Game 
    }

    export interface GetGame {
        Endpoint: "get-game";
        Request: {
            userId: string;
            gameId: string;
        }
        Response: JiTap.Game;
    }

    export const PlayerMeta:Api = {
        Endpoint: "get-player-meta",
        Request: $.RecordType({
            userId: $.String,
            gameId: $.String,
            slideId: $.String,
        }),
    }

    export interface PlayerMeta {
        Endpoint: "get-player-meta",
        Request: {
            userId: string;
            gameId: string;
            slideId: string;
        }
        Response: TinyTap.Game;
    }

    export const UpdateGameTitle:Api = {
        Endpoint: "update-game-title",
        Request: $.RecordType({
            userId: $.String,
            gameId: $.String,
            title: $.String,
        })
    }

    export interface UpdateGameTitle {
        Endpoint: "update-game-title";
        Request: {
            userId: string;
            gameId: string;
            title: string;
        }
        Response: {}
    }
}
