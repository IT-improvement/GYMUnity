import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react";
import Context from "../../Context";
import FriendList from "./FriendList";
import FriendRequestList from "./FriendRequestList";

const FriendSection = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const { isLoggedIn } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn]);

    return (
        <Tabs w="100%" variant="enclosed" onChange={index => setTabIndex(index)}>
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