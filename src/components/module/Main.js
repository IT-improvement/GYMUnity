import React from 'react';
import {Box} from "@chakra-ui/react";

const Main = () => {
    return (
        <>
            <Box>
                <h4>Main</h4>
                    <form method="post" action={`${process.env.REACT_APP_SERVER_URL}/user/service`}>
                        <input type="hidden" id="command" name="command" value="test"></input>
                        <input type="submit"/>
                    </form>
            </Box>
        </>
    )

}
export default Main;
