import React from 'react';
import {Box} from "@chakra-ui/react";

const Main = () => {
    return (
        <>
            <Box>
                <h4>Main</h4>
                    <div id="image-container"></div>
                    <form method="POST" action={`${process.env.REACT_APP_SERVER_URL}/diary?`}
                    encType={"multipart/form-data"}>
                        <input type="hidden" id="test" name="test" value="test"/>
                        <input type="file" id="file" name="file"/>
                        <input type="submit"/>
                    </form>
            </Box>
        </>
    )

}
export default Main;
