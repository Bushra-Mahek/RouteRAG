
import {convert} from "html-to-text"
import { OpenUrlOutputSchema } from "./schemas";
export async function openUrl(url:string){
    //step1
    //only http and https are allowed not some oter fies
    const normalized = validateUrl(url);
    //step 2 ftech page by ourselves llm canr code
    const res = await fetch(normalized,{
        headers :{
            //generic node fetch to avoid 403 on some strict websites
            'User-Agent' : 'agent-core/1.0 (+course-demo)'
            
        },
    });

    if(!res.ok){
        const body = await safeText(res)
        throw new Error(`openURL failed ${res.status} - ${body.slice(0,200)}`);
    }

    //step 3:
    const contentType = res.headers.get('content-type') ?? '';
    const raw = await res.text();

    //step 4
    const text = contentType.includes('text/html') ? convert(raw, {
        wordwrap : false,
        selectors : [
            {
                selector: 'nav', format : 'skip'
            },
            {
                selector: 'header', format : 'skip'
            },
            {
                selector: 'footer', format : 'skip'
            },
            {
                selector: 'script', format : 'skip'
            },
        ],
    }) : raw

    //step 5
    const cleaned = collapseWhitespace(text)
    const capped = cleaned.slice(0,8000)

    //ste 6
    return OpenUrlOutputSchema.parse({
        url : normalized,
        content : capped
    })
}

function validateUrl(url: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('Invalid URL');
  }

  if (!/^https?:$/.test(parsed.protocol)) {
    throw new Error('Only http/https protocols are supported');
  }

  return parsed.toString();
}

 async function safeText(res:Response){
        try{
            return await res.text();
        }

        catch{
            return "<no body>"
        }
}

function collapseWhitespace(s:string) : string{
    return s.replace(/\s+/g, " ").trim();
}