import { useEffect } from "react";

import { createSocketConnection } from "@myapp/services";
import { useAppContext } from "@myapp/app-context";

function listen(callBack, channel, event) {
    window.Echo.private(channel).listen(event, (payload) => {
        callBack(payload);
    });

    return function cleanUp() {
        window.Echo.leaveChannel(`private-${channel}`);
    };
}

export const useSocket = (type, callBack) => {
    const [appState] = useAppContext();
    useEffect(() => {
        createSocketConnection(appState.authentication.accessToken);
        switch (type) {
            case "NEW_COMMENT": {
                return listen(callBack, `comments`, ".new_comment");
            }
            default:
                return;
        }
    });
};
