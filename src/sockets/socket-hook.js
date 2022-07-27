import { useEffect } from "react";

import { createSocketConnection } from "./socket-service";

function listen(callBack, channel, event) {
    window.Echo.channel(channel).listen(event, (payload) => {
        callBack(payload);
    });

    return function cleanUp() {
        window.Echo.leaveChannel(channel);
    };
}

export const useSocket = ({ type, callBack }) => {
    useEffect(() => {
        createSocketConnection();
        switch (type) {
            case "NEW_COMMENT": {
                return listen(callBack, "comments", "CommentCreated");
            }
            case "NEW_REACTION": {
                return listen(callBack, "reactions", "ReactionCreated");
            }
            default:
                return;
        }
    });
};
