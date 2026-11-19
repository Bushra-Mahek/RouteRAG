import { z } from 'zod';

const EnvSchema = z.object({
    PORT: z.string().default("5000"),
    ALLOWED_ORIGIN : z.url().default('https://localhost:5000'),
    MODEL_PROVIDER: z.enum(['openai','gemini','groq']).default('gemini'),
    OPENAI_API_KEY: z.string().optional(),
    GEMINI_API_KEY:z.string().optional(),
    GROQ_API_KEY: z.string().optional(),
    OPENAI_MODEL: z.string().default("gpt-6-luna"),
    GEMINI_MODEL: z.string().default("gemini-3.5-flash-lite"),
    GROQ_MODEL: z.string().default("openai/gpt-oss-20b"),
    SEARCH_PROVIDER: z.string().default('tavily'),
    TAVILY_API_KEY: z.string().optional()
})

export const env = EnvSchema.parse(process.env);