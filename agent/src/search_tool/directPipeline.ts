import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getChatModel } from "../shared/models";
import { RunnableLambda } from "@langchain/core/runnables";
import { candidate } from "./types";

//ask model gte short hepfuo answer
export const directPath = RunnableLambda.from(
    async (input : {q:string;mode:'web | direct'}) : Promise<candidate> =>{
        const model = getChatModel({temperature:0.2})
        const res = await model.invoke(
            [
                new SystemMessage(
                    [
                        "You answer briefly and clearly for beginners",
                        "if unsure, say so",
                    ].join("\n")
                ),

                new HumanMessage(input.q),
            ]
        );

        const directAns = (
      typeof res.content === "string" ? res.content : String(res.content)
    ).trim();

    return {
      answer: directAns,
      sources: [],
      mode: "direct",
    };
    }
)