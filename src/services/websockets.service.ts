import type { ServerWebSocket } from "bun";

interface WSClient {
	ws: ServerWebSocket<{ userId: string; role: string }>;
	userId: string;
	role: string;
}

export class WebSocketService {
	private clients: Map<string, WSClient[]> = new Map();

	addClient(ws: ServerWebSocket<{ userId: string; role: string }>, userId: string, role: string) {
		const existingClients = this.clients.get(userId) || [];
		existingClients.push({ ws, userId, role });
		this.clients.set(userId, existingClients);
	}

	sendMessage(userId: string, message: string) {
		const userClients = this.clients.get(userId);
		if (userClients) {
			for (const client of userClients) {
				if (client.ws.readyState === WebSocket.OPEN) {
					client.ws.send(message);
				}
			}
		}
	}
	
}
