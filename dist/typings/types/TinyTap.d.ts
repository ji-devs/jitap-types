export declare module TinyTap {
    interface Game {
        baseUrl: string;
        structure: {
            pk: PrimaryKey;
            shuffleType: 0 | 1 | 2;
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
    interface Slide {
        filePath: string;
        filePathImage: string;
        filePathImageThumb: string;
        pk: PrimaryKey;
        engineType: 'S' | 'R' | 'A' | 'V' | 'P' | 'Q' | 'T';
        layers: Array<Layer>;
        activities: Array<Activity>;
    }
    type Layer = CommonLayer & {
        type: "bg";
        filename: string;
    } | CommonLayer & {
        type: "anim";
        filename: string;
    } | CommonLayer & {
        type: "img";
        filename: string;
    } | CommonLayer & {
        type: "txt";
        info: string;
    };
    interface CommonLayer {
        frame: FrameString;
        transform: TransformString;
        InteractiveLoopType: 0 | 1 | 2 | 3;
        InteractiveShowType: 0 | 1 | 2;
        interactiveLayerSound: string;
        interactiveToggleShow: boolean;
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
            ShapePuzzleTheme: 0 | 1 | 2;
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
