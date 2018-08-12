export interface Slide {
    design:Design;
    activity:Activity;
}

//DESIGN
interface Design {
    bg:ImageAsset;
    stickers: [Sticker];
}

interface Sticker {
   img: ImageAsset;
}

//ACTIVITIES
type Activity = 
    Activity_Questions
    | Activity_Soundboard
    | Activity_SaySomething
    | Activity_Puzzle
    | Activity_Video
    | Activity_TalkType

//QUESTIONS
interface Activity_Questions {
    questions: [Question];
}

interface Question {
    label: string;
    trace: Trace;
    audio: QuestionAudio;
}

interface QuestionAudio {
    question: AudioAsset;
    answer: AudioAsset;
    mistake: AudioAsset;
}

//SOUNDBOARD 
interface Activity_Soundboard {
    options: Soundboard_Options;
    items: [Soundboard_Item];
}

interface Soundboard_Options {
    introAudio: AudioAsset;
    bgAudio: AudioAsset;
    oneTime: boolean;
    showHints: boolean;
}

interface Soundboard_Item {
    trace: Trace;
    audio: AudioAsset;
    jump: string;
}

//PUZZLE 
interface Activity_Puzzle {
    options: Puzzle_Options;
    items: [Puzzle_Item];
}

interface Puzzle_Options {
    jump: string;
    audio: AudioAsset;
    freePlay: boolean;
    easyMode: boolean;
    disableHints: boolean;
    shapes3d: boolean;
}

interface Puzzle_Item {
    trace: Trace;
    audio: AudioAsset;
}

//SAY SOMETHING
interface Activity_SaySomething {
    audio: AudioAsset;
    continueAfter: boolean;
    jump: string;
}

//VIDEO
interface Activity_Video {
    src: string;
    srcType: Video_SourceType;
}

declare enum Video_SourceType { Upload, Youtube }

//TALK_TYPE 
interface Activity_TalkType {
    options: TalkType_Options;
    items: [TalkType_Item];
}

interface TalkType_Options {
    jump: string;
    audio: AudioAsset;
    showHints: boolean;
}


interface TalkType_Item {
    trace: Trace;
    audio: AudioAsset;
    answer: string;
    answerType: TalkType_AnswerType;
}

declare enum TalkType_AnswerType { Keyboard , Microphone }

//GENERIC OBJECTS

//IMAGES
interface ImageAsset {
    src: ImageAssetSource;
    position: Point;
    scale: number;
    rotation: number;
}

type ImageAssetSource = ImageAssetImageSource | ImageAssetTextSource

interface ImageAssetImageSource {
    url: string;
}

interface ImageAssetTextSource {
    html: string;
}

//TRACE
interface Trace_Rectangle {
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

