import { Flex, Select } from "@chakra-ui/react";

const SearchOptionMenu = (props) => {
    console.log(props.shouldShowDateSortButton);
    const handleFilterCategoryOnChange = (e) => {
        props.setCategory(e.target.value);
    };

    const handleDataSortOnChange = (e) => {
        props.setIsResultInDescOrder(e.target.value == "true");
    };

    return (
        <Flex w="fit-content" p="10px" bgColor="gray.50">
            <Select onChange={handleFilterCategoryOnChange}>
                {Object.entries(props.categoryMap).map(([type, name]) => {
                    return <option value={type} key={type}>{name}</option>
                })}
            </Select>
            { props.shouldShowDateSortButton &&
                <Select onChange={handleDataSortOnChange}>
                    <option defaultChecked={props.isResultInDescOrder} value={true}>최신순</option>
                    <option value={false}>과거순</option>
                </Select>
            }
        </Flex>
    );
};

export default SearchOptionMenu;