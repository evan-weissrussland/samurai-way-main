import React, {FC, useEffect, useState} from "react";
import s from "./Paginator.module.css";
import cn from 'classnames'

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

    const pages:number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

/*

    useEffect(() =>{
        /!**
         * @pagesPortion массив пустых массивов. Количество вложенных массивов равно количеству порций страниц portionCount. Далее пустые массивы будем заполнять числами сквозной нумерации
         *!/
        const pagesPortion:number[][] = []
        for (let i = 1; i <= portionCount; i++) {
            pagesPortion.push([])
        }
        /!**
         * @count для каждой итерации внутри нижележащего цикла for count будет меняться от нуля до значения порции страниц portionSize, после чего будет осуществлён переход к новому значению "p" массива pagesPortion;
         *!/
        let countToportionSize = 0
        /!**
         * @lastNumberFromPreviousPortion нужно для запоминания последнего сквозного числа в предыдущей порции страниц, чтобы первое вложенное число в текущей порции страниц было следующим по порядку от последнего числа предыдущей порции, а не сбрасывалось в 0
         *!/
        let lastNumberFromPreviousPortion = 0
        pagesPortion.map((p,j) => {
            for (let i = lastNumber+1; i <= pagesCount; i++) {
                p.push(i)
                count++
                if (countToportionSize === portionSize) {
                    countToportionSize = 0
                    lastNumberFromPreviousPortion += portionSize
                    return p
                }
            }
        })
        //пробегаемся по числам каждого вложенного в pagesPortion массива с числами и ищем тот, внутри которого будет число, равное текущей странице. Индекс этого массива и есть текущая порция выбранной страницы юзеров. Передаём её в локальный стэйт.
        pagesPortion.forEach((p,j) => {
            p.forEach(f => f === currentPage && setPortionNumber(j+1))
        })

    },[currentPage])
*/

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
                                // className={`${s.pageNumber} ${p === currentPage ? s.selectedPage : ''}`}>
                                className={cn(s.pageNumber, {[s.selectedPage]: p === currentPage})}>
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