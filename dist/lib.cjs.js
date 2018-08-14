'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

(function (JiTap) {
    let ActivityKind;
    (function (ActivityKind) {
        ActivityKind[ActivityKind["QUESTIONS"] = 0] = "QUESTIONS";
        ActivityKind[ActivityKind["SOUNDBOARD"] = 1] = "SOUNDBOARD";
        ActivityKind[ActivityKind["PUZZLE"] = 2] = "PUZZLE";
        ActivityKind[ActivityKind["SAY_SOMETHING"] = 3] = "SAY_SOMETHING";
        ActivityKind[ActivityKind["VIDEO"] = 4] = "VIDEO";
        ActivityKind[ActivityKind["TALK_TYPE"] = 5] = "TALK_TYPE";
    })(ActivityKind || (ActivityKind = {}));
    let VideoType;
    (function (VideoType) {
        VideoType[VideoType["UPLOAD"] = 0] = "UPLOAD";
        VideoType[VideoType["YOUTUBE"] = 1] = "YOUTUBE";
    })(VideoType || (VideoType = {}));
    let TalkTypeAnswerType;
    (function (TalkTypeAnswerType) {
        TalkTypeAnswerType[TalkTypeAnswerType["KEYBOARD"] = 0] = "KEYBOARD";
        TalkTypeAnswerType[TalkTypeAnswerType["MICROPHONE"] = 1] = "MICROPHONE";
    })(TalkTypeAnswerType || (TalkTypeAnswerType = {}));
    let ImageAssetSourceType;
    (function (ImageAssetSourceType) {
        ImageAssetSourceType[ImageAssetSourceType["URL"] = 0] = "URL";
        ImageAssetSourceType[ImageAssetSourceType["HTML"] = 1] = "HTML";
    })(ImageAssetSourceType = JiTap.ImageAssetSourceType || (JiTap.ImageAssetSourceType = {}));
    let TraceKind;
    (function (TraceKind) {
        TraceKind[TraceKind["Rectangle"] = 0] = "Rectangle";
    })(TraceKind || (TraceKind = {}));
})(exports.JiTap || (exports.JiTap = {}));
//# sourceMappingURL=lib.cjs.js.map
