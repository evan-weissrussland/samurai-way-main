import React, {FC} from "react";
import s from "./Paginator.module.css";

type Props = {
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    totalUsersCount: number
    pageSize: number
}

export const Paginator: FC<Props> = ({totalUsersCount, pageSize, onPageChanged, currentPage}) => {
    const pagesCount = Math.ceil(totalUsersCount / pageSize)
    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.waipperSpans}>
            {pages.map((p, i) =>
                <span
                    key={i}
                    onClick={() => onPageChanged(p)}
                    className={p === currentPage ? s.selectedPage : ''}>{p}
                </span>)}
        </div>
    )
}