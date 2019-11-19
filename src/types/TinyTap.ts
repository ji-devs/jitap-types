export module TinyTap {

    export interface PublishedGame extends Game {
        //TODO, maybe - mix in album etc.
    }

    export interface Game {
        //base_url - the base url of the amazon bucket
        base_url:string; //ex. https://df28ufcn2a3do.cloudfront.net/586D81B3-0D0F-4D1E-9DA0-B3252E32C09D/unzipped/

        structure: {
            //Game ID
            pk: PrimaryKey; //ex. 1612
    
            //How the slides shuffle in a game
            shuffleType: ShuffleType;
    
            version: number;  //ex. 0
    
            //background music
            musicFile: string; //ex. MediaResources/music/Silence.m4a
            
            //settings for the entire game
            settings: {
                //quiz setting
                quizParameters: {
                    quizModeEnabled: boolean; 
                    //menu settings
                    globalTimeLimit: number; //ex. 14.0 Is this used???
                    globalLivesLimit: number; //ex 6.0
                    activityTimeLimit: number;  //ex 5.0
                };
    
                DisableEditing: 0 | 1;
            }
    
            //slide is formerly "photos"
            slides: Array<Slide>;
        }
    }


    export interface Slide {
        //relative path in bucket for slide
        filePath: string; //ex. photo7/
    
        //Full size resterized image 
        filePathImage: string; //ex. photo7/photo7.jpg
    
        //thumbnail of filePathImage (312x234)
        filePathImageThumb: string; //ex. photo7/photoThumb7.jpg
    
        pk: PrimaryKey;  //ex. 8745
    
        //activity type
        engineType: EngineType;
    
        //Design layers 
        layers: Array<Layer>;
    
        //Activities
        activities: Array<Activity>;
    }
   


   

    export interface Activity {
        filePathIntroRecording: string;
        pk: PrimaryKey;
        folderPath: string;
        settings: ActivitySettings;
        shapes: Array<Shape>;
    }

    export interface Shape {
        path: Path;
        filePathRecording2: string;
        filePathRecording1: string;
        filePathThumb: string;
        settings: ShapeSettings;
        pk: PrimaryKey;
    }
   
    //Game sub-types
    export enum EngineType {
        NONE = 'S',
        SAY_SOMETHING = 'R', //(reading)
        SOUNDBOARD = 'A',
        VIDEO = 'V',
        PUZZLE = 'P',
        QUESTIONS = 'Q',
        TALK_TYPE = 'T'
    }

    // Design sub-types
    export enum LayerType {
        BG = "bg",
        ANIM = "anim",
        IMAGE = "img",
        TEXT = "txt",
    }
    export type Layer = 
        CommonLayer & {
            type: LayerType.BG; 
            filename: string;
        }
        | CommonLayer & {
            type: LayerType.ANIM;
            filename: string;
        }
        | CommonLayer & {
            type: LayerType.IMAGE; 
            filename: string;
        }
        | CommonLayer & {
            type: LayerType.TEXT; 
            info: string; //HTML string
        }
   

    export interface CommonLayer {
        width: number;
        height: number;

        transform: Transform; 
    
        InteractiveLoopType: InteractiveLoopType;
    
        //Controls sticker interactivity, indepedantly from activities.
        InteractiveShowType: InteractiveShowType;
    
        //Interaction sound filename 
        interactiveLayerSound: string;
    
        //interaction should toggle show/hide
        interactiveToggleShow: boolean; 
    }
  
    //Activity sub-types
    
    export type ActivitySettings = 
        Question_Settings
        | SaySomething_Settings 
        | Soundboard_Settings
        | Video_Settings
        | Puzzle_Settings
        | TalkType_Settings;

    export type Question_Settings = {};
    export interface Soundboard_Settings {
        soundFunModeV2:boolean;
        soundHideHints:boolean;
        kIsShowSoundboardHintsOnStart:boolean;
        kShowConfetti:boolean;
    } 
    export interface Puzzle_Settings {
        linkToPage: number;
        soundFunModeV2: boolean;
        showShapeV2: boolean;
        DisableHints: boolean;
        ShapePuzzleThemeV2: boolean;
    }

    export interface SaySomething_Settings {
        advance: boolean;
        linkToPage: number;
    } 

    export interface TalkType_Settings {
        soundShowToolTip: boolean;
        linkToPage: number;
    }
    export interface Video_Settings{
        videoRange: VideoRangeString; 
        videoTitle: string; //example: "\"Pacific Dreams\" A California Surfing Film",
        videoURL: string; //example: "http://youtu.be/vk0F8dHo3wU",
        transform: Transform; //example: "[1.9533259000000001, 0, 0, 1.9533259000000001, -1.9999999999988931, -15.499999999996575]",
        videoThumbURL: string; //example: https://i.ytimg.com/vi/vk0F8dHo3wU/default.jpg"
    } 


    //Activity Shape sub-types
    export type ShapeSettings = 
        Question_Shape_Settings
        | SaySomething_Shape_Settings 
        | Soundboard_Shape_Settings
        | Video_Shape_Settings
        | Puzzle_Shape_Settings
        | TalkType_Shape_Settings;

    export type Question_Shape_Settings = {};

    export interface Soundboard_Shape_Settings {
        linkToPage: number;
        toolTipText: string;
    }

    export type Puzzle_Shape_Settings = {
        originTransform: string;
        filePathRecording1: string;
    }

    export type SaySomething_Shape_Settings = {};
    export interface TalkType_Shape_Settings {
        textAnswerArray: Array<string>;
        isUsingSpeakingMode: boolean;  
        //DEPRECATED textInputLanguage: string; //example: "en-US",
    }

    export type Video_Shape_Settings = {};

    // TODO - organize below here

    export enum InteractiveLoopType {
        PLAY_ON_LOAD = 0,
        PLAY_ON_TAP_AND_LOOP = 1,
        PLAY_ON_TAP_AND_STOP = 2,
        PLAY_ON_LOAD_ONCE = 3
    }

    export enum InteractiveShowType {
        SHOW_ON_LOAD = 0,
        HIDE_ON_TAP = 1,
        SHOW_ON_TAP = 2
    }

    export enum ShuffleType {
        NO_SHUFFLE = 0,
        ALL_SLIDES = 1,
        MIDDLE = 2 //all except first and last
    }

    
    export type PrimaryKey = number;
    
    export type PageLink = number; //not pk, rather it's the order of the slide (0-based)
    
    export type Path = Array<PathPoint>;
    export type PathPoint = {
        type: PathElementType,
        x: number;
        y: number;
        cp1x?: number;
        cp1y?: number;
        cp2x?: number;
        cp2y?: number;
    };
    export enum PathElementType {
        MoveToPoint = 0,
        AddLineToPoint = 1,
        AddQuadCurveToPoint = 2,
        AddCurveToPoint = 3,
        CloseSubpath = 4,
    }
    
    //example: "{0, 1262.1670999999999}"
    //not a lawful json string...
    export type VideoRangeString = string;

    //see: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix
    export type Transform = [number, number, number, number, number, number];
}
