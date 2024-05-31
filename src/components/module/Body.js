import { Flex } from '@chakra-ui/react'
import Sidebar from '../Sidebar';
import Main from './Main';

const Body = (props) => {
    return (
        <Flex alignItems="cen" minH="1000px" mt="10px" gap="10px" bgColor="gray.100" borderRadius="10px">
            <Sidebar/>
            {props.children}
        </Flex>
    );
};

export default Body;
