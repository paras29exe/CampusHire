'use client';

import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteScroll(apiToFetch, initialPage = 1) {
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    // if setData is provided, use it to manage data state externally otherwise manage it internally
    const [data, setData] = useState([]);

    const fetchedPages = useRef(new Set());

    const fetchData = async () => {
        if (!apiToFetch || isLoading || !hasMore || fetchedPages.current.has(page)) return;

        fetchedPages.current.add(page);
        setIsLoading(true);
        try {
            const response = await axios.get(apiToFetch, {
                params: { page }
            });
            const { data: newData, pagination } = response.data;
            setData(prev => [...prev, ...newData]);
            setHasMore(pagination.currentPage < pagination.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }
    
    const observer = useRef();

    const lastElementRef = useCallback((node) => {
        if(isLoading || !hasMore) return;
        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if(entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        })

        if(node) observer.current.observe(node);
    }, [isLoading, hasMore])

    useEffect(() => {
        fetchData();
    }, [page]);

    return { data, hasMore, isLoading, lastElementRef, fetchData } // Expose fetchData if you want to trigger it manually
}