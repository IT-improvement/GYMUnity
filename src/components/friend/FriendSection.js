import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";
import Context from "../../Context";

const FriendSection = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn]);

    return (
        <Tabs width="100%" variant="enclosed" onChange={(index, a) => setTabIndex(index)}>
            <TabList> 
                <Tab _selected={{ color: "white", bg: "blue.200"}}>친구</Tab>
                <Tab _selected={{ color: "white", bg: "blue.200"}}>받은 친구 요청</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <FriendList shouldFetch={tabIndex === 0}/>
                </TabPanel>
                <TabPanel>
                    <FriendRequestList shouldFetch={tabIndex === 1}/>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default FriendSection;