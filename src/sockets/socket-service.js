import Echo from "laravel-echo";
import io from "socket.io-client";

window.io = io;

export function createSocketConnection() {
    if (!window.Echo) {
        window.Echo = new Echo({
            broadcaster: "socket.io",
            host: window.location.hostname + ":6001",
        });
    }
}
