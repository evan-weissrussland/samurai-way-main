import React, {FC, useEffect, useState} from "react";
import s from "./Paginator.module.css";

type Props = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalItemsCount: number
    pageSize: number
    portionSize?: number
}

export const Paginator: FC<Props> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
    const [portionNumber, setPortionNumber] = useState(1)

    const pagesCount = Math.ceil(totalItemsCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize



    useEffect(() =>{
        const pagesPortion = []
        for (let i = 1; i <= 3; i++) {
            pagesPortion.push([])
        }
        let count = 0
        let g = 0
        pagesPortion.forEach((p,j) => {

            for (let i = g+1; i <= 30; i++) {
                // @ts-ignore
                p.push(i)
                count++
                if (count === portionSize) {
                    count = 0
                    g += portionSize
                    return p
                }
            }
        })
        pagesPortion.forEach((p,j) => {
            p.forEach((f) => f === currentPage && setPortionNumber(j+1))
        })

    },[currentPage])

    return (
        <div className={s.waipperSpans}>
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Prev</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, i) => {
                        return (
                            <span
                                key={i}
                                onClick={() => onPageChanged(p)}
                                className={`${s.pageNumber} ${p === currentPage ? s.selectedPage : ''}`}>
                                {p}
                </span>
                        )
                    }
                )
            }
            {portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}
        </div>
    )
}