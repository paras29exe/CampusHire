import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useInfiniteScroll(
    apiToFetch,
    searchTerm = null,
    setSearchQuery = () => { },
    params = {},
    Dependencies = []
) {
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    // if you want to trigger a fetch forcefully, you can use this state
    const [triggerFetch, setTriggerFetch] = useState(false);

    const router = useRouter();

    // filter out empty or 'all' values from params
    const filteredParams = useMemo(() => (
        Object.fromEntries(
            Object.entries(params).filter(([_, v]) => v !== '' && v !== 'all' && v !== null && v !== undefined)
        )
    ), [params]);

    // to prevent eslint warning about array spreding in dependecies of useEffect
    const joinedDependencies = Dependencies.join(',');

    // this will help us to stop the All useEffect from running on the first render because in some components we only want to use infinite scroll and not any other functionality
    const firstRender = useRef(true);
    const fetchedPages = useRef(new Set());

    // This will help us to keep track of the previous page and hasMore state in case we need to reset them
    // This is useful when we change the search term or any other dependency
    const prevPage = useRef(null);
    const prevHasMore = useRef(null);

    const fetchData = useCallback(async () => {
        if (!apiToFetch || !hasMore || fetchedPages.current.has(page)) return;

        fetchedPages.current.add(page);
        setIsLoading(true);
        try {
            const response = await axios.get(apiToFetch, {
                params: {
                    page,
                    ...filteredParams,
                }
            });
            const { data: newData, pagination } = response.data;
            setData(prev => [...prev, ...newData]);
            setHasMore(pagination.currentPage < pagination.totalPages);
            prevPage.current = page;
            prevHasMore.current = (pagination.currentPage < pagination.totalPages);
        } catch (error) {
            console.error('Error fetching data:', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [apiToFetch, page, hasMore, filteredParams, triggerFetch, joinedDependencies]);

    // This effect runs on every change of page, hasMore, on any dependency change we make the hasMore = true and page = 1
    useEffect(() => {
        fetchData();
    }, [page, hasMore, triggerFetch]);

    const observer = useRef();
    const lastElementRef = useCallback((node) => {
        if (isLoading || !hasMore) return;
        if (observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        })

        if (node) observer.current.observe(node);
    }, [isLoading, hasMore])

    // this effect will change the states of page and hasMore or triggerFetch in some case when dependencies change
    useEffect(() => {
        if (firstRender.current) return;

        const newParams = new URLSearchParams(filteredParams); // This works directly
        router.replace(`?${newParams.toString()}`, { scroll: false });
        setData([])
        fetchedPages.current.clear();
        setPage(1); // Reset to first page
        setHasMore(true);

        // if we are on the first page and hasMore is true, then we cannot trigger fetchData by changing the state of page to 1 and hasMore to true
        // so we will trigger fetchData manually
        if (prevPage.current === 1 && prevHasMore.current === true) {
            setTriggerFetch(prev => !prev); // Trigger fetch if you want to
        }
    }, [joinedDependencies]);

    // This effect will handle the search term debouncing and updating the searchQuery
    const debounceTimeoutRef = useRef(null);
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

        setIsLoading(true);
        setData([]);

        debounceTimeoutRef.current = setTimeout(() => {
            setSearchQuery(searchTerm);
        }, 1000);
    }, [searchTerm])

    return { data, hasMore, isLoading, lastElementRef, fetchData }
}