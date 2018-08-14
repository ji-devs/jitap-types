export module TinyTap {
    export interface Game {
        //base_url - the base url of the amazon bucket
        baseUrl:string; //ex. https://df28ufcn2a3do.cloudfront.net/586D81B3-0D0F-4D1E-9DA0-B3252E32C09D/unzipped/
    
        structure: {
            //Game ID
            pk: PrimaryKey; //ex. 1612
    
            //How the slides shuffle in a game
            shuffleType: 
                0 //don't shuffle
                | 1 //shuffle all slides
                | 2; //all except first and last
    
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
    
    interface Slide {
        //relative path in bucket for slide
        filePath: string; //ex. photo7/
    
        //Full size resterized image 
        filePathImage: string; //ex. photo7/photo7.jpg
    
        //thumbnail of filePathImage (312x234)
        filePathImageThumb: string; //ex. photo7/photoThumb7.jpg
    
        pk: PrimaryKey;  //ex. 8745
    
        //activity type
        engineType: 
            'S' //slide (no activity)
            | 'R' //reading (say something)
            | 'A' //soundboard 
            | 'V' //video
            | 'P' //puzzle
            | 'Q' // ask a question
            | 'T'; // Talk or Type
    
        //Design layers 
        layers: Array<Layer>;
    
        //Activities
        activities: Array<Activity>;
    }
    
    //All layer filenames go in ${filePath}/layers/
    type Layer = 
        CommonLayer & {
            type: "bg"; 
            filename: string;
        }
        | CommonLayer & {
            type: "anim";
            filename: string;
        }
        | CommonLayer & {
            type: "img"; 
            filename: string;
        }
        | CommonLayer & {
            type: "txt"; 
            info: string; //HTML string
        }
    
    interface CommonLayer {
        frame: FrameString;
        
        transform: TransformString; 
    
        InteractiveLoopType:
            0 // PlayOnLoad
            | 1 // PlayOnTapAndLoop
            | 2 // PlayOnTapAndStop
            | 3; // PlayOnLoadOnce
    
        //Controls sticker interactivity, indepedantly from activities.
        InteractiveShowType: 
            0 // Show on Load
            | 1 // Hide on Tap,
            | 2; // Show on Tap,
    
        //Interaction sound filename 
        interactiveLayerSound: string;
    
        //interaction should toggle show/hide
        interactiveToggleShow: boolean; 
    }
    
    
    interface Activity {
        //Recording duration if there is an activity-wide audio
        //Deprecated recordingDuration: number; //ex. 3.52943310657596,
        
        //Recording file if there is an activity-wide audio
        filePathIntroRecording: string; //ex "photo7/activity0/activity0.mp3",
    
        pk: PrimaryKey; // ex. 11577,
        folderPath: string; // ex. "photo7/activity0"
    
        //Settings is where the activities are differentiated at top-level
        //More differentiation happens per-shape as well
        settings: 
            // S or slide (no activity)
            // Also Q or questions
            CommonActivitySettings
            // R or reading (say something)
            |   CommonActivitySettings & {
                    advance: boolean; //continue after reading
                } 
            // A or soundboard
            |   CommonActivitySettings & {
                    soundFunMode: boolean;  //play one at a time
                    soundFlatMode: boolean; // ??? 
                    showShape: boolean;  // show hints
                } 
            // V or video
            |   CommonActivitySettings & {
                    videoRange: VideoRangeString; 
                    videoTitle: string; //example: "\"Pacific Dreams\" A California Surfing Film",
                    videoURL: string; //example: "http://youtu.be/vk0F8dHo3wU",
                    transform: TransformString; //example: "[1.9533259000000001, 0, 0, 1.9533259000000001, -1.9999999999988931, -15.499999999996575]",
                    videoThumbURL: string; //example: https://i.ytimg.com/vi/vk0F8dHo3wU/default.jpg"
                } 
            // P or puzzle
            |   CommonActivitySettings & {
                    soundFlatMode: boolean; //3d Shapes
                    ShapePuzzleTheme:
                        0 // 3D
                        | 1 // Flat
                        | 2; // Wooden
                }
            // T or talk and type 
            |   CommonActivitySettings & {
                    soundShowToolTip: boolean; //show hints
                }
        
        shapes: Array<
    
            {
                filePathThumb: string; //example: "photo1/activity0/shape1/shapeImg.jpg",
                settings: 
                    // S or slide (no activity)
                    // Also R or reading (say something)
                    // Also V or video
                    // Also Q or questions
                    // Also P or puzzle
                    CommonShapeSettings
                    // A or soundboard
                    |   CommonShapeSettings & {
                            toolTipText: string;
                        } 
                    // T or talk and type 
                    |   CommonShapeSettings & {
                            textInputLanguage: string; //example: "en-US",
                            textAnswerArray: Array<string>; //example: [ "one" ],
                            isUsingSpeakingMode: boolean;  
                        };
                filePathRecording2: string; //Wrong answer in questions 
                filePathRecording1: string; //Correct answer in questions
                pk: PrimaryKey;
                pathData: PathDataString;  
            }
        >;
        
    }
    
    interface CommonActivitySettings {
        linkToPage: PageLink;
    }
    
    interface CommonShapeSettings {
        linkToPage: PageLink;
        originTransform: TransformString; 
    }
    
    type PrimaryKey = number;
    
    type PageLink = number; //not pk, rather it's the order of the slide (0-based)
    
    //CSS matrix() (not matrix3D())
    //ex. "[number, number, number, number, number, number]",
    type TransformString = string;
    
    //XML / Plist
    type PathDataString = string;
    
    //example: "{0, 1262.1670999999999}"
    //not a lawful json string...
    type VideoRangeString = string;
    
    
    //example: "{{x1,y1}, {x2, y2}}"
    //not a lawful json string...
    type FrameString = string;
}
