import { Flex, Select } from "@chakra-ui/react";

const searchOptionMenu = (props) => {
    const handleFilterCategoryOnChange = (e) => {
        props.setCategory(e.target.value);
    }

    const handleDataSortOnChange = (e) => {
        props.setIsResultInDescOrder(e.target.value);
    }

    return (
        <Flex p="10px" bgColor="gray.50">
            <Select onChange={handleFilterCategoryOnChange}>
                {props.categories.map(category => {
                    return <option value={category.type} key={category.type}>{category.name}</option>
                })}
            </Select>
            <Select onChange={handleDataSortOnChange}>
                <option defaultChecked={props.isResultInDescOrder}>최신순</option>
                <option>과거순</option>
            </Select>
        </Flex>
    );
};

export default searchOptionMenu;