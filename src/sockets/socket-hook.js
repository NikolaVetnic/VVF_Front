import { useEffect } from "react";

import store from "../store/index";
import { createSocketConnection } from "./socket-service";

function listen(callBack, channel, event) {
    window.Echo.private(channel).listen(event, (payload) => {
        callBack(payload);
    });

    return function cleanUp() {
        window.Echo.leaveChannel(`private-${channel}`);
    };
}

export const useSocket = (type, callBack) => {
    const myStore = store.getState();
    const token = myStore.auth.current.token;
    const viewed = myStore.movie.viewed;

    useEffect(() => {
        createSocketConnection(token);
        console.log("new_comment");
        switch (type) {
            case "NEW_COMMENT": {
                return listen(
                    callBack,
                    `movie.${viewed.id}.comments`,
                    ".new_comment"
                );
            }
            default:
                return;
        }
    });
};
