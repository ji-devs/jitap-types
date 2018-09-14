export module TinyTap {
    export interface Game {
        //base_url - the base url of the amazon bucket
        baseUrl:string; //ex. https://df28ufcn2a3do.cloudfront.net/586D81B3-0D0F-4D1E-9DA0-B3252E32C09D/unzipped/
    
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
        //Recording duration if there is an activity-wide audio
        //Deprecated recordingDuration: number; //ex. 3.52943310657596,
        
        //Recording file if there is an activity-wide audio
        filePathIntroRecording: string; //ex "photo7/activity0/activity0.mp3",
    
        pk: PrimaryKey; // ex. 11577,
        folderPath: string; // ex. "photo7/activity0"
    
        //Settings is where the activities are differentiated at top-level
        //More differentiation happens per-shape as well
        settings: CommonActivitySettings | ActivitySettings;
       
        shapes: Array<
    
            {
                filePathThumb: string; //example: "photo1/activity0/shape1/shapeImg.jpg",
                settings: CommonShapeSettings | ShapeSettings;
                filePathRecording2: string; //Wrong answer in questions 
                filePathRecording1: string; //Correct answer in questions
                pk: PrimaryKey;
                pathData: PathDataString;  
            }
        >;
        
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
        frame: FrameString;
        
        transform: TransformString; 
    
        InteractiveLoopType: InteractiveLoopType;
    
        //Controls sticker interactivity, indepedantly from activities.
        InteractiveShowType: InteractiveShowType;
    
        //Interaction sound filename 
        interactiveLayerSound: string;
    
        //interaction should toggle show/hide
        interactiveToggleShow: boolean; 
    }
  
    //Activity sub-types
    export interface CommonActivitySettings {
        linkToPage: PageLink;
    }
    
    export type ActivitySettings = 
        Question_Settings
        | SaySomething_Settings 
        | Soundboard_Settings
        | Video_Settings
        | Puzzle_Settings
        | TalkType_Settings;

    export type Question_Settings = CommonActivitySettings;
    export interface SaySomething_Settings extends CommonActivitySettings {
        advance: boolean; //continue after reading
    } 

    export interface Soundboard_Settings extends CommonActivitySettings {
                    soundFunMode: boolean;  //play one at a time
                    soundFlatMode: boolean; // ??? 
                    showShape: boolean;  // show hints
    } 
    export interface Video_Settings extends CommonActivitySettings {
        videoRange: VideoRangeString; 
        videoTitle: string; //example: "\"Pacific Dreams\" A California Surfing Film",
        videoURL: string; //example: "http://youtu.be/vk0F8dHo3wU",
        transform: TransformString; //example: "[1.9533259000000001, 0, 0, 1.9533259000000001, -1.9999999999988931, -15.499999999996575]",
        videoThumbURL: string; //example: https://i.ytimg.com/vi/vk0F8dHo3wU/default.jpg"
    } 
    export interface Puzzle_Settings extends CommonActivitySettings {
        soundFlatMode: boolean; //3d Shapes
        ShapePuzzleTheme: PuzzleShapeTheme;
    }
    export interface TalkType_Settings extends CommonActivitySettings {
        soundShowToolTip: boolean; //show hints
    }


    //Activity Shape sub-types
    export interface CommonShapeSettings {
        linkToPage: PageLink;
        originTransform: TransformString; 
    }
    export type ShapeSettings = 
        Question_Shape_Settings
        | SaySomething_Shape_Settings 
        | Soundboard_Shape_Settings
        | Video_Shape_Settings
        | Puzzle_Shape_Settings
        | TalkType_Shape_Settings;

    export type Question_Shape_Settings = CommonShapeSettings;
    export type SaySomething_Shape_Settings = CommonShapeSettings;
    export interface Soundboard_Shape_Settings extends CommonShapeSettings {
        toolTipText: string;
    }
    export type Video_Shape_Settings = CommonShapeSettings;
    export type Puzzle_Shape_Settings = CommonShapeSettings;
    export interface TalkType_Shape_Settings extends CommonShapeSettings {
        textInputLanguage: string; //example: "en-US",
        textAnswerArray: Array<string>; //example: [ "one" ],
        isUsingSpeakingMode: boolean;  
    }

    // TODO - organize below here
    export enum PuzzleShapeTheme {
        THREE_D = 0,
        FLAT = 1,
        WOODEN = 2
    }

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
    
    //CSS matrix() (not matrix3D())
    //ex. "[number, number, number, number, number, number]",
    export type TransformString = string;
    
    //XML / Plist
    export type PathDataString = string;
    
    //example: "{0, 1262.1670999999999}"
    //not a lawful json string...
    export type VideoRangeString = string;
    
    //example: "{{x1,y1}, {x2, y2}}"
    //not a lawful json string...
    export type FrameString = string;
}
