import { Flex } from '@chakra-ui/react'
import Sidebar from '../Sidebar';

const Body = (props) => {
    return (
        <Flex alignItems="cen" minH="1000px" bgColor="gray.50" borderRadius="10px">
            <Sidebar/>
            {props.children}
        </Flex>
    );
};

export default Body;
