import Dexie from "dexie";

const DB_NAME = "TEXT_TO_PDF";

// Whould be better to create fasade wrapping dexie logic because it gives more decoupling
// and allows easily migrate to another library in case we need it, 
// but this project doesn't need it and I don't have enough time to setup all abstractions I whould on a real project 
export const indexDB = new Dexie(DB_NAME);
