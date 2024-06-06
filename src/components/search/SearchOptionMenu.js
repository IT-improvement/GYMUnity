import { Select, Flex } from "@chakra-ui/react";

const SearchOptionMenu = (props) => {
    const handleFilterCategoryOnChange = (e) => {
        props.setCategory(e.target.value);
    };

    const handleDataSortOnChange = (e) => {
        // JSON.parse()을 사용하여 데이터 타입이 문자열인 불린 값을 불린 데이터 타입으로 변환하기
        props.setIsResultInDescOrder(JSON.parse(e.target.value));
    };

    return (
        <Flex w="fit-content" p="10px" gap="10px" borderRadius="10px" bgColor="gray.200">
            <Select bgColor="gray.50" value={props.category} onChange={handleFilterCategoryOnChange}>
                { Object.entries(props.categoryMap).map(([type, name]) =>
                    <option value={type} key={type} defaultChecked={props.category === type}>
                        {name}
                    </option>
                )}
            </Select>
            { props.shouldShowDateSortButton &&
                <Select bgColor="gray.50" onChange={handleDataSortOnChange}>
                    <option defaultChecked={props.isResultInDescOrder} value={true}>최신순</option>
                    <option value={false}>과거순</option>
                </Select>
            }
        </Flex>
    );
};

export default SearchOptionMenu;