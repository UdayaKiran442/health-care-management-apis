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

}
