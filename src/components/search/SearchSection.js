import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";
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
        const searchQuery = (state && state.searchQuery) ? state.searchQuery : "";
        let children;
        
        switch (category) {
            case "all":
                children = <>
                            <UserList searchQuery={searchQuery} isTotalSearch={true} />
                            <FeedList searchQuery={searchQuery} isTotalSearch={true} isDescOrder={isResultInDescOrder} />
                            <ExerciseList searchQuery={searchQuery} isTotalSearch={true} isDescOrder={isResultInDescOrder} />
                        </>
                break;
            case "user":
                children = <UserList searchQuery={searchQuery} />
                break;
            case "feed":
                children = <FeedList searchQuery={searchQuery} isDescOrder={isResultInDescOrder} />
                break;
            case "exercise":
                children = <ExerciseList searchQuery={searchQuery} isDescOrder={isResultInDescOrder} />
                break;
            default:
                break;
        }

        return children;
    };

    useEffect(() => {
        if (state && state.category)
            setCategory(state.category);
    }, [state]);

    useEffect(() => {
        showSearchResult();
    }, [category]);

    return (
        <Flex direction="column" w="100%" p="10px" gap="10px">
            <Heading>{categoryMap[category]} 검색</Heading>
            <SearchOptionMenu categoryMap={categoryMap}
                shouldShowDateSortButton={category !== "user"}
                isResultInDescOrder={isResultInDescOrder}
                category={category}
                setCategory={setCategory}
                setIsResultInDescOrder={setIsResultInDescOrder}
            />
            <Flex direction="column" gap="10px">
                { showSearchResult() }
            </Flex>
        </Flex>
    );
};

export default SearchSection;