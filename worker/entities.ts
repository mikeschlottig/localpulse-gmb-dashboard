import { IndexedEntity } from "./core-utils";
import type { Business, User, Chat, ChatMessage } from "@shared/types";
import { MOCK_BUSINESSES, MOCK_CHATS, MOCK_USERS } from "@shared/mock-data";
export class BusinessEntity extends IndexedEntity<Business> {
  static readonly entityName = "business";
  static readonly indexName = "businesses";
  static readonly initialState: Business = {
    id: "",
    name: "",
    address: "",
    category: "",
    status: "Pending",
    rating: 0,
    reviewCount: 0,
    views: 0,
    recentTrend: [],
    lastUpdated: ""
  };
  static seedData = MOCK_BUSINESSES;
}
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export type ChatBoardState = Chat & { messages: ChatMessage[] };
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = [];
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
}