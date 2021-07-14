import React from 'react';
import NavBar from '../NavBar';
import * as S from './style';

interface InfiniteScrollProps {
    onBottomHit(): void;
    isLoading: boolean;
    hasMoreData: boolean;
    loadOnMount: boolean;
}

interface LayoutProps {
    shouldScroll?: boolean;
    infiniteOptions?: InfiniteScrollProps
}

const Layout: React.FC<LayoutProps> = ({
    children,
    shouldScroll = true,
    infiniteOptions
}) => {
    
    const [initialLoad, setInitialLoad] = React.useState(true);

    const contentRef = React.useRef<HTMLDivElement>(null);

    const {
        hasMoreData,
        isLoading,
        loadOnMount,
        onBottomHit
    } = infiniteOptions || {};

    React.useEffect(() => {
        if (loadOnMount && initialLoad) {
            if (onBottomHit) {
                onBottomHit();
                setInitialLoad(false);
                console.log('InfiniteScroll', 'init')
            }
        }
    }, [onBottomHit, loadOnMount, initialLoad]);

    React.useEffect(() => {

        const currentRef = contentRef.current;

        
        if (!currentRef) return;

        const onScroll = (e: Event) => {
            const isBottom = (): boolean => {
                // @ts-ignore
                const {scrollHeight, scrollTop} = e.target;
                const offset = scrollTop / scrollHeight * 100;
                return offset >= 72 ? true : false;
                
            }
            if (!isLoading && hasMoreData && isBottom()) {
                console.log('InfiniteScroll', 'load more data')
                if (onBottomHit) onBottomHit();
            } else {
                console.log('InfiniteScroll', 'keep scrolling...')
            }
        }

        currentRef.addEventListener('scroll', onScroll);

        return () => {
            if (currentRef) currentRef.removeEventListener('scroll', onScroll)
        }
    }, [onBottomHit, isLoading, hasMoreData])

    return (
        <S.Layout ref={contentRef} shouldScroll={shouldScroll}>
            <NavBar />
            {children}
        </S.Layout>
    )
}

export default Layout;