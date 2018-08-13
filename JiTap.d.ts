export interface Slide {
    design:Design;
    activity?:Activity;
}

//DESIGN
interface Design {
    bg?:string;
    stickers: Array<ImageAsset>;
}

//ACTIVITIES
type Activity = 
    Activity_Questions
    | Activity_Soundboard
    | Activity_SaySomething
    | Activity_Puzzle
    | Activity_Video
    | Activity_TalkType

declare enum ActivityKind {
    QUESTION = 0, 
    TALK_TYPE = 1, 
    SOUNDBOARD = 2, 
    PUZZLE = 3, 
    VIDEO = 4, 
    SAY_SOMETHING = 5, 
}

//QUESTIONS
interface Activity_Questions {
    kind: ActivityKind.QUESTION;
    questions: Array<Question>;
}

interface Question {
    label: string;
    trace: Trace;
    audio: QuestionAudio;
}

type QuestionAudio = Partial<{
    question: AudioAsset;
    answer: AudioAsset;
    mistake: AudioAsset;
}>

//SOUNDBOARD 
interface Activity_Soundboard {
    kind: ActivityKind.SOUNDBOARD
    options: Soundboard_Options;
    items: Array<Soundboard_Item>;
}

interface Soundboard_Options {
    introAudio?: AudioAsset;
    bgAudio?: AudioAsset;
    oneTime: boolean;
    showHints: boolean;
}

interface Soundboard_Item {
    trace: Trace;
    audio?: AudioAsset;
    jump?: string;
}

//PUZZLE 
interface Activity_Puzzle {
    kind: ActivityKind.PUZZLE;
    options: Puzzle_Options;
    items: Array<Puzzle_Item>;
}

interface Puzzle_Options {
    jump?: string;
    audio?: AudioAsset;
    freePlay: boolean;
    easyMode: boolean;
    disableHints: boolean;
    shapes3d: boolean;
}

interface Puzzle_Item {
    trace: Trace;
    audio?: AudioAsset;
}

//SAY SOMETHING
interface Activity_SaySomething {
    kind: ActivityKind.SAY_SOMETHING;
    audio?: AudioAsset;
    continueAfter: boolean;
    jump?: string;
}

//VIDEO
interface Activity_Video {
    kind: ActivityKind.VIDEO;
    src?: string;
    type?: Video_SourceType;
}

declare enum Video_SourceType { Upload = 0, Youtube =  1}

//TALK_TYPE 
interface Activity_TalkType {
    kind: ActivityKind.TALK_TYPE;
    options: TalkType_Options;
    items: Array<TalkType_Item>;
}

interface TalkType_Options {
    jump?: string;
    audio?: AudioAsset;
    showHints: boolean;
}


interface TalkType_Item {
    trace: Trace;
    audio?: AudioAsset;
    answer: string;
    answerType: TalkType_AnswerType;
}

declare enum TalkType_AnswerType { Keyboard = 0, Microphone = 1}

//GENERIC OBJECTS

//IMAGES
interface ImageAsset {
    src: ImageAssetSource;
    position: Point;
    scale: number;
    rotation: number;
}

type ImageAssetSource = string | ImageAssetTextSource

interface ImageAssetTextSource {
    html: string;
}

//TRACE

declare enum TraceKind {
    Rectangle = 0
}

interface Trace_Rectangle {
    kind: TraceKind.Rectangle;
    startPoint: Point;
    endPoint: Point;
}

type Trace = Trace_Rectangle

//AUDIO
interface AudioAsset {
    src: string;
}

//POINT
interface Point {
    x: number;
    y: number; 
}

