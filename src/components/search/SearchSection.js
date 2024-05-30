import { useEffect, useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import SearchOptionMenu from "./SearchOptionMenu";
import ExerciseList from "./ExerciseList";
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

        switch (category) {
            case "all":
                children = <>
                            <UserList searchQuery={state.searchQuery} />
                            <FeedList searchQuery={state.searchQuery} isDescOrder={isResultInDescOrder}/>
                            <ExerciseList searchQuery={state.searchQuery} isDescOrder={isResultInDescOrder}/>
                        </>;
                break;
            case "user":
                children = <UserList searchQuery={state.searchQuery}/>
                break;
            case "feed":
                children = <FeedList searchQuery={state.searchQuery} isDescOrder={isResultInDescOrder}/>
                break;
            case "exercise":
                children = <ExerciseList searchQuery={state.searchQuery} isDescOrder={isResultInDescOrder}/>
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
    }, [state.searchQuery, isResultInDescOrder]);


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