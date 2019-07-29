import * as t from 'io-ts';

export module JiTap {

    export const SlideInfo = t.interface({
        id: t.string,
        isHidden: t.boolean,
        activityKind: t.number,
        createdTime: t.number,
        lastModifiedTime: t.number,
        lastScreenshotTime: t.number,
    });

    //Created manually due to activityKind union
    export interface SlideInfo {
        id: string;
        isHidden: boolean;
        activityKind: ActivityKind | -1;
        createdTime: number;
        lastModifiedTime: number;
        lastScreenshotTime: number;
    }

    export const Game = t.interface({
        //the unique id for the game
        id: t.string,
        //this is needed for deriving a title for some reason. Whatever
        originId: t.string,
        //if the game was copied from another, otherwise ""
        copiedFromId: t.string,
        //title if the user set one, otherwise ""
        title: t.string,
        //the Nth game this user created
        gameCount: t.number,
        //Array of slide metadata
        slideInfos: t.array(SlideInfo),
        //timestamp when this game was created
        createdTime: t.number,
        //timestamp when this game was updated
        lastModifiedTime: t.number,
        //timestamp when this game was published
        lastPublishTime: t.number
    });

    export interface Game extends t.TypeOf<typeof Game> {}

    export interface Slide {
        design:Design;
        activity?:Activity;
    }
    
    //DESIGN
    export interface Design {
        //no reason for bg or fg to be an ImageAsset since they can't have transforms
        bg?:string;
        fg?:string;
        stickers: Array<ImageAsset>;
    }
    
    //ACTIVITIES
    export type Activity = 
        Activity_Questions
        | Activity_Soundboard
        | Activity_Puzzle
        | Activity_SaySomething
        | Activity_Video
        | Activity_TalkType
    
    export enum ActivityKind {
        QUESTIONS = 0,
        SOUNDBOARD = 1,
        PUZZLE = 2,
        SAY_SOMETHING = 3,
        VIDEO = 4,
        TALK_TYPE = 5
    }
    
    //QUESTIONS
    export interface Activity_Questions {
        kind: ActivityKind.QUESTIONS; 
        questions: Array<Question>;
    }
    
    export interface Question {
        label: string;
        trace: Trace;
        audio: QuestionAudio;
    }
    
    export type QuestionAudio = Partial<{
        question: string;
        answer: string;
        mistake: string;
    }>
    
    //SOUNDBOARD 
    export interface Activity_Soundboard {
        kind: ActivityKind.SOUNDBOARD; 
        options: Soundboard_Options;
        items: Array<Soundboard_Item>;
    }
    
    export interface Soundboard_Options {
        introAudio?: string;
        bgAudio?: string;
        oneTime: boolean;
        showHints: boolean;
    }
    
    export interface Soundboard_Item {
        trace: Trace;
        audio?: string;
        jump?: string;
    }
    
    //PUZZLE 
    export interface Activity_Puzzle {
        kind: ActivityKind.PUZZLE; 
        options: Puzzle_Options;
        items: Array<Puzzle_Item>;
    }
    
    export interface Puzzle_Options {
        jump?: string;
        audio?: string;
        freePlay: boolean;
        easyMode: boolean;
        disableHints: boolean;
        shapes3d: boolean;
    }
    
    export interface Puzzle_Item {
        trace: Trace;
        audio?: string;
    }
    
    //SAY SOMETHING
    export interface Activity_SaySomething {
        kind: ActivityKind.SAY_SOMETHING; 
        audio?: string;
        continueAfter: boolean;
        jump?: string;
    }
    
    //VIDEO
    export interface Activity_Video {
        kind: ActivityKind.VIDEO; 
        src?: string;
        type?: VideoType;
    }
    
    export enum VideoType {
        UPLOAD = 0,
        YOUTUBE = 1
    }
    
    //TALK_TYPE 
    export interface Activity_TalkType {
        kind: ActivityKind.TALK_TYPE; 
        options: TalkType_Options;
        items: Array<TalkType_Item>;
    }
    
    export interface TalkType_Options {
        jump?: string;
        audio?: string;
        showHints: boolean;
    }
    
    
    export interface TalkType_Item {
        trace: Trace;
        audio?: string;
        answer: string;
        answerType: TalkTypeAnswerType;
    }
    
    
    export enum TalkTypeAnswerType {
        KEYBOARD = 0,
        MICROPHONE = 1
    }
    
    //GENERIC OBJECTS
    
    //IMAGES
    export interface ImageAsset {
        src: string;
        type: ImageAssetSourceType;
        position: Point;
        scale: number;
        rotation: number;
        nativeWidth: number;
        nativeHeight : number;
    }
    
    export enum ImageAssetSourceType {
        URL = 0,
        HTML = 1
    }
    
    //TRACE
    
    export interface Trace_Rectangle {
        kind: TraceKind.Rectangle; 
        startPoint: Point;
        endPoint: Point;
    }
    
    export interface Trace_Points {
        kind: TraceKind.Points; 
        points: Array<Point>;
    }

    export interface Trace_Curves {
        kind: TraceKind.Curves; 
        points: Array<CurvePoint>;
    }

    export enum TraceKind {
        Rectangle = 0,
        Points = 1,
        Curves = 2
    }
    
    export type Trace = Trace_Rectangle | Trace_Points | Trace_Curves;
    
    //POINT
    export interface Point {
        x: number;
        y: number; 
    }
    export interface CurvePoint extends Point {
        c1x: number;
        c1y: number;
        c2x: number;
        c2y: number;
    }
}
