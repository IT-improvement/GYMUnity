import { Flex } from '@chakra-ui/react';

const Body = (props) => {
    return (
        <Flex minH="1000px" mt="10px" gap="10px" bgColor="gray.100" borderRadius="10px">
            {props.children}
        </Flex>
    );
};

export default Body;
