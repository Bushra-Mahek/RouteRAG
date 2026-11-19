import { normalize } from "node:path";
import { getChatModel } from "../shared/models"
import { SummarizeInputSchema, SummarizeOutputSchema} from "./schemas"
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

export async function summarize(text: string){
    const {text:raw} = SummarizeInputSchema.parse({text});
    //limit in number of chars
    const clipped = clip(raw,4000)
    const model = getChatModel({temperature:0.2,maxTokens:500})
    //ask the model to sumarie in controled manner
    const res = await model.invoke([
        new SystemMessage([
            "you are a helpful assistant that writes short and accurate summaries",
            "guidelines:",
            "-be factual and neutral and avoid markwting language",
            "-5-8 sentences, no lists unless uneccessary",
            "-do not invent new sources",
            "-keep it neutral for beginners"
        ].join("\n")),

        new HumanMessage([
            "Summarise the following content for a beginner friendly audience",
            "focus on the key facts and remove fluff",
            "TEXT:",
            clipped
        ].join("\n\n"))
    ])

    const rawModelOutput = typeof res.content ==='string'?res.content : String(res.content)
    const summary = normalizeSummary(rawModelOutput)
    return SummarizeOutputSchema.parse({summary});

}

function clip(s:string, max:number){
    return s.length > max ? s.slice(0,max) : s
}

function normalizeSummary(s:string){
    const t = s.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
    return t.slice(0,2500);
}