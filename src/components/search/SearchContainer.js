import { useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import SearchOptionMenu from "./SearchOptionMenu";
import ExerciseListContainer from "./ExerciseList";
import { useLocation } from "react-router-dom";
import UserList from "./UserList";

const SearchContainer = () => {
    const [category, setCategory] = useState("");
    const [isResultInDescOrder, setIsResultInDescOrder] = useState(true);
    const { state } = useLocation();

    const categories = [
        {
            type: "all",
            name: "전체"
        },
        {
            type: "user",
            name: "유저"
        },
        {
            type: "post",
            name: "게시글"
        },
        {
            type: "exercise",
            name: "운동법"
        },
    ];

    const showSearchResult = () => {
        let children;

        switch (category) {
            case "all":
                children = <>
                            <UserList searchQuery={state.searchQuery}/>
                            <ExerciseListContainer searchQuery={state.searchQuery}/>
                        </>;
                break;
            case "user":
                children = <UserList searchQuery={state.searchQuery}/>
                break;
            case "post":
                children = <></>;
                break;
            case "exercise":
                children = <ExerciseListContainer searchQuery={state.searchQuery}/>
                break;
        }

        return (
            <Flex direction="column" gap="10px">
                {children}
            </Flex>
        );
    };

    return (
        <Flex direction="column" p="10px">
            <Heading>통합 검색</Heading>
            <SearchOptionMenu categories={categories}
                setCategory={setCategory}
                isResultInDescOrder={isResultInDescOrder}
                setIsResultInDescOrder={setIsResultInDescOrder}
            />
            {showSearchResult()}
        </Flex>
    );
};

export default SearchContainer;