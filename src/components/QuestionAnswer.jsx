import Answers from "./Answers";
import React from 'react'

export default function QuestionAnswer({item, idx}) {
    return (
        <>
            <div key={idx + Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                {
                    item.type == 'q' ?
                        <li className={`text-right p-2 md:p-3 max-w-[90%] md:max-w-[70%] dark:bg-zinc-700 bg-white rounded-tl-3xl rounded-br-3xl rounded-bl-3xl 
                         ${item.type === 'q' ? 'ml-auto' : 'mr-auto'}`}
                         ><Answers ans={item.text} totalResult={1} idx={idx} type={item.type} /></li>
                        : item.text.map((ansItem, ansIdx) => (
                            <li key={ansIdx + Math.random()} className="text-left p-1"><Answers ans={ansItem} totalResult={item.length} type={item.type} idx={ansIdx} /></li>
                        ))
                }
            </div>
        </>
    )
}
