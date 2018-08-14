export declare module JiTap {
    interface Slide {
        design: Design;
        activity?: Activity;
    }
    interface Design {
        bg?: string;
        stickers: Array<ImageAsset>;
    }
    type Activity = Activity_Questions | Activity_Soundboard | Activity_Puzzle | Activity_SaySomething | Activity_Video | Activity_TalkType;
    enum ActivityKind {
        QUESTIONS = 0,
        SOUNDBOARD = 1,
        PUZZLE = 2,
        SAY_SOMETHING = 3,
        VIDEO = 4,
        TALK_TYPE = 5
    }
    interface Activity_Questions {
        kind: ActivityKind.QUESTIONS;
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
    }>;
    interface Activity_Soundboard {
        kind: ActivityKind.SOUNDBOARD;
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
    interface Activity_SaySomething {
        kind: ActivityKind.SAY_SOMETHING;
        audio?: AudioAsset;
        continueAfter: boolean;
        jump?: string;
    }
    interface Activity_Video {
        kind: ActivityKind.VIDEO;
        src?: string;
        type?: VideoType;
    }
    enum VideoType {
        UPLOAD = 0,
        YOUTUBE = 1
    }
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
        answerType: TalkTypeAnswerType;
    }
    enum TalkTypeAnswerType {
        KEYBOARD = 0,
        MICROPHONE = 1
    }
    interface ImageAsset {
        src: string;
        type: ImageAssetSourceType;
        position: Point;
        scale: number;
        rotation: number;
    }
    enum ImageAssetSourceType {
        URL = 0,
        HTML = 1
    }
    interface ImageAssetTextSource {
        html: string;
    }
    interface Trace_Rectangle {
        kind: TraceKind;
        startPoint: Point;
        endPoint: Point;
    }
    enum TraceKind {
        Rectangle = 0
    }
    type Trace = Trace_Rectangle;
    interface AudioAsset {
        src: string;
    }
    interface Point {
        x: number;
        y: number;
    }
}
