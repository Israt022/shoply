import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from 'dotenv';
import { PrismaClient } from "../generated/prisma/client";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL

if(!DATABASE_URL){
    throw new Error("Database URL not found!");
}
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default prisma;