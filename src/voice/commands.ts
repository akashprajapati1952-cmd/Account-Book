// src/voice/commands.ts

export interface VoiceCommandDefinition {
  id: string;
  phrases: string[];
  description: string;
}

export const COMMANDS: readonly VoiceCommandDefinition[] = [
  {
    id: "OPEN_DASHBOARD",
    phrases: [
      "open dashboard",
      "dashboard kholo",
      "go to dashboard",
    ],
    description: "Navigate to Dashboard",
  },

  {
    id: "OPEN_CUSTOMER",
    phrases: [
      "open customer",
      "customer kholo",
      "go to customer",
    ],
    description: "Navigate to Customer Page",
  },

  {
    id: "OPEN_SUPPLIER",
    phrases: [
      "open supplier",
      "supplier kholo",
      "go to supplier",
    ],
    description: "Navigate to Supplier Page",
  },

  {
    id: "OPEN_LEDGER",
    phrases: [
      "open ledger",
      "ledger kholo",
      "go to ledger",
    ],
    description: "Navigate to Ledger",
  },

  {
    id: "OPEN_TRANSACTION",
    phrases: [
      "open transaction",
      "transaction kholo",
      "go to transaction",
    ],
    description: "Navigate to Transaction",
  },

  {
    id: "ADD_CUSTOMER",
    phrases: [
      "add customer",
      "new customer",
      "customer add karo",
    ],
    description: "Create Customer",
  },

  {
    id: "DELETE_CUSTOMER",
    phrases: [
      "delete customer",
      "customer delete karo",
      "remove customer",
    ],
    description: "Delete Customer",
  },

  {
    id: "SAVE",
    phrases: [
      "save",
      "save data",
      "submit",
      "store",
    ],
    description: "Save Current Form",
  },

  {
    id: "CANCEL",
    phrases: [
      "cancel",
      "close",
      "band karo",
    ],
    description: "Cancel Current Action",
  },

  {
    id: "LOGOUT",
    phrases: [
      "logout",
      "sign out",
      "log out",
    ],
    description: "Logout User",
  },
] as const;
export enum VoiceCommandId {
  OPEN_DASHBOARD = "OPEN_DASHBOARD",
  OPEN_CUSTOMER = "OPEN_CUSTOMER",
  OPEN_SUPPLIER = "OPEN_SUPPLIER",
  OPEN_LEDGER = "OPEN_LEDGER",
  OPEN_TRANSACTION = "OPEN_TRANSACTION",
  ADD_CUSTOMER = "ADD_CUSTOMER",
  DELETE_CUSTOMER = "DELETE_CUSTOMER",
  SAVE = "SAVE",
  CANCEL = "CANCEL",
  LOGOUT = "LOGOUT",
}