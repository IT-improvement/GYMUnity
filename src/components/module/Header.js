import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

export default function Header() {
    return (
        <>
            <Box>
                <Heading>{process.env.REACT_APP_SERVER_URL}</Heading>
            </Box>
        </>
    );
}
