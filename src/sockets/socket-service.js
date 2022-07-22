import Echo from "laravel-echo";
import io from "socket.io-client";

window.io = io;

export function createSocketConnection(token) {
    if (!window.Echo) {
        window.Echo = new Echo({
            broadcaster: "redis",
            host: "http://127.0.0.1:6379",
            transports: ["websocket", "polling", "flashsocket"],
            auth: {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        });
    }
}
