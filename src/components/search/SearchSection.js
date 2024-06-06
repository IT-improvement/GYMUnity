import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import ExerciseList from "../exercise/ExerciseList";
import FeedList from "../feed/feedList";
import SearchOptionMenu from "./SearchOptionMenu";
import UserList from "../user/UserList";

const categoryMap = {
    all: "전체",
    user: "유저",
    feed: "피드",
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
            <SearchOptionMenu 
                category={category}
                categoryMap={categoryMap}
                isResultInDescOrder={isResultInDescOrder}
                setCategory={setCategory}
                setIsResultInDescOrder={setIsResultInDescOrder}
                shouldShowDateSortButton={category !== "user"}
            />
            <Flex direction="column" gap="10px">
                { showSearchResult() }
            </Flex>
        </Flex>
    );
};

export default SearchSection;