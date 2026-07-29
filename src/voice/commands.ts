// src/voice/commands.ts

export interface VoiceCommandDefinition {
  id: string;
  phrases?: string[];
  patterns?: RegExp[];
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
    id: "OPEN_TRANSACTION",
    patterns: [ /^(.+)\s+ki\s+transaction\s+kholo$/i, /^open\s+(.+)\s+transactions?$/i, /^show\s+(.+)\s+transactions?$/i, ],
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
    id: "LOGOUT",
    phrases: [
      "logout",
      "sign out",
      "log out",
    ],
    description: "Logout User",
  },
  {
    id: "LOGIN",
    phrases: [
      "login",
      "sign in",
      "log in",
    ],
    description: "Login User",
  },
  {
    id: "FORGET_PASSWORD",
    phrases: [
      "forget password",
      "password reset",
    ],
    description: "Reset Password",
  },
  {
    id: "SIGNUP",
    phrases: [
      "signup",
      "register",
      "create account",
    ],
    description: "Create Account",
  },
  {
    id: "DELETE_USER",
    phrases: [
      "delete user",
      "remove user",
    ],
    description: "Delete User",
  },
  {
    id: "ADD_RECEIVED",
    phrases: [
      "add received",
      "received add karo",
    ],
    description: "Add Received Transaction",
  },
  {
    id: "ADD_GIVEN",
    phrases: [
      "add given",
      "given add karo",
    ],
    description: "Add Given Transaction",
  },
  {
    id: "SEARCH_CUSTOMER",
    phrases: [
      "search customer",
      "customer search karo",
    ],
    description: "Search Customer",
  },

  {
    id: "OPEN_ABOUT",
    phrases: [
      "open about section",
      "go to about section",
      "open about",
      "go to about"
    ],
    description: "open about section"
  },

  {
    id: "OPEN_ACCOUNT",
    phrases:[
      "open account section",
      "go to account section",
      "open account",
      "go to account",
      "go to profile section",
      "open profile section",
      "open profile",
      "go to profile"
    ],
    description: "open account section"
  },

  {
    id: "GO_BACK",
    phrases:[
      "go back",
    ],
    description: "Go back to the previous page"
  }
] as const;
export enum VoiceCommandId {
  OPEN_DASHBOARD = "OPEN_DASHBOARD",
  OPEN_CUSTOMER = "OPEN_CUSTOMER",
  OPEN_TRANSACTION = "OPEN_TRANSACTION",
  ADD_CUSTOMER = "ADD_CUSTOMER",
  DELETE_CUSTOMER = "DELETE_CUSTOMER",
  LOGOUT = "LOGOUT",
  LOGIN = "LOGIN",
  FORGET_PASSWORD = "FORGET_PASSWORD",
  SIGNUP = "SIGNUP",
  DELETE_USER = "DELETE_USER",
  ADD_RECEIVED = "ADD_RECEIVED",
  ADD_GIVEN = "ADD_GIVEN",
  SEARCH_CUSTOMER = "SEARCH_CUSTOMER",
  OPEN_ABOUT="OPEN_ABOUT",
  OPEN_ACCOUNT="OPEN_ACCOUNT",
  GO_BACK="GO_BACK"
}