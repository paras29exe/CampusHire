'use client';

import { LoaderCircle } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function WithInfiteScroll({ children, hasMore, loadMore }) {
    return (
        <InfiniteScroll
            dataLength={children.length} // This is important field to render the next data
            next={loadMore}
            hasMore={hasMore}
            loader={<LoaderCircle className="animate-spin" /> }
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>No more data to load</b>
                </p>
            }
        >
            {children}
        </InfiniteScroll>
    );
}