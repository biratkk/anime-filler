import Image from "next/image";
import { Inter } from "next/font/google";
import ReactMarkdown from "react-markdown";
const inter = Inter({ subsets: ["latin"] });

const code1 = `
  \`\`\`json
  [
    {
    "name": "86 EIGHTY-SIX",
    "link": "https://www.animefillerlist.com/shows/86-eighty-six"
    },
    ...
  ]
  \`\`\`
`;

const description1 = `\`/api/anime\` 
  
This URL will give you a list of all animes that are in the anime filler list database.`;

const code2 = `
\`\`\`json
[ 3, 4, 6, 8...]
\`\`\`
`;

const description2 = `\`/api/anime?name=<nameOfAnime>\`

This URL will give you a list of all the episode numbers that are fillers.`;

export default function Home() {
  return (
    <main className={`min-h-screen p-20 ${inter.className}`}>
      <h1 className="text-4xl font-bold">Anime Filler API</h1>
      <h2>Documentation below</h2>
      <CodeBlock description={description1} code={code1} />
      <Divider />
      <CodeBlock description={description2} code={code2} />
    </main>
  );
}

type CodeBlock = {
  // as markdown
  description: string;

  // as markdown
  code: string;
};

export function CodeBlock({ description, code }: CodeBlock) {
  return (
    <div className="flex w-full items-center gap-4 my-2">
      <ReactMarkdown
        components={{
          a: (props) => {
            return (
              <a
                className="cursor-pointer focus:text-blue-700 text-blue-600"
                href={props.href}
              >
                {props.children}
              </a>
            );
          },
        }}
        className="w-1/2 py-4"
      >
        {description}
      </ReactMarkdown>
      <ReactMarkdown className="w-1/2 py-4 opacity-75">{code}</ReactMarkdown>
    </div>
  );
}

function Divider() {
  return <div className="w-full border border-gray-300 rounded-full" />;
}
