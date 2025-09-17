import Answers from "./Answers";
import React from 'react'

export default function QuestionAnswer({item, idx}) {
    return (
        <>
            <div key={idx + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                {
                    item.type == 'q' ?
                        <li key={idx + Math.random()}
                            className="text-right p-1 border-8 dark:bg-zinc-700 dark:border-zinc-700 bg-white border-white rounded-tl-3xl rounded-br-3xl rounded-bl-3xl w-fit"
                        ><Answers ans={item.text} totalResult={1} idx={idx} type={item.type} /></li>
                        : item.text.map((ansItem, ansIdx) => (
                            <li key={ansIdx + Math.random()} className="text-left p-1"><Answers ans={ansItem} totalResult={item.length} type={item.type} idx={ansIdx} /></li>
                        ))
                }
            </div>
        </>
    )
}
