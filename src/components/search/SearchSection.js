import { useEffect, useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SearchOptionMenu from "./SearchOptionMenu";
import ExerciseList from "../exercise/ExerciseList";
import UserList from "./UserList";
import FeedList from "../feed/feedList";

const categoryMap = {
    all: "전체",
    user: "유저",
    feed: "게시글",
    exercise: "운동법",
};

const SearchSection = () => {
    const [category, setCategory] = useState(Object.keys(categoryMap)[0]);
    const [isResultInDescOrder, setIsResultInDescOrder] = useState(true);
    const { state } = useLocation();

    const showSearchResult = () => {
        let children;
        const searchQuery = (state && state.searchQuery) ? state.searchQuery : "";
        const resultItemLimit = 5;
        
        switch (category) {
            case "all":
                children = <>
                            <UserList searchQuery={searchQuery} resultItemLimit={resultItemLimit} />
                            <FeedList searchQuery={searchQuery} resultItemLimit={resultItemLimit} isDescOrder={isResultInDescOrder}/>
                            <ExerciseList searchQuery={searchQuery} resultItemLimit={resultItemLimit} isDescOrder={isResultInDescOrder}/>
                        </>;
                break;
            case "user":
                children = <UserList searchQuery={searchQuery}/>
                break;
            case "feed":
                children = <FeedList searchQuery={searchQuery} isDescOrder={isResultInDescOrder}/>
                break;
            case "exercise":
                children = <ExerciseList searchQuery={searchQuery} isDescOrder={isResultInDescOrder}/>
                break;
        }

        return (
            <Flex direction="column" gap="10px">
                {children}
            </Flex>
        );
    };

    useEffect(() => {
        showSearchResult();
    }, [state, isResultInDescOrder]);

    return (
        <Flex width="100%" direction="column" p="10px" gap="10px">
            <Heading>{categoryMap[category]} 검색</Heading>
            <SearchOptionMenu categoryMap={categoryMap}
                shouldShowDateSortButton={category !== "user"}
                isResultInDescOrder={isResultInDescOrder}
                setCategory={setCategory}
                setIsResultInDescOrder={setIsResultInDescOrder}
            />
            {showSearchResult()}
        </Flex>
    );
};

export default SearchSection;