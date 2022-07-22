import Echo from "laravel-echo";
import io from "socket.io-client";

import configs from "@myapp/configs";

window.io = io;

export function createSocketConnection(token) {
    if (!window.Echo) {
        window.Echo = new Echo({
            broadcaster: "socket.io",
            host: configs.app.host,
            transports: ["websocket", "polling", "flashsocket"],
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });
    }
}
