import { Flex } from "@chakra-ui/react";

const ListSection = (props) => {
    return (
        <Flex direction="column" w="100%" p="10px" bgColor="gray.200" gap="10px" borderRadius="10px">
            {props.children}
        </Flex>
    );
};

export default ListSection;