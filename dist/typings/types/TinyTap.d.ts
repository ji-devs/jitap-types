export declare module TinyTap {
    interface Game {
        baseUrl: string;
        structure: {
            pk: PrimaryKey;
            shuffleType: ShuffleType;
            version: number;
            musicFile: string;
            settings: {
                quizParameters: {
                    quizModeEnabled: boolean;
                    globalTimeLimit: number;
                    globalLivesLimit: number;
                    activityTimeLimit: number;
                };
                DisableEditing: 0 | 1;
            };
            slides: Array<Slide>;
        };
    }
    enum ShuffleType {
        NO_SHUFFLE = 0,
        ALL_SLIDES = 1,
        MIDDLE = 2
    }
    interface Slide {
        filePath: string;
        filePathImage: string;
        filePathImageThumb: string;
        pk: PrimaryKey;
        engineType: EngineType;
        layers: Array<Layer>;
        activities: Array<Activity>;
    }
    enum EngineType {
        NONE = "S",
        SAY_SOMETHING = "R",
        SOUNDBOARD = "A",
        VIDEO = "V",
        PUZZLE = "P",
        QUESTIONS = "Q",
        TALK_TYPE = "T"
    }
    type Layer = CommonLayer & {
        type: LayerType.BG;
        filename: string;
    } | CommonLayer & {
        type: LayerType.ANIM;
        filename: string;
    } | CommonLayer & {
        type: LayerType.IMAGE;
        filename: string;
    } | CommonLayer & {
        type: LayerType.TEXT;
        info: string;
    };
    enum LayerType {
        BG = "bg",
        ANIM = "anim",
        IMAGE = "img",
        TEXT = "txt"
    }
    interface CommonLayer {
        frame: FrameString;
        transform: TransformString;
        InteractiveLoopType: InteractiveLoopType;
        InteractiveShowType: InteractiveShowType;
        interactiveLayerSound: string;
        interactiveToggleShow: boolean;
    }
    enum InteractiveLoopType {
        PLAY_ON_LOAD = 0,
        PLAY_ON_TAP_AND_LOOP = 1,
        PLAY_ON_TAP_AND_STOP = 2,
        PLAY_ON_LOAD_ONCE = 3
    }
    enum InteractiveShowType {
        SHOW_ON_LOAD = 0,
        HIDE_ON_TAP = 1,
        SHOW_ON_TAP = 2
    }
    interface Activity {
        filePathIntroRecording: string;
        pk: PrimaryKey;
        folderPath: string;
        settings: CommonActivitySettings | CommonActivitySettings & {
            advance: boolean;
        } | CommonActivitySettings & {
            soundFunMode: boolean;
            soundFlatMode: boolean;
            showShape: boolean;
        } | CommonActivitySettings & {
            videoRange: VideoRangeString;
            videoTitle: string;
            videoURL: string;
            transform: TransformString;
            videoThumbURL: string;
        } | CommonActivitySettings & {
            soundFlatMode: boolean;
            ShapePuzzleTheme: PuzzleShapeTheme;
        } | CommonActivitySettings & {
            soundShowToolTip: boolean;
        };
        shapes: Array<{
            filePathThumb: string;
            settings: CommonShapeSettings | (CommonShapeSettings & {
                toolTipText: string;
            }) | (CommonShapeSettings & {
                textInputLanguage: string;
                textAnswerArray: Array<string>;
                isUsingSpeakingMode: boolean;
            });
            filePathRecording2: string;
            filePathRecording1: string;
            pk: PrimaryKey;
            pathData: PathDataString;
        }>;
    }
    enum PuzzleShapeTheme {
        THREE_D = 0,
        FLAT = 1,
        WOODEN = 2
    }
    interface CommonActivitySettings {
        linkToPage: PageLink;
    }
    interface CommonShapeSettings {
        linkToPage: PageLink;
        originTransform: TransformString;
    }
    type PrimaryKey = number;
    type PageLink = number;
    type TransformString = string;
    type PathDataString = string;
    type VideoRangeString = string;
    type FrameString = string;
}
