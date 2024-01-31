import { useEffect, useRef } from "react";

export const useObserver = (ref ,canLoad, isLoading, callback) => {
    const observer = useRef()
    useEffect(() => {
        if(isLoading) return;
        if (observer.current) observer.current.disconnect();
         // Определение функции обратного вызова
         var cb = function (entries, observer) {
             if (entries[0].isIntersecting && canLoad) {
                callback()
             }
         };
         // Создание IntersectionObserver и наблюдение за элементом
         observer.current = new IntersectionObserver(cb);
         observer.current.observe(ref.current);
     
     }, [isLoading]);
}